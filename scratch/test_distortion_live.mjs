import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity-ide/brain/14f048b5-e898-4a14-ae9c-52c4fd3ac358';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9298',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  '--user-data-dir=C:\\Portfolio_2026\\scratch\\edge_diag_profile',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function run() {
  try {
    await new Promise(r => setTimeout(r, 2500));
    const res = await fetch('http://127.0.0.1:9298/json');
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

    // Inspect Canvas presence
    const inspection = await send('Runtime.evaluate', {
      expression: `(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
          return { error: 'No canvas found' };
        }
        const rect = canvas.getBoundingClientRect();
        return {
          found: true,
          width: canvas.width,
          height: canvas.height,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
        };
      })()`,
      returnByValue: true
    });

    console.log('Inspection:', inspection.result.value);
    const box = inspection.result.value.rect;

    // Screenshot at rest
    const s1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'test_distort_rest.png'), Buffer.from(s1.result.data, 'base64'));

    // Move mouse across canvas in arc
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;

    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.left + 50, y: cy });
    await new Promise(r => setTimeout(r, 50));
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: cx, y: cy });
    await new Promise(r => setTimeout(r, 50));
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.left + box.width - 50, y: cy });
    await new Promise(r => setTimeout(r, 30));

    // Screenshot during hover
    const s2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'test_distort_hover.png'), Buffer.from(s2.result.data, 'base64'));

    console.log('Saved test_distort_rest.png and test_distort_hover.png');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    edge.kill();
  }
}

run();
