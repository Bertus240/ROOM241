import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Coffee,
  Activity,
  ArrowRight,
  ExternalLink,
  Camera,
  Maximize2,
  Sparkles,
  ChevronRight,
  Dumbbell
} from 'lucide-react';
import EditorialViewer from '../components/EditorialViewer';
import { editorialPhotos, marathonPhoto } from '../data/gallery';
import { applyTheme } from '../lib/theme';
import { getTrainingStats } from '../lib/trainingStats';

/**
 * Univers Personnel — « Hors cadre » (Direction artistique contemplative & habitée)
 * Studio ROOM241 • Rémi Brocart
 * 
 * Fil conducteur : Être toujours en mouvement, sans oublier de prendre le temps de regarder autour de soi.
 */
export default function PersonalUniverse({ navigate, onSwitchToPro }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const trainingStats = getTrainingStats();

  useEffect(() => {
    applyTheme('dark');
  }, []);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  // Liste ordonnée de toutes les photographies pour la visionneuse
  const galleryItems = [
    ...editorialPhotos,
    {
      src: marathonPhoto.src,
      alt: marathonPhoto.alt,
      title: "Venice Marathon — L'effort accompli",
      caption: "Tableau officiel des engagés — 42,195 km en 2 h 48 min 25 s (26 octobre 2025)",
      place: "Venise, Italie",
      category: "Marathon"
    }
  ];

  return (
    <div className="bg-[#0B0A09] text-[#EDEDED] min-h-screen font-sans selection:bg-[#FFAD00] selection:text-black">
      
      {/* ========================================================
          0. EN-TÊTE ÉDITORIAL & INTRODUCTION — HORS CADRE
         ======================================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/10 overflow-hidden">
        {/* Glow ambré d'ambiance ultra-doux */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-[#FFAD00]/12 via-transparent to-transparent blur-3xl rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10 space-y-10">
          
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FFAD00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
              <span>HORS CADRE • UNIVERS PERSONNEL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              Toujours avoir quelque chose à explorer. Quelque chose à construire. Quelque chose à atteindre.
            </h1>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal pt-2">
              <p>
                Je suis de ceux qui aiment avoir un objectif en tête. Pas forcément parce qu'il faut toujours aller plus vite, mais parce que j'aime savoir vers quoi je vais.
              </p>
              <p>
                J'aime créer, comprendre, découvrir et me lancer des défis. Je peux passer des heures à creuser un sujet pour comprendre ce qui se cache derrière, chercher comment une idée fonctionne ou imaginer ce qu'elle pourrait devenir.
              </p>
              <p>
                J'aime aussi les contrastes : l'énergie de la compétition et le calme des moments passés seul, les grands objectifs et les petits plaisirs du quotidien, l'envie de repousser mes limites et celle de simplement m'arrêter autour d'un bon café.
              </p>
              <p className="text-white font-medium italic pt-1">
                C'est aussi ça, être hors cadre.
              </p>
            </div>
          </div>

          {/* Bandeau de bascule vers le travail professionnel */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <span className="text-xs text-zinc-500 font-mono">Vous souhaitez consulter mes réalisations de design ?</span>
            <button
              type="button"
              onClick={onSwitchToPro}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer"
            >
              <span>Basculer vers l'univers pro</span>
              <ArrowRight className="w-3 h-3 text-[#FFAD00]" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          01 — TOUJOURS EN MOUVEMENT
          Le sport, les objectifs et le dépassement de soi
         ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">01</span>
              <span>/</span>
              <span>TOUJOURS EN MOUVEMENT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Le sport, les objectifs et le dépassement de soi
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              <p>
                Le sport occupe une place importante dans mon quotidien. Course à pied, musculation, entraînement : j'aime la progression, les objectifs qui paraissent parfois un peu trop ambitieux et le chemin nécessaire pour les atteindre.
              </p>
              <p>
                J'aime la compétition, mais la confrontation la plus intéressante reste souvent celle avec soi-même. Trouver ses limites, apprendre à les repousser et recommencer.
              </p>
              <p>
                J'ai notamment couru le marathon de Venise en 2 h 48. Une expérience qui représente assez bien ce qui me plaît dans le sport : se fixer un cap, s'y préparer et aller au bout.
              </p>
              <p>
                La musculation fait également partie intégrante de mon quotidien. Je m'entraîne 7 jours sur 7 et apprécie autant la discipline que la progression.
              </p>
            </div>
          </div>

          {/* Double composition : Marathon officiel + Musculation 7j/7 & Strava */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Carte Marathon Performance */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00] font-semibold">Marathon de Venise</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">26 octobre 2025 • Venise (Italie)</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Wizz Air Venice Marathon • 42,195 km
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Parcours : Stra → Riviera del Brenta → Pont de la Liberté → Venise
                  </p>
                </div>
                
                {/* Métriques vérifiées */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white block">2 h 48</span>
                    <span className="text-[11px] font-mono text-zinc-400 block pt-0.5">Chronomètre officiel</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FFAD00] block">3'59</span>
                    <span className="text-[11px] font-mono text-zinc-400 block pt-0.5">Allure moyenne au km</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 col-span-2 sm:col-span-1">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white block">42,195</span>
                    <span className="text-[11px] font-mono text-zinc-400 block pt-0.5">Kilomètres validés</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                  Ce qui me plaît dans le marathon, c'est autant la préparation que le jour de la course : la régularité, les kilomètres accumulés et le plaisir d'aller au bout d'un défi d'endurance exigeant.
                </p>
              </div>

              {/* Scène photographique authentique du dossard */}
              <div
                onClick={() => setLightboxIndex(editorialPhotos.length)}
                role="button"
                tabIndex={0}
                className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 bg-black/30 p-3.5 rounded-2xl border border-white/5 cursor-pointer hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={marathonPhoto.src}
                    alt={marathonPhoto.alt}
                    className="w-14 h-14 rounded-xl object-cover border border-white/15 shrink-0"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-white block">Tableau officiel des engagés</span>
                    <span className="text-zinc-400 font-mono text-[11px] block">Venise • Vérifié sur dossard</span>
                  </div>
                </div>
                <Maximize2 className="w-4 h-4 text-zinc-500 hover:text-white shrink-0" />
              </div>
            </div>

            {/* Carte Musculation 7j/7 & Constance Strava */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-[#FFAD00]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00] font-semibold">Discipline 7j / 7</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">Régularité athlétique</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Musculation &amp; Constance</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    Entraînement quotidien 7 jours sur 7. La constance et la méthode bâtissent l'énergie et la clarté nécessaires aux journées de travail denses.
                  </p>
                </div>

                {/* Compteur Strava authentique */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#FFAD00] block tracking-tight">
                    {trainingStats.currentWeeks || trainingStats.weeks}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 tracking-wider block uppercase">
                    semaines consécutives d'entraînement
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                    Principe d'entraînement
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Priorité à la constance sur les pics éphémères : maintenir l'effort semaine après semaine forge la rigueur appliquée ensuite dans les projets créatifs.
                  </p>
                </div>
              </div>

              <a
                href="https://www.strava.com/athletes/64835803"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
              >
                <span>Consulter le profil public Strava</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          02 — VOIR AUTREMENT
          La photographie, les lieux et les détails
         ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">02</span>
              <span>/</span>
              <span>VOIR AUTREMENT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Camera className="w-8 h-8 text-[#FFAD00]" />
              <span>La photographie, les lieux et les détails</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              <p>
                Architecture, paysages, voyages, lumière, détails du quotidien… J'aime observer ce qui m'entoure et capturer les choses qui attirent mon regard.
              </p>
              <p>
                La photographie est une façon de prendre le temps de regarder. De remarquer une perspective, une ambiance ou un détail que l'on aurait facilement ignoré.
              </p>
              <p>
                J'aime découvrir de nouveaux endroits, comprendre leur atmosphère et garder une trace de ce qui m'a marqué.
              </p>
            </div>
          </div>

          {/* Composition photographique asymétrique et variée */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* Grande photo 1 : Paris / Lever de soleil */}
            <div
              onClick={() => setLightboxIndex(1)}
              role="button"
              tabIndex={0}
              className="md:col-span-8 group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#FFAD00]/40 transition-all cursor-pointer aspect-[16/10]"
            >
              <img
                src={editorialPhotos[1].src}
                alt={editorialPhotos[1].alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{editorialPhotos[1].title}</span>
                  <span className="text-zinc-400 text-[11px] font-mono">{editorialPhotos[1].place}</span>
                </div>
                <Maximize2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Photo 2 : Falaises Étretat (côte d'Albâtre) */}
            <div
              onClick={() => setLightboxIndex(2)}
              role="button"
              tabIndex={0}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#FFAD00]/40 transition-all cursor-pointer aspect-[4/3] md:aspect-auto"
            >
              <img
                src={editorialPhotos[2].src}
                alt={editorialPhotos[2].alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{editorialPhotos[2].title}</span>
                  <span className="text-zinc-400 text-[11px] font-mono">{editorialPhotos[2].place}</span>
                </div>
                <Maximize2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Photo 3 : Rouen voûte sculptée */}
            <div
              onClick={() => setLightboxIndex(3)}
              role="button"
              tabIndex={0}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#FFAD00]/40 transition-all cursor-pointer aspect-[4/3]"
            >
              <img
                src={editorialPhotos[3].src}
                alt={editorialPhotos[3].alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{editorialPhotos[3].title}</span>
                  <span className="text-zinc-400 text-[11px] font-mono">{editorialPhotos[3].place}</span>
                </div>
                <Maximize2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Photo 4 : Rue Faidherbe au petit matin */}
            <div
              onClick={() => setLightboxIndex(4)}
              role="button"
              tabIndex={0}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#FFAD00]/40 transition-all cursor-pointer aspect-[4/3]"
            >
              <img
                src={editorialPhotos[4].src}
                alt={editorialPhotos[4].alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{editorialPhotos[4].title}</span>
                  <span className="text-zinc-400 text-[11px] font-mono">{editorialPhotos[4].place}</span>
                </div>
                <Maximize2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Photo 5 : Lumière dorée sur la pierre gothique */}
            <div
              onClick={() => setLightboxIndex(7)}
              role="button"
              tabIndex={0}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#FFAD00]/40 transition-all cursor-pointer aspect-[4/3]"
            >
              <img
                src={editorialPhotos[7].src}
                alt={editorialPhotos[7].alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-white block">{editorialPhotos[7].title}</span>
                  <span className="text-zinc-400 text-[11px] font-mono">Architecture &amp; Lumière</span>
                </div>
                <Maximize2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </div>

          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#FFAD00] transition-colors"
            >
              <span>Parcourir toutes les photographies ({editorialPhotos.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          03 — TOUJOURS CHERCHER À COMPRENDRE
          La curiosité et la créativité
         ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-zinc-950/60">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">03</span>
              <span>/</span>
              <span>TOUJOURS CHERCHER À COMPRENDRE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-[#FFAD00]" />
              <span>La curiosité et la créativité</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              <p>
                J'aime comprendre comment les choses fonctionnent, ce qui se cache derrière une idée, un objet, une marque ou une expérience.
              </p>
              <p>
                Je peux facilement me perdre dans un sujet simplement parce que j'ai envie d'en savoir davantage. Démonter une idée, explorer différentes pistes, faire des liens et imaginer d'autres possibilités : c'est une manière de fonctionner que je retrouve autant dans mes projets personnels que professionnels.
              </p>
              <p className="text-white font-medium italic pt-1">
                Créer, pour moi, c'est aussi être curieux de ce qui existe déjà.
              </p>
            </div>
          </div>

          {/* Exemple concret d'exploration : Meridian */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-5">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#FFAD00]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00] font-semibold">Projet d'exploration autonome</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Meridian — Cartographie et orientation hors-ligne
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Né d'une curiosité technique : comment s'orienter et tracer son expédition sur le terrain sans dépendre des réseaux mobiles ? Ce prototype personnel explore le rendu de tuiles vectorielles locales, la manipulation de projections géographiques et l'enregistrement de traces GPS.
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 font-mono">
                <code>Stack explorée : React, MapLibre GL, Leaflet, tuiles vectorielles hors-ligne</code>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Ce que cette curiosité nourrit</span>
              <h4 className="text-base font-bold text-white">La mécanique derrière les formes</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Qu'il s'agisse d'un stand de plus de 150 m², d'une boucle After Effects ou d'un outil de navigation, l'exigence reste la même : comprendre la contrainte technique réelle avant de dessiner la première ligne.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          04 — SAVOIR RALENTIR
          Le café, les endroits cosy et les moments à soi
         ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">04</span>
              <span>/</span>
              <span>SAVOIR RALENTIR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[#FFAD00]" />
              <span>Le café, les endroits cosy et les moments à soi</span>
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              <p>
                J'aime aussi les moments plus calmes. Un bon café, un endroit chaleureux, une ambiance agréable et un peu de temps pour réfléchir ou rêvasser.
              </p>
              <p>
                J'apprécie particulièrement ces instants où l'on n'a rien à produire, rien à prouver et aucune urgence à suivre. Juste le plaisir d'être quelque part, d'observer et de laisser les idées venir.
              </p>
              <p className="text-[#FFAD00] font-medium pt-1">
                Parce qu'être toujours en mouvement ne signifie pas devoir courir en permanence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          L'AMBITION DU MILLION AVANT 30 ANS
          Confidence éditoriale sobre et sincère
         ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-zinc-950/70">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#FFAD00] tracking-widest uppercase">
              <span>Une ambition personnelle</span>
            </div>

            <div className="space-y-2">
              <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-mono text-white tracking-tight block">
                1 000 000 €
              </span>
              <span className="text-lg sm:text-xl font-bold text-zinc-400 block">
                Avant 30 ans.
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed text-left sm:text-center pt-2">
              <p>
                C'est un objectif que je mentionne souvent. Pas pour impressionner, ni pour afficher un chiffre, mais parce que j'ai besoin d'avoir quelque chose de grand à poursuivre.
              </p>
              <p className="text-zinc-400">
                Peut-être que j'y arriverai, peut-être pas. Ce qui compte surtout, c'est la direction que cet objectif me donne et tout ce qu'il me pousse à entreprendre en chemin.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          PASSERELLE DE RETOUR VERS L'UNIVERS PROFESSIONNEL
         ======================================================== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/60 border border-white/10 max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Découvrir les réalisations documentées
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
              Retrouvez l'ensemble des études de cas du studio, du stand FIC (&gt; 150 m²) aux projets B2B, retail data et identités de marque.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onSwitchToPro}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Accéder aux réalisations</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <a
                href="/parcours"
                onClick={handleNav('/parcours')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <span>Consulter le parcours de Rémi</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Visionneuse plein écran pour les photographies */}
      <EditorialViewer
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={galleryItems}
        currentIndex={lightboxIndex || 0}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        projectContext="Hors cadre • Photographies authentiques"
      />

    </div>
  );
}
