import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity-ide/brain/14f048b5-e898-4a14-ae9c-52c4fd3ac358';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9277',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000/realisations/resin-architecte'
], { stdio: 'ignore' });

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9277/json');
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

  // Dismiss cookie banner
  await send('Runtime.evaluate', {
    expression: `(() => {
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Accepter'));
      if (b) b.click();
    })()`
  });

  await new Promise(r => setTimeout(r, 600));

  // Scroll to panoramic stats
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 1100, behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 800));
  const ss1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'validation_resin_panoramic_stats.png'), Buffer.from(ss1.result.data, 'base64'));

  // Scroll directly to proof gallery
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = Array.from(document.querySelectorAll('span')).find(s => s.textContent.includes('Pièces justificatives'));
      if (el) el.scrollIntoView({ block: 'start' });
      else window.scrollTo({ top: 3200, behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  const ss2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'validation_resin_proof_gallery.png'), Buffer.from(ss2.result.data, 'base64'));

  // Navigate to Fresh Data
  await send('Page.navigate', { url: 'http://localhost:3000/realisations/fresh-data' });
  await new Promise(r => setTimeout(r, 1200));
  await send('Runtime.evaluate', { expression: `window.scrollTo({ top: 550, behavior: 'instant' });` });
  await new Promise(r => setTimeout(r, 800));
  const ssFD = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'validation_freshdata_scrolled_desktop.png'), Buffer.from(ssFD.result.data, 'base64'));

  console.log('Captured proof gallery and Fresh Data cinema stage!');
  edge.kill();
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  edge.kill();
  process.exit(1);
});
