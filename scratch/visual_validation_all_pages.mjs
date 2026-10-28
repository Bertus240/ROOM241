import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity-ide/brain/14f048b5-e898-4a14-ae9c-52c4fd3ac358';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9255',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function run() {
  console.log('Starting Edge CDP session on port 9255...');
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9255/json');
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
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  const pagesToTest = [
    { url: 'http://localhost:3000/', name: 'accueil' },
    { url: 'http://localhost:3000/realisations', name: 'portfolio' },
    { url: 'http://localhost:3000/realisations/resin-architecte', name: 'resin_detail' },
    { url: 'http://localhost:3000/realisations/fresh-data', name: 'freshdata_detail' },
    { url: 'http://localhost:3000/approche', name: 'approche' },
    { url: 'http://localhost:3000/offres', name: 'offres' },
    { url: 'http://localhost:3000/contact', name: 'contact' },
  ];

  for (const p of pagesToTest) {
    console.log(`Navigating to ${p.url} (Desktop 1440x900)...`);
    await send('Page.navigate', { url: p.url });
    await new Promise(r => setTimeout(r, 1500));

    // Wait for images and layout
    await send('Runtime.evaluate', {
      expression: `new Promise((resolve) => {
        const imgs = Array.from(document.images);
        let pending = imgs.filter(img => !img.complete).length;
        if (pending === 0) resolve();
        imgs.forEach(img => {
          if (!img.complete) {
            img.onload = img.onerror = () => {
              pending--;
              if (pending === 0) resolve();
            };
          }
        });
        setTimeout(resolve, 1000);
      })`,
      awaitPromise: true
    });

    // Capture Above The Fold
    const ssDesktop = await send('Page.captureScreenshot', { format: 'png' });
    const outDesktop = path.join(ARTIFACT_DIR, `validation_${p.name}_desktop.png`);
    fs.writeFileSync(outDesktop, Buffer.from(ssDesktop.result.data, 'base64'));
    console.log(`Saved ${outDesktop}`);

    // If detail page or home, also capture scrolled view to see the media in context
    if (p.name === 'resin_detail' || p.name === 'accueil' || p.name === 'portfolio') {
      await send('Runtime.evaluate', {
        expression: `window.scrollBy({ top: 600, behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, 800));
      const ssScrolled = await send('Page.captureScreenshot', { format: 'png' });
      const outScrolled = path.join(ARTIFACT_DIR, `validation_${p.name}_scrolled_desktop.png`);
      fs.writeFileSync(outScrolled, Buffer.from(ssScrolled.result.data, 'base64'));
      console.log(`Saved ${outScrolled}`);
    }
  }

  // Mobile testing (390x844 iPhone 14 / modern smartphone)
  console.log('Testing Mobile Viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  const mobilePages = [
    { url: 'http://localhost:3000/', name: 'accueil' },
    { url: 'http://localhost:3000/realisations', name: 'portfolio' },
    { url: 'http://localhost:3000/realisations/resin-architecte', name: 'resin_detail' },
  ];

  for (const p of mobilePages) {
    console.log(`Navigating to ${p.url} (Mobile 390x844)...`);
    await send('Page.navigate', { url: p.url });
    await new Promise(r => setTimeout(r, 1500));

    const ssMobile = await send('Page.captureScreenshot', { format: 'png' });
    const outMobile = path.join(ARTIFACT_DIR, `validation_${p.name}_mobile.png`);
    fs.writeFileSync(outMobile, Buffer.from(ssMobile.result.data, 'base64'));
    console.log(`Saved ${outMobile}`);
  }

  console.log('All validation screenshots captured successfully!');
  edge.kill();
  process.exit(0);
}

run().catch((err) => {
  console.error('Error during validation script:', err);
  edge.kill();
  process.exit(1);
});
