import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Check, ArrowUpRight, MapPin, Linkedin, ArrowRight, Sparkles, Briefcase, GraduationCap, Wrench } from 'lucide-react';
import { profileData } from '../data/profile';

/**
 * CvModal — Version Ultra Glass Design ROOM241
 * 
 * Direction artistique :
 * - Véritable esthétique Frosted Glass / VisionOS (Apple/Linear)
 * - Translucidité lumineuse, réfraction floutée et bordures biseautées blanches ultra-fines
 * - Cartes en verre dépoli pour chaque expérience et compétence (élimine tout effet de fond gris terne)
 * - Typographie éditoriale suisse, badges soignés et hiérarchie visuelle d'exception
 * - Présentation 100% authentique et vérifiée de Rémi Brocart
 */
export default function CvModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const { identity, education, skills } = profileData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Arrière-plan d'ambiance flouté et translucide (pas de noir opaque) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/45 backdrop-blur-2xl transition-opacity cursor-pointer"
        />

        {/* Conteneur principal Glassmorphism Haute Définition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl text-[#09090B] dark:text-zinc-100 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.05)] border border-white/80 dark:border-white/15 ring-1 ring-white/60 z-10 overflow-hidden my-6 max-h-[92vh] flex flex-col font-sans"
        >
          {/* Lueur d'ambiance décorative interne */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#FFAD00]/12 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />

          {/* Masthead supérieur en verre dépoli */}
          <div className="relative px-6 sm:px-10 py-4.5 bg-white/50 dark:bg-white/5 backdrop-blur-2xl border-b border-white/60 dark:border-white/10 flex items-center justify-between gap-4 shrink-0 select-none z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/90 dark:border-white/15 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.9)] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest text-zinc-900 dark:text-white uppercase">
                  ROOM241 | CV
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                Disponible immédiatement
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/90 bg-white/80 dark:bg-white/10 backdrop-blur-md hover:bg-white text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
                title="Imprimer ou exporter en PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span className="hidden sm:inline">Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-zinc-500 hover:text-black dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 border border-transparent hover:border-white/80 transition-all cursor-pointer"
                aria-label="Fermer la modale"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Corps de la modale — Défilement avec cartes de verre étincelantes */}
          <div className="relative p-6 sm:p-10 lg:p-12 overflow-y-auto space-y-12 z-10 print:p-0 print:overflow-visible">
            
            {/* 1. En-tête d'identité & Positionnement */}
            <header className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={identity.avatar}
                      alt={identity.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-white/90 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090B] dark:text-white">
                        {identity.name}
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFAD00]/15 border border-[#FFAD00]/30 text-[11px] font-mono font-bold text-amber-900 dark:text-amber-300">
                        STUDIO ROOM241
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200">
                      Graphic Designer &amp; Direction artistique
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed pt-0.5">
                      Double culture alliant la rigueur des sciences de l'ingénieur, la vision stratégique de marque (Master ISEG Lille) et l'exécution créative sur le terrain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ligne de contact dans un bandeau de verre fin */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-2xs flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors cursor-pointer group"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Mail className="w-3.5 h-3.5 text-[#FFAD00] group-hover:scale-110 transition-transform" />}
                  <span className="underline underline-offset-4 decoration-zinc-300 hover:decoration-black dark:hover:decoration-white font-medium">
                    {copiedEmail ? "Email copié !" : identity.links.email}
                  </span>
                </button>

                <div className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Métropole Européenne de Lille / Erquinghem-Lys (Véhiculé)</span>
                </div>

                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors group"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5] group-hover:scale-110 transition-transform" />
                  <span className="underline underline-offset-4 decoration-zinc-300 hover:decoration-black dark:hover:decoration-white font-medium">
                    {identity.links.linkedinDisplay}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </header>

            {/* 2. Expériences professionnelles marquantes */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#09090B] dark:text-white">
                    01 // EXPÉRIENCES PROFESSIONNELLES
                  </h2>
                </div>
                <span className="text-[11px] font-mono font-medium text-zinc-500">
                  2023 – 2026
                </span>
              </div>

              <div className="space-y-6">
                
                {/* Poste 1 : Hornetsecurity (Highlight CDI) */}
                <article className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/90 dark:border-white/15 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:border-[#FFAD00]/40 transition-all space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 text-white text-[11px] font-semibold border border-white/10 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)]" />
                        <span>CDI · Lille / International</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white block">
                        SEPT. 2025 – OCT. 2026
                      </span>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        Hornetsecurity by Proofpoint
                      </p>
                      <span className="text-[11px] text-zinc-500 leading-tight block">
                        Leader européen Cloud Security
                      </span>
                    </div>

                    <div className="md:col-span-8 space-y-3">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#09090B] dark:text-white tracking-tight">
                        Graphic Designer Junior
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Conception graphique et scénographie pour les grands salons européens, en environnement international bilingue au sein de l'équipe créative basée en Allemagne.
                      </p>
                      
                      <ul className="space-y-2.5 pt-1 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <li className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0 mt-1.5" />
                          <span><strong>Stands &amp; Scénographie européenne (FIC 2026) :</strong> Habillage et signalétique du stand de plus de 150 m² au Forum InCyber à Lille Grand Palais, ainsi qu'à it-sa Nuremberg (+4 000 contacts qualifiés enregistrés collectivement).</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0 mt-1.5" />
                          <span><strong>Motion Design After Effects :</strong> Réalisation de la boucle d'animation diffusée sur l'arche d'accueil LED du stand pour la transition de marque « HORNETSECURITY FORMERLY Vade ».</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0 mt-1.5" />
                          <span><strong>Sprint individuel de Hanovre (36 h) :</strong> Création autonome en 36h de l'univers 3D et des affiches du cyber-héros Helix Nova lors d'un challenge créatif au siège allemand.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0 mt-1.5" />
                          <span><strong>Incarnation &amp; Campagnes Paid Ads :</strong> Incarnation en costume de Captain Security sur les salons, refonte des 7 insignes officiels de partenariat et création de visuels publicitaires B2B.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>

                {/* Poste 2 : Vade puis Hornetsecurity */}
                <article className="p-6 sm:p-7 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono font-medium border border-zinc-200/60">
                        Alternance · 2 ans
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white block">
                        SEPT. 2023 – AOÛT 2025
                      </span>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        Vade, puis Hornetsecurity
                      </p>
                      <span className="text-[11px] text-zinc-500 leading-tight block">
                        Cybersécurité &amp; Marque employeur
                      </span>
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#09090B] dark:text-white tracking-tight">
                        Chargé de marque employeur
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Attractivité RH et recrutement de profils techniques rares (ingénieurs détection de menaces, développeurs). Déploiement du programme d'employee advocacy sur LinkedIn, logistique des séminaires internes et cohésion post-acquisition.
                      </p>
                    </div>
                  </div>
                </article>

                {/* Poste 3 : Studio ROOM241 */}
                <article className="p-6 sm:p-7 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFAD00]/15 text-amber-900 dark:text-amber-300 text-[11px] font-mono font-semibold border border-[#FFAD00]/30">
                        Activité indépendante
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white block">
                        DEPUIS 2024
                      </span>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        Studio ROOM241
                      </p>
                      <span className="text-[11px] text-zinc-500 leading-tight block">
                        B2B, Retail Data &amp; BTP haut de gamme
                      </span>
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#09090B] dark:text-white tracking-tight">
                        Directeur artistique &amp; Graphiste
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Direction artistique et vulgarisation visuelle pour Fresh Data (Retail Data &amp; veille promo : identité, campagne Ulule validée à 116 %, captation vidéo salon MEDFEL et dossiers commerciaux B2B) et Résin'Architecte (BTP haut de gamme : cadrage de projet, charte, modèles d'avant/après et stratégie de contenu).
                      </p>
                    </div>
                  </div>
                </article>

              </div>
            </section>

            {/* 3. Compétences & Outils Maîtrisés (Cartes de verre élégantes) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#09090B] dark:text-white">
                    02 // COMPÉTENCES &amp; OUTILS
                  </h2>
                </div>
                <span className="text-[11px] font-mono font-medium text-zinc-500">
                  Pratique quotidienne
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                {/* Domaines d'expertise */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-2xs space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFAD00]" />
                    <span>Domaines d'expertise</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                      Direction artistique 360°
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                      Scénographie événementielle
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                      Motion Design (After Effects)
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                      Captation vidéo &amp; Interview
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                      Identité de marque &amp; Édition
                    </li>
                  </ul>
                </div>

                {/* Suite Adobe & Création */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-2xs space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-[#FFAD00]" />
                    <span>Suite Adobe &amp; Création</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.software?.map((s, idx) => {
                      const name = typeof s === 'object' && s !== null ? (s.name || s.label || JSON.stringify(s)) : String(s);
                      return (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/90 dark:border-white/15 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs hover:border-[#FFAD00]/60 hover:bg-white transition-all cursor-default"
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Outils Numériques & IA */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-2xs space-y-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFAD00]" />
                    <span>Outils IA &amp; Prototypage</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.aiTools?.map((s, idx) => {
                      const toolName = typeof s === 'object' && s !== null ? (s.name || s.label || JSON.stringify(s)) : String(s);
                      const toolUsage = typeof s === 'object' && s !== null ? s.usage : '';
                      return (
                        <span
                          key={idx}
                          title={toolUsage || undefined}
                          className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/90 dark:border-white/15 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs cursor-default hover:border-[#FFAD00]/60 hover:bg-white transition-all"
                        >
                          {toolName}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight pt-1">
                    Recherche documentaire, structuration de briefs, rédaction et veille créative.
                  </p>
                </div>

              </div>
            </section>

            {/* 4. Formation Académique (Cartes de verre légères) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#09090B] dark:text-white">
                    03 // FORMATION ACADÉMIQUE
                  </h2>
                </div>
                <span className="text-[11px] font-mono font-medium text-zinc-500">
                  Parcours certifié
                </span>
              </div>

              <div className="space-y-3">
                {education.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-center">
                    <span className="sm:col-span-3 font-mono text-xs font-bold text-zinc-900 dark:text-white">
                      {item.period}
                    </span>
                    <div className="sm:col-span-6 space-y-0.5">
                      <h3 className="text-sm font-bold text-[#09090B] dark:text-white">
                        {item.degree}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.institution} · {item.location}
                      </p>
                    </div>
                    <div className="sm:col-span-3 text-left sm:text-right">
                      {item.grade && (
                        <span className="inline-block text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 bg-white/80 dark:bg-white/10 px-3 py-1 rounded-full border border-white/90 dark:border-white/15 shadow-2xs">
                          {item.grade}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Pied de Modale en verre dépoli avec CTA impactant */}
          <footer className="relative px-6 sm:px-10 py-4.5 bg-white/50 dark:bg-white/5 backdrop-blur-2xl border-t border-white/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none z-10">
            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium text-center sm:text-left">
              Disponible immédiatement pour opportunités en CDI (Lille, Métropole ou Hybride)
            </span>
            <a
              href={`mailto:${identity.links.email}?subject=Opportunité professionnelle — Portfolio ROOM241`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
