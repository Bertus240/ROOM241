import http from 'http';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity/brain/299bcbae-2faa-455e-bf92-9db6c31028d9';

function sendCDP(wsUrl, method, params = {}) {
  return new Promise((resolve, reject) => {
    const WebSocket = globalThis.WebSocket;
    const ws = new WebSocket(wsUrl);
    const id = Math.floor(Math.random() * 100000);
    
    ws.onopen = () => {
      ws.send(JSON.stringify({ id, method, params }));
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === id) {
        ws.close();
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };
    
    ws.onerror = (err) => reject(err);
  });
}

function getTabs() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('Connecting to Edge CDP...');
  const tabs = await getTabs();
  const pageTab = tabs.find(t => t.type === 'page' && (t.url.includes('localhost:3000') || t.url.includes('about:blank')));
  if (!pageTab) {
    console.error('No tab found');
    return;
  }
  const wsUrl = pageTab.webSocketDebuggerUrl;

  async function evaluate(expression) {
    return await sendCDP(wsUrl, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  }

  async function setViewport(width, height, mobile = false) {
    await sendCDP(wsUrl, 'Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile
    });
  }

  async function takeScreenshot(filename, clip = null) {
    const params = { format: 'png' };
    if (clip) params.clip = clip;
    const res = await sendCDP(wsUrl, 'Page.captureScreenshot', params);
    const filePath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Desktop 1440x900 - Accueil
  await setViewport(1440, 900, false);
  await evaluate(`window.location.href = 'http://localhost:3000/'`);
  await sleep(2500);

  // Vérifier Kuro au repos (fermer bulle si ouverte pour inspecter le regard neutre au repos)
  await evaluate(`
    (() => {
      // Forcer la fermeture de la bulle pour observer l'expression au repos
      const closeBtn = document.querySelector('button[aria-label="Fermer la bulle de dialogue"]');
      if (closeBtn) closeBtn.click();
    })()
  `);
  await sleep(600);
  await takeScreenshot('kuro_global_resting_neutral_1440.png');

  // Zoom sur la capsule au repos pour vérifier la sclérotique blanche, pupille noire, éclat et absence de sourire
  const capsuleClip = await evaluate(`
    (() => {
      const el = document.getElementById('kuro-companion');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.max(0, r.x - 20), y: Math.max(0, r.y - 20), width: r.width + 40, height: r.height + 40, scale: 1 };
    })()
  `);
  if (capsuleClip.value) {
    await takeScreenshot('kuro_global_capsule_neutral_zoom.png', capsuleClip.value);
  }

  // Cliquer sur Kuro pour déclencher la bulle d'accueil
  await evaluate(`
    (() => {
      const capsule = document.querySelector('#kuro-companion button[aria-label="Kuro"]');
      if (capsule) capsule.click();
    })()
  `);
  await sleep(1000);
  await takeScreenshot('kuro_global_home_dialogue_1440.png');

  // Zoom sur la bulle glassmorphism accueil
  const bubbleClip = await evaluate(`
    (() => {
      const bubble = document.querySelector('#kuro-companion [role="dialog"]') || document.querySelector('#kuro-companion .backdrop-blur-xl') || document.querySelector('#kuro-companion');
      if (!bubble) return null;
      const r = bubble.getBoundingClientRect();
      return { x: Math.max(0, r.x - 15), y: Math.max(0, r.y - 15), width: r.width + 30, height: r.height + 30, scale: 1 };
    })()
  `);
  if (bubbleClip.value) {
    await takeScreenshot('kuro_global_bubble_zoom.png', bubbleClip.value);
  }

  // 2. Navigation vers /projets
  await evaluate(`
    (() => {
      const btn = Array.from(document.querySelectorAll('#kuro-companion button')).find(b => b.textContent.includes('Voir les projets'));
      if (btn) btn.click();
      else window.location.href = 'http://localhost:3000/projets';
    })()
  `);
  await sleep(2200);
  await takeScreenshot('kuro_global_projets_dialogue_1440.png');

  // 3. Navigation vers Hornetsecurity
  await evaluate(`window.location.href = 'http://localhost:3000/realisations/hornetsecurity'`);
  await sleep(2500);
  await takeScreenshot('kuro_global_hornetsecurity_dialogue_1440.png');

  // 4. Navigation vers Fresh Data
  await evaluate(`window.location.href = 'http://localhost:3000/realisations/fresh-data'`);
  await sleep(2500);
  await takeScreenshot('kuro_global_freshdata_dialogue_1440.png');

  // 5. Navigation vers /parcours
  await evaluate(`window.location.href = 'http://localhost:3000/parcours'`);
  await sleep(2500);
  await takeScreenshot('kuro_global_parcours_dialogue_1440.png');

  // 6. Navigation vers #contact
  await evaluate(`window.location.href = 'http://localhost:3000/#contact'`);
  await sleep(2500);
  await takeScreenshot('kuro_global_contact_dialogue_1440.png');

  // 7. Vue Mobile standard 375x812
  await setViewport(375, 812, true);
  await evaluate(`window.location.href = 'http://localhost:3000/'`);
  await sleep(2200);
  // Ouvrir bulle
  await evaluate(`
    (() => {
      const capsule = document.querySelector('#kuro-companion button[aria-label="Kuro"]');
      if (capsule) capsule.click();
    })()
  `);
  await sleep(800);
  await takeScreenshot('kuro_global_mobile_375.png');

  // 8. Vue Mobile compact 320x650
  await setViewport(320, 650, true);
  await sleep(500);
  await takeScreenshot('kuro_global_mobile_320.png');

  // Reset viewport
  await sendCDP(wsUrl, 'Emulation.clearDeviceMetricsOverride');
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during execution:', err);
  process.exit(1);
});
