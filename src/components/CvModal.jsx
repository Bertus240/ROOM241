import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Check, ArrowUpRight, MapPin, Linkedin, ArrowRight } from 'lucide-react';
import { profileData } from '../data/profile';

/**
 * CvModal — Version Éditoriale Haut de Gamme ROOM241
 * 
 * Direction artistique :
 * - Rigueur typographique inspirée des studios éditoriaux suisses et de la clarté Apple/Linear.
 * - Élimination des boîtes grises empilées et des badges génériques de tableau de bord.
 * - Grille éditoriale aérée avec séparateurs ultra-fins et hiérarchie naturelle.
 * - Présentation intègre et vérifiée des expériences, formations et compétences de Rémi Brocart.
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
        {/* Arrière-plan flouté d'ambiance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Conteneur principal Éditorial — Finition Studio ROOM241 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#FAF9F6] text-[#09090B] rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.45)] border border-zinc-300/80 z-10 overflow-hidden my-6 max-h-[92vh] flex flex-col font-sans"
        >
          {/* Masthead supérieur épuré */}
          <div className="px-6 sm:px-10 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between gap-4 shrink-0 select-none">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
              <span className="font-mono text-xs font-bold tracking-widest text-zinc-900 uppercase">
                ROOM241 / CURRICULUM VITÆ
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500">
                • Disponible immédiatement
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-800 transition-all cursor-pointer shadow-2xs hover:border-zinc-400"
                title="Imprimer ou exporter en PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-600" />
                <span className="hidden sm:inline">Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Fermer la modale"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Corps de la modale — Disposition Typographique Éditoriale */}
          <div className="p-6 sm:p-10 lg:p-12 overflow-y-auto space-y-12 print:p-0 print:overflow-visible">
            
            {/* 1. En-tête d'identité & Positionnement */}
            <header className="pb-8 border-b border-zinc-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-5">
                  <img
                    src={identity.avatar}
                    alt={identity.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-zinc-200 shadow-sm shrink-0"
                  />
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
                      {identity.name}
                    </h1>
                    <p className="text-sm sm:text-base font-semibold text-zinc-800">
                      Graphic Designer &amp; Direction artistique <span className="text-zinc-400">·</span> <span className="font-mono text-xs uppercase text-zinc-500">{identity.brand}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed pt-0.5">
                      Double culture alliant la rigueur des sciences de l'ingénieur, la vision stratégique de marque (Master ISEG Lille) et l'exécution créative sur le terrain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ligne de contact horizontale sans boîtes inutiles */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-600 font-mono">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Mail className="w-3.5 h-3.5 text-[#FFAD00]" />}
                  <span className="underline underline-offset-4 decoration-zinc-300 hover:decoration-black">
                    {copiedEmail ? "Email copié !" : identity.links.email}
                  </span>
                </button>

                <div className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Métropole Européenne de Lille / Erquinghem-Lys (Véhiculé)</span>
                </div>

                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-black transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span className="underline underline-offset-4 decoration-zinc-300 hover:decoration-black">
                    {identity.links.linkedinDisplay}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </header>

            {/* 2. Expériences professionnelles marquantes */}
            <section className="space-y-8">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#09090B]">
                  01 // EXPÉRIENCES PROFESSIONNELLES
                </h2>
                <span className="text-[11px] font-mono text-zinc-400">
                  2023 — 2026
                </span>
              </div>

              <div className="space-y-10">
                
                {/* Poste 1 : Hornetsecurity */}
                <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-8 border-b border-zinc-200/60">
                  <div className="md:col-span-4 space-y-1">
                    <span className="font-mono text-xs font-bold text-zinc-900 block">
                      SEPT. 2025 — OCT. 2026
                    </span>
                    <span className="text-xs text-zinc-500 font-mono block">
                      CDI • Lille / International
                    </span>
                    <p className="text-xs font-semibold text-zinc-800 pt-1">
                      Hornetsecurity by Proofpoint
                    </p>
                    <span className="text-[11px] text-zinc-500 leading-tight block">
                      Leader européen Cloud Security
                    </span>
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#09090B] tracking-tight">
                      Graphic Designer Junior
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      Conception graphique et scénographie pour les grands salons européens, en environnement international bilingue au sein de l'équipe créative basée en Allemagne.
                    </p>
                    
                    <ul className="space-y-2 pt-1 text-xs text-zinc-700 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-[#FFAD00] font-bold shrink-0">—</span>
                        <span><strong>Stands &amp; Scénographie européenne (FIC 2026) :</strong> Habillage et signalétique du stand de plus de 150 m² au Forum InCyber à Lille Grand Palais, ainsi qu'à it-sa Nuremberg (+4 000 contacts qualifiés enregistrés collectivement).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FFAD00] font-bold shrink-0">—</span>
                        <span><strong>Motion Design After Effects :</strong> Réalisation de la boucle d'animation diffusée sur l'arche d'accueil LED du stand pour la transition de marque « HORNETSECURITY FORMERLY Vade ».</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FFAD00] font-bold shrink-0">—</span>
                        <span><strong>Sprint individuel de Hanovre (36 h) :</strong> Création autonome en 36h de l'univers 3D et des affiches du cyber-héros Helix Nova lors d'un challenge créatif au siège allemand.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FFAD00] font-bold shrink-0">—</span>
                        <span><strong>Incarnation &amp; Campagnes Paid Ads :</strong> Incarnation en costume de Captain Security sur les salons, refonte des 7 insignes officiels de partenariat et création de visuels publicitaires B2B.</span>
                      </li>
                    </ul>
                  </div>
                </article>

                {/* Poste 2 : Vade puis Hornetsecurity */}
                <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-8 border-b border-zinc-200/60">
                  <div className="md:col-span-4 space-y-1">
                    <span className="font-mono text-xs font-bold text-zinc-900 block">
                      SEPT. 2023 — AOÛT 2025
                    </span>
                    <span className="text-xs text-zinc-500 font-mono block">
                      Alternance • 2 ans
                    </span>
                    <p className="text-xs font-semibold text-zinc-800 pt-1">
                      Vade, puis Hornetsecurity
                    </p>
                    <span className="text-[11px] text-zinc-500 leading-tight block">
                      Cybersécurité &amp; Marque employeur
                    </span>
                  </div>

                  <div className="md:col-span-8 space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#09090B] tracking-tight">
                      Chargé de marque employeur
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      Attractivité RH et recrutement de profils techniques rares (ingénieurs détection de menaces, développeurs). Déploiement du programme d'employee advocacy sur LinkedIn, logistique des séminaires internes et cohésion post-acquisition.
                    </p>
                  </div>
                </article>

                {/* Poste 3 : Studio ROOM241 */}
                <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                  <div className="md:col-span-4 space-y-1">
                    <span className="font-mono text-xs font-bold text-zinc-900 block">
                      DEPUIS 2024
                    </span>
                    <span className="text-xs text-zinc-500 font-mono block">
                      Activité indépendante
                    </span>
                    <p className="text-xs font-semibold text-zinc-800 pt-1">
                      Studio ROOM241
                    </p>
                    <span className="text-[11px] text-zinc-500 leading-tight block">
                      B2B, Retail Data &amp; BTP haut de gamme
                    </span>
                  </div>

                  <div className="md:col-span-8 space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#09090B] tracking-tight">
                      Directeur artistique &amp; Graphiste
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      Direction artistique et vulgarisation visuelle pour Fresh Data (Retail Data & veille promo : identité, campagne Ulule à 116 % avec 12 700 € réunis / obj. 20k, captation vidéo salon MEDFEL et dossiers commerciaux B2B) et Résin'Architecte (BTP haut de gamme : cadrage de projet, charte, modèles d'avant/après et stratégie de contenu).
                    </p>
                  </div>
                </article>

              </div>
            </section>

            {/* 3. Compétences & Outils Maîtrisés (Grille Typographique Suisse) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#09090B]">
                  02 // COMPÉTENCES &amp; OUTILS
                </h2>
                <span className="text-[11px] font-mono text-zinc-400">
                  Pratique quotidienne
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                
                {/* Domaines d'expertise */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Domaines d'expertise
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                      Direction artistique 360°
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                      Scénographie événementielle
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                      Motion Design (After Effects)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                      Captation vidéo &amp; Interview
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                      Identité de marque &amp; Édition
                    </li>
                  </ul>
                </div>

                {/* Suite Adobe & Création */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Suite Adobe &amp; Création
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.software?.map((s, idx) => {
                      const name = typeof s === 'object' && s !== null ? (s.name || s.label || JSON.stringify(s)) : String(s);
                      return (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-medium text-zinc-800 shadow-2xs"
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Outils Numériques & IA */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Outils IA &amp; Prototypage
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.aiTools?.map((s, idx) => {
                      const toolName = typeof s === 'object' && s !== null ? (s.name || s.label || JSON.stringify(s)) : String(s);
                      const toolUsage = typeof s === 'object' && s !== null ? s.usage : '';
                      return (
                        <span
                          key={idx}
                          title={toolUsage || undefined}
                          className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-medium text-zinc-800 shadow-2xs cursor-default hover:border-[#FFAD00]/60 transition-colors"
                        >
                          {toolName}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-tight pt-1">
                    Recherche documentaire, structuration de briefs, rédaction et veille créative.
                  </p>
                </div>

              </div>
            </section>

            {/* 4. Formation Académique (Tableau Éditorial Épuré) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#09090B]">
                  03 // FORMATION ACADÉMIQUE
                </h2>
                <span className="text-[11px] font-mono text-zinc-400">
                  Parcours certifié
                </span>
              </div>

              <div className="divide-y divide-zinc-200/70">
                {education.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline">
                    <span className="sm:col-span-3 font-mono text-xs font-bold text-zinc-900">
                      {item.period}
                    </span>
                    <div className="sm:col-span-6 space-y-0.5">
                      <h3 className="text-sm font-bold text-[#09090B]">
                        {item.degree}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        {item.institution} • {item.location}
                      </p>
                    </div>
                    <div className="sm:col-span-3 text-left sm:text-right">
                      {item.grade && (
                        <span className="inline-block text-[11px] font-mono font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded border border-zinc-200">
                          {item.grade}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Pied de Modale discret et élégant */}
          <footer className="px-6 sm:px-10 py-4 bg-white/80 backdrop-blur-md border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none">
            <span className="text-xs text-zinc-500 font-medium text-center sm:text-left">
              Disponible immédiatement pour opportunités en CDI (Lille, Métropole ou Hybride)
            </span>
            <a
              href={`mailto:${identity.links.email}?subject=Opportunité professionnelle — Portfolio ROOM241`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
