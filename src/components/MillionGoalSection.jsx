import React, { useState, useEffect, useRef } from 'react';

/**
 * ============================================================================
 * COMPOSANT : MILLION GOAL SECTION (CAP PERSONNEL · 1 000 000 €)
 * Studio ROOM241 • Rémi Brocart
 *
 * Spécifications de composition & animation :
 * - Point focal monumental : 1 000 000 €
 * - Composition éditoriale asymétrique et épurée (DA ROOM241)
 * - Animation progressive en 5 temps distincts à l'entrée dans le viewport :
 *   1. Apparition du cadre d'ensemble (t = 0 ms)
 *   2. Révélation monumentale du chiffre (t = 300 ms)
 *   3. Tracé progressif de l'axe directeur vectoriel (t = 650 ms)
 *   4. Révélation étagée des annotations et du propos éditorial (t = 1050 ms)
 *   5. Stabilisation finale et halo de respiration (t = 1450 ms)
 * - Aucune boucle permanente, aucun layout shift
 * - Respect rigoureux de prefers-reduced-motion
 * ============================================================================
 */
export default function MillionGoalSection() {
  const [inView, setInView] = useState(false);
  const [step, setStep] = useState(0); // 0 -> 1 -> 2 -> 3 -> 4 -> 5
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Vérification du respect de l'accessibilité mouvement réduit
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setInView(true);
      setStep(5);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Déroulement séquencé des 5 temps d'animation
  useEffect(() => {
    if (!inView || reducedMotion) return;

    // Temps 1 : Apparition de la composition
    setStep(1);

    // Temps 2 : Révélation du chiffre principal
    const t2 = setTimeout(() => setStep(2), 300);

    // Temps 3 : Tracé de l'élément graphique vectoriel
    const t3 = setTimeout(() => setStep(3), 650);

    // Temps 4 : Apparition des annotations
    const t4 = setTimeout(() => setStep(4), 1050);

    // Temps 5 : Stabilisation de l'ensemble
    const t5 = setTimeout(() => setStep(5), 1450);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [inView, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="ambition-million"
      className="relative py-24 sm:py-32 lg:py-36 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#0B0A09] via-zinc-950/70 to-[#0B0A09]"
    >
      {/* 5. Stabilisation : Halo ambré feutré en arrière-plan */}
      <div
        className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[350px] bg-[#FFAD00]/[0.05] blur-[140px] rounded-full pointer-events-none transition-opacity duration-1000 ${
          step >= 5 ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* 1. Apparition de la composition */}
        <div
          className={`transition-all duration-700 ease-out ${
            step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Colonne Gauche (5 cols) : Le chiffre monumental, sobre et précis */}
            <div className="lg:col-span-6 space-y-6 lg:border-r lg:border-white/10 lg:pr-10">
              
              {/* Tag éditorial de tête */}
              <div
                className={`flex items-center gap-2.5 transition-all duration-500 delay-100 ${
                  step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFAD00] font-semibold">
                  Cap &amp; Vision personnelle
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {"// Repère volontaire"}
                </span>
              </div>

              {/* 2. Révélation du chiffre principal monumental */}
              <div className="space-y-2 relative overflow-hidden py-1">
                <div
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    step >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
                  }`}
                >
                  <span className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-mono text-white tracking-tighter block leading-none tabular-nums whitespace-nowrap">
                    1 000 000 <span className="text-[#FFAD00]">€</span>
                  </span>
                </div>

                <div
                  className={`transition-all duration-500 delay-150 ${
                    step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  <span className="text-sm sm:text-base font-mono text-zinc-400 block font-medium">
                    Avant 30 ans · Horizon de travail et d'indépendance.
                  </span>
                </div>
              </div>

              {/* 3. Tracé progressif de l'axe directeur vectoriel */}
              <div className="py-2">
                <svg
                  viewBox="0 0 400 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-sm h-6 text-zinc-700"
                  aria-hidden="true"
                >
                  {/* Axe horizontal progressif */}
                  <line
                    x1="0"
                    y1="12"
                    x2="400"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="400"
                    strokeDashoffset={step >= 3 ? "0" : "400"}
                    style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                  {/* Repères gradués */}
                  <line x1="0" y1="6" x2="0" y2="18" stroke="currentColor" strokeWidth="1" />
                  <line x1="200" y1="8" x2="200" y2="16" stroke="currentColor" strokeWidth="1" />
                  <line x1="400" y1="6" x2="400" y2="18" stroke="#FFAD00" strokeWidth="1.5" />
                  {/* Point focal ambré terminal */}
                  <circle
                    cx="400"
                    cy="12"
                    r="3.5"
                    fill="#FFAD00"
                    className={`transition-transform duration-500 ${step >= 3 ? 'scale-100' : 'scale-0'}`}
                  />
                </svg>
              </div>

              {/* 4. Signature éditoriale secondaire sobre */}
              <div
                className={`pt-1 flex items-center gap-3 text-xs sm:text-sm font-serif italic text-zinc-300 tracking-tight transition-all duration-500 ${
                  step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <span className="inline-block w-5 h-[1px] bg-[#FFAD00]/60 shrink-0" />
                <span>« Voir loin. Construire juste. Aller au bout. »</span>
              </div>

            </div>

            {/* Colonne Droite (6 cols) : Propos éditorial & mise en perspective */}
            <div
              className={`lg:col-span-6 space-y-6 lg:pl-4 transition-all duration-700 delay-200 ${
                step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="relative pl-6 sm:pl-8 border-l border-[#FFAD00]/50 space-y-4">
                <p className="text-base sm:text-lg text-zinc-100 leading-relaxed font-normal">
                  « C'est un objectif que je mentionne souvent. Pas pour impressionner, ni pour afficher un chiffre, mais parce que j'ai besoin d'avoir quelque chose de grand à poursuivre. »
                </p>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                  Peut-être que j'y arriverai, peut-être pas. Ce qui compte surtout, c'est la direction que cet objectif me donne et tout ce qu'il me pousse à entreprendre en chemin : la discipline quotidienne, l'exigence dans chaque création et le refus de la tiédeur.
                </p>
              </div>

              {/* Signature conceptuelle */}
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="inline-block w-8 h-[1px] bg-[#FFAD00]/40" />
                <span>Le résultat comme repère, le chemin comme méthode</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
