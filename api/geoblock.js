/**
 * Vercel Serverless Function — Protection & Page d'indisponibilité (DE -> 403 Forbidden)
 * Studio ROOM241 — Rémi Brocart
 *
 * Spécifications de sécurité :
 * 1. Source géographique : signal infrastructure strict 'x-vercel-ip-country' (fourni par le CDN Vercel Edge).
 * 2. En production (VERCEL_ENV === 'production'), aucun paramètre d'URL (ex: test_country) ni en-tête client
 *    arbitraire (x-test-country) n'est accepté. Le contournement client est strictement prohibé.
 * 3. En environnement de test / local (NODE_ENV !== 'production' || VERCEL_ENV !== 'production'),
 *    la simulation contrôlée via ?test_country=DE ou x-test-country reste permise pour les tests automatisés.
 * 4. Prévention des faux positifs : un accès direct non ciblé DE est redirigé vers l'accueil (302 -> /).
 * 5. En-têtes HTTP de réponse 403 : X-Robots-Tag noindex, nofollow, Vary: X-Vercel-IP-Country, Cache-Control no-store.
 * 6. Expérience Forbidden premium & neutre : Kuro au centre, logo officiel ROOM241, sélecteur EN/FR instantané,
 *    message neutre sans mention de géoblocage, liens directs LinkedIn & email.
 */
export default function handler(req, res) {
  const isProduction = process.env.VERCEL_ENV === 'production';
  const vercelCountry = req.headers['x-vercel-ip-country'];

  let queryCountry = null;
  let testCountry = null;

  // En environnement hors production uniquement : autoriser la simulation contrôlée pour test-protection.js
  if (!isProduction) {
    testCountry = req.headers['x-test-country'];
    try {
      const host = req.headers.host || 'localhost';
      const parsedUrl = new URL(req.url, `https://${host}`);
      queryCountry = parsedUrl.searchParams.get('test_country');
    } catch {
      queryCountry = null;
    }
  }

  // Détermination du pays effectif (en prod : strictement vercelCountry)
  const effectiveCountry = (vercelCountry || (!isProduction ? (testCountry || queryCountry) : '') || '').toUpperCase();

  // Si la requête provient d'un autre pays et accède directement à cette fonction sans être ciblée DE,
  // rediriger vers l'accueil pour éviter un faux positif.
  if (effectiveCountry && effectiveCountry !== 'DE' && !queryCountry) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  // Si le pays n'est ni DE ni simulé DE (signal absent ou invalide hors rewrite), rediriger vers l'accueil
  if (effectiveCountry !== 'DE') {
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="en" class="h-full bg-[#FFFFFF] text-zinc-950">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>403 — Studio ROOM241</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/png" href="/assets/logos/Favicon1000x1000.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 24px 20px;
      font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #FFFFFF;
      color: #09090B;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      position: relative;
    }
    .ambient-glow {
      position: fixed;
      top: 25%;
      left: 50%;
      transform: translateX(-50%);
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 173, 0, 0.06) 0%, rgba(255, 173, 0, 0.015) 45%, transparent 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 0;
    }
    header.header-bar {
      width: 100%;
      max-width: 640px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      padding: 4px 0;
    }
    .logo-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      border-radius: 8px;
      transition: opacity 0.2s ease;
    }
    .logo-link:hover {
      opacity: 0.85;
    }
    .logo-img {
      height: 28px;
      width: auto;
      object-fit: contain;
      display: block;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(244, 244, 245, 0.95);
      border: 1px solid rgba(228, 228, 231, 0.9);
      color: #52525B;
      font-size: 11.5px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }
    .status-dot {
      width: 6.5px;
      height: 6.5px;
      border-radius: 50%;
      background: #FFAD00;
      box-shadow: 0 0 8px rgba(255, 173, 0, 0.8);
      animation: pulseDot 2.8s ease-in-out infinite;
    }
    main.main-container {
      max-width: 580px;
      width: 100%;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 10;
      padding: 0 8px;
    }
    /* Kuro Avatar 72px */
    .kuro-stage {
      position: relative;
      width: 84px;
      height: 84px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .kuro-glow {
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 173, 0, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .kuro-orb {
      position: relative;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 28%, #2A2A2E 0%, #151518 55%, #09090B 100%);
      box-shadow: 
        0 14px 28px -6px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(255, 255, 255, 0.16),
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -3px 8px rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      transform-origin: center bottom;
      animation: kuroBreath 4.8s ease-in-out infinite;
    }
    .kuro-specular-top {
      position: absolute;
      top: 7px;
      left: 12px;
      width: 22px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, transparent 75%);
      transform: rotate(-25deg);
      pointer-events: none;
    }
    .kuro-specular-rim {
      position: absolute;
      bottom: 6px;
      right: 12px;
      width: 26px;
      height: 7px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 173, 0, 0.25) 0%, transparent 80%);
      pointer-events: none;
    }
    .kuro-eyes {
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateY(-2px);
    }
    .kuro-eye {
      position: relative;
      width: 13px;
      height: 17px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .kuro-pupil {
      position: relative;
      width: 7.5px;
      height: 9.5px;
      border-radius: 50%;
      background: #09090B;
    }
    .kuro-sparkle {
      position: absolute;
      top: 1.5px;
      left: 1.5px;
      width: 2.5px;
      height: 2.5px;
      border-radius: 50%;
      background: #FFFFFF;
    }
    @keyframes kuroBreath {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.04) translateY(-1px);
      }
    }
    @keyframes pulseDot {
      0%, 100% {
        opacity: 0.6;
        transform: scale(0.95);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .kuro-orb, .status-dot {
        animation: none !important;
      }
    }
    /* Lang Switcher */
    .lang-switcher-wrap {
      margin-bottom: 24px;
    }
    .lang-switcher {
      display: inline-flex;
      align-items: center;
      padding: 3px;
      background: #F4F4F5;
      border-radius: 9999px;
      border: 1px solid rgba(228, 228, 231, 0.9);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    .lang-btn {
      appearance: none;
      border: none;
      background: transparent;
      padding: 5px 14px;
      font-size: 11.5px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      color: #71717A;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      outline: none;
    }
    .lang-btn:hover {
      color: #18181B;
    }
    .lang-btn:focus-visible {
      box-shadow: 0 0 0 2px #FFAD00;
    }
    .lang-btn.active {
      background: #FFFFFF;
      color: #09090B;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    /* Typography */
    h1 {
      font-size: 28px;
      line-height: 1.22;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #09090B;
      margin-bottom: 12px;
      max-width: 520px;
    }
    @media (min-width: 640px) {
      h1 {
        font-size: 32px;
      }
    }
    p.lead-desc {
      font-size: 15px;
      line-height: 1.6;
      color: #52525B;
      margin-bottom: 20px;
      max-width: 490px;
    }
    p.note-invite {
      font-size: 13.5px;
      line-height: 1.5;
      color: #71717A;
      margin-bottom: 30px;
      max-width: 460px;
    }
    /* CTA buttons */
    .cta-container {
      width: 100%;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    @media (min-width: 480px) {
      .cta-container {
        flex-direction: row;
        justify-content: center;
      }
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 13px 24px;
      min-height: 46px;
      border-radius: 9999px;
      font-size: 13.5px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      outline: none;
      box-sizing: border-box;
    }
    .btn:focus-visible {
      box-shadow: 0 0 0 2px #FFAD00;
    }
    .btn-primary {
      background: #09090B;
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 6px 18px -4px rgba(0, 0, 0, 0.16);
    }
    .btn-primary:hover {
      background: #27272A;
      transform: translateY(-1.5px);
      box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.24);
    }
    .btn-primary:active {
      transform: scale(0.98);
    }
    .btn-secondary {
      background: #FFFFFF;
      color: #09090B;
      border: 1px solid rgba(228, 228, 231, 0.95);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .btn-secondary:hover {
      background: #F4F4F5;
      border-color: #D4D4D8;
      transform: translateY(-1.5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    }
    .btn-secondary:active {
      transform: scale(0.98);
    }
    /* Footer */
    footer.footer-bar {
      font-size: 12px;
      color: #71717A;
      font-family: 'JetBrains Mono', monospace;
      text-align: center;
      margin-top: 32px;
      padding: 12px 0 4px;
      z-index: 10;
    }
  </style>
</head>
<body>
  <div class="ambient-glow" aria-hidden="true"></div>

  <header class="header-bar">
    <a href="/" class="logo-link" aria-label="Studio ROOM241">
      <img
        src="/assets/logos/430x95_Framer_Black@4x.png"
        alt="Studio ROOM241"
        class="logo-img"
        loading="eager"
      >
    </a>
    <div class="status-pill">
      <span class="status-dot" aria-hidden="true"></span>
      <span id="badge-text">403 Something went wrong</span>
    </div>
  </header>

  <main class="main-container" role="main">
    <!-- Kuro Avatar 72px -->
    <div class="kuro-stage" aria-hidden="true">
      <div class="kuro-glow"></div>
      <div class="kuro-orb">
        <div class="kuro-specular-top"></div>
        <div class="kuro-eyes">
          <div class="kuro-eye">
            <div class="kuro-pupil">
              <div class="kuro-sparkle"></div>
            </div>
          </div>
          <div class="kuro-eye">
            <div class="kuro-pupil">
              <div class="kuro-sparkle"></div>
            </div>
          </div>
        </div>
        <div class="kuro-specular-rim"></div>
      </div>
    </div>

    <!-- Sélecteur de langue EN / FR -->
    <div class="lang-switcher-wrap">
      <div class="lang-switcher" role="group" aria-label="Language / Langue">
        <button
          type="button"
          id="btn-en"
          class="lang-btn active"
          aria-pressed="true"
          lang="en"
          onclick="setLanguage('en')"
        >
          EN
        </button>
        <button
          type="button"
          id="btn-fr"
          class="lang-btn"
          aria-pressed="false"
          lang="fr"
          onclick="setLanguage('fr')"
        >
          FR
        </button>
      </div>
    </div>

    <!-- Messages neutres & sans révélation de restriction -->
    <h1 id="title-text">Oops, this page isn't available right now.</h1>

    <p id="desc-text" class="lead-desc">
      Something went wrong while trying to load this page. You can still get in touch with me using the links below.
    </p>

    <p id="note-text" class="note-invite">
      Want to discuss a project or explore a creative collaboration?
    </p>

    <!-- CTAs de contact direct -->
    <div class="cta-container">
      <a
        id="cta-linkedin"
        href="https://www.linkedin.com/in/remibrocart"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
      >
        View LinkedIn profile ↗
      </a>
      <a
        id="cta-email"
        href="mailto:brocart.remi02@gmail.com"
        class="btn btn-secondary"
      >
        Send an email
      </a>
    </div>
  </main>

  <footer class="footer-bar">
    <span id="footer-text">Studio ROOM241 • Rémi Brocart</span>
  </footer>

  <script>
    const translations = {
      en: {
        badge: '403 Something went wrong',
        title: "Oops, this page isn't available right now.",
        description: "Something went wrong while trying to load this page. You can still get in touch with me using the links below.",
        note: "Want to discuss a project or explore a creative collaboration?",
        linkedin: "View LinkedIn profile ↗",
        email: "Send an email",
        footer: "Studio ROOM241 • Rémi Brocart"
      },
      fr: {
        badge: '403 Une erreur est survenue',
        title: 'Oups, cette page est momentanément indisponible.',
        description: "Un problème est survenu lors du chargement de cette page. Vous pouvez toujours me contacter grâce aux liens ci-dessous.",
        note: "Vous souhaitez discuter d'un projet ou explorer une collaboration créative ?",
        linkedin: "Voir le profil LinkedIn ↗",
        email: "Envoyer un e-mail",
        footer: "Studio ROOM241 • Rémi Brocart"
      }
    };

    function setLanguage(lang) {
      const t = translations[lang];
      if (!t) return;
      document.documentElement.lang = lang;
      document.getElementById('badge-text').textContent = t.badge;
      document.getElementById('title-text').textContent = t.title;
      document.getElementById('desc-text').textContent = t.description;
      document.getElementById('note-text').textContent = t.note;
      document.getElementById('cta-linkedin').textContent = t.linkedin;
      document.getElementById('cta-email').textContent = t.email;
      document.getElementById('footer-text').textContent = t.footer;

      const btnEn = document.getElementById('btn-en');
      const btnFr = document.getElementById('btn-fr');
      if (lang === 'en') {
        btnEn.classList.add('active');
        btnEn.setAttribute('aria-pressed', 'true');
        btnFr.classList.remove('active');
        btnFr.setAttribute('aria-pressed', 'false');
      } else {
        btnFr.classList.add('active');
        btnFr.setAttribute('aria-pressed', 'true');
        btnEn.classList.remove('active');
        btnEn.setAttribute('aria-pressed', 'false');
      }
    }
  </script>
</body>
</html>`;

  res.writeHead(403, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'private, no-store, no-cache, must-revalidate',
    'Vary': 'X-Vercel-IP-Country',
    'X-Robots-Tag': 'noindex, nofollow'
  });
  res.end(html);
}
