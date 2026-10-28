import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9240',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000/offres'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9240/json');
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

  // Dismiss cookie banner so it doesn't overlap
  await send('Runtime.evaluate', {
    expression: `(() => {
      localStorage.setItem('room241-visitor-choice', JSON.stringify({ choice: 'accepted', timestamp: Date.now() }));
      const notice = document.querySelector('.site-notice');
      if (notice) notice.remove();
    })()`
  });
  await new Promise(r => setTimeout(r, 300));

  // Scroll down 700px
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 700);` });
  await new Promise(r => setTimeout(r, 500));

  // Take screenshot showing the clean BackToTop button
  const ssScrolled = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/backtotop_clean.png', Buffer.from(ssScrolled.result.data, 'base64'));

  // Switch to light mode and take another screenshot
  await send('Runtime.evaluate', {
    expression: `(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('room241-theme', 'light');
    })()`
  });
  await new Promise(r => setTimeout(r, 400));
  const ssLight = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/backtotop_light.png', Buffer.from(ssLight.result.data, 'base64'));

  edge.kill();
  console.log("Captured clean screenshots of BackToTop in dark & light.");
}

main().catch(err => {
  console.error(err);
  edge.kill();
});
