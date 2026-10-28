import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9231',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9231/json');
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

  // Disable smooth scroll
  await send('Runtime.evaluate', { expression: `document.documentElement.style.scrollBehavior = 'auto';` });

  // Let's scroll into view canvas 1
  await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelectorAll('canvas')[1];
      c.scrollIntoView({ block: 'center' });
    })()`
  });

  await new Promise(r => setTimeout(r, 800));

  // Check WebGL rendering on canvas 0 and canvas 1
  const check = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvases = document.querySelectorAll('canvas');
      return Array.from(canvases).map((c, i) => {
        const gl = c.getContext('webgl2') || c.getContext('webgl');
        const pixels = new Uint8Array(4);
        if (gl) {
          gl.readPixels(c.width / 2, c.height / 2, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        }
        return {
          index: i,
          width: c.width,
          height: c.height,
          pixelCenter: Array.from(pixels),
          dataUrlLength: c.toDataURL().length
        };
      });
    })()`,
    returnByValue: true
  });

  console.log("Canvas pixel check:", JSON.stringify(check.result?.result?.value, null, 2));

  edge.kill();
}

main().catch(console.error);
