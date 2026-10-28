// =========================================================================
// DONNÉES ÉDITORIALES CENTRALISÉES — STUDIO ROOM241 • RÉMI BROCART
// =========================================================================
// Ce fichier est la source unique de vérité pour le profil, les expériences,
// les formations, les compétences et les coordonnées de Rémi Brocart.
// Modifiez ce fichier pour mettre à jour instantanément la page Parcours,
// le CV synthétique, le Footer et les composants associés.
// =========================================================================

export const profileData = {
  // 1. IDENTITÉ DU STUDIO ET INFORMATIONS PERSONNELLES
  identity: {
    name: "Rémi Brocart",
    brand: "Studio ROOM241",
    role: "Designer graphique & Direction artistique",
    tagline: "Design graphique, scénographie de marque & production de contenus.",
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

  // 2. PRÉSENTATION & MANIFESTE ÉDITORIAL
  manifesto: {
    title: "L'image, le terrain & la rigueur de l'effort.",
    hook: "Une pratique du design ancrée dans le réel, où la rigueur logique rencontre la créativité opérationnelle.",
    paragraphs: [
      "Avec Room241, j'aborde le design par la structure avant la forme. C'est le résultat d'un double parcours : une base en sciences de l'ingénieur pour la méthode et la gestion des contraintes, consolidée par un Master en marketing et communication à l'ISEG Lille pour la cohérence business.",
      "Je privilégie le concret. De l'habillage de stands de plus de 150 m² lors de salons internationaux en cybersécurité à la création d'animations motion design sur After Effects, en passant par l'incarnation de marque et la captation vidéo, je m'assure que chaque projet tienne ses promesses une fois déployé dans le réel."
    ],
    pillars: [
      {
        label: "Double profil hybride",
        desc: "Rigueur scientifique (Bac S SI) & vision stratégique business (Master ISEG Lille)."
      },
      {
        label: "Exécution 360° complète",
        desc: "De la réflexion stratégique au motion design After Effects et aux stands d'envergure européenne."
      },
      {
        label: "Discipline athlétique",
        desc: "Marathonien en 02h48'25 : culture de la constance, de la préparation et de l'exigence."
      }
    ]
  },

  // 3. EXPÉRIENCES PROFESSIONNELLES RIGORISTES ET FACTUELLES
  experiences: [
    {
      id: "hornetsecurity-cdi",
      role: "Graphic Designer Junior",
      company: "Hornetsecurity by Proofpoint",
      type: "Poste CDI",
      period: "Septembre 2025 – Octobre 2026",
      location: "Lille • Salons européens (Nuremberg, Londres, Hanovre)",
      context: "Leader européen de la cybersécurité Cloud. Travail quotidien en anglais au sein d'une équipe de design internationale basée principalement en Allemagne.",
      highlights: [
        {
          title: "Stands & Scénographie européenne",
          desc: "Conception graphique et habillage de stands événementiels européens, notamment le stand de plus de 150 m² au Forum InCyber (FIC) à Lille Grand Palais, ainsi qu'aux salons it-sa à Nuremberg et InfoSec à Londres. Coordination étroite avec les scénographes et prestataires techniques."
        },
        {
          title: "Arche vidéo d'accueil (After Effects)",
          desc: "Réalisation complète en motion design sur After Effects de l'animation vidéo diffusée sur l'arche vidéo LED du stand à l'entrée du FIC 2025 (boucle d'accueil et co-branding, la structure métallique physique étant assurée par les prestataires scéniques)."
        },
        {
          title: "Incarnation de Captain Security",
          desc: "Incarnation en costume du personnage héroïque de la marque sur la scène plénière et dans les allées du FIC et d'it-sa, créant un contact direct mémorable avec les congressistes."
        },
        {
          title: "Sprint de 36 h à Hanovre & Héros Helix Nova",
          desc: "Conception en équipe bilingue sous forte contrainte de temps de l'affiche de présentation et des supports graphiques du héros cyber 3D Helix Nova (univers distinct de Captain Security)."
        },
        {
          title: "Supports B2B & Système de certification",
          desc: "Campagnes Paid Ads comparatives (SharePoint vs Proofpoint), fiches techniques d'aide à la vente, refonte complète des 7 insignes officiels du programme partenaires B2B."
        }
      ],
      resultCollective: "Plus de 4 000 contacts qualifiés enregistrés collectivement par les équipes commerciales au FIC."
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
          title: "Attractivité RH & Recrutement de profils rares",
          desc: "Conception de campagnes d'attractivité pour attirer des profils techniques pointus en cybersécurité (ingénieurs détection de menaces, développeurs logiciels)."
        },
        {
          title: "Programme d'Employee Advocacy",
          desc: "Structuration d'un programme d'ambassadeurs internes et coaching individuel des collaborateurs pour valoriser leur prise de parole sur LinkedIn."
        },
        {
          title: "Séminaires internes & Culture d'entreprise",
          desc: "Organisation logistique des rassemblements d'équipes et renforcement de la cohésion interne post-acquisition."
        }
      ]
    },
    {
      id: "studio-room241-freelance",
      role: "Directeur Artistique & Graphiste indépendant",
      company: "Studio ROOM241",
      type: "Activité indépendante (Freelance)",
      period: "2024 – Présent",
      location: "Région Hauts-de-France & National",
      context: "Activité indépendante de design graphique, communication et direction artistique pour entreprises innovantes et artisans du bâtiment.",
      highlights: [
        {
          title: "Fresh Data (AgTech) — Campagne Ulule & Salon MEDFEL",
          desc: "Création de l'univers visuel validé par Marc-Henri Blarel, direction graphique de la campagne de financement participatif Ulule financée à 116 %, création des visuels pour passages radio et captation vidéo d'interviews au salon international MEDFEL ayant ouvert des discussions avec Auchan, Grand Frais et E.Leclerc."
        },
        {
          title: "Résin'Architecte (BTP Haut de Gamme) — Mise en valeur de chantiers",
          desc: "Captation vidéo sur chantier, formalisation de l'identité visuelle existante, gabarits éditoriaux réseaux sociaux, visuels avant/après et fiches techniques d'aide à la vente (+219 % de portée organique en 30 jours, 648 visites de profil, +209 % d'interactions, 0 € de publicité payante)."
        }
      ]
    },
    {
      id: "sencrop-communication",
      role: "Chargé de communication & Community Management",
      company: "Sencrop",
      type: "Expérience AgriTech B2B",
      period: "Missions AgriTech B2B",
      location: "Lille",
      context: "Entreprise européenne de stations météo connectées et de solutions connectées pour l'agriculture de précision.",
      highlights: [
        {
          title: "Community Management & Animation de communauté",
          desc: "Animation des réseaux sociaux et valorisation des retours d'expérience des agriculteurs et distributeurs B2B."
        },
        {
          title: "Communication de marque B2B",
          desc: "Création de contenus digitaux pédagogiques et diffusion des innovations technologiques de la station météo connectée."
        }
      ]
    }
  ],

  // 4. FORMATION ACADÉMIQUE
  education: [
    {
      degree: "Master Marketing, communication et digital",
      institution: "ISEG Lille",
      field: "Stratégie de marque, communication globale & business",
      description: "Apprentissage de la vision stratégique globale, du positionnement concurrentiel, de l'architecture de marque et du pilotage de projets de communication digitaux et événementiels."
    },
    {
      degree: "Baccalauréat Scientifique (Bac S SI)",
      institution: "Option Sciences de l'Ingénieur",
      field: "Rigueur logique, analyse & compréhension technique",
      description: "Formation cartésienne axée sur la résolution de problèmes, la modélisation spatiale 3D, la physique appliquée et la rigueur d'exécution sans approximation."
    },
    {
      degree: "Brevet d'Aptitude aux Fonctions d'Animateur (BAFA)",
      institution: "Animation & Pédagogie",
      field: "Gestion de groupe, dynamisme & pédagogie",
      description: "Développement du sens du collectif, prise de parole en public, encadrement d'équipes et capacité à transmettre clairement des idées complexes."
    }
  ],

  // 5. STACK TECHNIQUE & COMPÉTENCES OPÉRATIONNELLES
  skills: [
    {
      category: "Direction Artistique & Identité",
      items: [
        "Identités visuelles & Chartes graphiques",
        "Harmonie typographique & Systèmes de grilles",
        "Design éditorial & Plaquettes commerciales",
        "Supports d'aide à la vente (Sales Enablement)"
      ]
    },
    {
      category: "Motion Design & Vidéo",
      items: [
        "Adobe After Effects (Animations vectorielles, titrages)",
        "Adobe Premiere Pro (Montage dynamique & rythme)",
        "Captation de terrain & Interviews",
        "Étalonnage colorimétrique & Boucles d'affichage LED"
      ]
    },
    {
      category: "Scénographie & Événementiel",
      items: [
        "Stands grand format (> 150 m² au FIC Lille)",
        "Arches vidéo de stand & Calibrage régie LED",
        "Signalétique directionnelle & Affichage urbain",
        "Incarnation terrain (Captain Security)"
      ]
    },
    {
      category: "Logiciels & Outils Maîtrisés",
      items: [
        "Adobe Illustrator (Vecteur & Logos)",
        "Adobe Photoshop (Retouche & Compositions)",
        "Adobe InDesign (Édition & Fiches techniques)",
        "Figma (Design System & Maquettage)",
        "HTML5 / Tailwind CSS / React"
      ]
    }
  ],

  // 6. ENDURANCE ATHLÉTIQUE & MARATHON
  athleticProof: {
    event: "Wizz Air Venice Marathon",
    date: "26 octobre 2025",
    distance: "42,195 km",
    officialChrono: "02h48'25",
    pace: "3'59 / km de moyenne",
    percentile: "Top 1% amateur",
    image: "/assets/autres/marathon6.jpg",
    narrative: "Courir un marathon en 2h48 relève de la même exigence qu'un projet créatif d'envergure : rigueur millimétrée de la préparation, gestion constante de l'effort, sang-froid face aux imprévus et refus total de relâcher l'attention avant la ligne d'arrivée."
  }
};

