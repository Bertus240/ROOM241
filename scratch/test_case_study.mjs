import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9230/json');
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

  // Disable smooth scroll for instant positioning
  await send('Runtime.evaluate', {
    expression: `document.documentElement.style.scrollBehavior = 'auto';`
  });

  // Scroll to Case Studies canvas (canvas index 1)
  const rect = (await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelectorAll('canvas')[1];
      c.scrollIntoView({ block: 'center' });
      const r = c.getBoundingClientRect();
      return {
        top: Math.round(r.top),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
        scrollY: window.scrollY
      };
    })()`,
    returnByValue: true
  })).result.result.value;

  console.log("Canvas 1 positioned at:", rect);

  // Wait 500ms
  await new Promise(r => setTimeout(r, 500));

  // Screenshot before hover
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
  await new Promise(r => setTimeout(r, 400));
  const ssBefore = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: rect.left, y: rect.top, width: rect.width, height: rect.height, scale: 1 }
  });
  fs.writeFileSync('scratch/case_study_before.png', Buffer.from(ssBefore.result.data, 'base64'));

  // Move mouse across canvas 1
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  for (let i = 0; i < 20; i++) {
    const mx = centerX + Math.sin(i * 0.4) * 100;
    const my = centerY + Math.cos(i * 0.4) * 50;
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mx, y: my });
    await new Promise(r => setTimeout(r, 30));
  }

  // Screenshot during hover
  const ssDuring = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: rect.left, y: rect.top, width: rect.width, height: rect.height, scale: 1 }
  });
  fs.writeFileSync('scratch/case_study_during.png', Buffer.from(ssDuring.result.data, 'base64'));

  console.log("Case study screenshots saved successfully!");
  edge.kill();
}

main().catch(console.error);
