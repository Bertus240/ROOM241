/**
 * Vercel Edge Middleware — Protection Géographique & Restriction Réseau (DE -> 403 Forbidden)
 * Studio ROOM241 — Rémi Brocart
 *
 * Spécifications Vercel Edge :
 * 1. S'exécute sur le Edge Network mondial de Vercel AVANT tout cache CDN, AVANT tout fichier statique et AVANT le routage SPA.
 * 2. Interception absolue sans possibilité de contournement par client ou rewrite.
 * 3. Ne bloque JAMAIS les assets statiques (/assets/*, favicons, scripts, fonts) pour que les images s'affichent toujours.
 * 4. Lecture du pays via request.headers.get('x-vercel-ip-country') et request.geo?.country.
 * 5. Répression stricte : réponse HTTP 403 avec Cache-Control: private, no-store, no-cache, must-revalidate.
 * 6. Expérience 403 premium : Logo officiel ROOM241, Kuro interactif avec suivi des yeux, sélecteur EN/FR sans rechargement,
 *    messages neutres conformes, contact direct LinkedIn & email, zéro mention de géoblocage.
 */

const BLOCKED_COUNTRY = 'DE';

const BLOCK_PAGE_HTML = `<!DOCTYPE html>
<html lang="en" class="h-full bg-[#FFFFFF] text-zinc-950">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>403 — Studio ROOM241</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/png" href="/assets/logos/Favicon1000x1000.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
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
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 173, 0, 0.08) 0%, rgba(255, 173, 0, 0.02) 45%, transparent 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 0;
    }
    header.header-bar {
      width: 100%;
      max-width: 680px;
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
      opacity: 0.82;
    }
    .logo-img {
      height: 28px;
      width: auto;
      object-fit: contain;
      display: block;
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
    main.main-container {
      max-width: 600px;
      width: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 10;
      padding: 24px 8px;
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
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      letter-spacing: 0.04em;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      margin-bottom: 24px;
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FFAD00;
      box-shadow: 0 0 8px rgba(255, 173, 0, 0.85);
      animation: pulseDot 2.8s ease-in-out infinite;
    }
    /* Kuro Avatar Interactif */
    .kuro-stage {
      position: relative;
      width: 92px;
      height: 92px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
    }
    .kuro-glow {
      position: absolute;
      inset: -12px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 173, 0, 0.22) 0%, transparent 70%);
      pointer-events: none;
      transition: transform 0.3s ease;
    }
    .kuro-stage:hover .kuro-glow {
      transform: scale(1.15);
    }
    .kuro-orb {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 28%, #2A2A2E 0%, #151518 55%, #09090B 100%);
      box-shadow: 
        0 14px 28px -6px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.16),
        inset 0 2px 4px rgba(255, 255, 255, 0.45),
        inset 0 -3px 8px rgba(0, 0, 0, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      transform-origin: center bottom;
      animation: kuroBreath 4.8s ease-in-out infinite;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .kuro-specular-top {
      position: absolute;
      top: 8px;
      left: 14px;
      width: 24px;
      height: 11px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.65) 0%, transparent 75%);
      transform: rotate(-25deg);
      pointer-events: none;
    }
    .kuro-specular-rim {
      position: absolute;
      bottom: 7px;
      right: 14px;
      width: 28px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 173, 0, 0.3) 0%, transparent 80%);
      pointer-events: none;
    }
    .kuro-eyes {
      display: flex;
      align-items: center;
      gap: 11px;
      transform: translateY(-2px);
      pointer-events: none;
    }
    .kuro-eye {
      position: relative;
      width: 15px;
      height: 19px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transform-origin: center;
      transition: transform 0.12s ease-out;
    }
    .kuro-pupil {
      position: relative;
      width: 8.5px;
      height: 10.5px;
      border-radius: 50%;
      background: #09090B;
      transition: transform 0.08s ease-out;
      will-change: transform;
    }
    .kuro-sparkle {
      position: absolute;
      top: 1.5px;
      left: 1.5px;
      width: 2.8px;
      height: 2.8px;
      border-radius: 50%;
      background: #FFFFFF;
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
        font-size: 34px;
      }
    }
    p.lead-desc {
      font-size: 15px;
      line-height: 1.6;
      color: #52525B;
      margin-bottom: 18px;
      max-width: 500px;
    }
    p.note-invite {
      font-size: 13.5px;
      line-height: 1.5;
      color: #71717A;
      margin-bottom: 28px;
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
    .back-home-wrap {
      margin-top: 18px;
    }
    .back-home-link {
      font-size: 12.5px;
      font-weight: 500;
      color: #71717A;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .back-home-link:hover {
      color: #09090B;
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
    @keyframes kuroBreath {
      0%, 100% {
        transform: scale(1) translateY(0);
      }
      50% {
        transform: scale(1.035) translateY(-2px);
      }
    }
    @keyframes pulseDot {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.55;
        transform: scale(0.9);
      }
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
        width="132"
        height="29"
        loading="eager"
      >
    </a>
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
  </header>

  <main class="main-container" role="main">
    <div class="status-pill">
      <span class="status-dot" aria-hidden="true"></span>
      <span id="badge-text">403 // SERVICE UNAVAILABLE</span>
    </div>

    <!-- Kuro Avatar Interactif avec suivi des yeux -->
    <div class="kuro-stage" id="kuro-interactive" aria-label="Kuro, le compagnon interactif">
      <div class="kuro-glow"></div>
      <div class="kuro-orb" id="kuro-orb">
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

    <div class="back-home-wrap">
      <a id="back-home-link" href="/" class="back-home-link">
        ← Back to homepage
      </a>
    </div>
  </main>

  <footer class="footer-bar">
    <span id="footer-text">Studio ROOM241 • Rémi Brocart</span>
  </footer>

  <script>
    const translations = {
      en: {
        badge: '403 // SERVICE UNAVAILABLE',
        title: "Oops, this page isn't available right now.",
        description: "Something went wrong while trying to load this page. You can still get in touch with me using the links below.",
        note: "Want to discuss a project or explore a creative collaboration?",
        linkedin: "View LinkedIn profile ↗",
        email: "Send an email",
        backHome: "← Back to homepage",
        footer: "Studio ROOM241 • Rémi Brocart"
      },
      fr: {
        badge: '403 // ACCÈS MOMENTANÉMENT INDISPONIBLE',
        title: 'Oups, cette page est momentanément indisponible.',
        description: "Un problème est survenu lors du chargement de cette page. Vous pouvez toujours me contacter grâce aux liens ci-dessous.",
        note: "Vous souhaitez discuter d'un projet ou explorer une collaboration créative ?",
        linkedin: "Voir le profil LinkedIn ↗",
        email: "Envoyer un e-mail",
        backHome: "← Retourner à l'accueil",
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
      document.getElementById('back-home-link').textContent = t.backHome;
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

    // Suivi fluide du regard de Kuro vers le curseur de la souris (comme sur le site web)
    (function initKuroEyes() {
      const kuroOrb = document.getElementById('kuro-orb');
      const pupils = document.querySelectorAll('.kuro-pupil');
      const eyes = document.querySelectorAll('.kuro-eye');
      if (!kuroOrb || pupils.length === 0) return;

      window.addEventListener('mousemove', (e) => {
        const rect = kuroOrb.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        if (dist === 0) return;

        const angle = Math.atan2(dy, dx);
        const intensity = Math.min(dist / 220, 1) * 3.2; // Intensité identique au site web (3.2px)
        const ox = Math.cos(angle) * intensity;
        const oy = Math.sin(angle) * intensity;

        pupils.forEach(p => {
          p.style.transform = 'translate(' + ox.toFixed(2) + 'px, ' + oy.toFixed(2) + 'px)';
        });
      }, { passive: true });

      // Clignement d'yeux naturel et irrégulier
      function blink() {
        eyes.forEach(eye => {
          eye.style.transform = 'scaleY(0.12)';
        });
        setTimeout(() => {
          eyes.forEach(eye => {
            eye.style.transform = 'scaleY(1)';
          });
          if (Math.random() < 0.25) {
            setTimeout(() => {
              eyes.forEach(eye => {
                eye.style.transform = 'scaleY(0.12)';
              });
              setTimeout(() => {
                eyes.forEach(eye => {
                  eye.style.transform = 'scaleY(1)';
                });
                scheduleNextBlink();
              }, 110);
            }, 140);
          } else {
            scheduleNextBlink();
          }
        }, 120);
      }

      function scheduleNextBlink() {
        setTimeout(blink, Math.random() * 3200 + 3000);
      }
      scheduleNextBlink();

      // Micro-animation interactive au clic / toucher
      const stage = document.getElementById('kuro-interactive');
      if (stage) {
        stage.addEventListener('click', () => {
          kuroOrb.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          kuroOrb.style.transform = 'scale(1.16, 0.86) translateY(-10px)';
          setTimeout(() => {
            kuroOrb.style.transform = 'scale(0.92, 1.1) translateY(4px)';
            setTimeout(() => {
              kuroOrb.style.transform = 'scale(1) translateY(0)';
            }, 160);
          }, 150);
        });
      }
    })();
  </script>
</body>
</html>`;

export default function middleware(request) {
  // 1. Toujours autoriser les assets statiques sans interception (logo, css, js, images, favicons)
  const pathname = request.nextUrl ? request.nextUrl.pathname : new URL(request.url).pathname;
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    /\.(png|jpg|jpeg|svg|webp|gif|ico|css|js|woff2?)$/i.test(pathname)
  ) {
    return undefined;
  }

  const isProduction = process.env.VERCEL_ENV === 'production';

  // 2. Signal géographique infrastructure Vercel Edge
  const headerCountry = request.headers.get('x-vercel-ip-country');
  const geoCountry = request.geo?.country;

  // 3. En environnement hors-production uniquement : support des tests automatisés
  let testCountry = null;
  if (!isProduction) {
    testCountry = request.headers.get('x-test-country');
    if (!testCountry) {
      try {
        const url = new URL(request.url);
        testCountry = url.searchParams.get('test_country');
      } catch {
        testCountry = null;
      }
    }
  }

  const effectiveCountry = (headerCountry || geoCountry || testCountry || '').toUpperCase();

  // Interception stricte si le pays est identifié comme Allemagne (DE)
  if (effectiveCountry === BLOCKED_COUNTRY) {
    return new Response(BLOCK_PAGE_HTML, {
      status: 403,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'private, no-store, no-cache, must-revalidate',
        'vary': 'X-Vercel-IP-Country',
        'x-robots-tag': 'noindex, nofollow',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'referrer-policy': 'strict-origin-when-cross-origin'
      }
    });
  }

  // Pour toutes les autres requêtes légitimes : poursuite normale
  return undefined;
}

export const config = {
  matcher: [
    '/((?!assets/|_next/|favicon\\.ico|robots\\.txt|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico|css|js|woff2?)$).*)',
  ],
};
