import { spawn } from 'child_process';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9224/json');
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

  const check = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvases = document.querySelectorAll('canvas');
      return Array.from(canvases).map((c, i) => {
        const r = c.getBoundingClientRect();
        return {
          index: i,
          width: c.width,
          height: c.height,
          clientWidth: c.clientWidth,
          clientHeight: c.clientHeight,
          rect: { top: r.top, left: r.left, width: r.width, height: r.height },
          parentElement: c.parentElement?.tagName,
          parentClass: c.parentElement?.className
        };
      });
    })()`,
    returnByValue: true
  });
  console.log("Canvas status:", JSON.stringify(check.result?.result?.value, null, 2));

  // Let's check what element is at the center of the canvas!
  const hitTest = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvases = document.querySelectorAll('canvas');
      return Array.from(canvases).map((c, i) => {
        c.scrollIntoView({ block: 'center' });
        const r = c.getBoundingClientRect();
        const centerX = r.left + r.width / 2;
        const centerY = r.top + r.height / 2;
        const topEl = document.elementFromPoint(centerX, centerY);
        return {
          canvasIndex: i,
          viewport: { w: window.innerWidth, h: window.innerHeight },
          centerX,
          centerY,
          topElementTag: topEl?.tagName,
          topElementId: topEl?.id,
          topElementClass: topEl?.className,
          topElementOuter: topEl?.outerHTML?.slice(0, 300),
          isCanvas: topEl === c,
          isInsideContainer: c.parentElement?.contains(topEl)
        };
      });
    })()`,
    returnByValue: true
  });
  console.log("Hit test (elementFromPoint):", JSON.stringify(hitTest.result?.result?.value, null, 2));

  edge.kill();
}

main().catch(console.error);
