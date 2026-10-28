import React, { useState } from 'react';
import { X, Printer, Mail, Phone, MapPin, Linkedin, Award, Briefcase, GraduationCap, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profile';

export default function CvModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const { identity, education, athleticProof } = profileData;

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
        {/* Backdrop sombre et flou artistique */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Fenêtre Modale Glassmorphism Haute Définition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.4)] border border-zinc-200/90 dark:border-white/15 z-10 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        >
          {/* Barre haute : Glass bar avec actions */}
          <div className="px-6 py-4 bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between gap-4 shrink-0">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-white/20 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-[#FFAD00] hover:scale-105 transition-all shadow-sm cursor-pointer"
                title="Imprimer ou enregistrer en PDF"
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
            
            {/* 1. Header Identité : Carte de visite éditoriale */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={identity.avatar}
                  alt={identity.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-zinc-200 dark:border-white/15 shadow-md"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                      {identity.name}
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                    {identity.role} <span className="text-zinc-400">·</span> <span className="text-[#FFAD00]">{identity.brand}</span>
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg pt-1">
                    Profil hybride alliant la rigueur des sciences de l'ingénieur (Bac S SI), la vision stratégique de marque (Master ISEG Lille) et une exécution 360° en autonomie complète.
                  </p>
                </div>
              </div>

              {/* Coordonnées & Liens Rapides */}
              <div className="flex flex-wrap sm:flex-col gap-2 text-xs text-zinc-600 dark:text-zinc-300 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 hover:border-[#FFAD00] transition-colors cursor-pointer text-left"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Mail className="w-3.5 h-3.5 text-[#FFAD00]" />}
                  <span className="font-mono text-[11px]">{copiedEmail ? "Email copié !" : identity.links.email}</span>
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-left">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px]">Lille / Erquinghem-Lys (Véhiculé)</span>
                </div>

                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 hover:border-[#FFAD00] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span className="font-mono text-[11px]">{identity.links.linkedinDisplay}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400 ml-auto" />
                </a>
              </div>
            </div>

            {/* 2. Expériences professionnelles marquantes */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-zinc-200/80 dark:border-white/10 pb-3">
                <Briefcase className="w-4 h-4 text-[#FFAD00]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  01 // EXPÉRIENCES PROFESSIONNELLES &amp; RÉALISATIONS DE TERRAIN
                </h3>
              </div>

              <div className="space-y-6">
                
                {/* Poste 1 : Hornetsecurity */}
                <div className="p-6 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-white/10 space-y-4 hover:border-zinc-300 dark:hover:border-white/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
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
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Stands &amp; Scénographie européenne
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Conception graphique et habillage de stands événementiels (&gt; 150 m² au FIC Lille Grand Palais, it-sa Nuremberg, InfoSec London ; plus de 4 000 contacts qualifiés enregistrés collectivement).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Motion Design (After Effects)
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Réalisation complète de l'animation vidéo diffusée sur l'arche vidéo d'accueil LED du pavillon d'entrée du FIC 2025 (boucle d'accueil motion design &amp; signalétique dynamique).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
                      <strong className="text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        Sprint de Hanovre (36 h) &amp; Helix Nova
                      </strong>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Collaboration graphique internationale en sprint chronométré pour concevoir l'univers 3D et les supports du cyber-héros Helix Nova.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-white/10 space-y-1">
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
                <div className="p-6 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-white/10 space-y-3 hover:border-zinc-300 dark:hover:border-white/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        Chargé de marque employeur — Vade, puis Hornetsecurity
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Transition de marque et communication RH post-acquisition
                      </p>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 shrink-0 w-fit">
                      SEPT. 2023 — AOÛT 2025 · ALTERNANCE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Attractivité RH et recrutement de profils techniques rares (ingénieurs détection de menaces, développeurs). Déploiement du programme d'employee advocacy sur LinkedIn, logistique des séminaires internes et cohésion post-acquisition.
                  </p>
                </div>

                {/* Poste 3 : Studio ROOM241 Freelance */}
                <div className="p-6 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-white/10 space-y-3 hover:border-zinc-300 dark:hover:border-white/20 transition-colors">
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
                      2024 — PRÉSENT · INDÉPENDANT
                    </span>
                  </div>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
                    <li>
                      • <strong className="text-zinc-900 dark:text-white">Fresh Data (AgTech) :</strong> Création de l'univers visuel, direction graphique de la campagne Ulule (116 %), captation vidéo d'interviews au salon international MEDFEL ouvrant des discussions avec la grande distribution.
                    </li>
                    <li>
                      • <strong className="text-zinc-900 dark:text-white">Résin'Architecte (BTP) :</strong> Cadrage de marque, gabarits éditoriaux, fiches d'aide à la vente (règle des 8 mm) et traction de terrain (+219 % de portée, 648 visites de profil en 30 jours sans pub).
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 3. Formations & Diplômes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-200/80 dark:border-white/10 pb-3">
                <GraduationCap className="w-4 h-4 text-[#FFAD00]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  02 // FORMATION ACADÉMIQUE
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#FFAD00] uppercase tracking-wider block">Stratégie &amp; Business</span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white">
                    {education[0].degree}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">{education[0].institution} (2023 — 2025)</p>
                </div>

                <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#FFAD00] uppercase tracking-wider block">Sciences &amp; Rigueur</span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white">
                    {education[1].degree}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">{education[1].institution} (Mention Bien, 2020)</p>
                </div>

                <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#FFAD00] uppercase tracking-wider block">Collectif &amp; Pédagogie</span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white">
                    {education[2].degree}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">{education[2].institution} (2019)</p>
                </div>
              </div>
            </div>

            {/* 4. Compétences & Outils */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-200/80 dark:border-white/10 pb-3">
                <Sparkles className="w-4 h-4 text-[#FFAD00]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  03 // STACK TECHNIQUE &amp; MAÎTRISE LOGICIELLE
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'After Effects (Motion design)',
                  'Premiere Pro (Montage vidéo & interviews)',
                  'Suite Adobe (Illustrator, Photoshop, InDesign)',
                  'Scénographie & Stands (> 150 m²)',
                  'Figma (Design System & UI)',
                  'React & Tailwind CSS',
                  'Direction de tournage & interviews de terrain',
                  'Anglais professionnel courant (contexte international)'
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-white/10 font-mono text-[11px] font-semibold hover:border-[#FFAD00]/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Discipline & Rigueur Athlétique */}
            <div className="p-6 rounded-3xl bg-zinc-950 text-white border border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xl">
              <div className="p-3.5 rounded-2xl bg-white/10 text-[#FFAD00] shrink-0 border border-white/10">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFAD00]">Discipline athlétique</span>
                  <span className="text-zinc-500">•</span>
                  <span className="font-mono text-[10px] text-zinc-400">Venise 2024</span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold tracking-tight">
                  Record marathon en 02h48'25 ({athleticProof.pace} sur 42,195 km)
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {athleticProof.percentile}. Une culture de la préparation millimétrée, de l'endurance sur les projets complexes et de l'exigence du zéro défaut appliquée chaque jour à la production créative.
                </p>
              </div>
            </div>

          </div>

          {/* Footer Barre de Contact CTA */}
          <div className="px-6 py-4 bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              Disponible immédiatement pour opportunités en CDI (Lille, Métropole ou Hybride)
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${identity.links.email}?subject=Prise%20de%20contact%20suite%20%C3%A0%20votre%20portfolio`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Proposer un échange</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
