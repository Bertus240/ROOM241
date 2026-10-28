import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9238',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000/offres'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9238/json');
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

  // 1. Check initial state at scrollY = 0
  const initial = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('button[aria-label="Retourner en haut de la page"]');
      if (!btn) return { found: false };
      const style = window.getComputedStyle(btn);
      return {
        found: true,
        scrollY: window.scrollY,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        className: btn.className
      };
    })()`,
    returnByValue: true
  });
  console.log("1. Initial state (top of page):", JSON.stringify(initial.result.result.value, null, 2));

  // 2. Scroll down 700px
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 700);` });
  await new Promise(r => setTimeout(r, 500));

  const scrolled = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('button[aria-label="Retourner en haut de la page"]');
      if (!btn) return { found: false };
      const style = window.getComputedStyle(btn);
      const rect = btn.getBoundingClientRect();
      return {
        found: true,
        scrollY: window.scrollY,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height }
      };
    })()`,
    returnByValue: true
  });
  console.log("2. Scrolled state (scrollY = 700):", JSON.stringify(scrolled.result.result.value, null, 2));

  // Take screenshot showing the BackToTop button in action
  const ssScrolled = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/backtotop_visible.png', Buffer.from(ssScrolled.result.data, 'base64'));

  // 3. Click the BackToTop button
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('button[aria-label="Retourner en haut de la page"]');
      btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 800));

  const afterClick = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('button[aria-label="Retourner en haut de la page"]');
      const style = window.getComputedStyle(btn);
      return {
        scrollY: window.scrollY,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents
      };
    })()`,
    returnByValue: true
  });
  console.log("3. After click state (smooth scroll back to top):", JSON.stringify(afterClick.result.result.value, null, 2));

  edge.kill();
  console.log("Done testing BackToTop.");
}

main().catch(err => {
  console.error(err);
  edge.kill();
});
