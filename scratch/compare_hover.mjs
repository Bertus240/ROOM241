import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9228',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9228/json');
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

  // Find canvas rect
  const info = await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelector('canvas');
      const r = c.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
    })()`,
    returnByValue: true
  });
  const r = info.result.result.value;
  console.log("Canvas info:", r);

  // Screenshot BEFORE hover (cursor at 0,0)
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
  await new Promise(r => setTimeout(r, 500));
  const ss1 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: r.left, y: r.top, width: r.width, height: r.height, scale: 1 }
  });
  if (ss1.error) {
    console.error("ss1 error:", ss1.error);
  } else {
    fs.writeFileSync('scratch/before_hover.png', Buffer.from(ss1.result.data, 'base64'));
    console.log("Saved scratch/before_hover.png");
  }

  // Move mouse rapidly over canvas
  for (let i = 0; i < 20; i++) {
    const mx = r.x + Math.sin(i * 0.5) * 120;
    const my = r.y + Math.cos(i * 0.5) * 120;
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mx, y: my });
    await new Promise(r => setTimeout(r, 30));
  }

  // Screenshot DURING movement
  const ss2 = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: r.left, y: r.top, width: r.width, height: r.height, scale: 1 }
  });
  if (ss2.error) {
    console.error("ss2 error:", ss2.error);
  } else {
    fs.writeFileSync('scratch/during_hover.png', Buffer.from(ss2.result.data, 'base64'));
    console.log("Saved scratch/during_hover.png");
  }

  if (fs.existsSync('scratch/before_hover.png') && fs.existsSync('scratch/during_hover.png')) {
    const b1 = fs.readFileSync('scratch/before_hover.png');
    const b2 = fs.readFileSync('scratch/during_hover.png');
    console.log("Before hover size:", b1.length, "During hover size:", b2.length);
    console.log("Are images identical?", b1.equals(b2));
  }

  edge.kill();
}

main().catch(console.error);
