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

    // 1. TEST HERO DISTORTION (Accueil)
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 1500));

    // Dismiss cookies to avoid banner interference
    await send('Runtime.evaluate', {
      expression: `(() => {
        const b = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Accepter'));
        if (b) b.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 400));

    const heroBox = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        const r = c.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
      })()`,
      returnByValue: true
    });
    const hb = heroBox.result.result.value;
    console.log('Hero Canvas Box:', hb);

    // Hero at rest
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
    await new Promise(r => setTimeout(r, 500));
    const sHeroRest = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_hero_rest.png'), Buffer.from(sHeroRest.result.data, 'base64'));

    // Move cursor across Hero with fluid strokes
    const cx = hb.left + hb.width * 0.5;
    const cy = hb.top + hb.height * 0.5;
    for (let i = 0; i < 25; i++) {
      const t = i / 24;
      const angle = t * Math.PI * 2;
      const x = cx + Math.cos(angle) * (hb.width * 0.3);
      const y = cy + Math.sin(angle) * (hb.height * 0.25);
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
      await new Promise(r => setTimeout(r, 20));
    }

    // Capture during active fluid distortion
    const sHeroMotion = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_hero_motion.png'), Buffer.from(sHeroMotion.result.data, 'base64'));

    // Return to rest
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
    await new Promise(r => setTimeout(r, 1200));
    const sHeroReturn = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_hero_return.png'), Buffer.from(sHeroReturn.result.data, 'base64'));

    console.log('Hero test complete. Navigating to Resin case study...');

    // 2. TEST CASE STUDY PHOTO DISTORTION
    await send('Page.navigate', { url: 'http://localhost:3000/realisations/resin-architecte' });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll to the main craft stage image
    await send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 950);'
    });
    await new Promise(r => setTimeout(r, 600));

    const caseBox = await send('Runtime.evaluate', {
      expression: `(() => {
        const c = document.querySelector('canvas');
        if (!c) return null;
        const r = c.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
      })()`,
      returnByValue: true
    });
    const cb = caseBox.result.result.value;
    console.log('Case Study Canvas Box:', cb);

    // Case study at rest
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
    await new Promise(r => setTimeout(r, 500));
    const sCaseRest = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_resin_rest.png'), Buffer.from(sCaseRest.result.data, 'base64'));

    // Move cursor across case study photograph
    const ccx = cb.left + cb.width * 0.5;
    const ccy = cb.top + cb.height * 0.45;
    for (let i = 0; i < 25; i++) {
      const t = i / 24;
      const x = cb.left + cb.width * (0.2 + 0.6 * t);
      const y = ccy + Math.sin(t * Math.PI) * (cb.height * 0.2);
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
      await new Promise(r => setTimeout(r, 20));
    }

    // Capture during active motion on case study
    const sCaseMotion = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_resin_motion.png'), Buffer.from(sCaseMotion.result.data, 'base64'));

    console.log('Case study test complete.');
    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    edge.kill();
  }
}

run();
