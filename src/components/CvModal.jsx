import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Mail,
  Check,
  ArrowUpRight,
  MapPin,
  Linkedin,
  ArrowRight,
  Sparkles,
  Copy,
  Phone,
} from 'lucide-react';
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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
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

  const { identity, education, skills } = profileData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(identity.links.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

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
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans text-zinc-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                Disponible immédiatement • CDI
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
            
            {/* 1. En-tête Profil : Identité, Titre & Coordonnées */}
            <header className="space-y-6 pb-8 border-b border-white/10">
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

                {/* Nom, Titre & Paragraphe de présentation */}
                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 id="cv-modal-name" className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                      Rémi Brocart
                    </h1>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                      Studio ROOM241
                    </span>
                  </div>

                  <p className="font-medium text-zinc-200">
                    Graphic Designer &amp; Direction artistique
                  </p>

                  <p className="text-sm leading-relaxed text-zinc-300 max-w-2xl">
                    Double culture alliant la rigueur des sciences de l'ingénieur, la vision stratégique de marque (Master ISEG Lille) et l'exécution créative sur le terrain.
                  </p>
                </div>
              </div>

              {/* Badges de Contact Harmonieux */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                
                {/* Email */}
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10">
                  <Mail className="w-3.5 h-3.5 text-[#FFAD00] shrink-0" />
                  <a href={`mailto:${identity.links.email}`} className="hover:text-white transition-colors">
                    {identity.links.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="ml-1 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                    title="Copier l'email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Téléphone */}
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10">
                  <Phone className="w-3.5 h-3.5 text-[#FFAD00] shrink-0" />
                  <a href={`tel:${identity.links.phone}`} className="hover:text-white transition-colors">
                    {identity.links.phoneFormatted}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="ml-1 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                    title="Copier le numéro"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Localisation */}
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Métropole de Lille (Véhiculé)</span>
                </div>

                {/* LinkedIn */}
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{identity.links.linkedinDisplay}</span>
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
                      <span className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-mono font-medium text-amber-400">
                        SEPT. 2025 — OCT. 2026
                      </span>
                      <span className="text-xs font-mono text-zinc-400 block">
                        CDI • Lille / Salons européens
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
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-white font-semibold">Stands &amp; Scénographie européenne (FIC 2026) :</strong> Habillage et signalétique du stand de plus de 150 m² au Forum InCyber à Lille Grand Palais, ainsi qu'à it-sa Nuremberg (+4 000 contacts qualifiés).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-white font-semibold">Arche vidéo LED (Motion Design After Effects) :</strong> Création de l'animation d'accueil diffusée sur l'arche monumentale du stand FIC 2025.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-white font-semibold">Incarnation de Captain Security :</strong> Incarnation physique du héros de marque en plénière et allées des salons.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
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
                      <span className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-mono font-medium text-amber-400">
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
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-white font-semibold">Fresh Data (Retail Data) :</strong> Univers visuel complet, campagne Ulule validée à 116 %, captation vidéo de terrain au salon international MEDFEL (Perpignan) et dossiers d'aide à la vente B2B.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
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
                      <span className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-mono font-medium text-amber-400">
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

                {/* Colonne 3 : Outils IA & Prototypage */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFAD00]" />
                    <span>Outils IA &amp; Prototypage</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.aiTools?.map((s, idx) => {
                      const name = typeof s === 'object' && s !== null ? s.name : String(s);
                      return (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-medium text-zinc-200"
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                    Recherche documentaire, structuration de briefs, rédaction et veille créative.
                  </p>
                </div>

              </div>
            </section>

            {/* 4. Formation Académique (SANS AUCUNE MENTION DE BAC S « BIEN ») */}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {education.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-2 hover:border-[#FFAD00]/40 transition-all"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-amber-400/20 bg-amber-400/10 font-mono text-[11px] font-medium text-amber-400">
                      {item.period}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug pt-1">
                      {item.degree}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {item.institution}
                    </p>
                    <p className="text-xs text-zinc-300 pt-1 leading-relaxed">
                      {item.field}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ========================================================
              FOOTER — INTÉGRÉ AU MÊME LANGAGE VISUEL GLASS
             ======================================================== */}
          <footer className="relative px-6 sm:px-10 py-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none z-10 print:hidden">
            <span className="text-xs text-zinc-400 font-medium text-center sm:text-left">
              Disponible immédiatement pour opportunités en CDI (Lille, Métropole ou Hybride)
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
