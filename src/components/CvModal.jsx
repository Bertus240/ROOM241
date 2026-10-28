import React, { useState } from 'react';
import { X, Printer, Mail, MapPin, Linkedin, Briefcase, GraduationCap, Sparkles, Check, ArrowUpRight, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profile';

export default function CvModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

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
        {/* Backdrop sombre avec flou d'ambiance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Fenêtre Modale Éditoriale Haute Fidélité */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-zinc-200/90 dark:border-white/15 z-10 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        >
          {/* Barre haute : Glass bar discrète */}
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
                    Double culture alliant la rigueur analytique des sciences de l'ingénieur (Bac S SI), la vision stratégique de marque (Master ISEG Lille) et l'exécution créative sur le terrain.
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

            {/* 2. Expériences professionnelles (Design Chronologique Haut de Gamme) */}
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
                        Graphic Designer — Hornetsecurity by Proofpoint
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
                        Stands &amp; Scénographie européenne
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Conception graphique et habillage de stands événementiels (&gt; 150 m² au FIC Lille Grand Palais, it-sa Nuremberg, InfoSec London ; plus de 4 000 contacts qualifiés enregistrés collectivement).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Motion Design (After Effects)
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Animation vidéo complète diffusée sur l'arche d'accueil LED du stand au FIC 2025 (boucle motion design co-branding &amp; signalétique dynamique).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Sprint de Hanovre (36 h) &amp; Helix Nova
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Collaboration graphique internationale en sprint chronométré pour créer l'univers et le teaser du cyber-héros 3D Helix Nova.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Incarnation &amp; Système B2B
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Incarnation de Captain Security sur scène plénière et refonte complète des 7 insignes officiels de partenariats européens (Platinum, Gold, VAR...).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Poste 2 : Vade / Hornetsecurity */}
                <div className="p-6 rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 space-y-3 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Chargé de marque employeur — Vade, puis Hornetsecurity
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Attractivité RH, marque employeur et cohésion post-acquisition
                      </p>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 shrink-0 w-fit">
                      SEPT. 2023 — AOÛT 2025 · ALTERNANCE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Recrutement de profils techniques rares (ingénieurs détection de menaces, développeurs). Déploiement du programme d'employee advocacy sur LinkedIn, logistique des séminaires internes et communication interne post-fusion.
                  </p>
                </div>

                {/* Poste 3 : Studio ROOM241 Freelance */}
                <div className="p-6 rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 space-y-3 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Directeur Artistique &amp; Graphiste indépendant — Studio ROOM241
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Projets clients en autonomie 360° • AgTech &amp; BTP haut de gamme
                      </p>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 shrink-0 w-fit">
                      DEPUIS OCT. 2024 · INDÉPENDANT
                    </span>
                  </div>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">Fresh Data (AgTech) :</strong> Création de l'univers visuel, direction graphique de la campagne Ulule (financée à 116 %), captation vidéo d'interviews au salon international MEDFEL ouvrant des discussions avec la grande distribution (Auchan, Grand Frais, E.Leclerc).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">Résin'Architecte (BTP) :</strong> Cadrage de marque, gabarits éditoriaux, fiches d'aide à la vente (règle des 8 mm) et traction de terrain (+219 % de portée, 648 visites de profil en 30 jours sans pub).</span>
                    </li>
                  </ul>
                </div>

                {/* Poste 4 : Stage Sencrop */}
                <div className="p-5 rounded-2xl bg-zinc-50/40 dark:bg-zinc-900/30 border border-zinc-200/70 dark:border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-zinc-900 dark:text-white">
                      Assistant Chef de Projet Communication — Sencrop
                    </h4>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold">2023 · STAGE</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Soutien aux campagnes de communication opérationnelles pour l'AgTech européenne connectée.
                  </p>
                </div>

              </div>
            </div>

            {/* 3. Compétences & Outils (3 blocs stricts, sans technologies superflues) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 border-b border-zinc-200/80 dark:border-white/10 pb-3">
                <Wrench className="w-4 h-4 text-zinc-900 dark:text-white" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  02 // COMPÉTENCES &amp; OUTILS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Compétences Métier */}
                <div className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#09090B] dark:bg-white" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                      Compétences Métier
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skills.business.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Logiciels & Outils Créatifs */}
                <div className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                      Logiciels Créatifs
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

                {/* 3. Outils d'IA & Recherche */}
                <div className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                      Intelligence Artificielle
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
