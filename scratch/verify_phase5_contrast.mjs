import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity-ide/brain/14f048b5-e898-4a14-ae9c-52c4fd3ac358';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9292',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function run() {
  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch('http://127.0.0.1:9292/json');
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

    const tests = [
      { url: 'http://localhost:3000/', theme: 'light', name: 'verify_hero_light.png' },
      { url: 'http://localhost:3000/', theme: 'dark', name: 'verify_hero_dark.png' },
      { url: 'http://localhost:3000/realisations/resin-architecte', theme: 'light', name: 'verify_resin_light.png' },
      { url: 'http://localhost:3000/realisations/resin-architecte', theme: 'dark', name: 'verify_resin_dark.png' },
      { url: 'http://localhost:3000/realisations', theme: 'light', name: 'verify_portfolio_light.png' },
      { url: 'http://localhost:3000/offres', theme: 'light', name: 'verify_offres_light.png' },
      { url: 'http://localhost:3000/contact', theme: 'light', name: 'verify_contact_light.png' },
    ];

    for (const t of tests) {
      await send('Page.navigate', { url: t.url });
      await new Promise(r => setTimeout(r, 1200));

      await send('Runtime.evaluate', {
        expression: `(() => {
          if ('${t.theme}' === 'light') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('room241_theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('room241_theme', 'dark');
          }
          const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Accepter'));
          if (b) b.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 600));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(screenshot.result.data, 'base64');
      fs.writeFileSync(path.join(ARTIFACT_DIR, t.name), buffer);
      console.log(`Saved ${t.name}`);
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edge.kill();
  }
}

run();
