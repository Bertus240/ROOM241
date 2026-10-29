/**
 * Vercel Edge Middleware — Protection Géographique & Restriction Réseau (DE -> 403 Forbidden)
 * Studio ROOM241 — Rémi Brocart
 *
 * Spécifications Vercel Edge :
 * 1. S'exécute sur le Edge Network mondial de Vercel AVANT tout cache CDN, AVANT tout fichier statique et AVANT le routage SPA.
 * 2. Interception absolue sans possibilité de contournement par client ou rewrite.
 * 3. Lecture du pays via request.headers.get('x-vercel-ip-country') et request.geo?.country.
 * 4. Répression stricte : réponse HTTP 403 avec Cache-Control: private, no-store, no-cache, must-revalidate.
 * 5. Expérience Forbidden humanisée : Mochi au centre avec respiration organique, message exact
 *    « Oups, désolé ! Cette page n'est pas disponible pour le moment. » et action unique alternative
 *    « Regarder ma vidéo de présentation » sans aucun lien de contournement vers la page protégée.
 */

const BLOCKED_COUNTRY = 'DE';

const BLOCK_PAGE_HTML = `<!DOCTYPE html>
<html lang="fr" class="h-full bg-[#FFFFFF] text-zinc-950">
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
      padding: 32px 20px;
      font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #FFFFFF;
      color: #09090B;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      position: relative;
    }
    .ambient-glow {
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 173, 0, 0.08) 0%, rgba(255, 173, 0, 0.02) 45%, transparent 70%);
      filter: blur(50px);
      pointer-events: none;
      z-index: 0;
    }
    .header-bar {
      width: 100%;
      max-width: 640px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
    }
    .logo-img {
      height: 24px;
      width: auto;
      object-fit: contain;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 12px;
      border-radius: 9999px;
      background: rgba(244, 244, 245, 0.9);
      border: 1px solid rgba(228, 228, 231, 0.8);
      color: #52525B;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FFAD00;
      box-shadow: 0 0 6px rgba(255, 173, 0, 0.8);
    }
    main.container {
      max-width: 580px;
      width: 100%;
      margin: 36px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 10;
    }

    /* MOCHI COMPANION */
    .mochi-stage {
      position: relative;
      width: 96px;
      height: 96px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mochi-glow {
      position: absolute;
      inset: -12px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 173, 0, 0.15) 0%, transparent 70%);
      animation: pulseGlow 4.5s ease-in-out infinite;
      pointer-events: none;
    }
    .mochi-orb {
      position: relative;
      width: 78px;
      height: 78px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #2A2A2E 0%, #151518 55%, #0A0A0C 100%);
      box-shadow: 
        0 14px 28px -6px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(255, 255, 255, 0.18),
        inset 0 2px 4px rgba(255, 255, 255, 0.4),
        inset 0 -3px 8px rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: mochiBreath 4.5s ease-in-out infinite;
      transform-origin: center bottom;
    }
    .mochi-specular-top {
      position: absolute;
      top: 8px;
      left: 14px;
      width: 24px;
      height: 12px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 75%);
      transform: rotate(-25deg);
      pointer-events: none;
    }
    .mochi-specular-rim {
      position: absolute;
      bottom: 6px;
      right: 12px;
      width: 30px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255, 173, 0, 0.25) 0%, transparent 80%);
      pointer-events: none;
    }
    .mochi-eyes-container {
      display: flex;
      align-items: center;
      gap: 12px;
      transform: translateY(-2px);
    }
    .mochi-eye {
      position: relative;
      width: 14px;
      height: 18px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .mochi-pupil {
      position: relative;
      width: 8px;
      height: 10px;
      border-radius: 50%;
      background: #09090B;
    }
    .mochi-sparkle {
      position: absolute;
      top: 1.5px;
      left: 1.5px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #FFFFFF;
    }

    @keyframes mochiBreath {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.035) translateY(-1px); }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.5; transform: scale(0.95); }
      50% { opacity: 0.9; transform: scale(1.05); }
    }

    /* Message & Typographie */
    h1 {
      font-size: 26px;
      line-height: 1.25;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: #09090B;
      margin-bottom: 12px;
      max-width: 480px;
    }
    p.lead-text {
      font-size: 15px;
      line-height: 1.6;
      color: #52525B;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .technical-note {
      font-size: 12px;
      line-height: 1.5;
      color: #71717A;
      margin-bottom: 28px;
      font-family: 'JetBrains Mono', monospace;
    }

    /* CTA Principal Vidéo */
    .cta-stage {
      width: 100%;
      max-width: 460px;
      margin: 0 auto;
    }
    .btn-video-hero {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 16px 28px;
      border-radius: 9999px;
      background: #09090B;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-video-hero:hover {
      background: #27272A;
      transform: translateY(-2px);
      box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 173, 0, 0.4);
    }
    .btn-video-hero:active {
      transform: scale(0.98);
    }
    .btn-play-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #FFAD00;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .btn-play-triangle {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4.5px 0 4.5px 7px;
      border-color: transparent transparent transparent #000000;
      margin-left: 1.5px;
    }
    .video-meta {
      font-size: 11px;
      color: #A1A1AA;
      margin-top: 10px;
      font-family: 'JetBrains Mono', monospace;
    }

    /* Modal Vidéo */
    .video-modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(9, 9, 11, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .video-modal-card {
      position: relative;
      width: 100%;
      max-width: 800px;
      background: #09090B;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
    }
    .video-iframe-wrapper {
      position: relative;
      padding-top: 56.25%;
      width: 100%;
      background: #000;
    }
    .video-iframe-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .close-video-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #FFFFFF;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: background 0.15s ease;
    }
    .close-video-btn:hover {
      background: rgba(255, 255, 255, 0.35);
    }

    footer.info-footer {
      font-size: 11px;
      color: #71717A;
      font-family: 'JetBrains Mono', monospace;
      text-align: center;
      margin-top: 32px;
      z-index: 10;
    }
    footer.info-footer a {
      color: #09090B;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  </style>
</head>
<body>
  <div class="ambient-glow" aria-hidden="true"></div>

  <header class="header-bar">
    <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.03em; color: #09090B;">
      ROOM<span style="color: #FFAD00;">241</span>
    </div>
    <div class="status-pill">
      <span class="status-dot" aria-hidden="true"></span>
      <span>403 Forbidden</span>
    </div>
  </header>

  <main class="container" role="main">
    <div class="mochi-stage" aria-hidden="true">
      <div class="mochi-glow"></div>
      <div class="mochi-orb">
        <div class="mochi-specular-top"></div>
        <div class="mochi-eyes-container">
          <div class="mochi-eye">
            <div class="mochi-pupil">
              <div class="mochi-sparkle"></div>
            </div>
          </div>
          <div class="mochi-eye">
            <div class="mochi-pupil">
              <div class="mochi-sparkle"></div>
            </div>
          </div>
        </div>
        <div class="mochi-specular-rim"></div>
      </div>
    </div>

    <h1>Oups, désolé ! Cette page n'est pas disponible pour le moment.</h1>

    <p class="lead-text">
      La consultation du portfolio et des études de cas du Studio ROOM241 n'est pas accessible pour cette connexion.
    </p>

    <div class="technical-note">
      Accès restreint pour cette zone géographique • Code 403
    </div>

    <div class="cta-stage">
      <button type="button" class="btn-video-hero" id="openVideoBtn" aria-haspopup="dialog">
        <span class="btn-play-icon">
          <span class="btn-play-triangle"></span>
        </span>
        <span>Regarder ma vidéo de présentation</span>
      </button>
      <div class="video-meta">
        1 min 28 s • Pitch vidéo officiel de Rémi Brocart
      </div>
    </div>
  </main>

  <div class="video-modal-overlay" id="videoModal" role="dialog" aria-modal="true" aria-label="Vidéo de présentation">
    <div class="video-modal-card">
      <button type="button" class="close-video-btn" id="closeVideoBtn" aria-label="Fermer la vidéo">✕</button>
      <div class="video-iframe-wrapper">
        <iframe
          id="videoIframe"
          src=""
          title="Vidéo de présentation Rémi Brocart — Studio ROOM241"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>

  <footer class="info-footer">
    STUDIO ROOM241 — RÉMI BROCART • CONTACT : <a href="mailto:remi.brocart@gmail.com">remi.brocart@gmail.com</a>
  </footer>

  <script>
    (function() {
      const openBtn = document.getElementById('openVideoBtn');
      const closeBtn = document.getElementById('closeVideoBtn');
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoIframe');
      const videoSrc = 'https://www.youtube-nocookie.com/embed/Bg9Pce0Qqg0?autoplay=1&rel=0&modestbranding=1&playsinline=1';

      if (openBtn && modal && iframe) {
        openBtn.addEventListener('click', function() {
          iframe.src = videoSrc;
          modal.style.display = 'flex';
        });
      }

      function closeModal() {
        if (modal && iframe) {
          modal.style.display = 'none';
          iframe.src = '';
        }
      }

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (modal) modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
      window.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });
    })();
  </script>
</body>
</html>`;

export default function middleware(request) {
  const country = (
    request.headers.get('x-vercel-ip-country') ||
    request.geo?.country ||
    ''
  ).toUpperCase();

  if (country === BLOCKED_COUNTRY) {
    return new Response(BLOCK_PAGE_HTML, {
      status: 403,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'noindex, nofollow',
        'cache-control': 'private, no-store, no-cache, must-revalidate',
        'vary': 'X-Vercel-IP-Country',
      },
    });
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|assets/.*).*)',
  ],
};
