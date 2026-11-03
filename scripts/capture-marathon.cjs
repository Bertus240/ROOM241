// scripts/capture-marathon.cjs
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const PORT = 5179;
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

function capture(name, pathUrl, width, height) {
  return new Promise((resolve, reject) => {
    const outFile = path.join(ARTIFACT_DIR, `capture_${name}.png`);
    const targetUrl = `http://127.0.0.1:${PORT}${pathUrl}`;
    const tmpProfile = path.join(os.tmpdir(), `edge_snap_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);

    const args = [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      `--window-size=${width},${height}`,
      `--user-data-dir=${tmpProfile}`,
      `--screenshot=${outFile}`,
      targetUrl,
    ];

    console.log(`Lancement capture ${name}...`);
    const proc = spawn(EDGE_BIN, args);

    const timer = setTimeout(() => {
      proc.kill();
      try { fs.rmSync(tmpProfile, { recursive: true, force: true }); } catch (e) {}
      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
        resolve(outFile);
      } else {
        reject(new Error(`Timeout sur ${name}`));
      }
    }, 15000);

    proc.on('exit', (code) => {
      clearTimeout(timer);
      setTimeout(() => {
        try { fs.rmSync(tmpProfile, { recursive: true, force: true }); } catch (e) {}
        if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
          const stats = fs.statSync(outFile);
          console.log(`[OK] ${name} (${width}x${height}) -> ${stats.size} octets`);
          resolve(outFile);
        } else {
          reject(new Error(`Fichier non généré pour ${name} (exit ${code})`));
        }
      }, 800);
    });
  });
}

server.listen(PORT, async () => {
  console.log(`Serveur local prêt sur http://127.0.0.1:${PORT}`);
  try {
    await capture('marathon_perso_desktop', '/hors-cadre', 1440, 5200);
    await capture('marathon_perso_mobile', '/hors-cadre', 390, 6800);
  } catch (err) {
    console.error('Erreur de capture :', err.message);
  } finally {
    server.close(() => {
      console.log('Serveur fermé.');
      process.exit(0);
    });
  }
});
