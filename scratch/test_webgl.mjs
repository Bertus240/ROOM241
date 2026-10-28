import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function run() {
  console.log("Starting Edge headless with remote debugging on port 9222...");
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu-sandbox',
    '--no-sandbox',
    '--hide-scrollbars',
    '--window-size=1440,900',
    'http://localhost:3000'
  ], { stdio: 'ignore' });

  // Wait for 9222 to be ready
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9222/json');
      targets = await res.json();
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }

  if (!targets || targets.length === 0) {
    console.error("Failed to connect to Edge remote debugging.");
    edge.kill();
    return;
  }

  const pageTarget = targets.find(t => t.type === 'page');
  console.log("Connected to page target:", pageTarget.title, pageTarget.url);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
    if (data.method === 'Runtime.consoleAPICalled') {
      console.log('[BROWSER CONSOLE]', data.params.type, data.params.args.map(a => a.value || a.description).join(' '));
    }
    if (data.method === 'Runtime.exceptionThrown') {
      console.error('[BROWSER EXCEPTION]', data.params.exceptionDetails);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await new Promise(r => ws.onopen = r);
  console.log("WebSocket connected. Enabling domains...");
  await send('Runtime.enable');
  await send('Page.enable');
  await send('DOM.enable');

  // Wait 2 seconds for Three.js texture loading & initialization
  await new Promise(r => setTimeout(r, 2000));

  // Evaluate DOM and WebGL state
  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvases = Array.from(document.querySelectorAll('canvas'));
      return {
        canvasCount: canvases.length,
        canvases: canvases.map(c => {
          const rect = c.getBoundingClientRect();
          const gl = c.getContext('webgl') || c.getContext('experimental-webgl') || c.getContext('webgl2');
          return {
            width: c.width,
            height: c.height,
            clientWidth: c.clientWidth,
            clientHeight: c.clientHeight,
            rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            hasGL: !!gl,
            glError: gl ? gl.getError() : 'no gl',
            parentHtml: c.parentElement ? c.parentElement.outerHTML.slice(0, 200) : 'none'
          };
        }),
        images: Array.from(document.querySelectorAll('img[src*="overview_posts"]')).map(img => img.src)
      };
    })()`,
    returnByValue: true
  });

  console.log("Page inspection result:", JSON.stringify(evalRes.result?.value, null, 2));

  // Let's simulate pointer movements over the first canvas
  const rectRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const c = document.querySelector('canvas');
      if (!c) return null;
      const r = c.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, left: r.left, top: r.top, width: r.width, height: r.height };
    })()`,
    returnByValue: true
  });

  const rect = rectRes.result?.value;
  if (rect) {
    console.log("Dispatching mouse movements on canvas at:", rect);
    // Dispatch Input.dispatchMouseEvent
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: rect.x,
      y: rect.y
    });

    // Move in circles
    for (let angle = 0; angle < Math.PI * 2; angle += 0.5) {
      const mx = rect.x + Math.cos(angle) * 80;
      const my = rect.y + Math.sin(angle) * 80;
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: mx,
        y: my
      });
      await new Promise(r => setTimeout(r, 50));
    }
  }

  // Take screenshot
  const ss = await send('Page.captureScreenshot', { format: 'png' });
  if (ss.result?.data) {
    fs.writeFileSync('scratch/screenshot.png', Buffer.from(ss.result.data, 'base64'));
    console.log("Saved scratch/screenshot.png");
  }

  ws.close();
  edge.kill();
  console.log("Done.");
}

run().catch(console.error);
