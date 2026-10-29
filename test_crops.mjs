import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\bertu\\.gemini\\antigravity\\brain\\299bcbae-2faa-455e-bf92-9db6c31028d9';

async function testCrops() {
  const edge = spawn(EDGE_PATH, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--no-sandbox',
    '--window-size=1440,1100',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const res = await fetch('http://127.0.0.1:9222/json');
  const list = await res.json();
  const page = list.find(t => t.type === 'page');
  const wsUrl = page.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise(resolve => {
      const currentId = id++;
      pending.set(currentId, resolve);
      ws.send(JSON.stringify({ id: currentId, method, params }));
    });
  }

  await send('Page.enable');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 30px; background: #09090b; font-family: sans-serif; color: white; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .card { background: #18181b; padding: 14px; border-radius: 16px; }
        .container { position: relative; overflow: hidden; border-radius: 12px; background: black; }
        img { display: block; width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <h2>Comparatif Cadrages Rapprochés de Captain Security</h2>
      <div class="grid">
        <div class="card">
          <h4>Option 1 : 4:3 (paysage) - zoom 2.0</h4>
          <div class="container" style="aspect-ratio: 4/3;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg"
                 style="object-fit: cover; object-position: center 54%; transform: scale(2.0); transform-origin: center 54%;">
          </div>
        </div>

        <div class="card">
          <h4>Option 2 : 4:3 (paysage) - zoom 1.85</h4>
          <div class="container" style="aspect-ratio: 4/3;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg"
                 style="object-fit: cover; object-position: center 55%; transform: scale(1.85); transform-origin: center 55%;">
          </div>
        </div>

        <div class="card">
          <h4>Option 3 : 1:1 (carré) - zoom 1.95</h4>
          <div class="container" style="aspect-ratio: 1/1;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg"
                 style="object-fit: cover; object-position: center 54%; transform: scale(1.95); transform-origin: center 54%;">
          </div>
        </div>

        <div class="card">
          <h4>Option 4 : 4:5 (portrait) - zoom 1.9</h4>
          <div class="container" style="aspect-ratio: 4/5;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg"
                 style="object-fit: cover; object-position: center 54%; transform: scale(1.9); transform-origin: center 54%;">
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await send('Page.setDocumentContent', { frameId: (await send('Page.getFrameTree')).frameTree.frame.id, html });
  await new Promise(r => setTimeout(r, 1200));

  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}\\test_captain_zooms.png`, Buffer.from(data, 'base64'));
  console.log('Saved test_captain_zooms.png');

  ws.close();
  edge.kill();
}

testCrops().catch(console.error);
