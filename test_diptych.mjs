import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\bertu\\.gemini\\antigravity\\brain\\299bcbae-2faa-455e-bf92-9db6c31028d9';

async function testDiptych() {
  const edge = spawn(EDGE_PATH, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--no-sandbox',
    '--window-size=1440,1000',
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
        body { margin: 0; padding: 40px; background: #ffffff; font-family: -apple-system, sans-serif; color: #09090b; }
        .card { background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 24px; padding: 32px; max-width: 1200px; margin: 0 auto; }
        .grid-asym { display: grid; grid-template-columns: 7fr 5fr; gap: 24px; align-items: center; }
        .grid-equal { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }
        .cont { position: relative; overflow: hidden; border-radius: 16px; border: 1px solid #e4e4e7; background: #09090b; }
        img { display: block; width: 100%; height: 100%; object-fit: cover; }
        h3 { font-size: 20px; font-weight: 800; margin: 0 0 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h3>Version Test A : Grille 7/12 et 5/12 — Ratio Portrait optimisé pour Captain Security</h3>
        <div class="grid-asym">
          <div class="cont" style="aspect-ratio: 16/11;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain2.jpg" style="object-position: center 35%;">
          </div>
          <div class="cont" style="aspect-ratio: 4/5;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg"
                 style="object-position: center 54%; transform: scale(1.68); transform-origin: center 54%;">
          </div>
        </div>
      </div>

      <div class="card" style="margin-top: 32px;">
        <h3>Version Test B : Grille 1fr 1fr — Même hauteur 400px</h3>
        <div class="grid-equal">
          <div class="cont" style="height: 400px;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain2.jpg" style="object-position: center 35%;">
          </div>
          <div class="cont" style="height: 400px;">
            <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg"
                 style="object-position: center 54%; transform: scale(1.75); transform-origin: center 54%;">
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await send('Page.setDocumentContent', { frameId: (await send('Page.getFrameTree')).frameTree.frame.id, html });
  await new Promise(r => setTimeout(r, 1200));

  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}\\test_diptych_comparison.png`, Buffer.from(data, 'base64'));
  console.log('Saved test_diptych_comparison.png');

  ws.close();
  edge.kill();
}

testDiptych().catch(console.error);
