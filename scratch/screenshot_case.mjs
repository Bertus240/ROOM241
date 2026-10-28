import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9232',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9232/json');
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

  await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelectorAll('canvas')[1];
      c.scrollIntoView({ block: 'center' });
    })()`
  });

  await new Promise(r => setTimeout(r, 1000));

  // Full viewport screenshot
  const ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/full_viewport_case.png', Buffer.from(ss.result.data, 'base64'));
  console.log("Saved scratch/full_viewport_case.png");

  edge.kill();
}

main().catch(console.error);
