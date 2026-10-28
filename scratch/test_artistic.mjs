import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9229/json');
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

  // Let's get both canvases (Hero and CaseStudies)
  const canvasInfo = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvases = document.querySelectorAll('canvas');
      return Array.from(canvases).map((c, i) => {
        c.scrollIntoView({ block: 'center' });
        const r = c.getBoundingClientRect();
        return {
          index: i,
          x: Math.round(r.left + r.width / 2),
          y: Math.round(r.top + r.height / 2),
          left: Math.round(r.left),
          top: Math.round(r.top),
          width: Math.round(r.width),
          height: Math.round(r.height)
        };
      });
    })()`,
    returnByValue: true
  });

  const [heroCanvas, caseCanvas] = canvasInfo.result.result.value;
  console.log("Hero Canvas:", heroCanvas);
  console.log("Case Canvas:", caseCanvas);

  // 1. TEST HERO CANVAS
  console.log("Testing Hero canvas deformation...");
  await send('Runtime.evaluate', { expression: `document.querySelectorAll('canvas')[0].scrollIntoView({ block: 'center' })` });
  await new Promise(r => setTimeout(r, 400));
  
  // Re-read rect after scroll
  const hRect = (await send('Runtime.evaluate', {
    expression: `(() => { const r = document.querySelectorAll('canvas')[0].getBoundingClientRect(); return { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2), left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) }; })()`,
    returnByValue: true
  })).result.result.value;

  // Screenshot before hover
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
  await new Promise(r => setTimeout(r, 400));
  const ssHeroBefore = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: hRect.left, y: hRect.top, width: hRect.width, height: hRect.height, scale: 1 }
  });
  fs.writeFileSync('scratch/hero_before.png', Buffer.from(ssHeroBefore.result.data, 'base64'));

  // Move mouse back and forth across hero image
  for (let step = 0; step < 15; step++) {
    const mx = hRect.left + 50 + step * 25;
    const my = hRect.top + 150 + Math.sin(step) * 50;
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mx, y: my });
    await new Promise(r => setTimeout(r, 30));
  }

  // Screenshot during movement
  const ssHeroDuring = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: hRect.left, y: hRect.top, width: hRect.width, height: hRect.height, scale: 1 }
  });
  fs.writeFileSync('scratch/hero_during.png', Buffer.from(ssHeroDuring.result.data, 'base64'));

  // 2. TEST CASE STUDIES CANVAS
  console.log("Testing Case Studies canvas deformation...");
  await send('Runtime.evaluate', { expression: `document.querySelectorAll('canvas')[1].scrollIntoView({ block: 'center' })` });
  await new Promise(r => setTimeout(r, 400));
  
  const cRect = (await send('Runtime.evaluate', {
    expression: `(() => { const r = document.querySelectorAll('canvas')[1].getBoundingClientRect(); return { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2), left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) }; })()`,
    returnByValue: true
  })).result.result.value;

  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
  await new Promise(r => setTimeout(r, 400));
  const ssCaseBefore = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: cRect.left, y: cRect.top, width: cRect.width, height: cRect.height, scale: 1 }
  });
  fs.writeFileSync('scratch/case_before.png', Buffer.from(ssCaseBefore.result.data, 'base64'));

  for (let step = 0; step < 15; step++) {
    const mx = cRect.left + 80 + step * 35;
    const my = cRect.top + 120 + Math.sin(step) * 40;
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mx, y: my });
    await new Promise(r => setTimeout(r, 30));
  }

  const ssCaseDuring = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: cRect.left, y: cRect.top, width: cRect.width, height: cRect.height, scale: 1 }
  });
  fs.writeFileSync('scratch/case_during.png', Buffer.from(ssCaseDuring.result.data, 'base64'));

  console.log("Screenshots captured successfully in scratch/!");
  edge.kill();
}

main().catch(console.error);
