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
    location: "Métropole Européenne de Lille",
    status: "Disponible immédiatement · CDI & Collaborations",
    avatar: "/assets/remi-brocart-2026.png",
    logoBlack: "/assets/logos/430x95_Framer_Black@4x.png",
    logoWhite: "/assets/logos/430x95_Framer_white@4x.png",
    logoMark: "/assets/logos/1920x1080_R241_NO_BG.png",
    links: {
      email: "brocart.remi02@gmail.com",
      phone: "+33767123858",
      phoneFormatted: "07 67 12 38 58",
      linkedin: "https://www.linkedin.com/in/remibrocart/",
      linkedinDisplay: "linkedin.com/in/remibrocart"
    }
  },

  // 2. PRÉSENTATION & MANIFESTE ÉDITORIAL (CHRONOLOGIE STRICTE ET EXACTE)
  manifesto: {
    title: "Comprendre. Concevoir. Produire.",
    hook: "Une pratique du design ancrée dans le réel, où la rigueur stratégique rencontre l'exécution concrète de terrain.",
    paragraphs: [
      "Diplômé du Master de l'ISEG Lille, j'articule vision stratégique de marque, direction artistique et production de terrain. Mon approche repose sur une exigence simple : comprendre le contexte métier et les flux, concevoir des réponses visuelles justes, et les fabriquer sans déperdition.",
      "De la scénographie de stands de plus de 150 m² lors de salons internationaux en cybersécurité aux animations After Effects pour arches LED, de la captation sur le terrain au montage de formats 16:9 et 9:16, je conçois des expériences visuelles pensées pour leurs conditions réelles de diffusion et d'utilisation."
    ],
    pillars: [
      {
        label: "Comprendre : Cadrage & méthode",
        desc: "Analyse des flux réels, contraintes techniques d'exposition et vision de marque (Master ISEG Lille)."
      },
      {
        label: "Concevoir : Direction artistique & espace",
        desc: "Scénographie de stands d'envergure (> 150 m²), identités visuelles et écriture de récits de marque."
      },
      {
        label: "Produire : Exécution terrain & discipline",
        desc: "Animation After Effects, prises de vues directes et rigueur d'effort issue de la préparation marathon (2 h 48 min 25 s)."
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
          desc: "Création de l'univers visuel et des supports de communication aux côtés du fondateur Marc-Henri Blarel : campagne Ulule validée à 116 %, visuels radio, captation vidéo au salon MEDFEL et supports d'aide à la vente B2B."
        },
        {
          title: "Résin'Architecte (Revêtements de sol en résine) — Communication & Terrain",
          desc: "Solutions de revêtements de sol en résine pour espaces intérieurs et extérieurs (moquette de pierre, moquette de marbre, résines drainantes, EPDM, revêtements sur béton). Formalisation de l'identité visuelle, modèles éditoriaux pour les réseaux sociaux, fiches d'aide à la vente et captation vidéo directe sur chantiers."
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
      level: "Master",
      field: "Stratégie de marque, communication globale & business",
      description: "Vision stratégique globale, positionnement concurrentiel, architecture de marque et pilotage de projets de communication digitaux et événementiels."
    },
    {
      degree: "Bachelor Marketing, communication & digital",
      institution: "ISEG Lille",
      period: "2020 — 2023",
      level: "Bachelor / Licence",
      field: "Marketing, communication & digital",
      description: "Fondations en stratégie de marque, marketing international, projets digitaux, droit des technologies et masterclass professionnelles.",
      associations: [
        {
          name: "EPEE — Association de promotion de l'ISEG Lille",
          role: "Ambassadeur Campus"
        },
        {
          name: "The View — Association audiovisuelle de l'ISEG Lille",
          role: "Engagement dans l'association audiovisuelle de l'école"
        }
      ],
      courses: [
        "Stratégies de marque, communication & innovations",
        "Marketing international",
        "Outils numériques & projets digitaux",
        "Business English & débats en anglais",
        "Plan marketing & marketing sectoriel",
        "Droit des nouvelles technologies",
        "Arts & Culture",
        "Masterclass professionnelles"
      ]
    },
    {
      degree: "Baccalauréat Scientifique (Sciences de l'Ingénieur)",
      institution: "Lycée — Filière scientifique",
      period: "2020",
      level: "Baccalauréat",
      field: "Rigueur logique, analyse & méthode",
      description: "Formation scientifique axée sur la méthode, la résolution de problèmes, la modélisation et la rigueur dans la gestion des contraintes techniques."
    },
    {
      degree: "Brevet d'Aptitude aux Fonctions d'Animateur (BAFA)",
      institution: "Animation & Pédagogie",
      period: "2019",
      level: "Brevet",
      field: "Pédagogie, animation & dynamique d'équipe",
      description: "Sens du collectif, prise de parole en public, écoute active et encadrement d'équipe."
    }
  ],

  // 5. COMPÉTENCES VÉRIFIÉES EN 3 GROUPES STRICTS (ZÉRO TECHNOLOGIE DEV / AUCUN CODE INVENTÉ)
  skills: {
    // A. Compétences métier
    business: [
      "Direction artistique & Identités de marque",
      "Scénographie événementielle : grands stands (> 150 m²) et formats compacts",
      "Motion design & Animation After Effects",
      "Stratégie éditoriale & Création de contenus",
      "Production vidéo & Captations de terrain",
      "Supports commerciaux & Fiches techniques (Sales Enablement)"
    ],
    // B. Social Media Management
    socialMedia: [
      "Stratégie de présence sur les réseaux sociaux",
      "Lignes éditoriales",
      "Calendriers de publication",
      "Création et adaptation de contenus",
      "Copywriting et design visuel",
      "Montage vidéo court",
      "Planification",
      "Gestion des comptes et animation de communauté",
      "Suivi des performances",
      "Analyse et optimisation éditoriale"
    ],
    // C. Logiciels et outils créatifs
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
