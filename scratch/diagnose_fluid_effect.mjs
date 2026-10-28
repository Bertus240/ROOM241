import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity-ide/brain/14f048b5-e898-4a14-ae9c-52c4fd3ac358';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9295',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function run() {
  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch('http://127.0.0.1:9295/json');
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

    await new Promise(r => setTimeout(r, 1200));

    // Get position of the Hero visual stage canvas
    const boxEval = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        if (!c) return null;
        const rect = c.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, width: rect.width, height: rect.height, top: rect.top, left: rect.left };
      })()`,
      returnByValue: true
    });

    console.log('Canvas Box:', boxEval.result.value);
    const box = boxEval.result.value;

    // Capture resting screenshot
    const sRest = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_diag_rest.png'), Buffer.from(sRest.result.data, 'base64'));

    // Simulate mouse movements across canvas
    const steps = 15;
    for (let i = 0; i < steps; i++) {
      const progress = i / (steps - 1);
      const curX = box.left + box.width * (0.2 + 0.6 * progress);
      const curY = box.top + box.height * (0.3 + 0.4 * Math.sin(progress * Math.PI));

      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: curX,
        y: curY
      });
      await new Promise(r => setTimeout(r, 20));
    }

    // Capture dynamic hover screenshot mid-motion
    const sHover = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_diag_hover.png'), Buffer.from(sHover.result.data, 'base64'));

    console.log('Screenshots saved. Checking pixel differences...');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edge.kill();
  }
}

run();
