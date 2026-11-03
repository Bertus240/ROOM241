import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Film,
  Palette,
  Laptop,
  Zap,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Compass,
  FileText,
  Mail,
  Moon,
  Layers,
  MessageCircle,
} from 'lucide-react';
import { applyTheme } from '../lib/theme';
import { projectsData } from '../data/projects';

/**
 * ============================================================================
 * KURO — COMPAGNON CRÉATIF DU STUDIO ROOM241
 * Navigation Interactive & Système d'Exploration Éditoriale
 *
 * Spécifications validées :
 * 1. Identité exclusive : Kuro (zéro mention Mochi dans l'UI).
 * 2. Pile de navigation complète (navigation stack) :
 *    - const [history, setHistory] = useState(['home']);
 *    - Bouton "← Retour" visible et accessible dès que history.length > 1.
 *    - Dépilement propre écran par écran sans réinitialiser la conversation.
 *    - Scénario obligatoire supporté :
 *      Accueil → Catégories → Vidéo & Motion → Projet → Retour → Vidéo & Motion → Retour → Catégories → Retour → Accueil.
 * 3. Question centrale : « Et toi, qu'est-ce que tu aimerais découvrir ? »
 *    - 4 cartes thématiques :
 *      * 🎬 Vidéo & Motion
 *      * 🎨 Identité de marque
 *      * 💻 Web & Digital
 *      * ⚡ Un projet en particulier
 *    - Accès direct à "L'envers du décor" et "Autres destinations".
 * 4. Voix éditoriale fidèle à Rémi :
 *    - Kuro parle au nom de Rémi ("Rémi a conçu...", "Rémi aborde...").
 *    - Ton complice, vif, concis, naturel et humain, sans jargon d'assistant IA.
 * 5. Prise de parole proactive intelligente (Speech Toast) :
 *    - Toast non-intrusif apparaissant à l'arrivée sur les pages clés (Accueil, Projets, Études, Parcours, Contact, Hors-cadre).
 *    - Respect strict des refus du visiteur (cooldown 25s, pas d'intrusion bloquante).
 *    - Auto-estompement au bout de 8.5s si non sollicité.
 * 6. Études de cas 100% authentiques issues de projectsData.
 * ============================================================================
 */

const BREATH_CYCLE = 4800;
const SESSION_INTRO_KEY = 'room241_kuro_intro_viewed';

// Dictionnaire structuré des écrans et de leurs arborescences
const SCREENS = {
  home: {
    id: 'home',
    tag: 'Kuro • Guide interactif',
    title: "Et toi, qu'est-ce que tu aimerais découvrir ?",
    text: "Moi, c’est Kuro. Je t'accompagne à travers les réalisations et les coulisses du travail de Rémi. Choisis un univers créatif ou une étude de cas précise :",
    categories: [
      {
        id: 'category_motion',
        icon: Film,
        emoji: '🎬',
        title: 'Vidéo & Motion',
        subtitle: 'Formats courts, TikTok & habillages',
        badge: '2 études',
      },
      {
        id: 'category_branding',
        icon: Palette,
        emoji: '🎨',
        title: 'Identité de marque',
        subtitle: 'Systèmes graphiques, print & stands',
        badge: '3 études',
      },
      {
        id: 'category_web',
        icon: Laptop,
        emoji: '💻',
        title: 'Web & Digital',
        subtitle: 'Interfaces réactives & simulateurs',
        badge: '2 études',
      },
      {
        id: 'all_projects',
        icon: Zap,
        emoji: '⚡',
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
        emoji: '🎬',
        title: 'Vidéo & Motion',
        subtitle: 'Formats courts, TikTok & habillages',
        badge: '2 études',
      },
      {
        id: 'category_branding',
        icon: Palette,
        emoji: '🎨',
        title: 'Identité de marque',
        subtitle: 'Systèmes graphiques, print & stands',
        badge: '3 études',
      },
      {
        id: 'category_web',
        icon: Laptop,
        emoji: '💻',
        title: 'Web & Digital',
        subtitle: 'Interfaces réactives & simulateurs',
        badge: '2 études',
      },
      {
        id: 'all_projects',
        icon: Zap,
        emoji: '⚡',
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
        badge: '+500k vues',
        role: 'Stratégie TikTok & formats courts',
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
        emoji: '🛡️',
        title: 'Hornetsecurity',
        tagline: 'Cybersécurité B2B, stand FIC >150 m² & design 360°',
        screen: 'project_hornetsecurity',
        path: '/realisations/hornetsecurity',
      },
      {
        slug: 'fresh-data',
        emoji: '⚡',
        title: 'Fresh Data',
        tagline: 'Plateforme fintech & simulateur de trésorerie',
        screen: 'project_freshdata',
        path: '/realisations/fresh-data',
      },
      {
        slug: 'resin-architecte',
        emoji: '🏛️',
        title: "Résin'Architecte",
        tagline: 'Revêtements en résine & identité de terrain',
        screen: 'project_resin',
        path: '/realisations/resin-architecte',
      },
      {
        slug: 'jardimax',
        emoji: '🌿',
        title: 'Jardimax',
        tagline: 'Stratégie formats courts TikTok (+500k vues)',
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
    subtitle: 'Stratégie vidéo courte TikTok & Motoculture',
    text: 'Démonstration par Rémi qu’on peut vulgariser la motoculture avec du punch sur TikTok : scripts ciselés, tournage et montage dynamique générant plus de 500 000 vues cumulées.',
    badge: '+500k vues',
    metrics: '+500k vues · Formats courts 1080p',
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
    title: 'Parcours & Méthode de Rémi',
    text: 'Une double compétence créative et technique forgée sur le terrain : de la direction artistique au code front-end, avec une vision 360° du produit.',
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

// Réactions éditoriales contextuelles par route (voix de Kuro présentant le travail de Rémi)
const ROUTE_CONTEXT_TOASTS = {
  '/': {
    tag: 'Kuro • Accueil',
    text: 'Salut ! Bienvenue ici. Tu peux explorer les projets de Rémi, découvrir son parcours ou regarder ce qui se passe derrière les coulisses.',
    ctaLabel: 'Visiter avec Kuro',
    screenKey: 'home',
  },
  '/projets': {
    tag: 'Kuro • Projets',
    text: 'Ici, tu retrouves une sélection de projets sur lesquels Rémi a travaillé. Il y a plusieurs univers à découvrir.',
    ctaLabel: 'Filtrer les univers',
    screenKey: 'categories',
  },
  '/realisations/hornetsecurity': {
    tag: 'Kuro • Étude de cas',
    text: 'Hornetsecurity, c’est 3 ans de polyvalence créative : des stands de plus de 150 m² au FIC, du print grand compte et du motion.',
    ctaLabel: 'Voir la fiche',
    screenKey: 'project_hornetsecurity',
  },
  '/realisations/fresh-data': {
    tag: 'Kuro • Étude de cas',
    text: 'Sur Fresh Data, Rémi a conçu l’identité visuelle et l’interface fintech avec un simulateur interactif pour simplifier le financement.',
    ctaLabel: 'Voir la fiche',
    screenKey: 'project_freshdata',
  },
  '/realisations/resin-architecte': {
    tag: 'Kuro • Étude de cas',
    text: 'Résin’Architecte, c’est du concret : valoriser sur le terrain le savoir-faire d’un artisan des revêtements en résine.',
    ctaLabel: 'Voir la fiche',
    screenKey: 'project_resin',
  },
  '/realisations/jardimax': {
    tag: 'Kuro • Étude de cas',
    text: 'Jardimax, c’est la démonstration qu’on peut vulgariser la motoculture avec du punch sur TikTok : +500 000 vues cumulées.',
    ctaLabel: 'Voir la fiche',
    screenKey: 'project_jardimax',
  },
  '/parcours': {
    tag: 'Kuro • Parcours',
    text: 'Tu veux en savoir un peu plus sur Rémi ? C’est ici que tu peux découvrir son parcours et sa double compétence DA & code.',
    ctaLabel: 'Consulter le profil',
    screenKey: 'parcours',
  },
  '/hors-cadre': {
    tag: 'Kuro • Hors-cadre',
    text: 'Bon, maintenant que tu as vu une partie de son travail, tu peux aussi découvrir ce qui se passe derrière les projets.',
    ctaLabel: 'Découvrir',
    screenKey: 'horsCadre',
  },
  '#contact': {
    tag: 'Kuro • Contact',
    text: 'Tu as une idée en tête ou un projet à discuter ? C’est probablement le bon moment pour lui écrire.',
    ctaLabel: 'Prendre contact',
    screenKey: 'contact',
  },
};

export default function Kuro({ currentPath = '/', navigate, onOpenCvModal }) {
  // 1. Introduction immersive (optionnelle)
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [isExitingIntro, setIsExitingIntro] = useState(false);

  // 2. Machine à états visuels : 'neutral' est strictement la référence au repos
  const [expression, setExpression] = useState('neutral');
  const [isAwake, setIsAwake] = useState(true);
  const [isPerkingUp, setIsPerkingUp] = useState(false);

  // 3. Pile de navigation (Navigation Stack) avec support pour tests et captures (?kuro=open&kuro_step=...)
  const getInitialBubbleState = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('kuro') === 'open') return true;
    }
    return false;
  };

  const getInitialHistory = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const step = params.get('kuro_step');
      if (step && SCREENS[step]) {
        if (step === 'home') return ['home'];
        if (step === 'categories') return ['home', 'categories'];
        if (step.startsWith('category_')) return ['home', 'categories', step];
        if (step.startsWith('project_')) return ['home', 'all_projects', step];
        return ['home', step];
      }
    }
    return ['home'];
  };

  const [history, setHistory] = useState(getInitialHistory);
  const [navDirection, setNavDirection] = useState(1);

  // 4. Visibilité des panneaux
  const [isBubbleOpen, setIsBubbleOpen] = useState(getInitialBubbleState);
  const [speechToast, setSpeechToast] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isReturning, setIsReturning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const headRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const scrollTimeout = useRef(null);
  const toastAutoDismissTimeout = useRef(null);
  const lastDismissedAtRef = useRef(0);
  const shownRoutesRef = useRef(new Set());
  const currentPathRef = useRef(currentPath);

  // Détection de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Écran courant au sommet de la pile
  const currentScreenKey = history[history.length - 1] || 'home';
  const currentScreen = SCREENS[currentScreenKey] || SCREENS.home;

  // Manipulation de la pile de navigation
  const pushStep = useCallback((screenKey) => {
    setNavDirection(1);
    setHistory((prev) => [...prev, screenKey]);
  }, []);

  const popStep = useCallback(() => {
    setNavDirection(-1);
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const resetHistory = useCallback(() => {
    setNavDirection(-1);
    setHistory(['home']);
  }, []);

  const resetStackTo = useCallback((screenKey) => {
    setNavDirection(1);
    if (screenKey === 'home') {
      setHistory(['home']);
    } else if (screenKey === 'categories') {
      setHistory(['home', 'categories']);
    } else {
      setHistory(['home', screenKey]);
    }
  }, []);

  // Fermer le toast d'intervention
  const dismissSpeechToast = useCallback(() => {
    setSpeechToast(null);
    lastDismissedAtRef.current = Date.now();
    if (toastAutoDismissTimeout.current) clearTimeout(toastAutoDismissTimeout.current);
  }, []);

  // Ouverture du panneau conversationnel complet
  const openBubbleWith = useCallback((screenKey = 'home', isAuto = false) => {
    dismissSpeechToast();
    resetStackTo(screenKey);
    setIsPerkingUp(true);

    setTimeout(() => {
      setIsBubbleOpen(true);
      setIsPerkingUp(false);
    }, 180);
  }, [dismissSpeechToast, resetStackTo]);

  // Fermeture de la bulle
  const closeBubble = useCallback(() => {
    setIsBubbleOpen(false);
    lastDismissedAtRef.current = Date.now();
  }, []);

  // Synchronisation contextuelle lors des changements de page (uniquement si Kuro est déjà ouvert)
  useEffect(() => {
    currentPathRef.current = currentPath;
    const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');

    // Déterminer la clé de toast correspondante
    let toastKey = null;
    if (path.startsWith('/realisations/')) {
      toastKey = path;
    } else if (path.startsWith('/projets')) {
      toastKey = '/projets';
    } else if (path.startsWith('/parcours')) {
      toastKey = '/parcours';
    } else if (path.startsWith('/hors-cadre')) {
      toastKey = '/hors-cadre';
    } else if (path === '/') {
      toastKey = '/';
    }

    const toastConfig = ROUTE_CONTEXT_TOASTS[toastKey];

    // Si la bulle est déjà ouverte par l'utilisateur, synchroniser l'écran en douceur
    if (isBubbleOpen && toastConfig) {
      if (toastConfig.screenKey && toastConfig.screenKey !== 'home') {
        setHistory((prev) => {
          if (prev[prev.length - 1] === toastConfig.screenKey) return prev;
          return [...prev, toastConfig.screenKey];
        });
      }
    }
  }, [currentPath, isBubbleOpen]);

  // Écoute des événements kuro:speak — ne force JAMAIS l'ouverture si Kuro est fermé
  useEffect(() => {
    let lastEventTime = 0;
    const handleSpeakEvent = (e) => {
      const now = Date.now();
      if (now - lastEventTime < 80) return;
      lastEventTime = now;

      // Découplage strict : ne s'affiche que si l'utilisateur a ouvert Kuro volontairement
      if (!isBubbleOpen) return;

      if (e.detail?.category) {
        const catMap = {
          motion: 'category_motion',
          branding: 'category_branding',
          web: 'category_web',
          all: 'all_projects',
        };
        const mapped = catMap[e.detail.category] || 'all_projects';
        pushStep(mapped);
        return;
      }

      if (e.detail?.screen && SCREENS[e.detail.screen]) {
        pushStep(e.detail.screen);
        return;
      }
    };

    window.addEventListener('kuro:speak', handleSpeakEvent);
    window.addEventListener('mochi:speak', handleSpeakEvent);
    return () => {
      window.removeEventListener('kuro:speak', handleSpeakEvent);
      window.removeEventListener('mochi:speak', handleSpeakEvent);
    };
  }, [isBubbleOpen, pushStep]);

  // Clignement naturel périodique au repos
  useEffect(() => {
    if (prefersReducedMotion || !isAwake || isIntroActive) return;

    let timeoutId;
    const executeBlink = () => {
      setExpression('blink');
      setTimeout(() => {
        setExpression('neutral');
      }, 120);

      timeoutId = setTimeout(executeBlink, 4200);
    };

    timeoutId = setTimeout(executeBlink, 3200);
    return () => clearTimeout(timeoutId);
  }, [isAwake, prefersReducedMotion, isIntroActive]);

  // Suivi subtil du regard vers le curseur (desktop) et toucher (mobile)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = null;
    let pendingCoords = null;
    let returnTimeout = null;

    const computeEyePosition = (clientX, clientY) => {
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;

      const targetEl = headRef.current || containerRef.current;
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist === 0) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }

      const angle = Math.atan2(deltaY, deltaX);
      const intensity = Math.min(dist / 220, 1) * 2.2;

      setEyeOffset({
        x: Math.cos(angle) * intensity,
        y: Math.sin(angle) * intensity,
      });
    };

    const scheduleUpdate = (clientX, clientY) => {
      pendingCoords = { clientX, clientY };
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (pendingCoords) {
            computeEyePosition(pendingCoords.clientX, pendingCoords.clientY);
          }
          rafId = null;
        });
      }
    };

    const handleMouseMove = (e) => {
      setIsReturning(false);
      clearTimeout(returnTimeout);
      scheduleUpdate(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        setIsReturning(false);
        clearTimeout(returnTimeout);
        computeEyePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        setIsReturning(false);
        clearTimeout(returnTimeout);
        scheduleUpdate(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      setIsReturning(true);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      pendingCoords = null;
      setEyeOffset({ x: 0, y: 0 });
      returnTimeout = setTimeout(() => {
        setIsReturning(false);
      }, 400);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    document.addEventListener('mouseleave', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('mouseleave', handleTouchEnd);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(returnTimeout);
    };
  }, [prefersReducedMotion]);

  // Atténuation lors du défilement actif
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Fermeture par la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isIntroActive && !isExitingIntro) {
          handleDismissIntro();
        } else if (isBubbleOpen) {
          closeBubble();
        } else if (speechToast) {
          dismissSpeechToast();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntroActive, isExitingIntro, isBubbleOpen, speechToast, closeBubble, dismissSpeechToast]);

  // Fermeture au clic en dehors
  useEffect(() => {
    if (!isBubbleOpen || isIntroActive) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeBubble();
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isBubbleOpen, isIntroActive, closeBubble]);

  // Ondes ambrées de verre liquide (canvas intro)
  useEffect(() => {
    if (!isIntroActive || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const startTime = performance.now();

    const render = (now) => {
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = now - startTime;
      const cycleProgress = (elapsed % BREATH_CYCLE) / BREATH_CYCLE;
      const breathIntensity = (1 - Math.cos(cycleProgress * 2 * Math.PI)) / 2;

      const originX = width / 2;
      const originY = height / 2;
      const haloRadius = 240 + breathIntensity * 130;

      const haloGrad = ctx.createRadialGradient(originX, originY, 20, originX, originY, haloRadius);
      haloGrad.addColorStop(0, `rgba(255, 173, 0, ${0.12 + breathIntensity * 0.16})`);
      haloGrad.addColorStop(0.35, `rgba(255, 173, 0, ${0.05 + breathIntensity * 0.08})`);
      haloGrad.addColorStop(0.75, `rgba(255, 173, 0, ${0.01 + breathIntensity * 0.02})`);
      haloGrad.addColorStop(1, 'rgba(255, 173, 0, 0)');

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(originX, originY, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isIntroActive, prefersReducedMotion]);

  // Fermeture de l'introduction
  const handleDismissIntro = useCallback(() => {
    setIsExitingIntro(true);
    sessionStorage.setItem(SESSION_INTRO_KEY, 'true');

    setTimeout(() => {
      setIsIntroActive(false);
      setIsExitingIntro(false);
      setExpression('neutral');
    }, 450);
  }, []);

  // Rejouer l'introduction
  const handleReplayIntro = useCallback(() => {
    closeBubble();
    dismissSpeechToast();
    setIsExitingIntro(false);
    setIsIntroActive(true);
  }, [closeBubble, dismissSpeechToast]);

  // Exécution d'une action ou navigation
  const executeAction = (action) => (e) => {
    if (e) e.preventDefault();

    if (action.isBack) {
      popStep();
      return;
    }

    if (action.screen) {
      pushStep(action.screen);
      return;
    }

    closeBubble();
    dismissSpeechToast();

    if (action.category) {
      if (currentPath !== '/projets') {
        if (navigate) navigate('/projets');
        else window.location.href = '/projets';
      }
      return;
    }

    if (action.isContact) {
      if (currentPath === '/' || currentPath === '/hors-cadre') {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      if (navigate) {
        navigate('/#contact');
      } else {
        window.history.pushState({}, '', '/#contact');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (action.isSwitchToDark) {
      applyTheme('dark');
      if (navigate) navigate(action.path || '/hors-cadre');
      return;
    }

    if (action.isSwitchToPro) {
      applyTheme('light');
      if (navigate) navigate(action.path || '/');
      return;
    }

    if (action.isMail) {
      window.location.href = 'mailto:brocart.remi02@gmail.com';
      return;
    }

    if (action.isCv) {
      if (onOpenCvModal) onOpenCvModal();
      return;
    }

    if (action.path) {
      if (navigate) {
        navigate(action.path);
      } else {
        window.history.pushState({}, '', action.path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  /**
   * ==========================================================================
   * TÊTE DE KURO — SPHÈRE VITRÉE ET REGARD ORGANIQUE
   * ==========================================================================
   */
  const renderGlassSphere = (isLarge = false) => {
    const sizeClasses = isLarge ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-8 h-8 sm:w-9 sm:h-9';
    const eyeWidthPx = isLarge ? 16 : 9;
    const eyeHeightPx = isLarge ? 20 : 12;
    const pupilSizePx = isLarge ? 10 : 5.5;
    const eyeGapPx = isLarge ? 12 : 6;

    const pxOffsetX = eyeOffset.x * (isLarge ? 1.4 : 1);
    const pxOffsetY = eyeOffset.y * (isLarge ? 1.4 : 1);
    const isClosed = !isIntroActive && expression === 'blink';

    return (
      <div
        ref={headRef}
        className={`relative ${sizeClasses} flex items-center justify-center shrink-0 select-none`}
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : isPerkingUp
              ? { y: -3.5, scale: 1.06 }
              : { y: 0, scale: [1, 1.045, 1] }
          }
          transition={
            isPerkingUp
              ? { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
              : {
                  scale: {
                    duration: BREATH_CYCLE / 1000,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  y: { duration: 0.25 },
                }
          }
          className="relative w-full h-full rounded-full bg-[#09090B] flex items-center justify-center"
          style={{
            boxShadow: isLarge
              ? 'inset 0 2px 4px rgba(255, 255, 255, 0.45), inset 0 -4px 8px rgba(255, 173, 0, 0.4), 0 20px 45px rgba(0,0,0,0.65)'
              : 'inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -2px 5px rgba(255, 173, 0, 0.35), 0 4px 12px rgba(0,0,0,0.5)',
          }}
          aria-hidden="true"
        >
          {/* Reflet spéculaire elliptique */}
          <motion.div
            animate={prefersReducedMotion ? {} : { opacity: [0.45, 0.72, 0.45] }}
            transition={{ duration: BREATH_CYCLE / 1000, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse at 32% 23%, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.2) 26%, rgba(255, 255, 255, 0.03) 48%, transparent 64%)',
            }}
          />

          {/* Liseré de courbure de verre */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.22) 0%, transparent 40%)',
            }}
          />

          {/* Halo ambré inférieur */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : isPerkingUp
                ? { opacity: 0.65 }
                : { opacity: [0.25, 0.45, 0.25] }
            }
            transition={
              isPerkingUp
                ? { duration: 0.2 }
                : { duration: BREATH_CYCLE / 1000, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 92%, rgba(255, 173, 0, 0.35) 0%, transparent 45%)',
            }}
          />

          {/* Yeux expressifs et stables */}
          <div
            className="flex items-center pointer-events-none z-10"
            style={{ gap: `${eyeGapPx}px`, paddingTop: isLarge ? '4px' : '2px' }}
          >
            {/* Œil gauche */}
            <div
              className="relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner"
              style={{
                width: `${eyeWidthPx}px`,
                height: `${eyeHeightPx}px`,
                transform: isClosed ? 'scaleY(0.12)' : 'scaleY(1)',
                transition: 'transform 0.12s ease-out',
                transformOrigin: 'center',
              }}
            >
              <div
                className="rounded-full bg-[#09090B] relative"
                style={{
                  width: `${pupilSizePx}px`,
                  height: `${pupilSizePx}px`,
                  transform: `translate(${pxOffsetX}px, ${pxOffsetY}px)`,
                  transition: isReturning
                    ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 0.08s ease-out',
                }}
              >
                <span
                  className="absolute rounded-full bg-white"
                  style={{
                    width: isLarge ? '3.5px' : '2px',
                    height: isLarge ? '3.5px' : '2px',
                    top: isLarge ? '1.5px' : '1px',
                    left: isLarge ? '1.5px' : '1px',
                  }}
                />
              </div>
            </div>

            {/* Œil droit */}
            <div
              className="relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner"
              style={{
                width: `${eyeWidthPx}px`,
                height: `${eyeHeightPx}px`,
                transform: isClosed ? 'scaleY(0.12)' : 'scaleY(1)',
                transition: 'transform 0.12s ease-out',
                transformOrigin: 'center',
              }}
            >
              <div
                className="rounded-full bg-[#09090B] relative"
                style={{
                  width: `${pupilSizePx}px`,
                  height: `${pupilSizePx}px`,
                  transform: `translate(${pxOffsetX}px, ${pxOffsetY}px)`,
                  transition: isReturning
                    ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 0.08s ease-out',
                }}
              >
                <span
                  className="absolute rounded-full bg-white"
                  style={{
                    width: isLarge ? '3.5px' : '2px',
                    height: isLarge ? '3.5px' : '2px',
                    top: isLarge ? '1.5px' : '1px',
                    left: isLarge ? '1.5px' : '1px',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Variantes d'animation Framer Motion pour la pile de navigation
  const slideVariants = {
    enter: (direction) => ({
      x: prefersReducedMotion ? 0 : direction > 0 ? 18 : -18,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.24,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction) => ({
      x: prefersReducedMotion ? 0 : direction > 0 ? -18 : 18,
      opacity: 0,
      transition: {
        duration: 0.18,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <>
      {/* ======================================================================
          INTRODUCTION IMMERSIVE (Optionnelle / Rejouable)
         ====================================================================== */}
      <AnimatePresence>
        {isIntroActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExitingIntro ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Introduction interactive de Kuro"
          >
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

            <div
              onClick={handleDismissIntro}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md cursor-pointer z-10 transition-opacity"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={
                isExitingIntro
                  ? { opacity: 0, scale: 0.90, y: -10 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[340px] sm:max-w-md bg-[#09090B]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.12)] border border-white/20 text-center space-y-5 text-white z-20 font-sans"
            >
              <button
                type="button"
                onClick={handleDismissIntro}
                className="absolute top-4 right-4 w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                aria-label="Fermer l'introduction"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center justify-center pt-2">
                <div className="relative">
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { scale: [1, 1.25, 1], opacity: [0.35, 0.85, 0.35] }
                    }
                    transition={{ duration: BREATH_CYCLE / 1000, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FFAD00]/40 to-transparent blur-2xl pointer-events-none"
                    aria-hidden="true"
                  />
                  {renderGlassSphere(true)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-medium tracking-wider text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)] animate-pulse" />
                  <span>ROOM241 | KURO</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Bienvenue chez ROOM241.
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-sm mx-auto font-normal">
                  Moi, c’est Kuro. Je vous accompagne à travers les projets de Rémi : du design, de la vidéo et des idées qui prennent vie sur le terrain.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDismissIntro}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Explorer le portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          CAPSULE FLOTTANTE & INTERVENTIONS
         ====================================================================== */}
      {!isIntroActive && (
        <div
          ref={containerRef}
          id="kuro-container"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none print:hidden pointer-events-auto"
        >
          {/* TOAST D'INTERVENTION CONTEXTUELLE DE KURO (DISCRET & NON BLOQUANT) */}
          <AnimatePresence>
            {speechToast && !isBubbleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[calc(100%+12px)] left-0 w-[280px] sm:w-[320px] max-w-[calc(100vw-2.5rem)] rounded-2xl text-white font-sans z-50 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.16)]"
                style={{
                  backgroundColor: 'rgba(18, 17, 16, 0.94)',
                  backdropFilter: 'blur(24px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(140%)',
                }}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)] animate-pulse" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-300">
                      {speechToast.tag}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={dismissSpeechToast}
                    className="w-5 h-5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
                    aria-label="Fermer le message de Kuro"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-xs text-zinc-200 leading-relaxed mb-2.5 font-normal">
                  {speechToast.text}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      openBubbleWith(speechToast.screenKey || 'home', false);
                    }}
                    className="text-[11px] font-semibold text-[#FFAD00] hover:text-[#E59B00] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{speechToast.ctaLabel || 'Échanger avec Kuro'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[9px] text-zinc-500 font-mono">ROOM241</span>
                </div>

                {/* Pointeur en losange vers la capsule */}
                <div
                  className="absolute -bottom-1.5 left-6 w-3 h-3 border-r border-b border-white/20 rotate-45 pointer-events-none"
                  style={{ backgroundColor: 'rgba(18, 17, 16, 0.95)' }}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* BULLE CONVERSATIONNELLE COMPLÈTE AVEC PILE DE NAVIGATION */}
          <AnimatePresence>
            {isBubbleOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[calc(100%+14px)] left-0 w-[320px] sm:w-[360px] max-w-[calc(100vw-2rem)] max-h-[min(540px,78vh)] rounded-2xl text-white font-sans z-50 p-4 sm:p-5 flex flex-col overflow-hidden"
                style={{
                  backgroundColor: 'rgba(18, 17, 16, 0.94)',
                  backdropFilter: 'blur(26px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(26px) saturate(140%)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow:
                    '0 25px 60px rgba(0, 0, 0, 0.72), inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(255, 173, 0, 0.08)',
                }}
                role="dialog"
                aria-modal="false"
                aria-label="Dialogue interactif avec Kuro"
              >
                {/* Reflet spéculaire supérieur */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at 35% 0%, rgba(255, 255, 255, 0.09) 0%, transparent 65%)',
                    }}
                  />
                </div>

                {/* EN-TÊTE FIXE ET ACCESSIBLE AVEC RETOUR EN PILE */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 relative z-10 shrink-0">
                  <div className="flex items-center gap-2">
                    {history.length > 1 ? (
                      <button
                        type="button"
                        onClick={popStep}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFAD00]"
                        aria-label="Retour à l'écran précédent"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Retour</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)] animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                          {currentScreen.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {history.length > 1 && (
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400 truncate max-w-[140px]">
                      {currentScreen.tag}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={closeBubble}
                    className="w-7 h-7 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                    aria-label="Fermer le dialogue avec Kuro"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* ZONE DE CONTENU DYNAMIQUE AVEC TRANSITION DIRECTIONNELLE */}
                <div className="relative z-10 overflow-y-auto pr-0.5 space-y-3 flex-1 custom-scrollbar">
                  <AnimatePresence mode="wait" custom={navDirection}>
                    <motion.div
                      key={currentScreenKey}
                      custom={navDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-3"
                    >
                      {/* TITRE ET PARAGRAPHE INTRODUCTIF DE L'ÉCRAN */}
                      <div>
                        {currentScreen.title && (
                          <h3 className="text-sm font-bold text-white mb-1 leading-snug">
                            {currentScreen.title}
                          </h3>
                        )}
                        {currentScreen.subtitle && (
                          <div className="text-[11px] font-medium text-[#FFAD00] mb-1.5">
                            {currentScreen.subtitle}
                          </div>
                        )}
                        <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                          {currentScreen.text}
                        </p>
                      </div>

                      {/* 1. ÉCRAN HOME OU CATEGORIES : 4 CARTES THÉMATIQUES */}
                      {(currentScreenKey === 'home' || currentScreenKey === 'categories') && currentScreen.categories && (
                        <div className="grid grid-cols-1 gap-1.5 pt-1">
                          {currentScreen.categories.map((cat) => {
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => pushStep(cat.id)}
                                className="group w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFAD00]/40 transition-all text-left flex items-center justify-between cursor-pointer active:scale-[0.99]"
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-sm shrink-0 group-hover:border-[#FFAD00]/50 transition-colors">
                                    <span>{cat.emoji}</span>
                                  </div>
                                  <div className="truncate">
                                    <div className="text-xs font-semibold text-white group-hover:text-[#FFAD00] transition-colors truncate">
                                      {cat.title}
                                    </div>
                                    <div className="text-[10px] text-zinc-400 truncate">
                                      {cat.subtitle}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 group-hover:bg-[#FFAD00]/20 group-hover:text-[#FFAD00] transition-colors">
                                    {cat.badge}
                                  </span>
                                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* 2. ÉCRANS DE CATÉGORIES (Motion, Branding, Web) */}
                      {currentScreen.projects && (
                        <div className="space-y-2 pt-1">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            Études de cas disponibles :
                          </div>
                          <div className="space-y-1.5">
                            {currentScreen.projects.map((p) => (
                              <div
                                key={p.slug}
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 text-left"
                              >
                                <div className="truncate">
                                  <div className="flex items-center gap-1.5">
                                    {p.emoji && <span className="text-xs">{p.emoji}</span>}
                                    <span className="text-xs font-semibold text-white truncate">
                                      {p.title}
                                    </span>
                                    {p.badge && (
                                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FFAD00]/20 text-[#FFAD00]">
                                        {p.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                                    {p.role || p.tagline}
                                  </p>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  {p.screen && (
                                    <button
                                      type="button"
                                      onClick={() => pushStep(p.screen)}
                                      className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[10px] font-medium text-zinc-200 transition-colors cursor-pointer"
                                      title="Voir la synthèse"
                                    >
                                      Aperçu
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={executeAction({ path: p.path })}
                                    className="px-2 py-1 rounded-lg bg-[#FFAD00] hover:bg-[#E59B00] text-[10px] font-bold text-black transition-colors cursor-pointer inline-flex items-center gap-0.5"
                                    title="Ouvrir l'étude de cas complète"
                                  >
                                    <span>Étude</span>
                                    <ArrowRight className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {currentScreen.categoryLink && (
                            <button
                              type="button"
                              onClick={executeAction(currentScreen.categoryLink)}
                              className="w-full py-1.5 text-center text-[11px] text-[#FFAD00] hover:text-[#E59B00] font-medium transition-colors cursor-pointer inline-flex items-center justify-center gap-1"
                            >
                              <span>{currentScreen.categoryLink.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* 3. ÉCRAN D'UNE ÉTUDE DE CAS PARTICULIÈRE */}
                      {currentScreenKey.startsWith('project_') && (
                        <div className="space-y-2.5 pt-1">
                          {currentScreen.metrics && (
                            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                              <span className="text-[#FFAD00] font-bold">Repères : </span>
                              {currentScreen.metrics}
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={executeAction({ path: currentScreen.path })}
                            className="w-full min-h-[38px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FFAD00] hover:bg-[#E59B00] text-black shadow-[0_4px_16px_rgba(255,173,0,0.25)] inline-flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer"
                          >
                            <span>Consulter l'étude de cas complète</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                          </button>

                          {currentScreen.nextScreen && (
                            <button
                              type="button"
                              onClick={() => pushStep(currentScreen.nextScreen)}
                              className="w-full py-1.5 text-center text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            >
                              {currentScreen.nextLabel}
                            </button>
                          )}
                        </div>
                      )}

                      {/* 4. ACTIONS GÉNÉRALES (Destinations, Invitation perso, Contact) */}
                      {currentScreen.actions && (
                        <div className="space-y-1.5 pt-1">
                          {currentScreen.actions.map((act, idx) => {
                            const ActIcon = act.icon;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={executeAction(act)}
                                className={`w-full min-h-[38px] px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                                  act.primary
                                    ? 'bg-[#FFAD00] hover:bg-[#E59B00] text-black shadow-[0_4px_16px_rgba(255,173,0,0.25)]'
                                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                                }`}
                              >
                                <div className="flex items-center gap-2 text-left truncate pr-2">
                                  {ActIcon && <ActIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />}
                                  <div className="truncate">
                                    <div className="truncate">{act.label}</div>
                                    {act.desc && (
                                      <div
                                        className={`text-[10px] font-normal leading-tight opacity-75 truncate ${
                                          act.primary ? 'text-black' : 'text-zinc-300'
                                        }`}
                                      >
                                        {act.desc}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-80 ml-1" />
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* RACCOURCIS DE BAS DE BULLE (Sur écran home) */}
                      {currentScreenKey === 'home' && currentScreen.shortcuts && (
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                          {currentScreen.shortcuts.map((sc, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => pushStep(sc.screen)}
                              className={`transition-colors cursor-pointer py-0.5 inline-flex items-center gap-1 ${
                                sc.highlight
                                  ? 'text-[#FFAD00] hover:text-[#E59B00] font-semibold'
                                  : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              <span>{sc.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* LIEN DISCRET POUR REVOIR L'INTRODUCTION */}
                <div className="pt-2 text-center relative z-10 border-t border-white/5 mt-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleReplayIntro}
                    className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer py-0.5 inline-flex items-center gap-1"
                  >
                    <span>Revoir l'introduction de Kuro</span>
                  </button>
                </div>

                {/* POINTEUR EN LOSANGE DIRIGÉ VERS LA CAPSULE */}
                <div
                  className="absolute -bottom-1.5 left-6 w-3 h-3 border-r border-b border-white/20 rotate-45 pointer-events-none"
                  style={{ backgroundColor: 'rgba(18, 17, 16, 0.95)' }}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* CAPSULE FIXE AU REPOS — CLIC DU VISITEUR */}
          <button
            type="button"
            onClick={() => {
              if (isBubbleOpen) {
                closeBubble();
              } else {
                openBubbleWith(currentScreenKey, false);
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-[#09090B]/95 hover:bg-black text-white border border-white/20 hover:border-[#FFAD00]/60 shadow-[0_8px_25px_rgba(0,0,0,0.4)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] transition-all duration-300 min-h-[44px] ${
              isScrolling ? 'opacity-35 pointer-events-none' : 'opacity-100'
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
            aria-label="Kuro, guide interactif du studio. Cliquez pour échanger."
            aria-expanded={isBubbleOpen}
            title="Kuro · Guide interactif"
          >
            {/* Halo ambré doux */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.14, 1],
                      opacity: isHovered ? [0.6, 0.85, 0.6] : [0.18, 0.38, 0.18],
                    }
              }
              transition={{
                duration: BREATH_CYCLE / 1000,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FFAD00]/40 to-transparent blur-md pointer-events-none"
              aria-hidden="true"
            />

            {/* Sphère vitrée organique */}
            {renderGlassSphere(false)}

            <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors pr-0.5">
              Kuro
            </span>

            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </>
  );
}
