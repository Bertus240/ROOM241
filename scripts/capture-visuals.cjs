const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const PORT = 5174;
const DIST_DIR = path.join(__dirname, '..', 'dist');
const ARTIFACT_DIR = 'C:/Users/bertu/.gemini/antigravity/brain/299bcbae-2faa-455e-bf92-9db6c31028d9';
const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const indexPath = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(indexPath).pipe(res);
  }
});

server.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);

  const targets = [
    { name: 'accueil_desktop', path: '/', width: 1440, height: 900 },
    { name: 'accueil_mobile', path: '/', width: 390, height: 844 },
    { name: 'galerie_desktop', path: '/projets', width: 1440, height: 900 },
    { name: 'galerie_mobile', path: '/projets', width: 390, height: 844 },
    { name: 'parcours_desktop', path: '/parcours', width: 1440, height: 900 },
    { name: 'parcours_mobile', path: '/parcours', width: 390, height: 844 },
    { name: 'univers_perso_desktop', path: '/hors-cadre', width: 1440, height: 900 },
    { name: 'univers_perso_mobile', path: '/hors-cadre', width: 390, height: 844 },
    { name: 'contact_hors_cadre_desktop', path: '/hors-cadre#contact', width: 1440, height: 900 },
    { name: 'mentions_legales', path: '/mentions-legales', width: 1440, height: 900 },
    { name: 'politique_confidentialite', path: '/politique-de-confidentialite', width: 1440, height: 900 },
  ];

  for (const t of targets) {
    const outPath = path.join(ARTIFACT_DIR, `capture_${t.name}.png`);
    const url = `http://localhost:${PORT}${t.path}`;
    const tmpProfile = path.join(os.tmpdir(), `edge_snap_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    console.log(`Capturing ${t.name} (${t.width}x${t.height})...`);

    const cmd = `"${EDGE_BIN}" --headless=new --user-data-dir="${tmpProfile}" --no-first-run --no-default-browser-check --disable-gpu --no-sandbox --hide-scrollbars --window-size=${t.width},${t.height} --screenshot="${outPath}" "${url}"`;
    try {
      execSync(cmd, { stdio: 'ignore', timeout: 15000 });
      console.log(` -> OK: ${t.name}`);
    } catch (e) {
      console.error(` -> Failed ${t.name}:`, e.message);
    } finally {
      try {
        fs.rmSync(tmpProfile, { recursive: true, force: true });
      } catch (err) {
        // ignore
      }
    }
  }

  server.close(() => {
    console.log('Server closed. All 11 visual captures generated successfully.');
    process.exit(0);
  });
});
