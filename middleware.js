/**
 * Vercel Edge Middleware — Protection Géographique & Restriction Réseau (DE -> 403 Forbidden)
 * Studio ROOM241 — Rémi Brocart
 *
 * Spécifications Vercel Edge :
 * 1. S'exécute sur le Edge Network mondial de Vercel AVANT tout cache CDN, AVANT tout fichier statique et AVANT le routage SPA.
 * 2. Interception absolue sans possibilité de contournement par client ou rewrite.
 * 3. Lecture du pays via request.headers.get('x-vercel-ip-country') et request.geo?.country.
 * 4. Répression stricte : réponse HTTP 403 avec Cache-Control: private, no-store, no-cache, must-revalidate.
 * 5. Préservation des assets statiques favicon/robots si nécessaire, mais blocage strict de toutes les pages du site.
 */

const BLOCKED_COUNTRY = 'DE';

const BLOCK_PAGE_HTML = `<!DOCTYPE html>
<html lang="fr" class="h-full bg-white text-zinc-950">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accès non disponible (403) — Studio ROOM241</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/png" href="/assets/logos/Favicon1000x1000.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 40px 24px;
      font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #FFFFFF;
      color: #09090B;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 580px;
      width: 100%;
      margin: auto;
      text-align: left;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(255, 173, 0, 0.12);
      border: 1px solid rgba(255, 173, 0, 0.4);
      color: #9A6500;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 28px;
    }
    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FFAD00;
    }
    .brand {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #71717A;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 28px;
      line-height: 1.25;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #09090B;
      margin-bottom: 16px;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #52525B;
      margin-bottom: 24px;
    }
    .lang-en {
      font-size: 13px;
      line-height: 1.6;
      color: #71717A;
      padding-top: 16px;
      border-top: 1px solid #F4F4F5;
      margin-bottom: 32px;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
    .btn-contact {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #09090B;
      color: #FFFFFF;
      padding: 12px 22px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      transition: background-color 0.15s ease;
    }
    .btn-contact:hover {
      background: #27272A;
    }
    .info-footer {
      font-size: 11px;
      color: #A1A1AA;
      font-family: 'JetBrains Mono', monospace;
      text-align: center;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div></div>
  <main class="container" role="main">
    <div class="badge">
      <span class="badge-dot" aria-hidden="true"></span>
      HTTP 403 Forbidden
    </div>
    <div class="brand">Studio ROOM241</div>
    <h1>Accès restreint pour cette zone géographique</h1>
    <p>
      La consultation du portfolio et des études de cas du Studio ROOM241 n'est pas disponible pour les requêtes en provenance de cette région.
    </p>
    <div class="lang-en">
      Access to the ROOM241 portfolio and case studies is currently restricted for requests originating from this region.
    </div>
    <div class="actions">
      <a href="mailto:remi.brocart@gmail.com?subject=Contact%20Studio%20ROOM241" class="btn-contact">
        Contacter le studio
      </a>
    </div>
  </main>
  <footer class="info-footer">
    STUDIO ROOM241 — RÉMI BROCART • TOUS DROITS RÉSERVÉS
  </footer>
</body>
</html>`;

export default function middleware(request) {
  const isProduction = process.env.VERCEL_ENV === 'production';
  
  // 1. Détection via les signaux officiels Vercel Edge
  const headerCountry = request.headers.get('x-vercel-ip-country');
  const geoCountry = request.geo?.country;

  let queryCountry = null;
  let testHeaderCountry = null;

  // En environnement hors production uniquement : simulation de test
  if (!isProduction) {
    testHeaderCountry = request.headers.get('x-test-country');
    try {
      const url = new URL(request.url);
      queryCountry = url.searchParams.get('test_country');
    } catch {
      queryCountry = null;
    }
  }

  const detectedCountry = (
    headerCountry ||
    geoCountry ||
    (!isProduction ? (testHeaderCountry || queryCountry) : '') ||
    ''
  ).toUpperCase();

  // 2. Si le pays est l'Allemagne (DE), bloquer immédiatement avec un code HTTP 403 strict
  if (detectedCountry === BLOCKED_COUNTRY) {
    return new Response(BLOCK_PAGE_HTML, {
      status: 403,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'private, no-store, no-cache, must-revalidate',
        'Vary': 'X-Vercel-IP-Country',
      },
    });
  }

  // 3. Sinon, laisser passer la requête
  return undefined;
}

export const config = {
  // Intercepter toutes les requêtes de pages, exclure uniquement les assets publics statiques purs
  matcher: [
    /*
     * Match all request paths except:
     * - _vercel/insights, _vercel/speed-insights
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_vercel|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

