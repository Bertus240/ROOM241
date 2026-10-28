import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Camera, X, ChevronLeft, ChevronRight, Maximize2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HorsCadre({ navigate }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  const photos = [
    {
      src: "/assets/autres/instagram/IMG20260712201306.jpg",
      title: "Élévation gothique & lumière dorée",
      category: "Architecture & Géométrie",
      ratio: "aspect-[3/4]",
      gridSpan: "lg:col-span-8 lg:row-span-2",
      description: "Détail de la façade monumentale, rosace et pinacles baignés par le soleil rasant de fin de journée."
    },
    {
      src: "/assets/autres/instagram/Screenshot_2024-12-21-18-52-52-02_1c337646f29875672b5a61192b9010f9.jpg",
      title: "Falaises de craie blanche & mer",
      category: "Paysage & Matière",
      ratio: "aspect-[4/3]",
      gridSpan: "lg:col-span-4",
      description: "Vue plongeante sur la côte d'Albâtre, l'estran de galets et le dégradé marin sous la lumière d'été."
    },
    {
      src: "/assets/autres/instagram/IMG20260404113949.jpg",
      title: "Vibration chromatique — Piments suspendus",
      category: "Texture & Teinte",
      ratio: "aspect-[3/4]",
      gridSpan: "lg:col-span-4",
      description: "Grappes de piments rouges séchant au soleil, ombres franches sur crépi clair."
    },
    {
      src: "/assets/autres/instagram/Screenshot_2024-12-15-21-14-35-64_1c337646f29875672b5a61192b9010f9.jpg",
      title: "Perspective urbaine — Rue Faidherbe à Lille",
      category: "Urbanisme & Rythme",
      ratio: "aspect-[16/10]",
      gridSpan: "lg:col-span-7",
      description: "Axe urbain lillois vers la gare, animation de fin d'après-midi et façades flamandes."
    },
    {
      src: "/assets/autres/instagram/IMG_20260918_201405.jpg",
      title: "Signal nocturne — Enseigne néon « OPEN »",
      category: "Typographie & Lumière",
      ratio: "aspect-[3/4]",
      gridSpan: "lg:col-span-5",
      description: "Néon tubulaire bleu cyan dans la pénombre, contraste photographique et lettrage franc."
    },
    {
      src: "/assets/autres/instagram/IMG20260929135916.jpg",
      title: "Calme fluvial & canopée",
      category: "Nature & Sérénité",
      ratio: "aspect-[3/4]",
      gridSpan: "lg:col-span-4",
      description: "Reflets calmes sur l'eau bordée par une végétation dense sous un ciel nuageux."
    },
    {
      src: "/assets/autres/instagram/IMG20260403192340.jpg",
      title: "Horizon méditerranéen",
      category: "Espace & Silhouette",
      ratio: "aspect-[3/4]",
      gridSpan: "lg:col-span-4",
      description: "Pinède côtière surplombant la mer, silhouettes et lumière chaude de fin d'après-midi."
    },
    {
      src: "/assets/autres/instagram/IMG20260328154727.jpg",
      title: "Gourmandise & détail artisanal",
      category: "Texture & Intimité",
      ratio: "aspect-[3/4]",
      gridSpan: "lg:col-span-4",
      description: "Texture d'un feuilletage praliné pistache ouvert à la main, lumière naturelle douce."
    }
  ];

  // Gestion du clavier pour la visionneuse
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % photos.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  // Verrouillage du scroll quand la lightbox est active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div className="pt-32 pb-28 space-y-28 sm:space-y-36">

      {/* ========================================================
          EN-TÊTE ÉDITORIAL HORS-CADRE
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="space-y-6">
          
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={handleNav('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52525B] hover:text-[#09090B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </a>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              Hors-cadre
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090B] leading-[1.08]">
              Photographie &amp; Dépassement de soi.
            </h1>
            <p className="text-lg text-[#52525B] leading-relaxed">
              Le regard d'un designer ne s'arrête pas aux bordures d'un écran. Cette galerie rassemble des fragments visuels quotidiens — géométries de pierre, horizons naturels et signes urbains — ainsi que la rigueur de l'effort d'endurance.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================
          GALERIE ÉDITORIALE ASYMÉTRIQUE
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {photos.map((item, index) => (
            <div
              key={index}
              onClick={() => setLightboxIndex(index)}
              className={`${item.gridSpan} group cursor-pointer space-y-3`}
            >
              <div className={`relative ${item.ratio} w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-sm`}>
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 text-black backdrop-blur-sm shadow-lg scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-baseline justify-between text-xs pt-1">
                <span className="font-semibold text-[#09090B] group-hover:text-zinc-600 transition-colors">
                  {item.title}
                </span>
                <span className="text-[#71717A] text-[11px]">
                  {item.category}
                </span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ========================================================
          SECTION DÉPASSEMENT DE SOI : LE MARATHON DE VENISE
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Colonne gauche : Photo officielle */}
            <div className="lg:col-span-5 space-y-3">
              <div
                onClick={() => setLightboxIndex(photos.length)}
                className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 cursor-pointer group shadow-sm"
              >
                <img
                  src="/assets/autres/marathon6.jpg"
                  alt="Rémi Brocart désignant son nom sur le tableau officiel des engagés du Wizz Air Venice Marathon"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-[#71717A] text-center">
                Tableau officiel des engagés • Wizz Air Venice Marathon (26 octobre 2025)
              </p>
            </div>

            {/* Colonne droite : Récit sobre et digne */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                <Compass className="w-4 h-4" />
                <span>Endurance &amp; Rigueur personnelle</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
                Le Marathon de Venise : La discipline du long cours
              </h2>

              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Courir un marathon demande des mois de préparation rigoureuse, une gestion minutieuse de l'effort et la capacité à tenir une cadence soutenue face à l'imprévu.
              </p>

              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Le 26 octobre 2025, sur le parcours exigeant reliant Stra à Venise en franchissant les ponts de la Sérénissime, cette épreuve a concrétisé une éthique personnelle : l'endurance, l'attention constante aux détails et la volonté d'aller au bout des engagements pris.
              </p>

              <div className="pt-2 flex items-center gap-6 text-xs text-[#71717A] border-t border-zinc-200/60">
                <span className="font-semibold text-[#09090B]">Venice Marathon</span>
                <span>•</span>
                <span>42,195 km</span>
                <span>•</span>
                <span>26 Octobre 2025</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          VISIONNEUSE PLEIN ÉCRAN ACCESSIBLE (LIGHTBOX)
         ======================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Bouton de fermeture */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Fermer la visionneuse (Échap)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Flèche précédente */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + (photos.length + 1)) % (photos.length + 1));
              }}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Image précédente (Flèche gauche)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Flèche suivante */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % (photos.length + 1));
              }}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Image suivante (Flèche droite)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Contenu actif */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center space-y-4"
            >
              <div className="relative max-h-[75vh] w-auto overflow-hidden rounded-2xl flex items-center justify-center">
                <img
                  src={
                    lightboxIndex < photos.length
                      ? photos[lightboxIndex].src
                      : "/assets/autres/marathon6.jpg"
                  }
                  alt={
                    lightboxIndex < photos.length
                      ? photos[lightboxIndex].title
                      : "Wizz Air Venice Marathon - Tableau officiel"
                  }
                  className="max-h-[75vh] max-w-full w-auto object-contain rounded-xl"
                />
              </div>

              {/* Légende discrète */}
              <div className="text-center text-white space-y-1">
                <p className="text-sm font-semibold">
                  {lightboxIndex < photos.length
                    ? photos[lightboxIndex].title
                    : "Wizz Air Venice Marathon — Tableau officiel des engagés"}
                </p>
                <p className="text-xs text-zinc-400">
                  {lightboxIndex < photos.length
                    ? photos[lightboxIndex].description
                    : "Participation officielle au marathon le 26 octobre 2025."}
                </p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation vers la suite */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
        <a
          href="/studio"
          onClick={handleNav('/studio')}
          className="text-xs font-semibold text-[#52525B] hover:text-[#09090B] inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Projets Studio</span>
        </a>

        <a
          href="/parcours"
          onClick={handleNav('/parcours')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <span>Découvrir le parcours &amp; contact</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
        </a>
      </div>

    </div>
  );
}
