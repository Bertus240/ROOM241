import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Check, ArrowUpRight, MapPin, Linkedin, ArrowRight, Sparkles, Briefcase, GraduationCap, Wrench, Copy, Phone } from 'lucide-react';
import { profileData } from '../data/profile';

/**
 * CvModal — Véritable Glassmorphism inspiré de la Barre de Navigation
 * 
 * Direction artistique & Design System :
 * - Directement inspiré de la barre de navigation supérieure (Navbar pill-capsule)
 * - Navigation interne par onglets capsules avec curseur physique coulissant (01 Expériences, 02 Compétences, 03 Formation)
 * - Verre dépoli pur (Aero Glass, backdrop-blur-3xl, réfraction lumineuse, zéro grisâtre)
 * - Badges et métadonnées en pilules arrondies satinées (rounded-full)
 * - Actions tactiles soignées (copie 1-clic avec feedback émeraude, impression/export PDF, contact direct)
 * - 100% fidèle au parcours réel de Rémi Brocart
 */
export default function CvModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState('experiences');
  const scrollContainerRef = useRef(null);

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
    const container = scrollContainerRef.current;
    const target = document.getElementById(sectionId);
    if (container && target) {
      const topPos = target.offsetTop - 30;
      container.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Arrière-plan atmosphérique tamisé avec flou optique immersif — Clic pour fermer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/65 backdrop-blur-2xl transition-opacity cursor-pointer print:hidden"
          aria-label="Fermer la fenêtre du CV"
        />

        {/* Panneau principal du CV — Glassmorphism Haute Réfraction inspiré de la Navbar */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-name"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 14 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl text-[#09090B] rounded-3xl bg-white/98 sm:bg-white/95 backdrop-blur-3xl shadow-[0_35px_100px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.9),inset_0_1px_1px_rgba(255,255,255,1)] border border-white/80 z-10 overflow-hidden my-3 sm:my-6 max-h-[94vh] flex flex-col font-sans print:bg-white print:shadow-none print:border-none print:max-h-none print:m-0 print:p-0"
        >
          {/* Lueurs optiques d'ambiance satinée intégrées au verre (non imprimées) */}
          <div aria-hidden="true" className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFAD00]/20 via-[#FFAD00]/5 to-transparent blur-3xl pointer-events-none print:hidden" />
          <div aria-hidden="true" className="absolute -bottom-36 -left-36 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-400/10 via-amber-100/15 to-transparent blur-3xl pointer-events-none print:hidden" />

          {/* ========================================================
              MASTHEAD SUPÉRIEUR — Navigation Verre inspirée de la Navbar
             ======================================================== */}
          <div className="relative px-5 sm:px-8 py-3.5 bg-white/75 backdrop-blur-2xl border-b border-zinc-200/50 flex items-center justify-between gap-3 shrink-0 select-none z-10 print:hidden">
            
            {/* Gauche : Badge ROOM241 et statut disponibilité */}
            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 text-white shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.9)] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase">
                  ROOM241 | CV
                </span>
              </div>
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans text-zinc-700 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                Disponible immédiatement • CDI
              </span>
            </div>

            {/* Centre : Onglets de navigation rapide façon capsule Navbar */}
            <nav className="hidden sm:flex items-center p-1 rounded-full bg-zinc-100/90 border border-zinc-200/80 shadow-inner text-xs font-semibold" aria-label="Sections du CV">
              <button
                type="button"
                onClick={() => scrollToSection('cv-section-experiences', 'experiences')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'experiences'
                    ? 'bg-white text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                01 Expériences
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('cv-section-skills', 'skills')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'skills'
                    ? 'bg-white text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                02 Compétences
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('cv-section-education', 'education')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-white text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                03 Formation
              </button>
            </nav>

            {/* Droite : Bouton Impression PDF & Bouton Fermer */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-800 text-xs font-semibold transition-all inline-flex items-center gap-1.5 border border-white/90 backdrop-blur-md cursor-pointer active:scale-95 shadow-2xs"
                title="Imprimer ou enregistrer le CV au format PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-600" />
                <span className="hidden xs:inline">Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-zinc-200/80 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                aria-label="Fermer le CV"
              >
                <X className="w-5 h-5 text-zinc-900" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ========================================================
              CONTENU DÉROULANT DU CV
             ======================================================== */}
          <div 
            ref={scrollContainerRef}
            className="p-6 sm:p-10 lg:p-12 space-y-10 overflow-y-auto flex-grow relative z-10 print:p-0 print:overflow-visible"
          >
            
            {/* 1. En-tête Profil : Identité, Titre & Coordonnées en Capsules Glass Design */}
            <header className="space-y-6 pb-8 border-b border-zinc-200/60">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                
                {/* Portrait Rémi Brocart avec cerclage blanc brillant façon capsule */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] bg-zinc-900 shrink-0">
                  <img
                    src={identity.avatar}
                    alt="Rémi Brocart"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
                </div>

                {/* Nom, Titre & Accroche synthétique */}
                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 id="cv-modal-name" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-none">
                      Rémi Brocart
                    </h1>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-zinc-700 shadow-2xs">
                      Studio ROOM241
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                    Graphic Designer &amp; Direction artistique
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-700 max-w-2xl leading-relaxed">
                    Double culture alliant la rigueur des sciences de l'ingénieur, la vision stratégique de marque (Master ISEG Lille) et l'exécution créative sur le terrain.
                  </p>
                </div>
              </div>

              {/* Coordonnées & Liens en capsules Glass Design comme la Navbar */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
                
                {/* Email avec copie tactile */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/90 text-zinc-800 font-medium shadow-2xs hover:bg-white transition-all">
                  <Mail className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <a href={`mailto:${identity.links.email}`} className="hover:underline">
                    {identity.links.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="ml-1 text-[11px] text-zinc-400 hover:text-zinc-900 cursor-pointer"
                    title="Copier l'email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Téléphone */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/90 text-zinc-800 font-medium shadow-2xs hover:bg-white transition-all">
                  <Phone className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <a href={`tel:${identity.links.phone}`} className="hover:underline">
                    {identity.links.phoneFormatted}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="ml-1 text-[11px] text-zinc-400 hover:text-zinc-900 cursor-pointer"
                    title="Copier le numéro"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Localisation */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/90 text-zinc-700 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Métropole de Lille (Véhiculé)</span>
                </div>

                {/* LinkedIn */}
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/75 hover:bg-white backdrop-blur-xl border border-white/90 text-zinc-800 font-medium transition-all shadow-2xs"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{identity.links.linkedinDisplay}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>

              </div>
            </header>

            {/* 2. Expériences Professionnelles (Cartes en Verre Lumineux) */}
            <section id="cv-section-experiences" className="space-y-6 scroll-mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-950">
                    01 // EXPÉRIENCES PROFESSIONNELLES
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-500">
                  2023 — 2026
                </span>
              </div>

              <div className="space-y-5">
                
                {/* Expérience 1 : Hornetsecurity */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-1.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] font-mono font-bold text-zinc-950">
                        SEPT. 2025 — OCT. 2026
                      </span>
                      <span className="text-xs font-mono text-zinc-500 block">
                        CDI • Lille / Salons européens
                      </span>
                      <h3 className="text-sm font-extrabold text-zinc-900 pt-1">
                        Hornetsecurity by Proofpoint
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Leader européen de la cybersécurité Cloud
                      </p>
                    </div>

                    <div className="md:col-span-8 space-y-3">
                      <h4 className="text-base font-bold text-zinc-950">
                        Graphic Designer &amp; Brand Production
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        Conception graphique et scénographie pour les grands salons professionnels européens au sein d'une équipe design internationale basée en Allemagne.
                      </p>

                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-zinc-950">Stands &amp; Scénographie européenne (FIC 2026) :</strong> Habillage et signalétique du stand de plus de 150 m² au Forum InCyber à Lille Grand Palais, ainsi qu'à it-sa Nuremberg (+4 000 contacts qualifiés).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-zinc-950">Arche vidéo LED (Motion Design After Effects) :</strong> Création de l'animation d'accueil diffusée sur l'arche monumentale du stand FIC 2025.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-zinc-950">Incarnation de Captain Security :</strong> Incarnation physique du héros de marque en plénière et allées des salons.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-zinc-950">Sprint autonome 36 h à Hanovre (Helix Nova) :</strong> Conception complète d'un univers cyber-héros 3D en compétition internationale sous forte contrainte de temps.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Expérience 2 : Studio ROOM241 (Activité indépendante) */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-1.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] font-mono font-bold text-zinc-950">
                        DEPUIS 2023
                      </span>
                      <span className="text-xs font-mono text-zinc-500 block">
                        Activité indépendante
                      </span>
                      <h3 className="text-sm font-extrabold text-zinc-900 pt-1">
                        Studio ROOM241
                      </h3>
                      <p className="text-xs text-zinc-500">
                        B2B, Retail Data &amp; BTP haut de gamme
                      </p>
                    </div>

                    <div className="md:col-span-8 space-y-3">
                      <h4 className="text-base font-bold text-zinc-950">
                        Direction artistique &amp; Création graphique
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-zinc-950">Fresh Data (Retail Data) :</strong> Univers visuel complet, campagne Ulule validée à 116 %, captation vidéo de terrain au salon international MEDFEL (Perpignan) et dossiers d'aide à la vente B2B.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFAD00] font-bold mt-0.5">•</span>
                          <span><strong className="text-zinc-950">Résin'Architecte (BTP haut de gamme) :</strong> Formalisation de la charte de marque, modèles pour réseaux sociaux, fiches techniques avant/après et captation vidéo directe sur chantier.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Expérience 3 : Sencrop */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-1.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] font-mono font-bold text-zinc-950">
                        STAGE CONVENTIONNÉ
                      </span>
                      <span className="text-xs font-mono text-zinc-500 block">
                        Lille, France
                      </span>
                      <h3 className="text-sm font-extrabold text-zinc-900 pt-1">
                        Sencrop
                      </h3>
                      <p className="text-xs text-zinc-500">
                        AgTech &amp; Stations météo connectées
                      </p>
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <h4 className="text-base font-bold text-zinc-950">
                        Community Manager stagiaire
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        Participation active à la stratégie éditoriale, animation de communauté et valorisation des usages agricoles connectés à travers des visuels et contenus digitaux.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. Compétences & Outils créatifs en Panneaux Dépolis */}
            <section id="cv-section-skills" className="space-y-6 scroll-mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-950">
                    02 // COMPÉTENCES &amp; OUTILS
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-500">
                  Pratique quotidienne
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Colonne 1 : Domaines d'expertise */}
                <div className="space-y-3 p-5 sm:p-6 rounded-3xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950">
                    Domaines d'expertise
                  </h3>
                  <ul className="space-y-2 text-xs font-medium text-zinc-700">
                    {skills.business?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colonne 2 : Suite Adobe & Logiciels */}
                <div className="space-y-3 p-5 sm:p-6 rounded-3xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950">
                    Suite Adobe &amp; Création
                  </h3>
                  <ul className="space-y-2 text-xs font-medium text-zinc-700">
                    {skills.software?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colonne 3 : Outils IA & Prototypage */}
                <div className="space-y-3 p-5 sm:p-6 rounded-3xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFAD00]" />
                    <span>Outils IA &amp; Prototypage</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.aiTools?.map((s, idx) => {
                      const name = typeof s === 'object' && s !== null ? s.name : String(s);
                      return (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/70 text-xs font-semibold text-zinc-800 shadow-2xs"
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed pt-1">
                    Recherche documentaire, structuration de briefs, rédaction et veille créative.
                  </p>
                </div>

              </div>
            </section>

            {/* 4. Formation Académique */}
            <section id="cv-section-education" className="space-y-6 scroll-mt-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-950">
                    03 // FORMATION ACADÉMIQUE
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-500">
                  Parcours certifié
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {education.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-3xl bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/90 space-y-2 hover:border-[#FFAD00]/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200/70 font-mono text-[11px] font-bold text-zinc-950">
                      {item.period}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 leading-snug pt-1">
                      {item.degree}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {item.institution}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ========================================================
              PIED DE MODALE FIXE — Verre satiné & Action directe en pilule
             ======================================================== */}
          <footer className="relative px-6 sm:px-10 py-4 bg-white/75 backdrop-blur-2xl border-t border-zinc-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none z-10 print:hidden">
            <span className="text-xs text-zinc-600 font-medium text-center sm:text-left">
              Disponible immédiatement pour opportunités en CDI (Lille, Métropole ou Hybride)
            </span>
            <a
              href={`mailto:${identity.links.email}?subject=Opportunité professionnelle — Portfolio ROOM241`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Proposer un échange</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
            </a>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
