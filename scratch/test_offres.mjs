import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9235',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000/offres'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9235/json');
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

  // Let's inspect dark theme first
  const darkInfo = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('header');
      const hRect = header.getBoundingClientRect();
      const offresSec = document.querySelector('#offres');
      const oRect = offresSec.getBoundingClientRect();
      const title = offresSec.querySelector('h2');
      const tRect = title.getBoundingClientRect();
      const firstCard = offresSec.querySelector('.grid > div');
      const cRect = firstCard ? firstCard.getBoundingClientRect() : null;
      return {
        theme: document.documentElement.className,
        header: { top: hRect.top, height: hRect.height, bottom: hRect.bottom, classes: header.className },
        section: { top: oRect.top, paddingTop: window.getComputedStyle(offresSec).paddingTop },
        wrapperPaddingTop: window.getComputedStyle(offresSec.parentElement).paddingTop,
        title: { top: tRect.top, height: tRect.height },
        card: cRect ? { top: cRect.top, height: cRect.height } : null
      };
    })()`,
    returnByValue: true
  });
  console.log("Dark theme layout:", JSON.stringify(darkInfo.result.result.value, null, 2));

  // Screenshot Dark
  const ssDark = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/offres_dark_initial.png', Buffer.from(ssDark.result.data, 'base64'));

  // Switch to light theme
  await send('Runtime.evaluate', {
    expression: `(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('room241-theme', 'light');
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  const lightInfo = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('header');
      const hRect = header.getBoundingClientRect();
      const offresSec = document.querySelector('#offres');
      const oRect = offresSec.getBoundingClientRect();
      const title = offresSec.querySelector('h2');
      const tRect = title.getBoundingClientRect();
      return {
        theme: document.documentElement.className,
        header: { top: hRect.top, height: hRect.height, bottom: hRect.bottom, classes: header.className },
        title: { top: tRect.top, height: tRect.height }
      };
    })()`,
    returnByValue: true
  });
  console.log("Light theme layout:", JSON.stringify(lightInfo.result.result.value, null, 2));

  // Screenshot Light
  const ssLight = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/offres_light_initial.png', Buffer.from(ssLight.result.data, 'base64'));

  // Also test scrolled state in dark & light
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 150);` });
  await new Promise(r => setTimeout(r, 400));

  const ssScrolledLight = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/offres_scrolled_light.png', Buffer.from(ssScrolledLight.result.data, 'base64'));

  await send('Runtime.evaluate', {
    expression: `(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('room241-theme', 'dark');
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  const ssScrolledDark = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/offres_scrolled_dark.png', Buffer.from(ssScrolledDark.result.data, 'base64'));

  edge.kill();
  console.log("Test finished.");
}

main().catch(console.error);
