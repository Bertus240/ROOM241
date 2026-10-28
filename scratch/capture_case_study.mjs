import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9234',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9234/json');
  const targets = await res.json();
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => {
    return new Promise(r => {
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
  };

  await send('Runtime.enable');
  await send('Page.enable');

  await send('Runtime.evaluate', { expression: `document.documentElement.style.scrollBehavior = 'auto';` });

  // Scroll to canvas 1
  await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelectorAll('canvas')[1];
      c.scrollIntoView({ block: 'center' });
    })()`
  });

  await new Promise(r => setTimeout(r, 1000));

  const coords = (await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelectorAll('canvas')[1];
      const r = c.getBoundingClientRect();
      return {
        // Viewport coords for mouse events
        viewportX: Math.round(r.left + r.width / 2),
        viewportY: Math.round(r.top + r.height / 2),
        // Document coords for Page.captureScreenshot clip
        docX: Math.round(r.left + window.scrollX),
        docY: Math.round(r.top + window.scrollY),
        width: Math.round(r.width),
        height: Math.round(r.height)
      };
    })()`,
    returnByValue: true
  })).result.result.value;

  console.log("Calculated document coords for Case Studies Canvas:", coords);

  // Capture BEFORE hover
  const ssBefore = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: coords.docX, y: coords.docY, width: coords.width, height: coords.height, scale: 1 }
  });
  fs.writeFileSync('scratch/case_study_before.png', Buffer.from(ssBefore.result.data, 'base64'));

  // Move mouse across canvas in viewport coordinates
  for (let i = 0; i < 20; i++) {
    const mx = coords.viewportX + Math.sin(i * 0.4) * 120;
    const my = coords.viewportY + Math.cos(i * 0.4) * 60;
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mx, y: my });
    await new Promise(r => setTimeout(r, 30));
  }

  // Capture DURING hover
  const ssDuring = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: coords.docX, y: coords.docY, width: coords.width, height: coords.height, scale: 1 }
  });
  fs.writeFileSync('scratch/case_study_during.png', Buffer.from(ssDuring.result.data, 'base64'));

  console.log("Correctly clipped screenshots captured!");
  edge.kill();
}

main().catch(console.error);
