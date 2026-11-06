import {
  Film,
  Palette,
  Laptop,
  Zap,
  Layers,
  FileText,
  Moon,
  Mail,
} from 'lucide-react';

/**
 * Dictionnaire structuré des écrans et arborescences de navigation de Kuro
 * Compagnon interactif du Studio ROOM241
 */
export const SCREENS = {
  home: {
    id: 'home',
    tag: 'Kuro • Guide interactif',
    title: "Et toi, qu'est-ce que tu aimerais découvrir ?",
    text: "Moi, c’est Kuro. Je t'accompagne à travers les réalisations et les coulisses du travail de Rémi. Choisis un univers créatif ou une étude de cas précise :",
    categories: [
      {
        id: 'category_motion',
        icon: Film,
        emoji: '',
        title: 'Vidéo & Motion',
        subtitle: 'Formats courts, TikTok & habillages',
        badge: '2 études',
      },
      {
        id: 'category_branding',
        icon: Palette,
        emoji: '',
        title: 'Identité de marque',
        subtitle: 'Systèmes graphiques, print & stands',
        badge: '3 études',
      },
      {
        id: 'category_web',
        icon: Laptop,
        emoji: '',
        title: 'Web & Digital',
        subtitle: 'Interfaces réactives & simulateurs',
        badge: '2 études',
      },
      {
        id: 'all_projects',
        icon: Zap,
        emoji: '',
        title: 'Un projet en particulier',
        subtitle: 'Sélection directe parmi les 4 cas',
        badge: '4 projets',
      },
    ],
    shortcuts: [
      {
        label: "Tous les univers",
        screen: 'categories',
        highlight: false,
      },
      {
        label: "L'envers du décor ↗",
        screen: 'invitation_personal',
        highlight: true,
      },
      {
        label: "Destinations",
        screen: 'destinations',
        highlight: false,
      },
    ],
  },

  categories: {
    id: 'categories',
    tag: 'Univers créatifs',
    title: 'Les univers créatifs de Rémi',
    text: 'Explore le travail de Rémi à travers ses domaines d’expertise clés :',
    categories: [
      {
        id: 'category_motion',
        icon: Film,
        emoji: '',
        title: 'Vidéo & Motion',
        subtitle: 'Formats courts, TikTok & habillages',
        badge: '2 études',
      },
      {
        id: 'category_branding',
        icon: Palette,
        emoji: '',
        title: 'Identité de marque',
        subtitle: 'Systèmes graphiques, print & stands',
        badge: '3 études',
      },
      {
        id: 'category_web',
        icon: Laptop,
        emoji: '',
        title: 'Web & Digital',
        subtitle: 'Interfaces réactives & simulateurs',
        badge: '2 études',
      },
      {
        id: 'all_projects',
        icon: Zap,
        emoji: '',
        title: 'Un projet en particulier',
        subtitle: 'Sélection directe parmi les 4 cas',
        badge: '4 projets',
      },
    ],
  },

  category_motion: {
    id: 'category_motion',
    tag: 'Vidéo & Motion',
    title: 'Formats courts, Vidéo & Motion',
    text: 'De la captation terrain au motion design rythmé : Rémi conçoit des productions vidéo à fort impact, des scripts dynamiques et des habillages calibrés pour capter l’attention.',
    projects: [
      {
        slug: 'jardimax',
        title: 'Jardimax',
        badge: 'Démonstration créative',
        role: 'Concept vidéo & motion design (Recrutement)',
        screen: 'project_jardimax',
        path: '/realisations/jardimax',
      },
      {
        slug: 'hornetsecurity',
        title: 'Hornetsecurity',
        badge: 'Salons Europe',
        role: 'Captation vidéo & motion B2B',
        screen: 'project_hornetsecurity',
        path: '/realisations/hornetsecurity',
      },
    ],
    categoryLink: {
      label: 'Explorer la galerie de projets',
      path: '/projets',
    },
  },

  category_branding: {
    id: 'category_branding',
    tag: 'Identité de marque',
    title: 'Design graphique & Systèmes de marque',
    text: 'Des identités pérennes et rigoureuses conçues par Rémi et déployées sur tous les points de contact : stands grands formats, édition papier et supports commerciaux.',
    projects: [
      {
        slug: 'hornetsecurity',
        title: 'Hornetsecurity',
        badge: 'FIC >150 m²',
        role: 'Stands internationaux & édition B2B',
        screen: 'project_hornetsecurity',
        path: '/realisations/hornetsecurity',
      },
      {
        slug: 'resin-architecte',
        title: "Résin'Architecte",
        badge: 'Terrain',
        role: 'Identité visuelle & chantiers',
        screen: 'project_resin',
        path: '/realisations/resin-architecte',
      },
      {
        slug: 'fresh-data',
        title: 'Fresh Data',
        badge: 'Fintech B2B',
        role: 'Identité de marque & charte digitale',
        screen: 'project_freshdata',
        path: '/realisations/fresh-data',
      },
    ],
    categoryLink: {
      label: 'Explorer la galerie de projets',
      path: '/projets',
    },
  },

  category_web: {
    id: 'category_web',
    tag: 'Web & Digital',
    title: 'Interfaces, UI/UX & Intégration',
    text: 'Des expériences numériques fluides et réactives, pensées par Rémi pour la clarté, la réassurance et la conversion.',
    projects: [
      {
        slug: 'fresh-data',
        title: 'Fresh Data',
        badge: 'Plateforme Web',
        role: 'Interface utilisateur & simulateur interactif',
        screen: 'project_freshdata',
        path: '/realisations/fresh-data',
      },
      {
        slug: 'hornetsecurity',
        title: 'Hornetsecurity',
        badge: 'Digital B2B',
        role: 'Carrousels LinkedIn & campagnes web',
        screen: 'project_hornetsecurity',
        path: '/realisations/hornetsecurity',
      },
    ],
    categoryLink: {
      label: 'Explorer la galerie de projets',
      path: '/projets',
    },
  },

  all_projects: {
    id: 'all_projects',
    tag: 'Sélection de projets',
    title: 'Les 4 études de cas phares',
    text: 'Sélectionne un projet pour consulter sa synthèse ou ouvrir directement son étude de cas détaillée :',
    projects: [
      {
        slug: 'hornetsecurity',
        emoji: '',
        title: 'Hornetsecurity',
        tagline: 'Cybersécurité B2B, stand FIC >150 m² & design 360°',
        screen: 'project_hornetsecurity',
        path: '/realisations/hornetsecurity',
      },
      {
        slug: 'fresh-data',
        emoji: '',
        title: 'Fresh Data',
        tagline: 'Plateforme fintech & simulateur de trésorerie',
        screen: 'project_freshdata',
        path: '/realisations/fresh-data',
      },
      {
        slug: 'resin-architecte',
        emoji: '',
        title: "Résin'Architecte",
        tagline: 'Revêtements en résine & identité de terrain',
        screen: 'project_resin',
        path: '/realisations/resin-architecte',
      },
      {
        slug: 'jardimax',
        emoji: '',
        title: 'Jardimax',
        tagline: 'Démonstration créative & formats vidéo 16:9 / 9:16',
        screen: 'project_jardimax',
        path: '/realisations/jardimax',
      },
    ],
    categoryLink: {
      label: 'Explorer la galerie de projets',
      path: '/projets',
    },
  },

  project_hornetsecurity: {
    id: 'project_hornetsecurity',
    tag: 'Hornetsecurity',
    title: 'Hornetsecurity',
    subtitle: 'Leader européen de la cybersécurité Cloud',
    text: "Un accompagnement de fond sur 3 ans mené par Rémi : conception de pavillons d'exposition majeurs (stand de plus de 150 m² au FIC avec piste de karting, it-sa Nuremberg), édition commerciale B2B, formats courts motion et sprint créatif de 36h à Hanovre.",
    badge: '3 ans d’accompagnement',
    metrics: '+4 000 leads au FIC · Stand > 150 m²',
    path: '/realisations/hornetsecurity',
    nextScreen: 'project_freshdata',
    nextLabel: 'Projet suivant : Fresh Data →',
  },

  project_freshdata: {
    id: 'project_freshdata',
    tag: 'Fresh Data',
    title: 'Fresh Data',
    subtitle: 'Fintech & Financement de trésorerie B2B',
    text: "Rémi a conçu l'identité visuelle et l'interface de la plateforme web, avec un simulateur interactif pensé pour démocratiser l'affacturage moderne et rassurer les dirigeants de TPE/PME.",
    badge: 'Fintech B2B',
    metrics: 'Simulateur web · Identité complète',
    path: '/realisations/fresh-data',
    nextScreen: 'project_resin',
    nextLabel: "Projet suivant : Résin'Architecte →",
  },

  project_resin: {
    id: 'project_resin',
    tag: "Résin'Architecte",
    title: "Résin'Architecte",
    subtitle: 'Revêtements de sol en résine & moquette de pierre',
    text: 'Identité visuelle de terrain et supports de communication créés par Rémi pour un artisan spécialiste des sols en résine. Valorisation photographique des chantiers réels et crédibilité professionnelle.',
    badge: 'Artisanat & Terrain',
    metrics: 'Charte graphique · Présence terrain',
    path: '/realisations/resin-architecte',
    nextScreen: 'project_jardimax',
    nextLabel: 'Projet suivant : Jardimax →',
  },

  project_jardimax: {
    id: 'project_jardimax',
    tag: 'Jardimax',
    title: 'Jardimax',
    subtitle: 'Démonstration créative • Processus de recrutement',
    text: "Démonstration créative réalisée dans le cadre d'un processus de recrutement. Exploration d'un concept vidéo face caméra, vulgarisation technique et motion design didactique décliné en formats 16:9 et 9:16.",
    badge: 'Démonstration créative',
    metrics: 'Concept vidéo · Formats 16:9 & 9:16',
    path: '/realisations/jardimax',
    nextScreen: 'project_hornetsecurity',
    nextLabel: 'Projet suivant : Hornetsecurity →',
  },

  destinations: {
    id: 'destinations',
    tag: 'Destinations',
    title: 'Où souhaites-tu te rendre ?',
    text: 'Accède directement aux différentes sections du portfolio de Rémi :',
    actions: [
      { label: 'Mes projets', path: '/projets', desc: 'Galerie complète des réalisations', icon: Layers },
      { label: 'Mon parcours', path: '/parcours', desc: 'Expérience, compétences et CV', icon: FileText },
      { label: "L'envers du décor ↗", path: '/hors-cadre', isSwitchToDark: true, desc: 'Univers personnel & terrain', icon: Moon },
      { label: 'Me contacter', path: '#contact', isContact: true, desc: 'Échanger avec Rémi', icon: Mail },
    ],
  },

  invitation_personal: {
    id: 'invitation_personal',
    tag: "L'envers du décor",
    title: "L'envers du décor",
    text: "Tu as découvert une partie de son travail… mais il y a aussi tout ce qui se passe en dehors des projets. Tu veux jeter un œil à l'envers du décor ?",
    actions: [
      {
        label: "Découvrir l'envers du décor ↗",
        path: '/hors-cadre',
        isSwitchToDark: true,
        primary: true,
        desc: 'Mode sombre, terrain, sport & curiosités',
      },
      {
        label: 'Je préfère continuer à explorer',
        isBack: true,
        primary: false,
        desc: 'Revenir aux projets du studio',
      },
    ],
  },

  parcours: {
    id: 'parcours',
    tag: 'Mon parcours',
    title: 'Mon parcours & ma méthode',
    text: 'Un profil hybride associant direction artistique, stratégie de marque et culture technique : de la conception graphique à la production de terrain, avec une approche concrète du projet.',
    actions: [
      { label: 'Consulter le CV', isCv: true, primary: true, desc: 'Télécharger ou afficher le CV complet' },
      { label: 'Découvrir les projets', path: '/projets', primary: false, desc: 'Voir les cas concrets' },
      { label: "L'envers du décor", path: '/hors-cadre', isSwitchToDark: true, primary: false, desc: 'Univers personnel' },
    ],
  },

  horsCadre: {
    id: 'horsCadre',
    tag: 'Univers personnel',
    title: 'Bienvenue hors cadre',
    text: 'Climats du Nord, autonomie de terrain, régularité sportive et curiosité des systèmes. Ce qui nourrit la rigueur créative de Rémi au quotidien.',
    actions: [
      { label: 'Retrouver son travail', path: '/', isSwitchToPro: true, primary: true, desc: 'Retour au portfolio professionnel' },
      { label: 'Découvrir les projets', path: '/projets', isSwitchToPro: true, primary: false, desc: 'Galerie des réalisations' },
    ],
  },

  contact: {
    id: 'contact',
    tag: 'Contact direct',
    title: 'Échangeons ensemble',
    text: 'Une opportunité, un projet ou une question pour Rémi ? Parlons-en directement :',
    actions: [
      { label: 'Envoyer un email', isMail: true, primary: true, desc: 'brocart.remi02@gmail.com' },
      { label: 'Consulter le CV', isCv: true, primary: false, desc: 'Format PDF' },
    ],
  },
};

export default SCREENS;

