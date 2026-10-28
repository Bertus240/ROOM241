// =========================================================================
// DONNÉES ÉDITORIALES CENTRALISÉES — STUDIO ROOM241 • RÉMI BROCART
// =========================================================================
// Source unique de vérité pour le profil, les expériences, les formations,
// les compétences vérifiées et les coordonnées de Rémi Brocart.
// =========================================================================

export const profileData = {
  // 1. IDENTITÉ DU STUDIO ET INFORMATIONS PERSONNELLES
  identity: {
    name: "Rémi Brocart",
    brand: "Studio ROOM241",
    role: "Graphic Designer & Direction artistique",
    tagline: "Design graphique, scénographie de stands & production de contenus de terrain.",
    location: "Métropole Européenne de Lille / Erquinghem-Lys (Véhiculé)",
    status: "Disponible immédiatement · CDI & Collaborations",
    avatar: "/assets/remi-brocart-2026.png",
    logoBlack: "/assets/logos/430x95_Framer_Black@4x.png",
    logoWhite: "/assets/logos/430x95_Framer_white@4x.png",
    logoMark: "/assets/logos/1920x1080_R241_NO_BG.png",
    links: {
      email: "brocart.remi02@gmail.com",
      phone: "+33624074149",
      phoneFormatted: "+33 (0)6 24 07 41 49",
      linkedin: "https://www.linkedin.com/in/remibrocart/",
      linkedinDisplay: "linkedin.com/in/remibrocart"
    }
  },

  // 2. PRÉSENTATION & MANIFESTE ÉDITORIAL (CHRONOLOGIE STRICTE ET EXACTE)
  manifesto: {
    title: "L'image, le terrain & la rigueur de l'effort.",
    hook: "Une pratique du design ancrée dans le réel, où la rigueur logique rencontre la créativité opérationnelle.",
    paragraphs: [
      "Après un parcours en Sciences de l’Ingénieur, je me suis orienté vers le marketing, la communication et le digital à l’ISEG Lille. Aujourd’hui, je travaille sur des projets qui mêlent identité visuelle, création vidéo et expérience de marque. Du stand événementiel aux contenus réalisés sur le terrain, j’aime donner forme aux idées et les rendre concrètes.",
      "Je privilégie le concret. De l'habillage de stands de plus de 150 m² lors de salons internationaux en cybersécurité à la création d'animations motion design sur After Effects, en passant par l'incarnation de marque et la captation vidéo, je m'assure que chaque projet tienne ses promesses une fois déployé dans le réel."
    ],
    pillars: [
      {
        label: "Culture scientifique & stratégique",
        desc: "Rigueur cartésienne consolidée par la vision stratégique de marque (Master ISEG Lille)."
      },
      {
        label: "Conception & exécution de terrain",
        desc: "De la réflexion de marque aux stands d'envergure européenne (> 150 m²) et au motion design After Effects."
      },
      {
        label: "Discipline athlétique",
        desc: "Marathonien en 2 h 48 min 25 s : constance, gestion de l'effort et préparation méthodique."
      }
    ]
  },

  // 3. EXPÉRIENCES PROFESSIONNELLES RIGORISTES ET FACTUELLES
  experiences: [
    {
      id: "hornetsecurity-cdi",
      role: "Graphic Designer & Brand Production",
      company: "Hornetsecurity by Proofpoint",
      type: "Poste CDI",
      period: "Septembre 2025 – Octobre 2026",
      location: "Lille • Salons européens (Nuremberg, Hanovre)",
      context: "Leader européen de la cybersécurité Cloud. Travail quotidien en anglais au sein d'une équipe de design internationale.",
      highlights: [
        {
          title: "Stands & Scénographie européenne",
          desc: "Conception graphique et habillage de stands événementiels européens, notamment le stand de plus de 150 m² au Forum InCyber (FIC) à Lille Grand Palais, ainsi qu'au salon it-sa à Nuremberg. Collaboration avec les prestataires techniques."
        },
        {
          title: "Arche vidéo d'accueil (After Effects)",
          desc: "Réalisation complète en motion design sur After Effects de l'animation vidéo diffusée sur l'arche vidéo LED du stand à l'entrée du FIC 2025 (boucle d'accueil et transition de co-branding, la structure métallique étant assurée par les prestataires scéniques)."
        },
        {
          title: "Design Sprint de 36 h à Hanovre & Héros Helix Nova",
          desc: "Participation en équipe bilingue sous forte contrainte de temps au Design Sprint de 36 heures : développement du concept, histoire du personnage, travail sur la création du personnage 3D, écriture des contenus et montage vidéo."
        },
        {
          title: "Incarnation de Captain Security",
          desc: "Incarnation en costume du personnage sur scène plénière et dans les allées des salons professionnels (FIC, it-sa), créant un contact direct mémorable avec le public."
        },
        {
          title: "Supports B2B & Campagnes marketing",
          desc: "Campagnes Paid Ads comparatives, fiches techniques d'aide à la vente, visuels webinaires et supports imprimés."
        }
      ],
      resultCollective: "Plus de 4 000 contacts B2B recueillis en 3 jours sur le stand au FIC (résultat collectif de l'événement)."
    },
    {
      id: "vade-hornetsecurity-alternance",
      role: "Chargé de marque employeur",
      company: "Vade, puis Hornetsecurity",
      type: "Alternance Master",
      period: "Septembre 2023 – Août 2025",
      location: "Métropole lilloise",
      context: "Accompagnement de la transition de marque suite au rachat de Vade par Hornetsecurity, en lien direct avec les équipes RH et communication.",
      highlights: [
        {
          title: "Campagnes de recrutement métiers techniques",
          desc: "Conception de campagnes de communication pour attirer des profils techniques pointus (ingénieurs détection de menaces, développeurs)."
        },
        {
          title: "Employee Advocacy sur LinkedIn",
          desc: "Structuration du programme d'ambassadeurs internes et accompagnement individuel des collaborateurs pour valoriser leur prise de parole."
        },
        {
          title: "Séminaires internes & Cohésion",
          desc: "Organisation et communication autour de séminaires et événements internes pour accompagner la transition post-acquisition."
        }
      ]
    },
    {
      id: "studio-room241-freelance",
      role: "Freelance en communication et design",
      company: "Studio ROOM241",
      type: "Activité indépendante (Freelance)",
      period: "Depuis Octobre 2024",
      location: "Région Hauts-de-France & National",
      context: "Accompagnement opérationnel de projets reliant réflexion stratégique, création graphique et exécution de terrain.",
      highlights: [
        {
          title: "Fresh Data (Retail Data & Veille) — Campagne Ulule & Salon MEDFEL",
          desc: "Contribution à la visibilité de la campagne Ulule (validée à 116 %), actions radio et captation vidéo d'interviews au salon international MEDFEL ayant ouvert des conversations qualifiées avec Auchan, Grand Frais et E.Leclerc."
        },
        {
          title: "Résin'Architecte (BTP Haut de Gamme) — Communication & Terrain",
          desc: "Adaptation et formalisation de l'identité visuelle existante, création de modèles réutilisables pour les réseaux sociaux, fiches d'aide à la vente (règle des 8 mm), captation vidéo directe et documentation de 8 projets de chantier."
        }
      ]
    },
    {
      id: "sencrop-communication",
      role: "Community Manager stagiaire",
      company: "Sencrop",
      type: "Stage",
      period: "Stage conventionné",
      location: "Lille",
      context: "Entreprise européenne de stations météo connectées et de solutions d'agriculture de précision.",
      highlights: [
        {
          title: "Participation à la stratégie éditoriale",
          desc: "Contribution au planning de publication et à la valorisation des usages agricoles connectés."
        },
        {
          title: "Gestion et animation des réseaux sociaux",
          desc: "Animation de la communauté et création de visuels et contenus digitaux."
        }
      ]
    }
  ],

  // 4. FORMATION ACADÉMIQUE (CHRONOLOGIE EXACTE)
  education: [
    {
      degree: "Master Marketing, communication et digital",
      institution: "ISEG Lille",
      period: "2023 — 2025",
      field: "Stratégie de marque, communication globale & business",
      description: "Vision stratégique globale, positionnement concurrentiel, architecture de marque et pilotage de projets de communication digitaux et événementiels."
    },
    {
      degree: "Baccalauréat Scientifique (Sciences de l'Ingénieur)",
      institution: "Sciences de l'Ingénieur",
      period: "Mention Bien · 2020",
      field: "Rigueur logique, analyse & méthode",
      description: "Formation scientifique axée sur la méthode, la résolution de problèmes, la modélisation et la rigueur dans la gestion des contraintes techniques."
    },
    {
      degree: "Brevet d'Aptitude aux Fonctions d'Animateur (BAFA)",
      institution: "Animation & Pédagogie",
      period: "2019",
      field: "Pédagogie, animation & dynamique d'équipe",
      description: "Sens du collectif, prise de parole en public, écoute active et encadrement d'équipe."
    }
  ],

  // 5. COMPÉTENCES VÉRIFIÉES EN 3 GROUPES STRICTS (ZÉRO TECHNOLOGIE DEV / AUCUN CODE INVENTÉ)
  skills: {
    // A. Compétences métier
    business: [
      "Direction artistique & Identités de marque",
      "Scénographie événementielle & Stands (> 150 m²)",
      "Motion design & Animation After Effects",
      "Stratégie éditoriale & Création de contenus",
      "Production vidéo & Captations de terrain",
      "Supports commerciaux & Fiches techniques (Sales Enablement)"
    ],
    // B. Logiciels et outils créatifs
    software: [
      "Adobe Illustrator (Design vectoriel, logos, chartes)",
      "Adobe Photoshop (Retouche photo, compositing)",
      "Adobe InDesign (Édition, fiches techniques, print)",
      "Adobe Premiere Pro (Montage vidéo, titrages, rythme)",
      "Adobe After Effects (Animation graphique, boucles LED)",
      "Figma (Design system & maquettes d'interfaces)"
    ],
    // C. Outils d'Intelligence Artificielle (Usages professionnels documentés)
    aiTools: [
      {
        name: "ChatGPT (OpenAI)",
        usage: "Recherche documentaire, structuration de plans d'action et reformulation éditoriale."
      },
      {
        name: "Claude (Anthropic)",
        usage: "Analyse textuelle approfondie, relecture critique de contenus et synthèse conceptuelle."
      },
      {
        name: "Gemini (Google)",
        usage: "Exploration créative, veille d'informations et structuration de données de projets."
      }
    ]
  },

  // 6. ENDURANCE ATHLÉTIQUE & MARATHON
  athleticProof: {
    event: "Wizz Air Venice Marathon",
    date: "26 octobre 2025",
    distance: "42,195 km",
    officialChrono: "2 h 48 min 25 s",
    pace: "3'59 / km de moyenne",
    percentile: "Top 1% amateur",
    image: "/assets/autres/marathon6.jpg",
    narrative: "Courir un marathon en 2 h 48 min 25 s, c’est surtout des mois d’entraînement, des sorties par tous les temps et beaucoup de régularité. Il faut apprendre à gérer son effort, à tenir son allure et à continuer même quand les jambes commencent à peser.\n\nJ’y retrouve quelque chose qui me parle aussi dans la création : avancer avec méthode, accepter que tout ne se passe pas comme prévu et rester concentré jusqu’au bout. Le résultat compte, bien sûr, mais il représente surtout tout le travail réalisé en amont."
  }
};
