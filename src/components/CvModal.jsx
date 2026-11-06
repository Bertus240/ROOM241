import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import { VectorMasterISEG, VectorBachelorISEG, VectorScientific } from './EditorialVectors';
import { profileData } from '../data/profile';

/**
 * ============================================================================
 * CV MODAL — STUDIO ROOM241
 * Véritable Glassmorphism Sombre Premium & Lisibilité Haute Définition
 *
 * Spécifications UX/UI validées :
 * 1. Conteneur principal : Verre sombre translucide (bg-zinc-950/80 backdrop-blur-xl border-white/10 shadow-2xl).
 * 2. Header harmonisé : Badge ROOM241 | CV, boutons d'onglets, impression et fermeture sur fond transparent teinté.
 * 3. Hiérarchie typographique : Blanc éclatant (text-white) et zinc lumineux (text-zinc-200 / text-zinc-300).
 * 4. Badges de contact : Capsules dépolies sombres (bg-white/5 border-white/10 hover:bg-white/10 text-zinc-200).
 * 5. Expérience professionnelle : Suppression totale du bloc blanc opaque, cartes en verre sombre (bg-white/5), badge dates ambré (border-amber-400/20 bg-amber-400/10 text-amber-400).
 * 6. Suppression de la mention « Bien » du Bac S : uniquement l'année 2020 affichée.
 * 7. Responsive complet : adaptation mobile 390×844 sans débordement, défilement vertical fluide, accessibilité Échap.
 * ============================================================================
 */

export default function CvModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('experiences');
  const scrollContainerRef = useRef(null);
  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef(null);

  // 1. Fermeture par la touche Échap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 2. Verrouillage du scroll d'arrière-plan
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, [isOpen]);

  // 3. Suivi automatique de la section visible au scroll (Scroll Spy)
  useEffect(() => {
    if (!isOpen) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections = [
      { id: 'cv-section-experiences', tab: 'experiences' },
      { id: 'cv-section-skills', tab: 'skills' },
      { id: 'cv-section-education', tab: 'education' },
    ];

    const elements = sections
      .map((s) => ({ el: document.getElementById(s.id), tab: s.tab }))
      .filter((s) => s.el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrollRef.current) return;
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => {
            const topA = Math.abs(a.boundingClientRect.top - container.getBoundingClientRect().top);
            const topB = Math.abs(b.boundingClientRect.top - container.getBoundingClientRect().top);
            return topA - topB;
          });
          const match = sections.find((s) => s.id === visible[0].target.id);
          if (match) {
            setActiveTab(match.tab);
          }
        }
      },
      {
        root: container,
        rootMargin: '-10% 0px -50% 0px',
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { identity, skills } = profileData;

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (sectionId, tabKey) => {
    setActiveTab(tabKey);
    isManualScrollRef.current = true;
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 800);

    const container = scrollContainerRef.current;
    const target = document.getElementById(sectionId);
    if (container && target) {
      const topPos = target.offsetTop - 20;
      container.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Arrière-plan atmosphérique tamisé — Clic extérieur pour fermer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity cursor-pointer print:hidden"
          aria-label="Fermer la fenêtre du CV"
        />

        {/* Panneau principal du CV — Véritable Glassmorphism Sombre Premium */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-name"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 14 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl text-white rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl z-10 overflow-hidden my-3 sm:my-6 max-h-[92vh] flex flex-col font-sans print:bg-white print:text-black print:shadow-none print:border-none print:max-h-none print:m-0 print:p-0"
        >
          {/* Lueur d'ambiance ambrée discrète intégrée au verre */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-[#FFAD00]/15 via-transparent to-transparent blur-3xl pointer-events-none print:hidden"
          />

          {/* ========================================================
              HEADER — INTÉGRÉ AU MÊME LANGAGE VISUEL GLASS
             ======================================================== */}
          <div className="relative px-5 sm:px-8 py-3.5 bg-white/[0.03] backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-3 shrink-0 select-none z-10 print:hidden">
            
            {/* Gauche : Badge ROOM241 et disponibilité */}
            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.9)] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-zinc-200">
                  ROOM241 | CV
                </span>
              </div>
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans text-zinc-200 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                À l'écoute d'opportunités
              </span>
            </div>

            {/* Centre : Onglets de navigation rapide */}
            <nav className="hidden sm:flex items-center p-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold" aria-label="Sections du CV">
              <button
                type="button"
                onClick={() => scrollToSection('cv-section-experiences', 'experiences')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'experiences'
                    ? 'bg-[#FFAD00] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                01 Expériences
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('cv-section-skills', 'skills')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'skills'
                    ? 'bg-[#FFAD00] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                02 Compétences
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('cv-section-education', 'education')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-[#FFAD00] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                03 Formation
              </button>
            </nav>

            {/* Droite : Impression PDF & Fermeture */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-medium transition-all inline-flex items-center gap-1.5 border border-white/10 cursor-pointer active:scale-95"
                title="Imprimer ou enregistrer le CV au format PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-300" />
                <span className="hidden xs:inline">Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                aria-label="Fermer le CV"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================
              CORPS DU CV (DÉROULANT ET PARFAITEMENT LISIBLE)
             ======================================================== */}
          <div
            ref={scrollContainerRef}
            className="p-6 sm:p-10 lg:p-12 space-y-10 overflow-y-auto flex-grow relative z-10 custom-scrollbar print:p-0 print:overflow-visible"
          >
            
            {/* 1. En-tête Profil : Identité, Introduction & Coordonnées sur une seule ligne desktop */}
            <header className="space-y-4 pb-8 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                
                {/* Portrait Rémi Brocart */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-zinc-900 shrink-0">
                  <img
                    src={identity.avatar}
                    alt="Rémi Brocart"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </div>

                {/* Hiérarchie stricte : 1. Nom, 2. Introduction */}
                <div className="space-y-2 flex-grow">
                  <h1 id="cv-modal-name" className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    Rémi Brocart
                  </h1>

                  <p className="text-sm leading-relaxed text-zinc-300 max-w-2xl">
                    Diplômé du Master Marketing, communication et digital à l'ISEG Lille, alliant vision stratégique de marque, rigueur de méthode et exécution créative sur le terrain.
                  </p>
                </div>
              </div>

              {/* 3. Coordonnées — Obligatoirement sur une seule ligne à 1440 px et 1024 px, sans SVG décoratifs */}
              <div className="pt-2 border-t border-white/5 flex flex-wrap md:flex-nowrap items-center text-xs text-zinc-300 gap-y-2 gap-x-2.5 sm:gap-x-3">
                <a
                  href="mailto:brocart.remi02@gmail.com"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline whitespace-nowrap"
                >
                  brocart.remi02@gmail.com
                </a>
                <span className="text-zinc-600 hidden md:inline select-none" aria-hidden="true">|</span>
                <a
                  href="tel:0767123858"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline whitespace-nowrap"
                >
                  07 67 12 38 58
                </a>
                <span className="text-zinc-600 hidden md:inline select-none" aria-hidden="true">|</span>
                <span className="text-zinc-300 whitespace-nowrap">
                  Métropole de Lille (Véhiculé)
                </span>
                <span className="text-zinc-600 hidden md:inline select-none" aria-hidden="true">|</span>
                <a
                  href="https://www.linkedin.com/in/remibrocart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline whitespace-nowrap inline-flex items-center gap-1"
                >
                  <span>linkedin.com/in/remibrocart</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </header>

            {/* 2. Expériences Professionnelles (Cartes en Verre Sombre Dépoli) */}
            <section id="cv-section-experiences" className="space-y-6 scroll-mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-200">
                    01 // EXPÉRIENCES PROFESSIONNELLES
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-400">
                  2023 — 2026
                </span>
              </div>

              <div className="space-y-4">
                
                {/* Expérience 1 : Hornetsecurity */}
                <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4 hover:border-white/20 transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300">
                        SEPT. 2025 — OCT. 2026
                      </span>
                      <span className="text-xs font-mono text-zinc-400 block">
                        Lille / Salons européens
                      </span>
                      <h3 className="text-sm font-bold text-white pt-1">
                        Hornetsecurity by Proofpoint
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Leader européen de la cybersécurité Cloud
                      </p>
                    </div>

                    <div className="md:col-span-8 space-y-3">
                      <h4 className="text-base font-bold text-white">
                        Graphic Designer &amp; Brand Production
                      </h4>
                      <p className="text-sm leading-relaxed text-zinc-200">
                        Conception graphique et scénographie pour les grands salons professionnels européens au sein d'une équipe design internationale basée en Allemagne.
                      </p>

                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                          <span><strong className="text-white font-semibold">Stands &amp; Scénographie européenne (FIC 2026) :</strong> Habillage et signalétique du stand de plus de 150 m² au Forum InCyber à Lille Grand Palais, ainsi qu'à it-sa Nuremberg (+4 000 contacts qualifiés enregistrés collectivement par les équipes commerciales).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                          <span><strong className="text-white font-semibold">Arche vidéo LED (Motion Design After Effects) :</strong> Création de l'animation d'accueil diffusée sur l'arche monumentale du stand FIC 2025.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                          <span><strong className="text-white font-semibold">Incarnation de Captain Security :</strong> Incarnation physique du héros de marque en plénière et allées des salons.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                          <span><strong className="text-white font-semibold">Sprint autonome 36 h à Hanovre (Helix Nova) :</strong> Conception complète d'un univers cyber-héros 3D en compétition internationale sous forte contrainte de temps.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Expérience 2 : Studio ROOM241 (Activité indépendante) */}
                <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4 hover:border-white/20 transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300">
                        DEPUIS 2023
                      </span>
                      <span className="text-xs font-mono text-zinc-400 block">
                        Activité indépendante
                      </span>
                      <h3 className="text-sm font-bold text-white pt-1">
                        Studio ROOM241
                      </h3>
                      <p className="text-xs text-zinc-400">
                        B2B, Retail Data &amp; BTP haut de gamme
                      </p>
                    </div>

                    <div className="md:col-span-8 space-y-3">
                      <h4 className="text-base font-bold text-white">
                        Direction artistique &amp; Création graphique
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                          <span><strong className="text-white font-semibold">Fresh Data (Retail Data) :</strong> Univers visuel complet, campagne Ulule validée à 116 %, captation vidéo de terrain au salon international MEDFEL (Perpignan) et dossiers d'aide à la vente B2B.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                          <span><strong className="text-white font-semibold">Résin'Architecte (BTP haut de gamme) :</strong> Formalisation de la charte de marque, modèles pour réseaux sociaux, fiches techniques avant/après et captation vidéo directe sur chantier.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Expérience 3 : Sencrop */}
                <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4 hover:border-white/20 transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300">
                        STAGE CONVENTIONNÉ
                      </span>
                      <span className="text-xs font-mono text-zinc-400 block">
                        Lille, France
                      </span>
                      <h3 className="text-sm font-bold text-white pt-1">
                        Sencrop
                      </h3>
                      <p className="text-xs text-zinc-400">
                        AgTech &amp; Stations météo connectées
                      </p>
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <h4 className="text-base font-bold text-white">
                        Community Manager stagiaire
                      </h4>
                      <p className="text-sm leading-relaxed text-zinc-300">
                        Participation active à la stratégie éditoriale, animation de communauté et valorisation des usages agricoles connectés à travers des visuels et contenus digitaux.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. Compétences & Outils créatifs */}
            <section id="cv-section-skills" className="space-y-6 scroll-mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-200">
                    02 // COMPÉTENCES &amp; OUTILS
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-400">
                  Pratique quotidienne
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Colonne 1 : Domaines d'expertise */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Domaines d'expertise
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {skills.business?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colonne 2 : Suite Adobe & Logiciels */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Suite Adobe &amp; Création
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {skills.software?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colonne 3 : IA & EXPÉRIMENTATION */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    IA &amp; EXPÉRIMENTATION
                  </h3>
                  <div className="text-xs font-medium text-zinc-200 leading-snug">
                    <span>ChatGPT (OpenAI) · Claude (Anthropic) · Gemini (Google)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                    Mobilisation des outils d'intelligence artificielle pour explorer des pistes, structurer des idées, approfondir les recherches et accélérer la conception de briefs, de contenus et de prototypes.
                  </p>
                </div>

              </div>
            </section>

            {/* 4. Formation Académique (Master, Bachelor, Formations complémentaires, MUN, Baccalauréat) */}
            <section id="cv-section-education" className="space-y-6 scroll-mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-200">
                    03 // FORMATION ACADÉMIQUE
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-400">
                  Parcours certifié
                </span>
              </div>

              <div className="space-y-4">
                
                {/* 1. MASTER ISEG LILLE (La partie la plus développée) */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-5 hover:border-[#FFAD00]/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-start gap-3">
                      <VectorMasterISEG className="w-6 h-6 text-[#FFAD00] shrink-0 mt-0.5" />
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md border border-white/10 bg-white/[0.04] font-mono text-[11px] font-medium text-zinc-300">
                          2023 — 2025
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                          Master Marketing, communication et digital — ISEG Lille
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#FFAD00] font-semibold px-2.5 py-1 rounded-full bg-[#FFAD00]/10 border border-[#FFAD00]/20">
                      Diplôme Master validé
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Formation approfondie en stratégie de marque, management marketing, développement commercial et transformation des organisations.
                  </p>

                  {/* Les 3 axes d'enseignements du Master */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    
                    {/* Axe 1 */}
                    <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                        Stratégie de marque &amp; développement
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                        <li>• Brand management et identité visuelle</li>
                        <li>• Product management et pilotage de l'offre</li>
                        <li>• Merchandising</li>
                        <li>• Stratégie de fidélisation</li>
                        <li>• Marketing B2B</li>
                        <li>• Marketing collaboratif</li>
                        <li>• Business plan et fondamentaux de la création d'entreprise</li>
                      </ul>
                    </div>

                    {/* Axe 2 */}
                    <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                        Stratégie &amp; transformation
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                        <li>• Prospective</li>
                        <li>• RSE</li>
                        <li>• IA et développement durable</li>
                        <li>• Neuromarketing</li>
                        <li>• Communication de crise</li>
                        <li>• Écosystèmes et analyse systémique</li>
                      </ul>
                    </div>

                    {/* Axe 3 */}
                    <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                        Management &amp; analyse
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                        <li>• Data science</li>
                        <li>• Gestion de projet</li>
                        <li>• Méthodes agiles</li>
                        <li>• Efficacité au travail</li>
                        <li>• Qualité de vie au travail</li>
                      </ul>
                    </div>

                  </div>

                  {/* Compétences associées au Master */}
                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] font-mono text-zinc-400 mr-1">Compétences :</span>
                    {[
                      'stratégie marketing',
                      'brand management',
                      'product management',
                      'marketing B2B',
                      'merchandising',
                      'gestion de projet',
                      'méthodes agiles',
                      'analyse stratégique'
                    ].map((comp, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-white/[0.04] border border-white/10 text-zinc-300">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. BACHELOR / LICENCE ISEG LILLE */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4 hover:border-[#FFAD00]/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-start gap-3">
                      <VectorBachelorISEG className="w-6 h-6 text-zinc-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md border border-white/10 bg-white/[0.04] font-mono text-[11px] font-medium text-zinc-300">
                          2020 — 2023
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                          Licence Marketing, communication et digital — ISEG Lille
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">
                      Niveau Bachelor / Licence
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Formation pluridisciplinaire en marketing, communication, stratégie de marque et environnement numérique, avec une ouverture internationale et une dimension projet.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                        Marketing &amp; communication
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-400">
                        <li>• Stratégies de marque, de communication et d'innovation</li>
                        <li>• Plans marketing</li>
                        <li>• Marketing international et sectoriel</li>
                        <li>• Tendances et nouveaux usages</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                        Digital
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-400">
                        <li>• Outils et projets digitaux</li>
                        <li>• Droit des technologies numériques</li>
                        <li>• Géopolitique</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                        International &amp; expression
                      </h4>
                      <ul className="space-y-1 text-xs text-zinc-400">
                        <li>• Business English</li>
                        <li>• Débats en anglais</li>
                        <li>• Masterclasses professionnelles</li>
                        <li>• Stage d'immersion</li>
                      </ul>
                    </div>
                  </div>

                  {/* Associations */}
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                      Associations :
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                      <div className="flex items-baseline gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                        <span><strong className="text-white">EPEE — Campus Ambassador :</strong> promotion et représentation de l'ISEG Lille.</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                        <span><strong className="text-white">The View — Association audiovisuelle :</strong> engagement autour de la création et de la production audiovisuelle.</span>
                      </div>
                    </div>
                  </div>

                  {/* Compétences Bachelor */}
                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] font-mono text-zinc-400 mr-1">Compétences :</span>
                    {[
                      'marketing digital',
                      'communication',
                      'stratégie de marque',
                      'marketing international',
                      'outils numériques'
                    ].map((comp, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-white/[0.04] border border-white/10 text-zinc-300">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grille 3 colonnes pour 3. Formations complémentaires, 4. MUN, 5. Baccalauréat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* 3. Formations complémentaires */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300">
                        2022
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">Complémentaire</span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      Formations complémentaires
                    </h3>
                    <ul className="space-y-2 text-xs text-zinc-300 pt-1">
                      <li>
                        <strong className="text-white block font-semibold">PSC1 — Croix-Rouge Compétence</strong>
                        <span className="text-zinc-400 text-[11px]">Octobre 2022 · Certificat obtenu</span>
                      </li>
                      <li>
                        <strong className="text-white block font-semibold">QVT &amp; management de l'efficacité</strong>
                        <span className="text-zinc-400 text-[11px]">IONISx / ISEG PPIX · Mars 2022</span>
                      </li>
                      <li>
                        <strong className="text-white block font-semibold">Comprendre l'économie collaborative</strong>
                        <span className="text-zinc-400 text-[11px]">IONISx / ISEG PPIX · Mars 2022</span>
                      </li>
                    </ul>
                  </div>

                  {/* 4. Expérience académique internationale (MUN) */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300">
                        Mars 2019
                      </span>
                      <span className="text-[10px] font-mono text-[#FFAD00]">International</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        Model United Nations des Lycéens
                      </h3>
                      <p className="text-[11px] text-zinc-400">EDHEC Business School</p>
                    </div>
                    <ul className="space-y-1 text-xs text-zinc-300 pt-1">
                      <li>• Simulation d'une assemblée des Nations unies (2 jours)</li>
                      <li>• Immersion et échanges en anglais</li>
                      <li>• Représentation de la Nouvelle-Zélande</li>
                      <li>• Négociations, débats géopolitiques et diplomatiques</li>
                      <li>• Rédaction d'un position paper</li>
                    </ul>
                  </div>

                  {/* 5. Formation initiale (Baccalauréat scientifique) */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <VectorScientific className="w-4 h-4 text-zinc-300" />
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300">
                          2017 — 2020
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">Baccalauréat</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        Baccalauréat scientifique (SI)
                      </h3>
                      <p className="text-[11px] text-zinc-400">Lycée Ozanam Lille (OEC)</p>
                    </div>
                    <ul className="space-y-1 text-xs text-zinc-300 pt-1">
                      <li>• Spécialité Sciences de l'Ingénieur</li>
                      <li>• Participation au MUN</li>
                      <li>• Association sportive : musculation, badminton, escalade</li>
                      <li>• Cours préparatoires au BIA</li>
                    </ul>
                  </div>

                </div>

              </div>
            </section>

          </div>

          {/* ========================================================
              FOOTER — INTÉGRÉ AU MÊME LANGAGE VISUEL GLASS
             ======================================================== */}
          <footer className="relative px-6 sm:px-10 py-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none z-10 print:hidden">
            <span className="text-xs text-zinc-400 font-medium text-center sm:text-left">
              À l'écoute d'opportunités · Métropole de Lille &amp; Mobilité
            </span>
            <a
              href={`mailto:${identity.links.email}?subject=Opportunité professionnelle — Portfolio ROOM241`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Proposer un échange</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </a>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
