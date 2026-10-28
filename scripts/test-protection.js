/**
 * Test Suite - Validation de la sécurité et conformité ROOM241
 * Exécuté localement avec Node.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [OK] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('====================================================');
console.log(' SUITE DE TESTS : PROTECTION PORTFOLIO ROOM241');
console.log('====================================================\n');

// 1. Tests HTML Metadata
console.log('--- 1. Métadonnées HTML & Indexation ---');
const srcHtmlPath = path.join(rootDir, 'index.html');
const distHtmlPath = path.join(rootDir, 'dist', 'index.html');

const srcHtml = fs.readFileSync(srcHtmlPath, 'utf8');
assert(srcHtml.includes('<meta name="robots" content="noindex, nofollow" />'), 'index.html contient la balise noindex, nofollow');
assert(!srcHtml.includes('content="index, follow"'), 'index.html ne contient plus aucune directive index, follow');

if (fs.existsSync(distHtmlPath)) {
  const distHtml = fs.readFileSync(distHtmlPath, 'utf8');
  assert(distHtml.includes('<meta name="robots" content="noindex, nofollow"'), 'dist/index.html (build prod) contient la balise noindex, nofollow');
  assert(!distHtml.includes('content="index, follow"'), 'dist/index.html ne contient aucune directive index, follow');
} else {
  assert(false, 'dist/index.html existe (exécuter le build avant)');
}

// 2. Tests robots.txt & Sitemap
console.log('\n--- 2. Fichier robots.txt & Absence de Sitemap ---');
const robotsPath = path.join(rootDir, 'public', 'robots.txt');
const distRobotsPath = path.join(rootDir, 'dist', 'robots.txt');

assert(fs.existsSync(robotsPath), 'public/robots.txt est présent');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert(robotsContent.includes('User-agent: *'), 'robots.txt cible tous les robots (User-agent: *)');
assert(robotsContent.includes('Allow: /'), 'robots.txt autorise le crawl (Allow: /) pour permettre la découverte du noindex');
assert(!robotsContent.toLowerCase().includes('disallow: /'), 'robots.txt ne bloque pas le crawl global (anti-pattern noindex)');
assert(!robotsContent.toLowerCase().includes('sitemap'), 'robots.txt ne référence aucun sitemap');

if (fs.existsSync(distRobotsPath)) {
  const distRobots = fs.readFileSync(distRobotsPath, 'utf8');
  assert(distRobots.includes('Allow: /'), 'dist/robots.txt est bien inclus dans le livrable de production');
}

// 3. Tests de configuration Vercel (vercel.json)
console.log('\n--- 3. Configuration Vercel (vercel.json) ---');
const vercelConfigPath = path.join(rootDir, 'vercel.json');
assert(fs.existsSync(vercelConfigPath), 'vercel.json existe à la racine');

const vercelJson = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));

// Vérification des headers
const globalHeaderRule = vercelJson.headers?.find(h => h.source === '/(.*)');
assert(!!globalHeaderRule, 'vercel.json définit des en-têtes globaux pour source: /(.*)');

const headersMap = new Map();
if (globalHeaderRule) {
  for (const h of globalHeaderRule.headers) {
    headersMap.set(h.key.toLowerCase(), h.value);
  }
}

assert(headersMap.get('x-robots-tag') === 'noindex, nofollow', 'En-tête HTTP X-Robots-Tag: noindex, nofollow configuré');
assert(headersMap.get('vary')?.includes('X-Vercel-IP-Country'), 'En-tête Vary: X-Vercel-IP-Country configuré (isolation du cache CDN)');
assert(headersMap.get('x-content-type-options') === 'nosniff', 'En-tête X-Content-Type-Options: nosniff configuré');
assert(headersMap.get('x-frame-options') === 'DENY', 'En-tête X-Frame-Options: DENY configuré');
assert(headersMap.get('referrer-policy') === 'strict-origin-when-cross-origin', 'En-tête Referrer-Policy configuré');

// Vérification des rewrites
const geoblockRewrite = vercelJson.rewrites?.find(r => r.destination === '/api/geoblock');
assert(!!geoblockRewrite, 'Une règle de rewrite cible /api/geoblock');

const hasCountryRule = geoblockRewrite?.has?.find(h => h.key?.toLowerCase() === 'x-vercel-ip-country' && h.value === 'DE');
assert(!!hasCountryRule, 'Le rewrite filtre spécifiquement x-vercel-ip-country == DE');

const spaFallbackRewrite = vercelJson.rewrites?.find(r => r.source === '/(.*)' && r.destination === '/index.html');
assert(!!spaFallbackRewrite, 'Le fallback SPA vers /index.html est préservé pour les utilisateurs autorisés');

// 4. Tests unitaires de la fonction /api/geoblock.js
console.log('\n--- 4. Fonction Serveur de Géoblocage (/api/geoblock.js) ---');
const apiModule = await import('../api/geoblock.js');
const handler = apiModule.default;
assert(typeof handler === 'function', '/api/geoblock.js exporte une fonction handler par défaut');

// Mock helper
function runHandler(headers = {}, url = 'https://room241.studio/') {
  let statusCode = 200;
  let responseHeaders = {};
  let responseBody = '';

  const req = {
    headers: { host: 'room241.studio', ...headers },
    url,
  };

  const res = {
    writeHead(status, hdrs) {
      statusCode = status;
      responseHeaders = hdrs || {};
      return this;
    },
    end(body) {
      responseBody = body || '';
    },
  };

  handler(req, res);
  return { statusCode, responseHeaders, responseBody };
}

// Test A : Requête identifiée Allemagne (DE)
const resDE = runHandler({ 'x-vercel-ip-country': 'DE' });
assert(resDE.statusCode === 403, 'Requête avec x-vercel-ip-country: DE renvoie le code HTTP 403');
assert(resDE.responseHeaders['X-Robots-Tag'] === 'noindex, nofollow', 'Réponse 403 inclut l’en-tête X-Robots-Tag: noindex, nofollow');
assert(resDE.responseHeaders['Cache-Control']?.includes('no-store'), 'Réponse 403 inclut Cache-Control: private, no-store');
assert(resDE.responseHeaders['Vary'] === 'X-Vercel-IP-Country', 'Réponse 403 inclut Vary: X-Vercel-IP-Country');
assert(resDE.responseBody.includes('Accès restreint pour cette zone géographique'), 'La réponse 403 contient le message sobre en français');
assert(resDE.responseBody.includes('Studio ROOM241'), 'La réponse 403 respecte l’identité visuelle Studio ROOM241');
assert(resDE.responseBody.includes('remi.brocart@gmail.com'), 'La réponse 403 fournit le contact du studio');

// Test B : Requête identifiée France (FR) accédant directement à /api/geoblock
const resFR = runHandler({ 'x-vercel-ip-country': 'FR' });
assert(resFR.statusCode === 302, 'Accès direct depuis FR à /api/geoblock redirige vers / (code 302)');
assert(resFR.responseHeaders['Location'] === '/', 'Redirection FR cible la racine /');

// Test C : Simulation par query param (?test_country=DE)
const resSimDE = runHandler({}, 'https://room241.studio/api/geoblock?test_country=DE');
assert(resSimDE.statusCode === 403, 'Simulation via ?test_country=DE renvoie 403 Forbidden');

console.log('\n====================================================');
console.log(` BILAN : ${passedTests} passés / ${totalTests} tests au total (${failedTests} échec(s))`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
}
