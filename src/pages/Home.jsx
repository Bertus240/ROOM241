import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import StatGroup from '../components/StatGroup';
import {
  VectorComprendre,
  VectorConcevoir,
  VectorProduire,
  VectorScenographie,
  VectorBrandDA,
  VectorMotionVideo
} from '../components/EditorialVectors';

const HOME_STATS = [
  {
    value: '> 150 m²',
    label: "Stand d'exposition FIC",
    description: "Scénographie, modélisation 3D et habillage graphique pour le Forum InCyber",
    attribution: "Hornetsecurity · Lille Grand Palais",
    href: "/realisations/hornetsecurity#scenographie-fic",
    tag: "Scénographie B2B"
  },
  {
    value: '+4 000',
    label: "Contacts B2B enregistrés",
    description: "Volume recueilli sur le stand par l'ensemble des forces de vente durant le salon",
    attribution: "Bilan collectif commercial FIC",
    href: "/realisations/hornetsecurity#contacts-b2b",
    tag: "Résultat collectif"
  },
  {
    value: '+219 %',
    label: "Portée organique mesurée",
    description: "Progression d'audience sur Meta en 30 jours avec 0 € d'achat d'espace",
    attribution: "Résin'Architecte · 0 € Ads",
    href: "/realisations/resin-architecte#resultats-portee",
    tag: "Réseaux & Terrain"
  },
  {
    value: '116 %',
    label: "Objectif Ulule atteint",
    description: "Campagne de financement participatif validée à 116 % et captation au salon MEDFEL",
    attribution: "Fresh Data · Ulule & MEDFEL",
    href: "/realisations/fresh-data#financement-ulule",
    tag: "Financement"
  }
];

export default function Home({ navigate }) {
  const [isPlayingPitch, setIsPlayingPitch] = useState(false);

  const { identity } = profileData;

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">

      {/* ========================================================
          1. INTRODUCTION / HERO : POSITIONNEMENT ÉDITORIAL & REPÈRES D'EXPERTISE
          (Directeur artistique & designer global — Hiérarchie équilibrée, 2 CTAs)
         ======================================================== */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 border-b border-zinc-200/60 overflow-hidden">

        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10 space-y-12 sm:space-y-16">
          
          {/* Ligne d'identité sobre et certifiée */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="font-semibold text-zinc-950 tracking-tight">
                {identity.brand} · {identity.name}
              </span>
              <span className="text-zinc-300 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100/90 border border-zinc-200/70 text-[11px] font-medium text-zinc-700 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <span>Disponible immédiatement</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-normal">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span className="tracking-wide uppercase font-medium text-[11px]">Métropole Européenne de Lille</span>
            </div>
          </div>

          {/* Cœur du Hero : Récit éditorial sans surenchère */}
          <div className="space-y-6 max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold tracking-[-0.03em] leading-[1.08] text-[#09090B]"
            >
              Direction artistique, scénographie &amp; communication de marque.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#52525B] leading-relaxed font-normal max-w-3xl"
            >
              Diplômé du Master de l'ISEG Lille, j'articule réflexion stratégique et réalisation concrète. Du cadrage de marque à la scénographie de stands de plus de 150 m², de l'animation After Effects aux tournages vidéo sur le terrain, je conçois et je produis sans intermédiaire.
            </motion.p>

            {/* Exactement 2 actions visibles : 1 primaire, 1 secondaire */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm"
            >
              <a
                href="#highlight"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('highlight');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] text-white font-medium hover:bg-zinc-800 transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                <span>Découvrir les réalisations</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
              </a>

              <a
                href="/parcours"
                onClick={handleNav('/parcours')}
                className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
              >
                <span>Mon parcours</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </motion.div>
          </div>

          {/* Repères d'intervention concrète : la preuve du positionnement hybride en 3 domaines (largeur pleine) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-zinc-200/70 w-full text-xs">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '200px' }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 p-4 rounded-2xl bg-zinc-50/60 border border-zinc-200/60 transition-all duration-200 hover:border-zinc-300"
            >
              <div className="flex items-center gap-2">
                <VectorScenographie className="w-5 h-5 text-zinc-900 shrink-0" />
                <span className="text-xs font-semibold text-zinc-900 tracking-tight block">
                  <span className="text-zinc-400 font-normal mr-1">01.</span> Scénographie &amp; Espaces
                </span>
              </div>
              <p className="text-zinc-500 leading-relaxed font-normal text-[11px] sm:text-xs">
                Conception graphique et aménagement visuel de stands professionnels, de la signalétique à l'organisation des parcours visiteurs, pour des salons en France et à l'international.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '200px' }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 p-4 rounded-2xl bg-zinc-50/60 border border-zinc-200/60 transition-all duration-200 hover:border-zinc-300"
            >
              <div className="flex items-center gap-2">
                <VectorBrandDA className="w-5 h-5 text-zinc-900 shrink-0" />
                <span className="text-xs font-semibold text-zinc-900 tracking-tight block">
                  <span className="text-zinc-400 font-normal mr-1">02.</span> Direction artistique
                </span>
              </div>
              <p className="text-zinc-500 leading-relaxed font-normal text-[11px] sm:text-xs">
                Création d'identités visuelles, de chartes graphiques et de supports de communication, du print aux formats numériques.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '200px' }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 p-4 rounded-2xl bg-zinc-50/60 border border-zinc-200/60 transition-all duration-200 hover:border-zinc-300"
            >
              <div className="flex items-center gap-2">
                <VectorMotionVideo className="w-5 h-5 text-zinc-900 shrink-0" />
                <span className="text-xs font-semibold text-zinc-900 tracking-tight block">
                  <span className="text-zinc-400 font-normal mr-1">03.</span> Vidéo &amp; Motion Design
                </span>
              </div>
              <p className="text-zinc-500 leading-relaxed font-normal text-[11px] sm:text-xs">
                Captation vidéo sur le terrain, création d'animations graphiques et montage vidéo, du format court aux contenus multiformats.
              </p>
            </motion.div>
          </div>

          {/* ZONE DE PREUVES CHIFFRÉES ÉDITORIALES (DONNÉES AUTHENTIQUES VÉRIFIÉES) */}
          <div className="pt-8 sm:pt-10 border-t border-zinc-200/70 w-full">
            <StatGroup stats={HOME_STATS} variant="editorial" size="hero" navigate={navigate} />
          </div>

        </div>
      </section>

      {/* ========================================================
          2. UNE RÉALISATION FORTE : MISE EN AVANT ÉDITORIALE MAJEURE
          (Hornetsecurity FIC Lille — Stand > 150 m² & Arche LED)
         ======================================================== */}
      <section id="highlight" className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-8">
        
        {/* En-tête de section éditoriale */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200/60 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.12em] block">
              Étude de cas · Scénographie d'envergure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Scénographie événementielle &amp; habillage de stand (&gt; 150 m²)
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-normal">
            Forum InCyber (FIC) · Zénith de Lille (accès Grand Palais)
          </span>
        </div>

        {/* Composition asymétrique façon magazine de design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Photographie in situ authentique en grand format (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-sm group">
              <img
                src="/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg"
                alt="Vue du stand d'envergure Hornetsecurity au Forum InCyber (Zénith de Lille)"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between text-white text-xs drop-shadow">
                <span className="font-medium">Stand de plus de 150 m² • Accès direct Zénith &amp; Grand Palais</span>
                <span className="text-xs text-white/80 font-normal">Lille</span>
              </div>
            </div>
          </div>

          {/* Récit éditorial & Contexte réel (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-3">
              <div className="text-xs font-medium text-zinc-500">
                <span>Client : Hornetsecurity by Proofpoint</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 leading-snug">
                Concevoir l'espace pour orienter les flux et scénariser l'accueil
              </h3>

              <p className="text-sm text-[#52525B] leading-relaxed">
                Au sein du leader européen de la cybersécurité Cloud, conception de la signalétique et de l'habillage graphique du stand principal au Forum InCyber. L'enjeu : hiérarchiser les messages clés dans un salon professionnel très dense, orienter les flux vers les pôles de démonstration et scénariser l'entrée.
              </p>

              <p className="text-sm text-[#52525B] leading-relaxed">
                Ce projet intègre également la réalisation complète sur After Effects de la boucle vidéo diffusée sur l'arche d'accueil LED à l'entrée du stand, synchronisée pour capter le regard des allées.
              </p>
            </div>

            {/* Repère d'impact vérifié et sourcé (sans tableau de bord artificiel) */}
            <motion.div
              whileHover={{ y: -2 }}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-50/80 hover:bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 transition-all duration-200 space-y-2 shadow-2xs"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight font-sans">
                  +4 000
                </span>
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.1em]">
                  Résultat collectif
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Plus de 4 000 contacts B2B enregistrés collectivement par les équipes commerciales sur l'événement.
              </p>
            </motion.div>

            {/* Action vers l'étude de cas complète */}
            <div className="pt-2 flex items-center justify-between gap-4 text-xs">
              <span className="text-zinc-500 font-normal">
                Salons européens : Lille &amp; Nuremberg
              </span>

              <a
                href="/realisations/hornetsecurity"
                onClick={handleNav('/realisations/hornetsecurity')}
                className="inline-flex items-center gap-1.5 font-semibold text-zinc-950 hover:text-zinc-600 transition-colors shrink-0 group"
              >
                <span>Lire l'étude de cas complète</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          3. SÉLECTION DE RÉALISATIONS : DU SAVOIR-FAIRE DE TERRAIN À LA VIDÉO
          (Composition éditoriale équilibrée en 3 colonnes harmonisées)
         ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200/60 pb-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.12em] block">
              Sélection de projets
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Du terrain à la vidéo : des approches adaptées à chaque contexte
            </h2>
          </div>
          <a
            href="/projets"
            onClick={handleNav('/projets')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors group"
          >
            <span>Voir l'ensemble des projets</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Grille équilibrée en 3 colonnes de cartes aux ratios et hauteurs homogènes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Projet 1 : Résin'Architecte */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between space-y-4 p-5 rounded-3xl bg-zinc-50/50 border border-zinc-200/80 hover:border-zinc-300 transition-all duration-300 hover:shadow-sm"
          >
            <div className="space-y-4">
              <div
                onClick={handleNav('/realisations/resin-architecte')}
                role="button"
                tabIndex={0}
                aria-label="Consulter l'étude de cas Résin'Architecte"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (navigate) navigate('/realisations/resin-architecte');
                  }
                }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-2xs cursor-pointer group"
              >
                <img
                  src="/assets/social-proof-ra/post_pool_craft.png"
                  alt="Résin'Architecte — Pose de moquette de marbre aux abords d'une piscine"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white space-y-0.5">
                  <span className="text-[10px] font-semibold text-white/75 uppercase tracking-[0.08em] block">
                    Artisanat &amp; BTP
                  </span>
                  <span className="text-sm font-semibold block leading-tight">
                    Résin'Architecte
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#52525B]">
                <div className="flex items-center gap-2 font-medium text-zinc-500">
                  <span className="text-zinc-950 font-bold text-xs">+219 % de portée</span>
                  <span>•</span>
                  <span>0 € de pub</span>
                </div>
                <p className="leading-relaxed text-[12px] sm:text-xs">
                  Accompagnement d'un artisan applicateur : identité de marque, captation vidéo directe sur chantiers et supports d'aide à la vente sans achat média.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200/60">
              <a
                href="/realisations/resin-architecte"
                onClick={handleNav('/realisations/resin-architecte')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 hover:text-zinc-600 transition-colors group"
              >
                <span>Découvrir l'étude Résin'Architecte</span>
                <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Projet 2 : Fresh Data */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between space-y-4 p-5 rounded-3xl bg-zinc-50/50 border border-zinc-200/80 hover:border-zinc-300 transition-all duration-300 hover:shadow-sm"
          >
            <div className="space-y-4">
              <div
                onClick={handleNav('/realisations/fresh-data')}
                role="button"
                tabIndex={0}
                aria-label="Consulter l'étude de cas Fresh Data"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (navigate) navigate('/realisations/fresh-data');
                  }
                }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-2xs cursor-pointer group"
              >
                <img
                  src="/assets/fresh-data-video-cover.jpg"
                  alt="Fresh Data — Campagne Ulule et captation vidéo au salon MEDFEL"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white space-y-0.5">
                  <span className="text-[10px] font-semibold text-white/75 uppercase tracking-[0.08em] block">
                    Fintech &amp; Distribution
                  </span>
                  <span className="text-sm font-semibold block leading-tight">
                    Fresh Data
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#52525B]">
                <div className="flex items-center gap-2 font-medium text-zinc-500">
                  <span className="text-zinc-950 font-bold text-xs">116 % validé</span>
                  <span>•</span>
                  <span>Campagne Ulule</span>
                </div>
                <p className="leading-relaxed text-[12px] sm:text-xs">
                  Création de l'univers de marque aux côtés du fondateur : identité visuelle, vidéo de présentation au salon MEDFEL et supports de campagne participative.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200/60">
              <a
                href="/realisations/fresh-data"
                onClick={handleNav('/realisations/fresh-data')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 hover:text-zinc-600 transition-colors group"
              >
                <span>Voir la fiche Fresh Data</span>
                <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Projet 3 : Jardimax */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between space-y-4 p-5 rounded-3xl bg-zinc-50/50 border border-zinc-200/80 hover:border-zinc-300 transition-all duration-300 hover:shadow-sm"
          >
            <div className="space-y-4">
              <div
                onClick={handleNav('/realisations/jardimax')}
                role="button"
                tabIndex={0}
                aria-label="Consulter la démonstration créative Jardimax"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (navigate) navigate('/realisations/jardimax');
                  }
                }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-2xs cursor-pointer group"
              >
                <img
                  src="/assets/jardimax/jardimax_cover.jpg"
                  alt="Jardimax — Démonstration créative en formats 16:9 et 9:16"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white space-y-0.5">
                  <span className="text-[10px] font-semibold text-white/75 uppercase tracking-[0.08em] block">
                    Démonstration en recrutement
                  </span>
                  <span className="text-sm font-semibold block leading-tight">
                    Jardimax
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#52525B]">
                <div className="flex items-center gap-2 font-medium text-zinc-500">
                  <span className="text-zinc-950 font-bold text-xs">Formats 16:9 &amp; 9:16</span>
                  <span>•</span>
                  <span>Face caméra</span>
                </div>
                <p className="leading-relaxed text-[12px] sm:text-xs">
                  Exercice créatif réalisé dans le cadre d'un recrutement : script didactique sur la réparabilité, intervention face caméra et double montage vidéo.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200/60">
              <a
                href="/realisations/jardimax"
                onClick={handleNav('/realisations/jardimax')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 hover:text-zinc-600 transition-colors group"
              >
                <span>Consulter la démonstration Jardimax</span>
                <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>

      </section>

      {/* ========================================================
          4. VIDÉO DE PRÉSENTATION (OPTION B : APRÈS LES RÉALISATIONS)
          (Format 16:9, miniature locale, lecture sur clic uniquement)
         ======================================================== */}
      <section id="presentation-video" className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.12em] block">
              Présentation vidéo · 1 min 28 s
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Une minute pour faire connaissance.
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Originaire des Hauts-de-France, j'ai choisi de construire mon parcours à la croisée de la rigueur technique et de la création visuelle.
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Dans cette courte vidéo, je résume ma méthode de travail : comprendre le contexte métier, concevoir des solutions graphiques et scéniques cohérentes, et assurer le suivi jusqu'au terrain.
            </p>
            <div className="pt-1.5">
              <blockquote className="pl-3.5 border-l border-[#FFAD00]/60 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300 font-serif italic leading-relaxed tracking-tight">
                « Partir d'une contrainte technique réelle et concevoir l'image ou l'espace qui y répond avec justesse. »
              </blockquote>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-zinc-200/80 group">
              {!isPlayingPitch ? (
                <>
                  <img
                    src="/assets/video-pitch-remi.jpg"
                    alt="Présentation vidéo de Rémi — ROOM241"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={() => setIsPlayingPitch(true)}
                      aria-label="Lancer la vidéo de présentation (1 min 28 s)"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-zinc-400/40 cursor-pointer"
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1 text-zinc-950" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-3 left-4 text-xs font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                    Format court · 1 min 28 s
                  </div>
                </>
              ) : (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/Bg9Pce0Qqg0?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                  title="Présentation vidéo de Rémi — ROOM241"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================
          5. APPROCHE & PASSERELLE DE CONTACT NATURELLE
          (Comprendre · Concevoir · Produire)
         ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 border-t border-zinc-200/60 pt-12 sm:pt-16 space-y-12">
        
        <div className="space-y-10">
          
          <div className="space-y-3 max-w-3xl">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.12em] block">
              Méthode de travail
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
              Comprendre. Concevoir. Produire.
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Un projet pertinent ne s'arrête pas à une intention graphique. Il doit tenir ses promesses dans les contraintes techniques du réel : de l'accueil sur un stand d'envergure européenne à la captation vidéo directe sur chantier.
            </p>
          </div>

          {/* Grille éditoriale 3 piliers : Comprendre, Concevoir, Produire */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4 border-t border-zinc-200/60 text-sm text-[#52525B]">
            
            {/* 01. Comprendre */}
            <div className="p-6 rounded-3xl bg-zinc-50/70 border border-zinc-200/70 space-y-4 hover:border-zinc-300 transition-colors">
              <div className="flex items-center justify-between">
                <VectorComprendre className="w-8 h-8 text-zinc-950" />
                <span className="font-mono text-[11px] font-semibold text-zinc-400">01</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Étape 01 · Diagnostic
                </span>
                <h3 className="text-base font-bold text-zinc-950 tracking-tight">
                  Comprendre le terrain
                </h3>
              </div>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Analyser le contexte métier, la circulation des flux visiteurs et les contraintes techniques réelles avant d'engager la création.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-600 font-medium pt-2 border-t border-zinc-200/60">
                <li>• Analyse des flux et orientation des publics</li>
                <li>• Cadrage éditorial &amp; hiérarchie des messages</li>
                <li>• Faisabilité matérielle et contraintes d'espace</li>
              </ul>
            </div>

            {/* 02. Concevoir */}
            <div className="p-6 rounded-3xl bg-zinc-50/70 border border-zinc-200/70 space-y-4 hover:border-zinc-300 transition-colors">
              <div className="flex items-center justify-between">
                <VectorConcevoir className="w-8 h-8 text-zinc-950" />
                <span className="font-mono text-[11px] font-semibold text-zinc-400">02</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Étape 02 · Création
                </span>
                <h3 className="text-base font-bold text-zinc-950 tracking-tight">
                  Concevoir l'image
                </h3>
              </div>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Structurer l'univers de marque, l'architecture d'information des stands grand format et le séquençage After Effects des boucles vidéo.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-600 font-medium pt-2 border-t border-zinc-200/60">
                <li>• Direction artistique vectorielle &amp; chartes</li>
                <li>• Scénographie événementielle (&gt; 150 m²)</li>
                <li>• Storyboards et écriture de scripts vidéo</li>
              </ul>
            </div>

            {/* 03. Produire */}
            <div className="p-6 rounded-3xl bg-zinc-50/70 border border-zinc-200/70 space-y-4 hover:border-zinc-300 transition-colors">
              <div className="flex items-center justify-between">
                <VectorProduire className="w-8 h-8 text-zinc-950" />
                <span className="font-mono text-[11px] font-semibold text-zinc-400">03</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Étape 03 · Réalisation
                </span>
                <h3 className="text-base font-bold text-zinc-950 tracking-tight">
                  Produire sans filtre
                </h3>
              </div>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Prendre en charge l'exécution directe : animation motion design pour arches LED, captation caméra au poing et montages multiformats.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-600 font-medium pt-2 border-t border-zinc-200/60">
                <li>• Boucles d'arches vidéo LED After Effects</li>
                <li>• Prises de vues directes en conditions réelles</li>
                <li>• Montages calibrés 16:9 paysage et 9:16 vertical</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Passerelle d'action fluide et engageante vers la prise de contact */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.12em] block">
              Parlons de votre projet
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              Un stand à imaginer, une identité à construire ou une vidéo à réaliser ?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Je suis disponible pour échanger sur vos projets de communication, vos événements professionnels ou une opportunité en design graphique.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.98] group"
            >
              <span>Prendre contact</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="/parcours"
              onClick={handleNav('/parcours')}
              className="px-5 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 transition-all duration-200 active:scale-[0.98] group"
            >
              <span>Mon parcours</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

      </section>

    </div>
  );
}
