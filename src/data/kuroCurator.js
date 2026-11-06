// src/data/kuroCurator.js
// Référentiel des notes de curation d'atelier et de première rencontre de Kuro
// Studio ROOM241 • Rémi Brocart
// 100% vérifié et basé sur les réalisations et le parcours réels de Rémi Brocart.

export const KURO_INTRO = {
  badge: "PREMIÈRE RENCONTRE",
  greeting: "Salut, moi c'est Kuro.",
  message: "Je suis là pour vous faire découvrir l'univers de Rémi, vous montrer les coulisses de ses projets et vous aider à comprendre ce qui se cache derrière chaque réalisation.",
  primaryActionLabel: "Découvrir une réalisation",
  skipActionLabel: "Explorer librement",
  image: "/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg",
  imageCaption: "Stand d'envergure (> 150 m²) • Forum InCyber Lille",
  target: "highlight",
  fallbackPath: "/realisations/hornetsecurity",
};

export const KURO_NOTES = {
  // 1. ACCUEIL (HOME)
  home: [
    {
      id: 'home_highlight',
      badge: "COULISSES D'ATELIER",
      hook: "Vous voulez voir comment une idée devient un projet concret ?",
      title: "Scénographie & flux réels (> 150 m²)",
      text: "Avant de poser les éléments graphiques, Rémi est parti des contraintes de circulation du salon. Découvrez comment le stand a orienté les visiteurs et accueilli les échanges professionnels.",
      image: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      imageCaption: "Scénographie in situ • Zénith de Lille",
      actionLabel: "Voir le stand en détail",
      actionType: 'scroll',
      target: 'highlight',
      fallbackPath: '/realisations/hornetsecurity',
    },
    {
      id: 'home_terrain',
      badge: "SAVOIR-FAIRE DE TERRAIN",
      hook: "Pas de 3D artificielle : l'authenticité brute du geste technique.",
      title: "Valoriser le métier d'artisan sur chantier",
      text: "Pour Résin'Architecte, 2 jours complets de tournage caméra au poing ont valorisé le geste de l'artisan et généré +219 % de portée organique sans achat média.",
      image: '/assets/social-proof-ra/post_pool_craft.png',
      imageCaption: "Résin'Architecte • +219 % portée organique",
      actionLabel: "Explorer le cas Résin'Architecte",
      actionType: 'nav',
      fallbackPath: '/realisations/resin-architecte',
    },
    {
      id: 'home_video',
      badge: "PRÉSENTATION VIDÉO",
      hook: "Vous préférez découvrir Rémi directement en vidéo ?",
      title: "Une minute pour faire connaissance",
      text: "Film de présentation où Rémi synthétise sa démarche : comprendre le contexte métier, concevoir des solutions graphiques et assurer le suivi jusqu'au terrain.",
      image: '/assets/video-pitch-remi.jpg',
      imageCaption: "Film de présentation",
      actionLabel: "Lancer la vidéo de présentation",
      actionType: 'scroll',
      target: 'presentation-video',
      fallbackPath: '/realisations/jardimax',
    },
  ],

  // 2. PROJETS (GALERIE CONTINUE)
  projects: [
    {
      id: 'projects_overview',
      badge: "SÉLECTION ÉDITORIALE",
      hook: "4 contextes réels, 4 réponses sur-mesure.",
      title: "Des contextes exigeants et variés",
      text: "De la scénographie internationale en cybersécurité au crowdfunding Ulule financé à 116 %, chaque étude de cas documente des livrables et résultats réels.",
      image: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      imageCaption: "4 études de cas documentées",
      actionLabel: "Voir le stand FIC Lille",
      actionType: 'nav',
      fallbackPath: '/realisations/hornetsecurity',
    },
    {
      id: 'projects_video_focus',
      badge: "PRODUCTION VIDÉO",
      hook: "Capter l'attention dans des environnements denses.",
      title: "Motion design & formats courts",
      text: "Animations After Effects pour arches d'entrée LED, interviews en salon ou formats 9:16 : la vidéo est pensée pour valoriser le message avec justesse.",
      image: '/assets/jardimax/jardimax_cover.jpg',
      imageCaption: "Montages multiformats 16:9 & 9:16",
      actionLabel: "Voir la démonstration Jardimax",
      actionType: 'nav',
      fallbackPath: '/realisations/jardimax',
    },
  ],

  // 3. PARCOURS (PROFIL, MÉTHODE & CV)
  parcours: [
    {
      id: 'parcours_method',
      badge: "PARCOURS & MÉTHODE",
      hook: "Master ISEG Lille & expérience de terrain en cybersécurité.",
      title: "Rigueur de méthode & vision de marque",
      text: "Deux ans d'alternance puis un an en CDI chez le leader européen de la cybersécurité Cloud, nourris par la discipline d'athlète : sens de l'analyse et créativité de terrain.",
      image: '/assets/remi-brocart-2026.png',
      imageCaption: "Rémi Brocart • Master ISEG Lille",
      actionLabel: "Consulter le CV synthétique",
      actionType: 'cv',
      fallbackPath: '/parcours',
    },
  ],

  // 4. ÉTUDE DE CAS : HORNETSECURITY (FIC)
  hornetsecurity: [
    {
      id: 'fic_arch',
      badge: "DÉMARCHE SCÉNOGRAPHIQUE",
      hook: "Derrière ce stand de plus de 150 m², il y a un travail de conception des espaces.",
      title: "Scénariser l'accueil dès l'entrée",
      text: "L'arche LED monumentale à l'entrée du stand diffuse une boucle After Effects synchronisée pour interpeller les visiteurs dans les allées denses du Forum InCyber.",
      image: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      imageCaption: "Stand FIC Lille • Scénographie & boucle After Effects",
      actionLabel: "Voir la fiche détaillée",
      actionType: 'nav',
      fallbackPath: '/realisations/hornetsecurity',
    },
  ],

  // 5. ÉTUDE DE CAS : RÉSIN'ARCHITECTE
  'resin-architecte': [
    {
      id: 'resin_craft',
      badge: "STRATÉGIE ÉDITORIALE",
      hook: "Ici, le travail ne s'arrête pas aux visuels.",
      title: "Construire une présence éditoriale cohérente",
      text: "Plutôt que des visuels 3D froids, Rémi a filmé le geste précis de pose de moquette de marbre. Une valorisation sincère qui a généré +219 % de portée organique sans achat média.",
      image: '/assets/social-proof-ra/post_pool_craft.png',
      imageCaption: "Immersion terrain • 2 chantiers réels",
      actionLabel: "Voir les réalisations de terrain",
      actionType: 'nav',
      fallbackPath: '/realisations/resin-architecte',
    },
  ],

  // 6. ÉTUDE DE CAS : FRESH DATA
  'fresh-data': [
    {
      id: 'fresh_data_crowdfunding',
      badge: "IDENTITÉ & CAMPAGNE",
      hook: "Co-construire une marque aux côtés du fondateur.",
      title: "Ulule validé à 116 %",
      text: "Création complète de l'identité de marque, captation vidéo au salon MEDFEL et accompagnement de campagne participative pour poser les bases de la marque.",
      image: '/assets/fresh-data-video-cover.jpg',
      imageCaption: "Identité de marque & campagne Ulule",
      actionLabel: "Découvrir le projet Fresh Data",
      actionType: 'nav',
      fallbackPath: '/realisations/fresh-data',
    },
  ],

  // 7. ÉTUDE DE CAS : JARDIMAX
  jardimax: [
    {
      id: 'jardimax_exercise',
      badge: "DÉMONSTRATION EN RECRUTEMENT",
      hook: "Un exercice créatif réalisé en une seule journée.",
      title: "Script didactique & double format",
      text: "Exercice créatif réalisé dans le cadre d'un processus de recrutement : vulgarisation technique sur la réparabilité, tournage face caméra et double montage multiformat 16:9 / 9:16.",
      image: '/assets/jardimax/jardimax_cover.jpg',
      imageCaption: "Exercice vidéo • 1 journée de travail",
      actionLabel: "Voir les formats vidéo",
      actionType: 'nav',
      fallbackPath: '/realisations/jardimax',
    },
  ],

  // 8. UNIVERS PERSONNEL (HORS-CADRE)
  'hors-cadre': [
    {
      id: 'hors_cadre_discipline',
      badge: "DISCIPLINE & ENDURANCE",
      hook: "Ce qui se forge loin des écrans.",
      title: "Constance et préparation méthodique",
      text: "Marathon de Venise bouclé en 2 h 48 min 25 s : l'exigence de l'entraînement d'endurance nourrit directement la rigueur appliquée aux projets du studio.",
      image: '/assets/autres/marathon6.jpg',
      imageCaption: "Marathon de Venise • 2 h 48 min 25 s",
      actionLabel: "Retourner au studio professionnel",
      actionType: 'nav',
      fallbackPath: '/',
    },
  ],
};

/**
 * Résout la liste des notes pertinentes pour le chemin actuel
 */
export function getKuroNotesForPath(pathname) {
  if (!pathname || pathname === '/') return KURO_NOTES.home;
  if (pathname.startsWith('/projets') || pathname.startsWith('/realisations')) {
    const slug = pathname.replace('/projets/', '').replace('/realisations/', '').replace('/projets', '').replace('/realisations', '');
    if (slug && KURO_NOTES[slug]) {
      return KURO_NOTES[slug];
    }
    return KURO_NOTES.projects;
  }
  if (pathname.startsWith('/parcours') || pathname.startsWith('/a-propos')) {
    return KURO_NOTES.parcours;
  }
  if (pathname.startsWith('/hors-cadre') || pathname.startsWith('/au-dela-du-travail')) {
    return KURO_NOTES['hors-cadre'];
  }
  return KURO_NOTES.home;
}
