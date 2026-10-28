import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity-ide/brain/14f048b5-e898-4a14-ae9c-52c4fd3ac358';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9290',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9290/json');
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

  // Force Light mode
  await send('Runtime.evaluate', {
    expression: `(() => {
      localStorage.setItem('room241_theme', 'light');
      document.documentElement.classList.remove('dark');
      const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Accepter'));
      if (b) b.click();
    })()`
  });

  const routes = [
    { url: 'http://localhost:3000/', name: 'accueil_light' },
    { url: 'http://localhost:3000/realisations', name: 'portfolio_light' },
    { url: 'http://localhost:3000/realisations/resin-architecte', name: 'resin_detail_light' },
    { url: 'http://localhost:3000/approche', name: 'approche_light' },
    { url: 'http://localhost:3000/offres', name: 'offres_light' },
    { url: 'http://localhost:3000/contact', name: 'contact_light' }
  ];

  for (const r of routes) {
    await send('Page.navigate', { url: r.url });
    await new Promise(res => setTimeout(res, 1200));
    await send('Runtime.evaluate', {
      expression: `(() => {
        document.documentElement.classList.remove('dark');
        const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Accepter'));
        if (b) b.click();
      })()`
    });
    await new Promise(res => setTimeout(res, 600));

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, `audit_${r.name}.png`), Buffer.from(ss.result.data, 'base64'));
    console.log(`Saved audit_${r.name}.png`);
  }

  edge.kill();
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  edge.kill();
  process.exit(1);
});
