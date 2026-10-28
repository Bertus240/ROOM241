import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity-ide/brain/14f048b5-e898-4a14-ae9c-52c4fd3ac358';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9299',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function run() {
  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch('http://127.0.0.1:9299/json');
    const targets = await res.json();
    const page = targets.find(t => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    const send = (method, params = {}) => new Promise(r => {
      const curId = id++;
      const handler = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === curId) {
          ws.removeEventListener('message', handler);
          r(d);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 1500));

    // Accept cookies if present
    await send('Runtime.evaluate', {
      expression: `(() => {
        const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Accepter'));
        if (b) b.click();
      })()`
    });

    const info = await send('Runtime.evaluate', {
      expression: `(() => {
        const canvases = Array.from(document.querySelectorAll('canvas'));
        return {
          canvases: canvases.map(c => {
            const r = c.getBoundingClientRect();
            return {
              width: c.width,
              height: c.height,
              top: r.top,
              left: r.left,
              w: r.width,
              h: r.height,
              visible: r.width > 0 && r.height > 0
            };
          }),
          images: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, w: i.width, h: i.height }))
        };
      })()`,
      returnByValue: true
    });

    console.log('DOM Info:', JSON.stringify(info, null, 2));

    const s = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_check_hero.png'), Buffer.from(s.result.data, 'base64'));
    console.log('Captured phase6_check_hero.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edge.kill();
  }
}

run();
