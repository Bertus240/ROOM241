import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Home, ExternalLink, Mail } from 'lucide-react';

const translations = {
  en: {
    badge: '403 // SERVICE UNAVAILABLE',
    title: "Oops, this page isn't available right now.",
    description: "Something went wrong while trying to load this page. You can return to the portfolio or explore my work and background using the links below.",
    note: "Have a question, a project or a creative collaboration in mind?",
    backHome: "Back to homepage",
    linkedin: "View LinkedIn profile ↗",
    email: "Send an email",
    footer: "Studio ROOM241 • Rémi Brocart",
    mochiDialogues: [
      "Oops... (•‿•)",
      "Guarding the portal!",
      "403! But let's connect ✉",
      "Looking for something?",
      "*Happy bounce* ✨"
    ]
  },
  fr: {
    badge: '403 // ACCÈS MOMENTANÉMENT INDISPONIBLE',
    title: 'Oups, cette page est momentanément indisponible.',
    description: "Un problème est survenu lors du chargement de cette page. Vous pouvez retourner à l'accueil du portfolio ou découvrir mes projets via les accès ci-dessous.",
    note: "Vous souhaitez discuter d'un projet ou explorer une collaboration créative ?",
    backHome: "Retourner à l'accueil",
    linkedin: "Voir le profil LinkedIn ↗",
    email: "Envoyer un e-mail",
    footer: "Studio ROOM241 • Rémi Brocart",
    mochiDialogues: [
      "Oups... (•‿•)",
      "Je veille sur la porte !",
      "403 ! Mais on peut échanger ✉",
      "Besoin d'un renseignement ?",
      "*Petit bond joyeux* ✨"
    ]
  }
};

export default function Blocked({ navigate }) {
  const [lang, setLang] = useState('en');
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [reactionIndex, setReactionIndex] = useState(0);
  const [currentSpeech, setCurrentSpeech] = useState(null);
  const mochiRef = useRef(null);
  const speechTimeoutRef = useRef(null);

  const t = translations[lang];

  // Suivi subtil du regard vers le curseur sur desktop
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mochiRef.current) return;
      const rect = mochiRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance === 0) return;

      const maxOffset = 3.6; // Déplacement maximal des pupilles en pixels
      const clampedDist = Math.min(distance, 350) / 350;
      const offsetX = (deltaX / distance) * clampedDist * maxOffset;
      const offsetY = (deltaY / distance) * clampedDist * maxOffset;

      setEyeOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clignement d'yeux irrégulier et naturel
  useEffect(() => {
    let blinkTimeout = null;

    const scheduleNextBlink = () => {
      const nextDelay = Math.random() * 3200 + 3000; // Entre 3.0s et 6.2s
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);

        setTimeout(() => {
          setIsBlinking(false);

          // 25% de chance de double-clignement rapide
          if (Math.random() < 0.25) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleNextBlink();
              }, 110);
            }, 140);
          } else {
            scheduleNextBlink();
          }
        }, 120);
      }, nextDelay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Déclencheur d'interaction sur Mochi (clic ou tap)
  const handleMochiInteract = () => {
    const nextIdx = (reactionIndex + 1) % 3;
    setReactionIndex(nextIdx);

    // Sélection d'un petit dialogue de réaction
    const dialogues = t.mochiDialogues;
    const randomSpeech = dialogues[Math.floor(Math.random() * dialogues.length)];
    setCurrentSpeech(randomSpeech);

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setCurrentSpeech(null);
    }, 2400);
  };

  const handleGoHome = (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate('/');
    else window.location.href = '/';
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#FFFFFF] text-[#09090B] flex flex-col justify-between items-center px-4 py-6 sm:px-8 sm:py-8 font-sans antialiased relative selection:bg-[#FFAD00] selection:text-black overflow-x-hidden">
      
      {/* Halo ambré doux en arrière-plan */}
      <div
        aria-hidden="true"
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFAD00]/8 to-transparent blur-3xl pointer-events-none z-0"
      />

      {/* ========================================================
          EN-TÊTE ÉDITORIAL — Logo officiel ROOM241 & Switcher EN / FR
         ======================================================== */}
      <header className="w-full max-w-2xl flex items-center justify-between z-10 py-1">
        <a
          href="/"
          onClick={handleGoHome}
          className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] transition-opacity hover:opacity-85"
          aria-label="Retourner à l'accueil du Studio ROOM241"
        >
          <img
            src="/assets/logos/430x95_Framer_Black@4x.png"
            alt="Studio ROOM241"
            className="h-7 sm:h-8 w-auto object-contain"
            loading="eager"
          />
        </a>

        {/* Sélecteur de langue bilingue instantané */}
        <div
          className="inline-flex items-center p-1 bg-zinc-100 rounded-full border border-zinc-200/80 shadow-2xs"
          role="group"
          aria-label="Language selection / Sélection de la langue"
        >
          <button
            type="button"
            lang="en"
            aria-pressed={lang === 'en'}
            onClick={() => setLang('en')}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] ${
              lang === 'en'
                ? 'bg-white text-zinc-950 shadow-xs scale-102'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            lang="fr"
            aria-pressed={lang === 'fr'}
            onClick={() => setLang('fr')}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] ${
              lang === 'fr'
                ? 'bg-white text-zinc-950 shadow-xs scale-102'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            FR
          </button>
        </div>
      </header>

      {/* ========================================================
          COMPOSITION CENTRALE — SCULPTURE 403 & MOCHI VIVANT
         ======================================================== */}
      <main className="w-full max-w-xl my-auto py-4 sm:py-8 flex flex-col items-center text-center z-10 space-y-5 sm:space-y-6">
        
        {/* Badge statut éditorial discret */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-mono text-zinc-600 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)] animate-pulse" />
          <span>{t.badge}</span>
        </div>

        {/* LA SCULPTURE 403 : Le chiffre 4, Mochi vivant au cœur du 0, et le chiffre 3 */}
        <div className="relative flex items-center justify-center gap-1 sm:gap-3 select-none py-2">
          
          {/* Micro-bulle interactive apparaissant au clic sur Mochi */}
          <AnimatePresence>
            {currentSpeech && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-[#09090B] text-white text-[11px] sm:text-xs font-semibold shadow-xl border border-white/20 whitespace-nowrap pointer-events-none flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-[#FFAD00]" />
                <span>{currentSpeech}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#09090B] rotate-45 border-r border-b border-white/20" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chiffre 4 monumental */}
          <span className="font-extrabold tracking-tighter text-[#09090B] text-[clamp(4.8rem,14.5vw,8.5rem)] leading-none font-sans drop-shadow-xs">
            4
          </span>

          {/* Mochi — Sphère vitrée vivante et interactive au centre du 403 */}
          <div
            ref={mochiRef}
            onClick={handleMochiInteract}
            onTouchStart={handleMochiInteract}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            aria-label="Mochi, le compagnon interactif. Cliquez pour jouer avec lui."
            className="group relative w-[clamp(74px,12vw,104px)] h-[clamp(74px,12vw,104px)] mx-1 sm:mx-2 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] focus-visible:ring-offset-4 flex items-center justify-center"
          >
            {/* Halo ambré doux réagissant au survol */}
            <div
              className={`absolute -inset-3 rounded-full bg-gradient-to-tr from-[#FFAD00]/30 to-transparent blur-md transition-opacity duration-300 pointer-events-none ${
                isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-100'
              }`}
            />

            {/* Corps sphérique de Mochi avec animations organiques */}
            <motion.div
              animate={
                reactionIndex === 1
                  ? {
                      scale: [1, 1.18, 0.94, 1],
                      y: [0, -14, 2, 0],
                    }
                  : reactionIndex === 2
                  ? {
                      rotate: [0, -8, 8, -4, 0],
                      scale: [1, 1.08, 1],
                    }
                  : {
                      scale: isHovered ? 1.06 : [1, 1.035, 1],
                      y: isHovered ? -2 : [0, -2, 0],
                    }
              }
              transition={
                reactionIndex > 0
                  ? { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
                  : {
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="relative w-full h-full rounded-full bg-[#09090B] flex items-center justify-center border border-white/25 shadow-[0_18px_36px_-6px_rgba(0,0,0,0.45),inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-4px_10px_rgba(255,173,0,0.35)]"
            >
              {/* Reflet spéculaire supérieur courbe de verre */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 32% 24%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.2) 28%, transparent 60%)',
                }}
              />

              {/* Halo ambré réfléchi au bas de la sphère */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 92%, rgba(255, 173, 0, 0.35) 0%, transparent 45%)',
                }}
              />

              {/* Les deux yeux expressifs avec suivi pupillaire */}
              <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-none z-10 -translate-y-0.5">
                {/* Œil gauche */}
                <div
                  className="relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner"
                  style={{
                    width: 'clamp(14px, 2.3vw, 19px)',
                    height: 'clamp(18px, 3vw, 24px)',
                    transform: isBlinking ? 'scaleY(0.12)' : 'scaleY(1)',
                    transition: 'transform 0.1s ease-out',
                    transformOrigin: 'center',
                  }}
                >
                  <div
                    className="rounded-full bg-[#09090B] relative"
                    style={{
                      width: 'clamp(8px, 1.3vw, 11px)',
                      height: 'clamp(8px, 1.3vw, 11px)',
                      transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                      transition: 'transform 0.06s ease-out',
                    }}
                  >
                    <span
                      className="absolute rounded-full bg-white"
                      style={{
                        width: '3px',
                        height: '3px',
                        top: '1.5px',
                        left: '1.5px',
                      }}
                    />
                  </div>
                </div>

                {/* Œil droit */}
                <div
                  className="relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner"
                  style={{
                    width: 'clamp(14px, 2.3vw, 19px)',
                    height: 'clamp(18px, 3vw, 24px)',
                    transform: isBlinking ? 'scaleY(0.12)' : 'scaleY(1)',
                    transition: 'transform 0.1s ease-out',
                    transformOrigin: 'center',
                  }}
                >
                  <div
                    className="rounded-full bg-[#09090B] relative"
                    style={{
                      width: 'clamp(8px, 1.3vw, 11px)',
                      height: 'clamp(8px, 1.3vw, 11px)',
                      transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                      transition: 'transform 0.06s ease-out',
                    }}
                  >
                    <span
                      className="absolute rounded-full bg-white"
                      style={{
                        width: '3px',
                        height: '3px',
                        top: '1.5px',
                        left: '1.5px',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chiffre 3 monumental */}
          <span className="font-extrabold tracking-tighter text-[#09090B] text-[clamp(4.8rem,14.5vw,8.5rem)] leading-none font-sans drop-shadow-xs">
            3
          </span>
        </div>

        {/* Message éditorial humain, court et neutre */}
        <div className="space-y-2.5 max-w-md mx-auto px-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#09090B] tracking-tight leading-snug">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
            {t.description}
          </p>
          <p className="text-[11px] sm:text-xs text-[#71717A] leading-relaxed pt-1">
            {t.note}
          </p>
        </div>

        {/* ========================================================
            ACTIONS DE SORTIE — ACCUEIL & CONTACT DIRECTS
           ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2 px-2">
          
          {/* Bouton principal : Retourner à l'accueil */}
          <a
            href="/"
            onClick={handleGoHome}
            className="w-full sm:w-auto flex-1 min-h-[48px] px-6 py-2.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-98 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backHome}</span>
          </a>

          {/* Bouton secondaire : LinkedIn */}
          <a
            href="https://www.linkedin.com/in/remibrocart"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-sm active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <span>{t.linkedin}</span>
          </a>

          {/* Bouton secondaire : Email */}
          <a
            href="mailto:brocart.remi02@gmail.com"
            className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-all active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <Mail className="w-4 h-4 text-[#FFAD00]" />
            <span>{t.email}</span>
          </a>
        </div>

      </main>

      {/* ========================================================
          PIED DE PAGE DISCRET & ÉLÉGANT
         ======================================================== */}
      <footer className="w-full text-center text-xs text-zinc-400 font-mono py-2 z-10 pb-safe">
        {t.footer}
      </footer>
    </div>
  );
}
