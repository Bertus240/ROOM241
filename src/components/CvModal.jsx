import React, { useState, useEffect } from 'react';
import { X, Printer, Mail, MapPin, Linkedin, Briefcase, GraduationCap, Sparkles, Check, ArrowUpRight, Wrench, Shield, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profile';

/**
 * CvModal — Curriculum Vitæ synthétique haute fidélité avec Glass Design premium.
 * 
 * Conception & Direction Artistique :
 * - Glassmorphism contemporain (surfaces translucides, reflets doux, typographie éditoriale).
 * - Exactitude factuelle absolue : FIC 2026 pour le stand > 150 m² et l'arche LED After Effects.
 * - Conçu pour l'affichage écran et optimisé pour l'impression / export PDF (window.print).
 */
export default function CvModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Fermeture par la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Verrouillage du scroll en arrière-plan
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { identity, skills, education } = profileData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop sombre et flou */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Conteneur principal de la Modale — Glass Design Premium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-zinc-200/90 dark:border-white/15 z-10 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        >
          {/* Barre haute : Glass bar avec statut et boutons d'action */}
          <div className="px-6 py-4 bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between gap-4 shrink-0 select-none">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                CURRICULUM VITÆ // {identity.name}
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                DISPONIBLE IMMÉDIATEMENT
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-white/20 bg-white dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-[#FFAD00] hover:scale-105 transition-all shadow-xs cursor-pointer"
                title="Imprimer ou exporter en PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                <span className="hidden sm:inline">Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contenu Déroulant & Imprimable */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10 font-sans print:p-0 print:overflow-visible">
            
            {/* 1. Carte de Visite Éditoriale (Glass Design) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={identity.avatar}
                  alt={identity.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-zinc-200 dark:border-white/15 shadow-md shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {identity.name}
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Graphic Designer &amp; Direction artistique <span className="text-zinc-400">·</span> <span className="text-[#09090B] dark:text-white font-mono font-semibold">{identity.brand}</span>
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                    Double culture alliant la rigueur des sciences de l'ingénieur (Bac S SI), la vision stratégique de marque (Master ISEG Lille) et l'exécution créative sur le terrain.
                  </p>
                </div>
              </div>

              {/* Coordonnées & Liens Rapides */}
              <div className="flex flex-wrap sm:flex-col gap-2 text-xs text-zinc-600 dark:text-zinc-300 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-white/10 hover:border-[#FFAD00] transition-colors cursor-pointer text-left shadow-2xs select-none"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Mail className="w-3.5 h-3.5 text-[#FFAD00]" />}
                  <span className="font-mono text-[11px] font-medium">{copiedEmail ? "Email copié !" : identity.links.email}</span>
                </button>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-white/10 text-left shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px] font-medium">Lille / Erquinghem-Lys (Véhiculé)</span>
                </div>

                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-white/10 hover:border-[#FFAD00] transition-colors shadow-2xs select-none"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span className="font-mono text-[11px] font-medium">{identity.links.linkedinDisplay}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 ml-auto" />
                </a>
              </div>
            </div>

            {/* 2. Expériences professionnelles (Glass Cards Chronologiques) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 border-b border-zinc-200/80 dark:border-white/10 pb-3">
                <Briefcase className="w-4 h-4 text-zinc-900 dark:text-white" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  01 // EXPÉRIENCES PROFESSIONNELLES
                </h3>
              </div>

              <div className="space-y-6">
                
                {/* Poste 1 : Hornetsecurity */}
                <div className="p-6 sm:p-7 rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 space-y-4 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Graphic Designer Junior — Hornetsecurity by Proofpoint
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Leader européen de la cybersécurité Cloud • Environnement international bilingue
                      </p>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 shrink-0 w-fit">
                      SEPT. 2025 — OCT. 2026 · CDI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs text-zinc-700 dark:text-zinc-300">
                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Stands &amp; Scénographie européenne (FIC 2026)
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Conception graphique et habillage de stands événementiels (&gt; 150 m² au FIC Lille Grand Palais 2026, it-sa Nuremberg, InfoSec London ; plus de 4 000 contacts qualifiés enregistrés collectivement).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Motion Design After Effects (Arche LED FIC 2026)
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Conception de la boucle motion design diffusée sur l'arche d'accueil LED du FIC 2026 pour la transition de marque « HORNETSECURITY FORMERLY Vade ».
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Sprint individuel de Hanovre (36 h) · Helix Nova
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Création autonome en 36h du concept visuel, de l'univers 3D et des affiches de présentation du cyber-héros Helix Nova lors d'une compétition interne.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Incarnation &amp; Campagnes Paid Ads
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Incarnation en costume de Captain Security sur les salons, création d'assets Paid Ads multi-canaux et refonte des 7 insignes officiels de partenariat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Poste 2 : Vade puis Hornetsecurity */}
                <div className="p-6 sm:p-7 rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 space-y-3 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Chargé de marque employeur — Vade, puis Hornetsecurity
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Communication interne, attractivité des talents tech &amp; culture d'entreprise post-acquisition
                      </p>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 shrink-0 w-fit">
                      SEPT. 2023 — AOÛT 2025 · ALTERNANCE
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Attractivité RH et recrutement de profils techniques rares (ingénieurs détection de menaces, développeurs). Déploiement du programme d'employee advocacy sur LinkedIn, logistique des séminaires internes et cohésion post-acquisition.
                  </p>
                </div>

                {/* Poste 3 : Studio ROOM241 */}
                <div className="p-6 sm:p-7 rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 space-y-3 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Directeur artistique &amp; Graphiste — Studio ROOM241
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Activité indépendante • Projets B2B, AgTech &amp; BTP haut de gamme
                      </p>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 shrink-0 w-fit">
                      DEPUIS 2024 · INDÉPENDANT
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Direction artistique complète pour Fresh Data (AgTech : identité, captation vidéo au salon MEDFEL, campagne Ulule financée à 116%) et Résin'Architecte (BTP haut de gamme : cadrage de projet, charte, modèles d'avant/après et stratégie de contenu).
                  </p>
                </div>

              </div>
            </div>

            {/* 3. Compétences & Outils Maîtrisés (Glass Grid) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-zinc-200/80 dark:border-white/10 pb-3">
                <Wrench className="w-4 h-4 text-zinc-900 dark:text-white" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  02 // COMPÉTENCES &amp; OUTILS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* 1. Compétences Métier */}
                <div className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                      Domaines d'expertise
                    </h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#FFAD00]" />
                      Direction artistique 360°
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#FFAD00]" />
                      Scénographie événementielle
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#FFAD00]" />
                      Motion Design (After Effects)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#FFAD00]" />
                      Captation vidéo &amp; Interview
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#FFAD00]" />
                      Identité de marque &amp; Édition
                    </li>
                  </ul>
                </div>

                {/* 2. Logiciels Créatifs */}
                <div className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                      Suite Adobe &amp; Création
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skills.software.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Outils Numériques & IA */}
                <div className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                      Outils IA &amp; Prototypage
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skills.aiTools.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 italic pt-1">
                    Recherche, structuration de briefs, rédaction et veille créative.
                  </p>
                </div>

              </div>
            </div>

            {/* 4. Formation Académique (Ordre chronologique strict) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-zinc-200/80 dark:border-white/10 pb-3">
                <GraduationCap className="w-4 h-4 text-zinc-900 dark:text-white" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  03 // FORMATION ACADÉMIQUE
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {education.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                        {item.period}
                      </span>
                      {item.grade && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300">
                          {item.grade}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {item.degree}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {item.institution} • {item.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pied de Modale : Call to Action */}
          <div className="px-6 py-4 bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none">
            <span className="text-xs text-zinc-500 font-medium text-center sm:text-left">
              Disponible immédiatement pour opportunités en CDI (Lille, Métropole ou Hybride)
            </span>
            <a
              href={`mailto:${identity.links.email}?subject=Opportunité professionnelle — Portfolio ROOM241`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#09090B] dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Proposer un échange</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
