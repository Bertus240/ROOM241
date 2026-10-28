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
  'http://localhost:3000'
], { stdio: 'ignore' });

async function run() {
  try {
    await new Promise(r => setTimeout(r, 2000));
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

    // Get Hero Canvas bounding rect
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        const r = c.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
      })()`,
      returnByValue: true
    });

    const box = evalRes.result.result.value;
    console.log('Hero Canvas box:', box);

    // 1. Capture at REST (mouse at 0, 0 outside)
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
    await new Promise(r => setTimeout(r, 600));
    const sRest = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'distortion_proof_rest.png'), Buffer.from(sRest.result.data, 'base64'));

    // 2. Perform rapid mouse gestures across canvas
    const startX = box.left + 50;
    const startY = box.top + box.height * 0.4;
    const endX = box.left + box.width - 50;
    const endY = box.top + box.height * 0.4;

    for (let i = 0; i <= 20; i++) {
      const x = startX + (endX - startX) * (i / 20);
      const y = startY + Math.sin((i / 20) * Math.PI) * 40;
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
      await new Promise(r => setTimeout(r, 16));
    }

    // 3. Capture during active motion
    const sHover = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'distortion_proof_motion.png'), Buffer.from(sHover.result.data, 'base64'));

    console.log('Saved distortion_proof_rest.png and distortion_proof_motion.png');

    // 4. Leave canvas
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
    await new Promise(r => setTimeout(r, 1000));
    const sAfter = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'distortion_proof_after.png'), Buffer.from(sAfter.result.data, 'base64'));

    console.log('Saved distortion_proof_after.png (return to rest)');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    edge.kill();
  }
}

run();
