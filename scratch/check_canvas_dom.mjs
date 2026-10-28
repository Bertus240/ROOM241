import { spawn } from 'child_process';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9297',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function check() {
  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch('http://127.0.0.1:9297/json');
    const targets = await res.json();
    const page = targets.find(t => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    const send = (method, params = {}) => new Promise(r => {
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

    await send('Runtime.enable');
    await send('Page.enable');

    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 2000));

    const result = await send('Runtime.evaluate', {
      expression: `(() => {
        const canvases = Array.from(document.querySelectorAll('canvas'));
        const images = Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, className: i.className }));
        const fluidContainers = Array.from(document.querySelectorAll('[class*="Fluid"], [style*="aspect-ratio"]'));
        return {
          canvasCount: canvases.length,
          canvases: canvases.map(c => ({
            width: c.width,
            height: c.height,
            clientWidth: c.clientWidth,
            clientHeight: c.clientHeight,
            rect: c.getBoundingClientRect()
          })),
          images,
          consoleLogsCount: window.__logs || 0
        };
      })()`,
      returnByValue: true
    });

    console.log('Result:', JSON.stringify(result.result.value, null, 2));
    console.log('Console Logs captured:', JSON.stringify(consoleLogs, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}
check();
