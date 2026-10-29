import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\bertu\\.gemini\\antigravity\\brain\\299bcbae-2faa-455e-bf92-9db6c31028d9';

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { background: #09090B; color: white; font-family: sans-serif; padding: 24px; margin: 0; }
    h2 { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #F4F4F5; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .card { background: #18181B; border: 1px solid #27272A; border-radius: 16px; padding: 12px; }
    .title { font-size: 11px; font-weight: 600; margin-bottom: 8px; color: #FFAD00; }
    .container {
      width: 100%;
      aspect-ratio: 4/5;
      border-radius: 12px;
      overflow: hidden;
      background: #000;
      position: relative;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
</head>
<body>
  <h2>ROOM241 — Comparatif Cadrage Captain Security (captain.jpeg)</h2>
  <div class="grid">
    <!-- Test 1: Actuel scale 1.68 / center 54% -->
    <div class="card">
      <div class="title">1. Actuel (scale 1.68, center 54%)</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 54%; transform: scale(1.68); transform-origin: center 54%;" />
      </div>
    </div>

    <!-- Test 2: scale 1.95 / center 57% -->
    <div class="card">
      <div class="title">2. scale 1.95, center 57%</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 57%; transform: scale(1.95); transform-origin: center 57%;" />
      </div>
    </div>

    <!-- Test 3: scale 2.15 / center 56% -->
    <div class="card">
      <div class="title">3. scale 2.15, center 56%</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 56%; transform: scale(2.15); transform-origin: center 56%;" />
      </div>
    </div>

    <!-- Test 4: scale 2.3 / center 56% -->
    <div class="card">
      <div class="title">4. scale 2.3, center 56%</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 56%; transform: scale(2.3); transform-origin: center 56%;" />
      </div>
    </div>

    <!-- Test 5: scale 2.05 / center 58% -->
    <div class="card">
      <div class="title">5. scale 2.05, center 58%</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 58%; transform: scale(2.05); transform-origin: center 58%;" />
      </div>
    </div>

    <!-- Test 6: scale 2.1 / center 59% -->
    <div class="card">
      <div class="title">6. scale 2.1, center 59%</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 59%; transform: scale(2.1); transform-origin: center 59%;" />
      </div>
    </div>

    <!-- Test 7: scale 2.2 / center 58% -->
    <div class="card">
      <div class="title">7. scale 2.2, center 58%</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 58%; transform: scale(2.2); transform-origin: center 58%;" />
      </div>
    </div>

    <!-- Test 8: scale 2.4 / center 58% -->
    <div class="card">
      <div class="title">8. scale 2.4, center 58%</div>
      <div class="container">
        <img src="http://localhost:3000/assets/hornetsecurity/fic/Capain/captain.jpeg" style="object-position: center 58%; transform: scale(2.4); transform-origin: center 58%;" />
      </div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('C:/ROOM241/temp_captain_test.html', htmlContent);

async function testCrops() {
  const edge = spawn(EDGE_PATH, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9223',
    '--no-sandbox',
    '--window-size=1400,1050',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const res = await fetch('http://127.0.0.1:9223/json');
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
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Page.navigate', { url: 'file:///C:/ROOM241/temp_captain_test.html' });
  await new Promise(r => setTimeout(r, 1500));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/captain_crop_grid_comparison.png`, Buffer.from(shot.data, 'base64'));
  console.log('Comparison grid saved to ARTIFACT_DIR/captain_crop_grid_comparison.png');

  ws.close();
  edge.kill();
  try { fs.unlinkSync('C:/ROOM241/temp_captain_test.html'); } catch (e) {}
}

testCrops().catch(console.error);
