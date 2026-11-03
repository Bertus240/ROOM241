// scripts/capture-cards.cjs
// Script de capture visuelle automatisée pour Desktop, Tablette et Mobile
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity/brain/299bcbae-2faa-455e-bf92-9db6c31028d9';
const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://127.0.0.1:5173';

const captures = [
  { name: 'home_cards_desktop', path: '/', width: 1440, height: 900 },
  { name: 'home_cards_tablet', path: '/', width: 768, height: 1024 },
  { name: 'home_cards_mobile', path: '/', width: 390, height: 844 },
  { name: 'gallery_cards_desktop', path: '/projets', width: 1440, height: 900 },
  { name: 'gallery_cards_tablet', path: '/projets', width: 768, height: 1024 },
  { name: 'gallery_cards_mobile', path: '/projets', width: 390, height: 844 },
  { name: 'gallery_cards_small_mobile', path: '/projets', width: 320, height: 640 },
];

function captureOne(c) {
  return new Promise((resolve, reject) => {
    const outFile = path.join(ARTIFACT_DIR, `capture_${c.name}.png`);
    const targetUrl = `${BASE_URL}${c.path}`;
    const tmpProfile = path.join(os.tmpdir(), `edge_cards_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);

    const args = [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      `--window-size=${c.width},${c.height}`,
      `--user-data-dir=${tmpProfile}`,
      `--screenshot=${outFile}`,
      targetUrl
    ];

    const proc = spawn(EDGE_BIN, args);
    const timeout = setTimeout(() => {
      proc.kill();
      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
        resolve(outFile);
      } else {
        reject(new Error(`Timeout on ${c.name}`));
      }
    }, 12000);

    proc.on('exit', () => {
      clearTimeout(timeout);
      setTimeout(() => {
        try { fs.rmSync(tmpProfile, { recursive: true, force: true }); } catch (e) {}
        if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
          const stats = fs.statSync(outFile);
          console.log(`[CAPTURE OK] ${c.name} (${c.width}x${c.height}) -> ${stats.size} bytes`);
          resolve(outFile);
        } else {
          reject(new Error(`File not generated for ${c.name}`));
        }
      }, 500);
    });
  });
}

async function run() {
  console.log('Lancement des captures visuelles...');
  for (const c of captures) {
    try {
      await captureOne(c);
    } catch (err) {
      console.error(`Erreur sur ${c.name} :`, err.message);
    }
  }
  console.log('Toutes les captures sont terminées.');
}

run();

