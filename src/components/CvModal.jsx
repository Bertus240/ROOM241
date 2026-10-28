import React, { useState } from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, Linkedin, Award, Briefcase, GraduationCap, Sparkles, CheckCircle2, Copy, Check } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-200/80 dark:border-white/10 z-10 overflow-hidden my-8"
        >
          {/* Top Actions Bar */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-neutral-950/80 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                Curriculum Vitæ • {identity.name}
              </span>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 font-medium">
                {identity.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-neutral-800 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:border-[#FFAD00] transition-colors"
                title="Imprimer ou enregistrer en PDF"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline">Imprimer / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable CV Content */}
          <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8 font-sans">
            
            {/* Header Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200/80 dark:border-white/10">
              <div className="flex items-center gap-5">
                <img
                  src={identity.avatar}
                  alt={identity.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-zinc-200 dark:border-white/10 shadow-sm"
                />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {identity.name}
                  </h2>
                  <p className="text-sm font-semibold text-[#FFAD00] mt-0.5">
                    {identity.role} • {identity.brand}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md">
                    Profil hybride alliant rigueur d'ingénieur (Bac S SI), vision stratégique de marque (Master ISEG Lille) et exécution 360° en autonomie complète.
                  </p>
                </div>
              </div>

              {/* Direct Contacts List */}
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300 w-full sm:w-auto pt-2 sm:pt-0">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <a href={`mailto:${identity.links.email}`} className="hover:underline font-medium">
                    {identity.links.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
                    title="Copier le mail"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <a href={`tel:${identity.links.phone}`} className="hover:underline font-medium">
                    {identity.links.phoneFormatted}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <span>{identity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <a
                    href={identity.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium text-zinc-900 dark:text-white"
                  >
                    {identity.links.linkedinDisplay} ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Expériences Clés */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
                <Briefcase className="w-4 h-4 text-[#FFAD00]" />
                <span>Expériences professionnelles marquantes</span>
              </div>

              <div className="space-y-6">
                
                {/* Hornetsecurity CDI */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/10 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Graphic Designer Junior — Hornetsecurity by Proofpoint
                    </h3>
                    <span className="text-xs font-mono font-medium text-[#FFAD00]">
                      Sept 2025 – Oct 2026 · CDI
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Présence visuelle et événementielle européenne pour le leader du Cloud Security (environnement international bilingue) :
                  </p>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1.5 list-disc list-inside">
                    <li><strong className="text-zinc-900 dark:text-white">Stands &amp; Scénographie européenne :</strong> Conception graphique et habillage de stands pour les salons européens (dont le stand de plus de 150 m² au FIC Lille Grand Palais, ainsi qu'à it-sa Nuremberg et InfoSec London ; plus de 4 000 contacts enregistrés collectivement au FIC).</li>
                    <li><strong className="text-zinc-900 dark:text-white">Motion Design (After Effects) :</strong> Conception de l'animation pour l'arche vidéo d'accueil à l'entrée du FIC 2025 (boucle motion design co-branding).</li>
                    <li><strong className="text-zinc-900 dark:text-white">Sprint de Hanovre (36 h) :</strong> Collaboration graphique internationale sur l'affiche de présentation et l'univers du cyber-héros Helix Nova.</li>
                    <li><strong className="text-zinc-900 dark:text-white">Incarnation de marque :</strong> Incarnation en costume de Captain Security sur scène plénière et dans les allées des salons.</li>
                    <li><strong className="text-zinc-900 dark:text-white">Campagnes B2B &amp; Certifications :</strong> Visuels Paid Ads, fiches techniques et refonte des 7 badges officiels de partenariat.</li>
                  </ul>
                </div>

                {/* Vade / Hornetsecurity Alternance */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Chargé de marque employeur — Vade, puis Hornetsecurity
                    </h3>
                    <span className="text-xs font-mono font-medium text-zinc-500">
                      Sept 2023 – Août 2025 · Alternance
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Attractivité RH et recrutement de profils techniques rares (ingénieurs détection de menaces, développeurs). Déploiement du programme d'employee advocacy sur LinkedIn, logistique des séminaires internes et cohésion post-acquisition.
                  </p>
                </div>

                {/* Fresh Data & Résin'Architecte */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Directeur Artistique &amp; Graphiste — Studio ROOM241 (Activité indépendante)
                    </h3>
                    <span className="text-xs font-mono font-medium text-zinc-500">
                      2024 – Présent · Freelance
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    • <strong className="text-zinc-900 dark:text-white">Fresh Data (AgTech) :</strong> Univers visuel validé par Marc-Henri Blarel, campagne Ulule financée à 116 %, visuels radio et captation vidéo au salon MEDFEL (discussions ouvertes avec Auchan, Grand Frais, E.Leclerc).<br />
                    • <strong className="text-zinc-900 dark:text-white">Résin'Architecte (BTP Haut de Gamme) :</strong> Captation vidéo sur chantier, formalisation de l'identité visuelle, gabarits réseaux sociaux, visuels avant/après et supports d'aide à la vente (+219 % de portée organique en 30 jours, 648 visites de profil, +209 % d'interactions, 0 € de publicité payante).
                  </p>
                </div>

                {/* Sencrop Expérience */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Chargé de communication &amp; Community Management — Sencrop
                    </h3>
                    <span className="text-xs font-mono font-medium text-zinc-500">
                      Missions AgriTech B2B
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Communication B2B et animation de communauté pour le leader européen des stations météo connectées agricoles : valorisation des cas d'usage terrain, création de contenus digitaux et relais des campagnes produits.
                  </p>
                </div>

              </div>
            </div>

            {/* Formation & Double Profil */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
                <GraduationCap className="w-4 h-4 text-[#FFAD00]" />
                <span>Formation académique</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-neutral-800/40">
                  <span className="text-[10px] font-mono text-[#FFAD00] font-semibold block uppercase">Stratégie &amp; Business</span>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    {education[0].degree}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{education[0].institution}</p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-neutral-800/40">
                  <span className="text-[10px] font-mono text-[#FFAD00] font-semibold block uppercase">Rigueur Scientifique</span>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    {education[1].degree}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{education[1].institution}</p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-neutral-800/40">
                  <span className="text-[10px] font-mono text-[#FFAD00] font-semibold block uppercase">Collectif &amp; Pédagogie</span>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    {education[2].degree}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{education[2].institution}</p>
                </div>
              </div>
            </div>

            {/* Compétences & Outils */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-[#FFAD00]" />
                <span>Stack Technique &amp; Maîtrise Logicielle</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Suite Adobe (Illustrator, Photoshop, InDesign)',
                  'Premiere Pro & After Effects (Motion design)',
                  'Scénographie & Stands (> 150 m²)',
                  'Figma (Design System & UI)',
                  'Tailwind CSS & React',
                  'Direction de tournage & Interviews',
                  'Anglais professionnel courant'
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-neutral-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-white/5 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Rigueur & Marathon */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.05] border border-[#FFAD00]/20 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#FFAD00]/15 text-[#FFAD00] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Discipline athlétique : Record marathon en 02h48'25 à Venise
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {athleticProof.percentile} ({athleticProof.pace} sur 42,195 km). Une culture de la préparation millimétrée, de l'endurance sur les projets complexes et de l'exigence du zéro défaut appliquée chaque jour à la production créative.
                </p>
              </div>
            </div>

          </div>

          {/* Footer Modal CTA */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-neutral-950/80 border-t border-zinc-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-zinc-500">
              Disponible immédiatement pour opportunités en CDI (Lille, Métropole ou Hybride)
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${identity.links.email}?subject=Prise%20de%20contact%20suite%20%C3%A0%20votre%20portfolio`}
                className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity"
              >
                Proposer un échange ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
