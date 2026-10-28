import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9226',
  '--window-size=1440,1080',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9226/json');
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

  // Let's inspect Canvas 0
  const test1 = await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelector('canvas');
      if (!c) return { error: 'No canvas' };
      const r = c.getBoundingClientRect();
      const centerX = r.left + r.width / 2;
      const centerY = r.top + r.height / 2;
      const topEl = document.elementFromPoint(centerX, centerY);
      return {
        viewport: { w: window.innerWidth, h: window.innerHeight, scrollY: window.scrollY },
        rect: { top: r.top, left: r.left, bottom: r.bottom, right: r.right, width: r.width, height: r.height },
        centerX,
        centerY,
        topElTag: topEl ? topEl.tagName : null,
        topElClass: topEl ? topEl.className : null,
        isContainer: c.parentElement === topEl,
        isCanvas: c === topEl,
        parentTag: c.parentElement.tagName,
        parentClass: c.parentElement.className
      };
    })()`,
    returnByValue: true
  });
  console.log("Canvas 0 check:", JSON.stringify(test1.result?.result?.value, null, 2));

  // Let's attach pointer listeners directly to container to test if events arrive!
  const listenerRes = await send('Runtime.evaluate', {
    expression: `(() => {
      window.__pointerEventsLog = [];
      const c = document.querySelector('canvas');
      const container = c.parentElement;
      container.addEventListener('pointerenter', (e) => {
        window.__pointerEventsLog.push({ type: 'pointerenter', x: e.clientX, y: e.clientY });
      });
      container.addEventListener('pointermove', (e) => {
        window.__pointerEventsLog.push({ type: 'pointermove', x: e.clientX, y: e.clientY });
      });
      return true;
    })()`,
    returnByValue: true
  });

  // Now dispatch CDP mouse events over canvas 0
  const cRect = test1.result?.result?.value;
  if (cRect && cRect.centerX) {
    console.log("Dispatching mouse moves over center of Canvas 0...");
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: cRect.centerX,
      y: cRect.centerY
    });

    for (let i = 0; i < 5; i++) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: cRect.centerX + i * 10,
        y: cRect.centerY + i * 10
      });
      await new Promise(r => setTimeout(r, 50));
    }

    const eventsLog = await send('Runtime.evaluate', {
      expression: `window.__pointerEventsLog`,
      returnByValue: true
    });
    console.log("Received pointer events:", JSON.stringify(eventsLog.result?.result?.value, null, 2));
  }

  edge.kill();
}

main().catch(console.error);
