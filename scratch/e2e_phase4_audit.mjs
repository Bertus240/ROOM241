import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9245',
  '--window-size=1440,900',
  '--disable-gpu-sandbox',
  '--no-sandbox',
  'http://localhost:3000'
], { stdio: 'ignore' });

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://127.0.0.1:9245/json');
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

  const consoleLogs = [];
  ws.addEventListener('message', (e) => {
    const d = JSON.parse(e.data);
    if (d.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(d.params.args.map(a => a.value).join(' '));
    }
  });

  await send('Runtime.enable');
  await send('Page.enable');

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Accept consent to prevent cookie banner from obstructing testing
  await send('Runtime.evaluate', {
    expression: `(() => {
      localStorage.setItem('room241-visitor-choice', JSON.stringify({ choice: 'accepted', timestamp: Date.now() }));
    })()`
  });

  const routes = ['/', '/realisations', '/approche', '/offres', '/contact'];
  const auditResults = {};

  for (const route of routes) {
    console.log(`\n=== Testing Route: ${route} ===`);
    await send('Page.navigate', { url: `http://localhost:3000${route}` });
    await sleep(800);

    // Dark Mode Test
    await send('Runtime.evaluate', {
      expression: `(() => {
        document.documentElement.classList.add('dark');
        localStorage.setItem('room241-theme', 'dark');
      })()`
    });
    await sleep(400);

    const darkMetrics = await send('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('header');
        const hRect = header ? header.getBoundingClientRect() : null;
        const main = document.querySelector('main');
        const firstHeading = main ? main.querySelector('h1, h2') : null;
        const fhRect = firstHeading ? firstHeading.getBoundingClientRect() : null;
        return {
          route: window.location.pathname,
          headerHeight: hRect ? hRect.height : 0,
          firstHeadingTop: fhRect ? fhRect.top : 0,
          gapBetweenHeaderAndHeading: (fhRect && hRect) ? Math.round(fhRect.top - hRect.bottom) : 0,
          hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
        };
      })()`,
      returnByValue: true
    });
    const darkVal = darkMetrics.result.result.value;
    console.log(`[Dark] Route ${route}:`, darkVal);

    const ssDark = await send('Page.captureScreenshot', { format: 'png' });
    const cleanRouteName = route === '/' ? 'home' : route.replace('/', '');
    fs.writeFileSync(`scratch/audit_${cleanRouteName}_dark.png`, Buffer.from(ssDark.result.data, 'base64'));

    // Light Mode Test
    await send('Runtime.evaluate', {
      expression: `(() => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('room241-theme', 'light');
      })()`
    });
    await sleep(400);

    const lightMetrics = await send('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('header');
        const hRect = header ? header.getBoundingClientRect() : null;
        const main = document.querySelector('main');
        const firstHeading = main ? main.querySelector('h1, h2') : null;
        const fhRect = firstHeading ? firstHeading.getBoundingClientRect() : null;
        return {
          route: window.location.pathname,
          headerHeight: hRect ? hRect.height : 0,
          firstHeadingTop: fhRect ? fhRect.top : 0,
          gapBetweenHeaderAndHeading: (fhRect && hRect) ? Math.round(fhRect.top - hRect.bottom) : 0,
          hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
        };
      })()`,
      returnByValue: true
    });
    const lightVal = lightMetrics.result.result.value;
    console.log(`[Light] Route ${route}:`, lightVal);

    const ssLight = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`scratch/audit_${cleanRouteName}_light.png`, Buffer.from(ssLight.result.data, 'base64'));

    auditResults[route] = { dark: darkVal, light: lightVal };
  }

  // Mobile Viewport Test (390 x 844)
  console.log('\n=== Testing Mobile Viewport (390 x 844) ===');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(400);

  await send('Page.navigate', { url: 'http://localhost:3000/offres' });
  await sleep(800);

  const mobileOffresMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('header');
      const hRect = header.getBoundingClientRect();
      const h2 = document.querySelector('#offres h2');
      const h2Rect = h2 ? h2.getBoundingClientRect() : null;
      return {
        headerHeight: Math.round(hRect.height),
        h2Top: h2Rect ? Math.round(h2Rect.top) : 0,
        gapUnderHeader: h2Rect ? Math.round(h2Rect.top - hRect.bottom) : 0,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`,
    returnByValue: true
  });
  console.log('Mobile /offres metrics:', mobileOffresMetrics.result.result.value);

  const ssMobileOffres = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/audit_mobile_offres.png', Buffer.from(ssMobileOffres.result.data, 'base64'));

  // Mobile Realisations
  await send('Page.navigate', { url: 'http://localhost:3000/realisations' });
  await sleep(800);

  const ssMobileRealisations = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/audit_mobile_realisations.png', Buffer.from(ssMobileRealisations.result.data, 'base64'));

  // Test Scroll and BackToTop on Mobile
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 900);' });
  await sleep(400);

  const bttMobile = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('button[aria-label="Retourner en haut de la page"]');
      const style = window.getComputedStyle(btn);
      const rect = btn.getBoundingClientRect();
      return {
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        size: Math.round(rect.width)
      };
    })()`,
    returnByValue: true
  });
  console.log('Mobile BackToTop button state at scrollY = 900:', bttMobile.result.result.value);

  const ssMobileBtt = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/audit_mobile_backtotop.png', Buffer.from(ssMobileBtt.result.data, 'base64'));

  edge.kill();
  console.log('\n=== All Phase 4 Audits Completed Successfully ===');
  console.log('Console logs captured:', consoleLogs.length);
}

main().catch(err => {
  console.error(err);
  edge.kill();
});
