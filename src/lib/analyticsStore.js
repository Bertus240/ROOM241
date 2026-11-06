/**
 * ============================================================================
 * ANALYTICS STORE & DATA AGGREGATOR — ROOM241
 * Studio ROOM241 • Rémi Brocart
 *
 * Moteur first-party de stockage, agrégation et modélisation analytique :
 * - Stockage local sécurisé des événements réels (sessionStorage / localStorage)
 * - Données de démonstration réalistes pour exploration en local sans pollution
 * - Modélisation des heatmaps, scrollmaps, funnels d'intentions et web vitals
 * - Export CSV conforme et respect absolu de la vie privée (CNIL / RGPD)
 * ============================================================================
 */

const REAL_EVENTS_STORAGE_KEY = 'room241_telemetry_events_v2';
const REAL_CLICKS_STORAGE_KEY = 'room241_telemetry_clicks_v2';
const CONSENT_STORAGE_KEY = 'room241_cookie_consent_status';

/**
 * Jeu de données de démonstration réaliste et calibré pour le portfolio ROOM241
 * (Période : 30 derniers jours, représentatif des flux de recruteurs & clients B2B)
 */
export const DEMO_ANALYTICS_DATA = {
  summary: {
    totalVisits: 1428,
    uniqueVisitors: 894,
    pageViews: 3840,
    avgDwellTime: '2 min 42 s',
    bounceRate: '28.4 %',
    engagementRate: '71.6 %',
    activeSessionsNow: 3,
    vsPreviousPeriod: {
      visits: '+18.2 %',
      uniques: '+14.6 %',
      pageViews: '+22.5 %',
      engagement: '+4.1 %'
    }
  },
  dailyTraffic: [
    { date: '10 Oct', visits: 38, views: 98, cvViews: 8 },
    { date: '12 Oct', visits: 44, views: 112, cvViews: 11 },
    { date: '14 Oct', visits: 52, views: 138, cvViews: 14 },
    { date: '16 Oct', visits: 41, views: 104, cvViews: 9 },
    { date: '18 Oct', visits: 49, views: 126, cvViews: 12 },
    { date: '20 Oct', visits: 58, views: 154, cvViews: 16 },
    { date: '22 Oct', visits: 64, views: 182, cvViews: 19 },
    { date: '24 Oct', visits: 72, views: 196, cvViews: 22 },
    { date: '26 Oct', visits: 85, views: 240, cvViews: 28 }, // Pic Marathon / Réseaux
    { date: '28 Oct', visits: 66, views: 178, cvViews: 18 },
    { date: '30 Oct', visits: 59, views: 162, cvViews: 15 },
    { date: '01 Nov', visits: 63, views: 174, cvViews: 17 },
    { date: '03 Nov', visits: 78, views: 210, cvViews: 24 },
    { date: '05 Nov', visits: 82, views: 228, cvViews: 26 },
    { date: 'Aujourd\'hui', visits: 31, views: 88, cvViews: 9 }
  ],
  trafficSources: [
    { name: 'LinkedIn (Posts & Profil Rémi)', visits: 624, percent: 43.7, trend: '+28 %' },
    { name: 'Accès Direct (CV & Candidatures)', visits: 442, percent: 31.0, trend: '+12 %' },
    { name: 'Recherche Organique (Google / DuckDuckGo)', visits: 198, percent: 13.9, trend: '+6 %' },
    { name: 'Réseaux & Partages (Instagram, etc.)', visits: 114, percent: 8.0, trend: '+4 %' },
    { name: 'Autres Référents professionnels', visits: 50, percent: 3.4, trend: '0 %' }
  ],
  devices: [
    { type: 'Desktop (1440 × 900 & écrans larges)', count: 872, percent: 61.1 },
    { type: 'Mobile (Smartphones iOS & Android)', count: 486, percent: 34.0 },
    { type: 'Tablette (iPad & formats hybrides)', count: 70, percent: 4.9 }
  ],
  topPages: [
    { path: '/', title: 'Accueil · Direction Artistique & Vision', views: 1680, avgTime: '1m 45s', bounce: '24%' },
    { path: '/parcours', title: 'Parcours · Expériences, Compétences & Formation', views: 890, avgTime: '2m 30s', bounce: '19%' },
    { path: '/etudes-de-cas/hornetsecurity', title: 'Étude de cas · Hornetsecurity FIC Lille > 150 m²', views: 560, avgTime: '3m 15s', bounce: '16%' },
    { path: '/projets', title: 'Réalisations · Galerie des études de cas', views: 420, avgTime: '1m 20s', bounce: '22%' },
    { path: '/univers-personnel', title: 'Univers Personnel · Au-delà du travail & Marathon', views: 290, avgTime: '2m 10s', bounce: '28%' }
  ],
  caseStudiesPerformance: [
    {
      id: 'hornetsecurity',
      name: 'Hornetsecurity · Stand FIC > 150 m²',
      views: 742,
      detailOpens: 560,
      engagement: '84 %',
      avgDwellSeconds: 195,
      videoPlays: 218,
      externalClicks: 84
    },
    {
      id: 'resin-architecte',
      name: 'Résin\'Architecte · BTP & Moquette de pierre',
      views: 486,
      detailOpens: 312,
      engagement: '68 %',
      avgDwellSeconds: 130,
      videoPlays: 0,
      externalClicks: 42
    },
    {
      id: 'fresh-data',
      name: 'Fresh Data · Veille Retail & Ulule 116%',
      views: 394,
      detailOpens: 245,
      engagement: '62 %',
      avgDwellSeconds: 110,
      videoPlays: 94,
      externalClicks: 36
    },
    {
      id: 'jardimax',
      name: 'Jardimax · Démonstration créative de recrutement',
      views: 310,
      detailOpens: 190,
      engagement: '58 %',
      avgDwellSeconds: 95,
      videoPlays: 0,
      externalClicks: 18
    }
  ],
  funnel: [
    { step: '1. Visiteurs totaux', count: 894, rate: '100 %', description: 'Visite globale du portfolio' },
    { step: '2. Découverte Projets', count: 688, rate: '77.0 %', description: 'Consultation d\'au moins une étude de cas' },
    { step: '3. Consultation du CV', count: 284, rate: '31.8 %', description: 'Ouverture du CV synthétique interactif' },
    { step: '4. Intention de contact qualifiée', count: 118, rate: '13.2 %', description: 'Clic e-mail, téléphone, LinkedIn ou prise de RDV' }
  ],
  contactIntentions: [
    { label: 'Clic E-mail (mailto:brocart.remi02@gmail.com)', count: 46, note: 'Intention de prise de contact écrite' },
    { label: 'Clic Téléphone (tel:0767123858)', count: 28, note: 'Intention d\'appel direct mobile' },
    { label: 'Clic Profil LinkedIn (/in/remibrocart)', count: 74, note: 'Consultation du profil réseau' },
    { label: 'Téléchargement / Impression du CV', count: 32, note: 'Enregistrement de la synthèse' },
    { label: 'Interactions Kuro (Assistant interactif)', count: 86, note: 'Navigation guidée et questions exploratoires' }
  ],
  scrollmap: {
    depths: [
      { depth: '25 %', reach: '94 %', label: 'Hero, Identité & Accroche de marque' },
      { depth: '50 %', reach: '78 %', label: 'Domaines d\'expertise & Réalisations phares' },
      { depth: '75 %', reach: '56 %', label: 'Méthodologie & Études de cas détaillées' },
      { depth: '90 %', reach: '38 %', label: 'Preuves chiffrées & Témoignages' },
      { depth: '100 %', reach: '29 %', label: 'Footer, Coordonnées & Prise de contact' }
    ],
    avgScrollPercentage: '64.8 %'
  },
  heatmapClicks: [
    // Page d'accueil : Coordonnées normalisées relatives x: 0..100, y: 0..100
    { page: '/', x: 50, y: 12, label: 'Hero Bouton Découvrir mes projets', interactive: true, weight: 85 },
    { page: '/', x: 48, y: 18, label: 'Consulter le CV (Bouton secondaire)', interactive: true, weight: 74 },
    { page: '/', x: 25, y: 32, label: 'Domaine 01 Scénographie', interactive: true, weight: 42 },
    { page: '/', x: 75, y: 32, label: 'Domaine 04 Social Media Management', interactive: true, weight: 58 },
    { page: '/', x: 50, y: 48, label: 'Étude de cas Hornetsecurity FIC', interactive: true, weight: 92 },
    { page: '/', x: 50, y: 62, label: 'Méthodologie 01 Comprendre avant d\'agir', interactive: false, weight: 24 },
    { page: '/', x: 82, y: 92, label: 'Bulle Kuro (Assistant flottant)', interactive: true, weight: 68 },
    { page: '/', x: 50, y: 96, label: 'Lien contact e-mail footer', interactive: true, weight: 46 },
    // Page Parcours
    { page: '/parcours', x: 78, y: 15, label: 'Ouvrir la photo héro en plein écran', interactive: true, weight: 52 },
    { page: '/parcours', x: 50, y: 42, label: 'Section Hornetsecurity CDI & Timeline', interactive: true, weight: 64 },
    { page: '/parcours', x: 28, y: 68, label: 'Carte Master ISEG (Sceau)', interactive: true, weight: 38 },
    { page: '/parcours', x: 50, y: 88, label: 'Ouvrir le CV interactif (Synthèse)', interactive: true, weight: 76 }
  ],
  webVitals: {
    lcp: { value: '0.84 s', status: 'Excellent', target: '< 2.5 s', score: 98 },
    cls: { value: '0.002', status: 'Excellent', target: '< 0.1', score: 100 },
    inp: { value: '28 ms', status: 'Excellent', target: '< 200 ms', score: 96 },
    ttfb: { value: '62 ms', status: 'Excellent', target: '< 800 ms', score: 99 },
    jsErrorsCount: 0
  }
};

/**
 * Récupère le statut du consentement CNIL / RGPD
 */
export function getConsentStatus() {
  if (typeof window === 'undefined' || !window.localStorage) return 'unset';
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) || 'unset';
  } catch {
    return 'unset';
  }
}

/**
 * Enregistre le choix de consentement du visiteur
 */
export function setConsentStatus(status) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status); // 'accepted' | 'declined' | 'essential_only'
  } catch {
    // Ignore
  }
}

/**
 * Enregistre un événement dans la base locale first-party
 */
export function recordFirstPartyEvent(eventName, properties = {}) {
  // Respect du Do Not Track navigateur
  if (typeof navigator !== 'undefined' && (navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
    return;
  }

  // Respect du consentement : si refus explicite, seuls les événements de session essentiels sont tolérés
  const consent = getConsentStatus();
  if (consent === 'declined') {
    return;
  }

  const record = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: eventName,
    page: typeof window !== 'undefined' ? window.location.pathname : '/',
    timestamp: new Date().toISOString(),
    props: properties
  };

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingRaw = localStorage.getItem(REAL_EVENTS_STORAGE_KEY);
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(record);
      // Garder les 500 derniers événements réels
      localStorage.setItem(REAL_EVENTS_STORAGE_KEY, JSON.stringify(list.slice(0, 500)));
    }
  } catch {
    // Ignore quota errors
  }
}

/**
 * Enregistre un clic normalisé pour la heatmap (sans enregistrer de texte de formulaire)
 */
export function recordFirstPartyClick(e) {
  const consent = getConsentStatus();
  if (consent === 'declined') return;

  try {
    const target = e.target;
    // Interdiction formelle : ignorer les champs de formulaires (input, textarea, password)
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
      return;
    }

    const docWidth = document.documentElement.scrollWidth || window.innerWidth;
    const docHeight = document.documentElement.scrollHeight || window.innerHeight;

    const xPercent = Math.round((e.pageX / docWidth) * 100);
    const yPercent = Math.round((e.pageY / docHeight) * 100);

    const isInteractive = Boolean(
      target.closest('a, button, [role="button"], input, select, textarea, [tabindex]')
    );

    const clickRecord = {
      page: window.location.pathname || '/',
      x: xPercent,
      y: yPercent,
      label: target.getAttribute('aria-label') || target.textContent?.slice(0, 40)?.trim() || target.tagName,
      interactive: isInteractive,
      viewportWidth: window.innerWidth,
      timestamp: Date.now()
    };

    if (window.localStorage) {
      const raw = localStorage.getItem(REAL_CLICKS_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(clickRecord);
      localStorage.setItem(REAL_CLICKS_STORAGE_KEY, JSON.stringify(list.slice(0, 300)));
    }
  } catch {
    // Ignore
  }
}

/**
 * Récupère les données réelles locales ou le jeu démo selon le mode choisi
 */
export function getAnalyticsDataset(mode = 'demo') {
  if (mode === 'demo') {
    return DEMO_ANALYTICS_DATA;
  }

  // Mode données réelles de navigation locale
  let realEvents = [];
  let realClicks = [];
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const rawEvents = localStorage.getItem(REAL_EVENTS_STORAGE_KEY);
      realEvents = rawEvents ? JSON.parse(rawEvents) : [];
      const rawClicks = localStorage.getItem(REAL_CLICKS_STORAGE_KEY);
      realClicks = rawClicks ? JSON.parse(rawClicks) : [];
    } catch {
      // Ignore
    }
  }

  const pageViews = realEvents.filter(e => e.name === 'page_view').length;
  const cvViews = realEvents.filter(e => e.name === 'open_cv_modal' || e.name === 'view_cv').length;
  const projectClicks = realEvents.filter(e => e.name === 'view_project' || e.name === 'click_case_study').length;
  const contactIntents = realEvents.filter(e => e.name.startsWith('click_contact_') || e.name.startsWith('contact_')).length;

  return {
    summary: {
      totalVisits: pageViews > 0 ? Math.ceil(pageViews / 2.5) : 1,
      uniqueVisitors: 1, // Visite locale actuelle
      pageViews: Math.max(pageViews, 1),
      avgDwellTime: '1 min 15 s',
      bounceRate: '0.0 %',
      engagementRate: '100 %',
      activeSessionsNow: 1,
      vsPreviousPeriod: {
        visits: '+0.0 %',
        uniques: '+0.0 %',
        pageViews: '+0.0 %',
        engagement: '+0.0 %'
      }
    },
    dailyTraffic: DEMO_ANALYTICS_DATA.dailyTraffic,
    trafficSources: [
      { name: 'Session locale de développement (localhost:5174)', visits: pageViews || 1, percent: 100, trend: 'Local' }
    ],
    devices: [
      { type: window.innerWidth > 1024 ? 'Desktop' : 'Mobile / Tablette', count: pageViews || 1, percent: 100 }
    ],
    topPages: [
      { path: window.location.pathname || '/', title: 'Page courante inspectée', views: pageViews || 1, avgTime: '1m', bounce: '0%' }
    ],
    caseStudiesPerformance: DEMO_ANALYTICS_DATA.caseStudiesPerformance,
    funnel: [
      { step: '1. Visiteurs locaux', count: 1, rate: '100 %', description: 'Session courante de test' },
      { step: '2. Découverte Projets', count: projectClicks || 1, rate: '100 %', description: 'Études de cas consultées' },
      { step: '3. Consultation du CV', count: cvViews, rate: cvViews > 0 ? '100 %' : '0 %', description: 'Ouverture du CV' },
      { step: '4. Intention de contact', count: contactIntents, rate: contactIntents > 0 ? '100 %' : '0 %', description: 'Clics contact' }
    ],
    contactIntentions: DEMO_ANALYTICS_DATA.contactIntentions,
    scrollmap: DEMO_ANALYTICS_DATA.scrollmap,
    heatmapClicks: realClicks.length > 0 ? realClicks : DEMO_ANALYTICS_DATA.heatmapClicks,
    webVitals: DEMO_ANALYTICS_DATA.webVitals
  };
}

/**
 * Exportation des données au format CSV
 */
export function exportAnalyticsToCsv(dataset) {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Categorie,Indicateur,Valeur,Note\n";

  // Résumé
  csvContent += `Resume,Total Visites,${dataset.summary.totalVisits},30 derniers jours\n`;
  csvContent += `Resume,Visiteurs Uniques,${dataset.summary.uniqueVisitors},Estime sans fingerprinting\n`;
  csvContent += `Resume,Pages Vues,${dataset.summary.pageViews},Total cumule\n`;
  csvContent += `Resume,Temps Moyen,${dataset.summary.avgDwellTime},Dwell time\n`;

  // Réalisations
  dataset.caseStudiesPerformance.forEach(cs => {
    csvContent += `Projets,${cs.name},${cs.views} vues / ${cs.detailOpens} ouvertures,Engagement: ${cs.engagement}\n`;
  });

  // Intentions de contact
  dataset.contactIntentions.forEach(ci => {
    csvContent += `Conversions,${ci.label},${ci.count},${ci.note}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `room241_analytics_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

