// scripts/capture-realisations.cjs
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity/brain/299bcbae-2faa-455e-bf92-9db6c31028d9';
const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://127.0.0.1:5173';

const captures = [
  { name: 'realisation_hornet_desktop_stage', path: '/realisations/hornetsecurity', width: 1440, height: 2200 },
  { name: 'realisation_hornet_mobile_stage', path: '/realisations/hornetsecurity', width: 390, height: 2200 },
  { name: 'realisation_resin_desktop_stage', path: '/realisations/resin-architecte', width: 1440, height: 2200 },
  { name: 'realisation_resin_mobile_stage', path: '/realisations/resin-architecte', width: 390, height: 2200 },
];

function captureOne(c) {
  return new Promise((resolve, reject) => {
    const outFile = path.join(ARTIFACT_DIR, `capture_${c.name}.png`);
    const targetUrl = `${BASE_URL}${c.path}`;
    const tmpProfile = path.join(os.tmpdir(), `edge_real_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);

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
    }, 14000);

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
      }, 600);
    });
  });
}

async function run() {
  console.log('Capture des études de cas Hornetsecurity et Résin\'Architecte...');
  for (const c of captures) {
    try {
      await captureOne(c);
    } catch (err) {
      console.error(`Erreur sur ${c.name} :`, err.message);
    }
  }
  console.log('Captures terminées.');
}

run();
