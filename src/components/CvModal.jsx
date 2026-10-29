import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Check, ArrowUpRight, MapPin, Linkedin, ArrowRight, Sparkles, Briefcase, GraduationCap, Wrench, Copy, Phone } from 'lucide-react';
import { profileData } from '../data/profile';

/**
 * CvModal — Refonte Éditoriale & Glass Minimalist Studio ROOM241
 * 
 * Direction artistique :
 * - Rendu éditorial haut de gamme inspiré de la typographie suisse contemporaine
 * - Surface de verre lumineuse et pure (verre dépoli, réfraction feutrée, blanc cassé albâtre #FFFFFF)
 * - Hiérarchie claire : En-tête avec identité forte, grille structurée (Expériences, Compétences, Formation)
 * - Bouton d'exportation / impression dédié avec feuille de style print intégrée
 * - 100% fidèle aux données réelles et factuelles de Rémi Brocart
 */
export default function CvModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Arrière-plan feutré translucide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity cursor-pointer print:hidden"
        />

        {/* Panneau principal du CV — Glass Minimalist & Pure Editorial White */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-name"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#FFFFFF' }}
          className="relative w-full max-w-4xl text-[#09090B] rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.35),0_0_0_1px_rgba(228,228,231,0.8)] border border-zinc-200/90 z-10 overflow-hidden my-3 sm:my-6 max-h-[94vh] flex flex-col font-sans print:shadow-none print:border-none print:max-h-none print:m-0 print:p-0"
        >
          {/* Lueur d'ambiance dorée interne feutrée */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-[#FFAD00]/15 to-transparent blur-3xl pointer-events-none print:hidden" />

          {/* Masthead supérieur — Navigation & Commandes d'action */}
          <div className="relative px-6 sm:px-10 py-4 bg-white/95 backdrop-blur-xl border-b border-zinc-200/80 flex items-center justify-between gap-4 shrink-0 select-none z-10 print:hidden">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 text-white shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase">
                  ROOM241 | CV
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans text-zinc-600 px-3 py-1 rounded-full bg-zinc-100/80 border border-zinc-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                Disponible immédiatement • CDI
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-all inline-flex items-center gap-1.5 border border-zinc-200 cursor-pointer active:scale-95 shadow-2xs"
                title="Imprimer ou enregistrer le CV au format PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-600" />
                <span>Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-zinc-200 shadow-2xs"
                aria-label="Fermer le CV"
              >
                <X className="w-4 h-4 text-zinc-900" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Contenu Déroulant — Typographie Éditoriale & Lisibilité Parfaite */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-10 overflow-y-auto flex-grow relative z-10 print:p-0 print:overflow-visible">
            
            {/* 1. En-tête Profil : Identité, Titre & Coordonnées */}
            <header className="space-y-6 pb-8 border-b border-zinc-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                
                {/* Portrait Rémi Brocart */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-[0_8px_25px_rgba(0,0,0,0.08)] bg-zinc-900 shrink-0">
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
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600">
                      Studio ROOM241
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-zinc-800 tracking-tight">
                    Graphic Designer &amp; Direction artistique
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
                    Double culture alliant la rigueur des sciences de l'ingénieur, la vision stratégique de marque (Master ISEG Lille) et l'exécution créative sur le terrain.
                  </p>
                </div>
              </div>

              {/* Coordonnées & Liens en badges épurés */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
                
                {/* Email avec copie */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 font-medium">
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <a href={`tel:${identity.links.phone}`} className="hover:underline">
                    {identity.links.phoneFormatted}
                  </a>
                </div>

                {/* Localisation */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Métropole Européenne de Lille / Erquinghem-Lys (Véhiculé)</span>
                </div>

                {/* LinkedIn */}
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 font-medium transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{identity.links.linkedinDisplay}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>

              </div>
            </header>

            {/* 2. Expériences Professionnelles (Chronologie rigoureuse) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-950">
                    01 // EXPÉRIENCES PROFESSIONNELLES
                  </h2>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-500">
                  2023 — 2026
                </span>
              </div>

              <div className="space-y-8">
                
                {/* Expérience 1 : Hornetsecurity */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="md:col-span-4 space-y-1">
                    <span className="text-xs font-mono font-bold text-zinc-950 block">
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

                {/* Expérience 2 : Studio ROOM241 (Activité indépendante) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start pt-6 border-t border-zinc-100">
                  <div className="md:col-span-4 space-y-1">
                    <span className="text-xs font-mono font-bold text-zinc-950 block">
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

                {/* Expérience 3 : Sencrop */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start pt-6 border-t border-zinc-100">
                  <div className="md:col-span-4 space-y-1">
                    <span className="text-xs font-mono font-bold text-zinc-950 block">
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
            </section>

            {/* 3. Compétences & Outils créatifs */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
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
                <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
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
                <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
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
                <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
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
                          className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 shadow-2xs"
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
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
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
                    className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2 hover:border-[#FFAD00]/40 transition-colors"
                  >
                    <span className="font-mono text-xs font-bold text-zinc-950 block">
                      {item.period}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 leading-snug">
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

          {/* Pied de Modale fixe — Statut & Action directe */}
          <footer className="relative px-6 sm:px-10 py-4 bg-white/95 backdrop-blur-xl border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none z-10 print:hidden">
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
