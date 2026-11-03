import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Coffee,
  Activity,
  TrendingUp,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Camera,
  Maximize2,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import EditorialViewer from '../components/EditorialViewer';
import { editorialPhotos, marathonPhoto } from '../data/gallery';
import { applyTheme } from '../lib/theme';
import { getTrainingStats } from '../lib/trainingStats';

/**
 * Univers Personnel — « Au-delà du travail » (Mode sombre authentique)
 * Studio ROOM241 • Rémi Brocart
 * 
 * Direction artistique :
 * - Atmosphère contemplative, sobre et habitée : fond anthracite #0B0A09, blanc cassé #EDEDED, ambre signature #FFAD00.
 * - Narration articulée autour de l'autonomie, de la déconstruction et de la régularité.
 * - Intégration de Meridian, rituels (café/matcha), course à pied (Marathon 2h48 / Strava), investissement et photographies authentiques.
 */
export default function PersonalUniverse({ navigate, onSwitchToPro }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const trainingStats = getTrainingStats();

  // Activation immédiate du mode sombre authentique dès l'entrée dans l'univers personnel
  useEffect(() => {
    applyTheme('dark');
  }, []);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  // Liste des photographies pour la visionneuse
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
      
      {/* 1. HERO D'OUVERTURE PERSONNEL AVEC KURO */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/10 overflow-hidden">
        {/* Glow ambré d'ambiance ultra-doux */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FFAD00]/15 via-transparent to-transparent blur-3xl rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10 space-y-12">
          
          {/* En-tête personnel éditorial */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-3xl">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
              <Compass className="w-7 h-7 text-[#FFAD00]" />
            </div>
            
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FFAD00]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                <span>AU-DELÀ DU TRAVAIL • UNIVERS PERSONNEL</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Comprendre, explorer et construire avec autonomie.
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                Mon travail documente ce que je réalise. Cet espace raconte ce qui nourrit ma réflexion au quotidien : le rapport aux climats, la marche et la course pour comprendre un territoire, la patience des matières et le besoin permanent de démonter chaque mécanisme pour en saisir le fonctionnement réel.
              </p>
            </div>
          </div>

          {/* Bandeau de bascule rapide vers l'univers professionnel */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs text-zinc-500 font-mono">Vous préférez consulter mon travail ?</span>
            <button
              type="button"
              onClick={onSwitchToPro}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer"
            >
              <span>Basculer vers l'univers pro</span>
              <ArrowRight className="w-3 h-3 text-[#FFAD00]" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. LE GOÛT DU DEHORS, DU CALME ET DE L'AUTONOMIE */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">01</span>
              <span>/</span>
              <span>ENVIRONNEMENTS &amp; TERRITOIRES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Le goût des climats frais, de la pierre et du silence
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              J'ai une attirance naturelle pour les ciels bas, les paysages minéraux, la pluie, le vent et les ambiances de saison. Les fortes chaleurs au-delà de 20 à 22 °C pèsent vite sur le rythme des journées actives. À l'inverse, l'atmosphère d'Édimbourg en automne ou en hiver — ruelles médiévales en pierre sombre, brume matinale et décors historiques dépouillés — correspond exactement à ce que je recherche : un espace où l'on respire et où l'on explore à son propre tempo.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Le voyage n'est pas une consommation de monuments. C'est marcher et courir pour comprendre l'échelle d'un territoire, loin des flux saturés du tourisme de masse. En voyage avec Laura, j'aime ce contraste très simple : passer des heures dehors face aux éléments, puis retrouver un intérieur sobre, chaleureux et calme.
            </p>
          </div>

          {/* Grille photographique authentique */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {editorialPhotos.slice(0, 3).map((photo, index) => (
              <div
                key={photo.id || index}
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#FFAD00]/40 transition-all cursor-pointer aspect-[4/3]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">{photo.title}</span>
                    <span className="text-zinc-400 text-[11px] font-mono">{photo.place || photo.category}</span>
                  </div>
                  <Maximize2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
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

      {/* 3. MERIDIAN — L'AUTONOMIE COMME PROJET CONCRET */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-zinc-950/60">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">02</span>
              <span>/</span>
              <span>PROJET PERSONNEL • EXPLORATION CONCRÈTE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Compass className="w-8 h-8 text-[#FFAD00]" />
              <span>Meridian — L'autonomie de terrain sans 4G</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Meridian est né d'un constat simple sur le terrain : lorsqu'on explore des zones rurales, des sentiers côtiers ou des territoires isolés, la dépendance aux réseaux mobiles commerciaux et aux applications connectées devient rapidement une contrainte. L'idée était de concevoir un outil autonome permettant de s'orienter et de consigner son expédition sans dépendre du cloud.
            </p>
          </div>

          {/* Fiche technique et conceptuelle de Meridian */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00]">Architecture technique réelle</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  MapLibre GL, Leaflet &amp; Stockage vectoriel local
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="font-bold text-white block">Tuiles vectorielles hors-ligne</span>
                  <p className="text-zinc-400 leading-relaxed">Rendu fluide de fonds cartographiques sans échange réseau pendant l'exploration.</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="font-bold text-white block">Trace GPS &amp; Carnet d'étapes</span>
                  <p className="text-zinc-400 leading-relaxed">Enregistrement précis de parcours, points remarquables et distances parcourues.</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="font-bold text-white block">Passeport d'expéditions</span>
                  <p className="text-zinc-400 leading-relaxed">Tampons visuels générés par étape pour immortaliser chaque territoire traversé.</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="font-bold text-white block">PWA &amp; Wrapper Capacitor</span>
                  <p className="text-zinc-400 leading-relaxed">Développement web moderne embarqué sous forme d'application mobile légère.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Statut : Prototype fonctionnel de recherche</span>
                <span className="text-zinc-300">Projet personnel non commercialisé</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Ce que Meridian démontre</span>
              <h4 className="text-base font-bold text-white">Transformer la curiosité en outil tangible</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Ce projet illustre une ligne directrice : plutôt que d'attendre qu'un service tiers réponde exactement à mes besoins d'itinérance, je préfère comprendre les protocoles de tuiles cartographiques, manipuler les projections géographiques et bâtir moi-même un outil fiable.
              </p>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono">
                <code>Stack : React, TypeScript, MapLibre GL, Leaflet, Capacitor</code>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. LES RITUELS DU QUOTIDIEN : CAFÉ EN GRAIN & MATCHA */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">03</span>
              <span>/</span>
              <span>RITUELS &amp; ATTENTION PORTÉE AUX MATIÈRES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[#FFAD00]" />
              <span>Le café en grain et le matcha cérémonial</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Il ne s'agit pas d'accessoires de mode, mais d'une attention constante portée aux matières, aux températures, aux ratios et à la répétition du geste. Dans ces préparations comme dans le design ou le code, le résultat final découle directement de la précision des réglages initiaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Le Café */}
            <div className="p-7 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-5">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00]">Extraction &amp; Mouture</span>
                <h3 className="text-xl font-bold text-white">Le café en grain et ses variations</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Chaque matin commence avec un espresso sur la De'Longhi Magnifica Evo. Mais l'intérêt vient surtout de la variété des méthodes : le moulin Melitta Molino pour ajuster la finesse de la mouture, la cafetière italienne Moka pour les tasses courtes et intenses, ou la cafetière à piston pour observer une infusion plus lente et extraire d'autres profils aromatiques.
              </p>
              <ul className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <span>Espresso quotidien : extraction maîtrisée sur grains fraîchement moulus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <span>Moka &amp; Piston : observation du temps d'infusion et des densités</span>
                </li>
              </ul>
            </div>

            {/* Le Matcha */}
            <div className="p-7 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-5">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00]">Concentration &amp; Clarté</span>
                <h3 className="text-xl font-bold text-white">Le matcha de grade cérémonial</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Le matcha (notamment Matcha &amp; CO de grade cérémonial) accompagne les phases de travail approfondi et d'écriture. Préparé au fouet en bambou (chasen) dans une eau chauffée sans ébullition, sans sucre ni additif. C'est un rituel sobre de concentration, sans prétention médicale, simplement pour rythmer les sessions nécessitant un calme mental prolongé.
              </p>
              <ul className="text-xs text-zinc-400 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <span>Préparation au fouet traditionnel dans un bol en céramique</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <span>Rituel associé aux longues plages de réflexion et de code</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. LA RÉGULARITÉ DE L'EFFORT : COURSE À PIED, MARATHON & STRAVA */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-zinc-950/60">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">04</span>
              <span>/</span>
              <span>DISCIPLINE ATHLÉTIQUE &amp; ENDURANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#FFAD00]" />
              <span>La régularité, le temps long et la course à pied</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Courir ne se résume pas à accumuler des kilomètres. C'est un exercice de patience, de gestion de l'effort et de rigueur. On y apprend à tenir une allure lorsque la fatigue s'installe, à accepter les jours difficiles et à respecter les cycles de progression.
            </p>
          </div>

          {/* Double composition : Marathon officiel + Profil Strava transparent */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Carte Marathon Performance */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00]">Marathon Officiel</span>
                  <span className="text-xs font-mono text-zinc-400">26 octobre 2025</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Wizz Air Venice Marathon • 42,195 km
                </h3>
                
                {/* Métrique officielle */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white block">2 h 48</span>
                    <span className="text-[11px] font-mono text-zinc-400">Chrono officiel (2h48m25s)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FFAD00] block">3'59</span>
                    <span className="text-[11px] font-mono text-zinc-400">Allure moyenne au km</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 col-span-2 sm:col-span-1">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white block">Top 1%</span>
                    <span className="text-[11px] font-mono text-zinc-400">Classement amateur</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-2">
                  L'intérêt va aussi vers la technique : la densité des mousses Pebax, la rigidité des plaques carbone et la géométrie du rocker pour optimiser l'économie de course.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <img
                  src={marathonPhoto.src}
                  alt={marathonPhoto.alt}
                  className="w-16 h-16 rounded-xl object-cover border border-white/10"
                />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Tableau officiel des engagés</span>
                  <span className="text-zinc-500 font-mono">Venise • Vérifié sur dossard</span>
                </div>
              </div>
            </div>

            {/* Carte Strava transparente */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00]">Profil Public Strava</span>
                  <span className="text-[11px] font-mono text-zinc-500">ID : 64835803</span>
                </div>

                <h3 className="text-lg font-bold text-white">Constance d'entraînement</h3>
                
                {/* Données qualifiées de façon rigoureuse */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Activités enregistrées</span>
                    <span className="text-sm font-mono font-bold text-white">5 618</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Semaines consécutives</span>
                    <span className="text-sm font-mono font-bold text-[#FFAD00]">{trainingStats.weeks} semaines</span>
                  </div>
                  <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                    Progression calculée depuis le {trainingStats.baseDateFormatted}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Cette régularité représente plus de six années sans discontinuité, par tous les temps et en tout lieu.
                </p>
              </div>

              <a
                href="https://www.strava.com/athletes/64835803"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
              >
                <span>Consulter le profil public Strava</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 6. COMPRENDRE LES MÉCANISMES : INVESTISSEMENT & SYSTÈMES ÉCONOMIQUES */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="font-bold text-[#FFAD00]">05</span>
              <span>/</span>
              <span>MÉTHODE, RISQUE &amp; TEMPS LONG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#FFAD00]" />
              <span>Comprendre les systèmes économiques : méthode et discipline</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              L'intérêt pour l'économie répond à la même démarche que le design ou le code : comprendre le fonctionnement des systèmes sous-jacents, analyser les mécanismes de risque et construire dans la durée avec méthode plutôt que de réagir aux impulsions court terme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Actifs financiers & Stratégie indicielle */}
            <div className="p-7 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00]">Régularité &amp; Horizon Long</span>
              <h3 className="text-xl font-bold text-white">Méthode indicielle, DCA et diversification</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                L'investissement régulier programmé (Dollar-Cost Averaging) sur des paniers indiciels diversifiés permet de soustraire la décision aux biais émotionnels du marché. Cette logique s'accompagne d'une curiosité pour la diversification des réserves de valeur (indices larges, or physique, Bitcoin) et l'analyse rigoureuse de la volatilité, loin de toute spéculation immédiate.
              </p>
              <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/10">
                Ligne directrice : Méthode froide, gestion mesurée du risque et vision pluriannuelle.
              </div>
            </div>

            {/* Économie réelle, modélisation & systèmes */}
            <div className="p-7 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00]">Systèmes &amp; Cadre Réel</span>
              <h3 className="text-xl font-bold text-white">Compréhension des flux, modélisation du risque et autonomie</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Cette démarche d'apprentissage intellectuel s'étend à la compréhension des grands équilibres macroéconomiques, des cycles de marché et de la régulation des flux. Comprendre comment s'articulent les politiques monétaires, analyser les structures de coûts et anticiper les contraintes de terrain relève d'une même curiosité systémique.
              </p>
              <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/10">
                Ligne directrice : Analyser la structure sous-jacente et raisonner en termes de ratios de risque.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. LA CURIOSITÉ PAR LA DÉCONSTRUCTION & PASSERELLE PRO */}
      <section className="py-20 sm:py-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-white/15 shadow-2xl space-y-8 max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FFAD00]">
              <Cpu className="w-3.5 h-3.5 text-[#FFAD00]" />
              <span>LE FIL CONDUCTEUR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              « Comprendre ce qui se passe derrière chaque outil avant de l'utiliser. »
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Du baccalauréat en sciences de l'ingénieur à l'apprentissage autodidacte du design graphique, du brand management stratégique au développement web (Three.js, React, PWA), la démarche reste constante : démonter la mécanique, en comprendre les contraintes réelles et construire avec méthode.
            </p>

            {/* Actions de retour vers l'univers professionnel */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onSwitchToPro}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-[#09090B] text-xs font-bold tracking-wide transition-all active:scale-95 shadow-md cursor-pointer"
              >
                <span>Découvrir mes réalisations professionnelles</span>
                <ArrowRight className="w-4 h-4 text-zinc-900" />
              </button>

              <a
                href="/projets"
                onClick={handleNav('/projets')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <span>Accéder directement aux projets</span>
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
        projectContext="Univers Personnel • Photographies authentiques"
      />

    </div>
  );
}

