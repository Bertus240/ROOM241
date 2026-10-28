import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Camera,
  Compass,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Award,
  HeartHandshake,
  ArrowUpRight,
  ArrowRight,
  Briefcase,
  Sparkles,
  Layers,
  CheckCircle2,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/profile';
import { editorialPhotos, marathonPhoto } from '../data/gallery';

export default function Parcours({ navigate, onOpenCvModal }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  // Liste complète des images pour la visionneuse plein écran
  const allModalImages = [
    ...editorialPhotos,
    {
      src: marathonPhoto.src,
      alt: marathonPhoto.alt,
      caption: marathonPhoto.caption,
      place: "Venise, Italie",
      category: "Marathon"
    }
  ];

  // Gestion clavier pour la visionneuse plein écran
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % allModalImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + allModalImages.length) % allModalImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allModalImages.length]);

  // Verrouillage du scroll en mode lightbox
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

  const { identity, manifesto, experiences, education, skills, athleticProof } = profileData;

  // Normalisation sécurisée et adaptative des compétences selon la structure réelle de profileData.skills
  const safeSkillGroups = React.useMemo(() => {
    if (!skills) return [];

    // Cas 1 : Si skills est un tableau de groupes [{ category, items }]
    if (Array.isArray(skills)) {
      return skills.map((group, idx) => ({
        id: `skill-group-${idx}`,
        category: group?.category || 'Compétences',
        items: Array.isArray(group?.items) ? group.items : [],
      }));
    }

    // Cas 2 : Si skills est un objet structuré par catégories (business, software, aiTools...)
    if (typeof skills === 'object') {
      const categoryMeta = {
        business: 'Compétences Métier & Direction Artistique',
        software: 'Logiciels & Création (Adobe CC, Figma)',
        aiTools: 'Intelligence Artificielle & Veille',
      };

      const result = [];

      // A. Compétences Métier
      if (Array.isArray(skills.business) && skills.business.length > 0) {
        result.push({
          id: 'business',
          category: categoryMeta.business,
          items: skills.business.map((item) => (typeof item === 'string' ? item : item?.name || '')),
        });
      }

      // B. Logiciels Créatifs
      if (Array.isArray(skills.software) && skills.software.length > 0) {
        result.push({
          id: 'software',
          category: categoryMeta.software,
          items: skills.software.map((item) => (typeof item === 'string' ? item : item?.name || '')),
        });
      }

      // C. Outils d'Intelligence Artificielle
      if (Array.isArray(skills.aiTools) && skills.aiTools.length > 0) {
        result.push({
          id: 'aiTools',
          category: categoryMeta.aiTools,
          items: skills.aiTools.map((tool) => {
            if (typeof tool === 'string') return tool;
            if (tool?.name && tool?.usage) return `${tool.name} (${tool.usage})`;
            return tool?.name || '';
          }),
        });
      }

      // D. Clés supplémentaires éventuelles
      Object.entries(skills).forEach(([key, val]) => {
        if (['business', 'software', 'aiTools'].includes(key)) return;
        if (Array.isArray(val) && val.length > 0) {
          result.push({
            id: key,
            category: key.charAt(0).toUpperCase() + key.slice(1),
            items: val.map((item) => (typeof item === 'string' ? item : item?.name || JSON.stringify(item))),
          });
        }
      });

      return result;
    }

    return [];
  }, [skills]);

  return (
    <div className="pt-24 sm:pt-28 pb-28 space-y-24 sm:space-y-36">

      {/* ========================================================
          1. PREMIER ÉCRAN : PHOTOGRAPHIE FORTE IMMÉDIATE & OUVERTURE PERSONNELLE
          (Photo de Rémi et sa copine sur le pin maritime en première position)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Photographie d'ouverture : Rémi et sa copine face à la mer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div
              onClick={() => setLightboxIndex(0)}
              role="button"
              tabIndex={0}
              aria-label="Agrandir la photographie d'ouverture"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIndex(0);
                }
              }}
              className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5] max-h-[560px] w-full rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm group cursor-pointer"
            >
              <img
                src={editorialPhotos[0].src}
                alt={editorialPhotos[0].alt}
                className="w-full h-full object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#09090B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between text-white text-xs">
                <span className="font-medium tracking-wide">
                  {editorialPhotos[0].caption}
                </span>
                <span className="text-white/70 text-[11px] font-mono">
                  {editorialPhotos[0].place}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#71717A] mt-2 px-1">
              Photographie personnelle • Prise de vue numérique
            </p>
          </motion.div>

          {/* Présentation introductive & Manifeste */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-[#52525B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
              <span>{identity.brand} • {identity.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#09090B] leading-[1.08]">
              {manifesto.title}
            </h1>

            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              {manifesto.paragraphs[0]}
            </p>

            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
              {manifesto.paragraphs[1]}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 bg-white text-[#09090B] text-xs font-semibold hover:bg-zinc-50 transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#FFAD00]" />
                <span>Consulter le CV synthétique</span>
              </button>

              <a
                href="#experiences"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#52525B] hover:text-[#09090B] transition-colors"
              >
                <span>Voir le parcours détaillé</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================
          2. GALERIE ÉDITORIALE PERSONNELLE
          (Compositions soignées, ratios réels préservés, zéro artifice)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10 sm:space-y-16">
        
        <div className="border-t border-zinc-200/80 pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                Hors-cadre • Sélection photographique personnelle
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B]">
                Instants choisis, géométries et lumières
              </h2>
            </div>
            <span className="text-xs text-[#71717A] font-mono">
              {editorialPhotos.length} photographies sélectionnées
            </span>
          </div>

          {/* Relation personnelle à la photographie : regard franc, humble et passionné */}
          <div className="max-w-3xl space-y-2.5 text-sm text-[#52525B] leading-relaxed">
            <p>
              En dehors du travail, je garde toujours un œil sur ce qui m’entoure. La photographie me permet de capturer des lieux, des lumières et des détails que j’aurais autrement laissés passer. Une façade, un paysage, une scène de vie : j’aime prendre le temps de les observer et de trouver le bon cadrage, simplement pour le plaisir de créer.
            </p>
          </div>
        </div>

        {/* --- SÉQUENCE 1 : Grande photographie pleine largeur (Paris, coucher de soleil Seine) --- */}
        <div className="space-y-3">
          <div
            onClick={() => setLightboxIndex(1)}
            role="button"
            tabIndex={0}
            aria-label="Agrandir la photographie de Paris"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(1);
              }
            }}
            className="relative aspect-[4/3] sm:aspect-[16/11] max-h-[640px] w-full rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm group cursor-pointer"
          >
            <img
              src={editorialPhotos[1].src}
              alt={editorialPhotos[1].alt}
              className="w-full h-full object-cover object-[center_38%] transition-transform duration-700 ease-out group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#09090B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between text-white text-xs drop-shadow">
              <span className="font-medium">{editorialPhotos[1].caption}</span>
              <span className="text-white/80 font-mono text-[11px]">{editorialPhotos[1].place}</span>
            </div>
          </div>
          <p className="text-xs text-[#71717A] px-1">
            Perspective fluviale • Lever de soleil sur la Seine
          </p>
        </div>

        {/* --- SÉQUENCE 2 : Diptyque Minéral & Architecture (Étretat & Rouen voûte) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          <div
            onClick={() => setLightboxIndex(2)}
            role="button"
            tabIndex={0}
            className="md:col-span-6 space-y-2 group cursor-pointer"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[2].src}
                alt={editorialPhotos[2].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[2].caption}</span>
              <span className="text-[#71717A] text-[11px] font-mono">{editorialPhotos[2].place}</span>
            </div>
          </div>

          <div
            onClick={() => setLightboxIndex(3)}
            role="button"
            tabIndex={0}
            className="md:col-span-6 space-y-2 group cursor-pointer"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[3].src}
                alt={editorialPhotos[3].alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[3].caption}</span>
              <span className="text-[#71717A] text-[11px] font-mono">{editorialPhotos[3].place}</span>
            </div>
          </div>

        </div>

        {/* --- SÉQUENCE 3 : Diptyque Urbanisme & Nature (Lille Faidherbe & Reflets calmes) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          <div
            onClick={() => setLightboxIndex(4)}
            role="button"
            tabIndex={0}
            className="space-y-2 group cursor-pointer"
          >
            <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[4].src}
                alt={editorialPhotos[4].alt}
                className="w-full h-full object-cover object-[center_55%] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[4].caption}</span>
              <span className="text-[#71717A] text-[11px] font-mono">{editorialPhotos[4].place}</span>
            </div>
          </div>

          <div
            onClick={() => setLightboxIndex(10)}
            role="button"
            tabIndex={0}
            className="space-y-2 group cursor-pointer"
          >
            <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[10].src}
                alt={editorialPhotos[10].alt}
                className="w-full h-full object-cover object-[center_45%] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[10].caption}</span>
              <span className="text-[#71717A] text-[11px]">Respiration</span>
            </div>
          </div>

        </div>

        {/* --- SÉQUENCE 4 : Triptyque Vertical (Gros-Horloge rue, Cathédrale gothique, Piments) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6">
          
          <div
            onClick={() => setLightboxIndex(6)}
            role="button"
            tabIndex={0}
            className="space-y-2 group cursor-pointer"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[6].src}
                alt={editorialPhotos[6].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[6].caption}</span>
              <span className="text-[#71717A] text-[11px] font-mono">{editorialPhotos[6].place}</span>
            </div>
          </div>

          <div
            onClick={() => setLightboxIndex(7)}
            role="button"
            tabIndex={0}
            className="space-y-2 group cursor-pointer"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[7].src}
                alt={editorialPhotos[7].alt}
                className="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[7].caption}</span>
              <span className="text-[#71717A] text-[11px]">Architecture</span>
            </div>
          </div>

          <div
            onClick={() => setLightboxIndex(8)}
            role="button"
            tabIndex={0}
            className="space-y-2 group cursor-pointer"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[8].src}
                alt={editorialPhotos[8].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[8].caption}</span>
              <span className="text-[#71717A] text-[11px]">Teinte &amp; matière</span>
            </div>
          </div>

        </div>

        {/* --- SÉQUENCE 5 : Diptyque Signal nocturne & Cookie pistache (Même ligne & proportions harmonieuses) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          {/* Signal nocturne */}
          <div
            onClick={() => setLightboxIndex(5)}
            role="button"
            tabIndex={0}
            className="space-y-2 group cursor-pointer"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[5].src}
                alt={editorialPhotos[5].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">{editorialPhotos[5].caption}</span>
              <span className="text-[#71717A] text-[11px] font-mono">Typographie &amp; Nuit</span>
            </div>
          </div>

          {/* Cookie pistache */}
          <div
            onClick={() => setLightboxIndex(9)}
            role="button"
            tabIndex={0}
            className="space-y-2 group cursor-pointer"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm relative">
              <img
                src={editorialPhotos[9].src}
                alt={editorialPhotos[9].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between text-xs px-1">
              <span className="font-semibold text-[#09090B]">Cookie pistache</span>
              <span className="text-[#71717A] text-[11px] font-mono">Texture &amp; Matière</span>
            </div>
          </div>

        </div>

        {/* --- SÉQUENCE 6 : Perspective urbaine & patrimoine (Rouen, Rue Saint-Nicolas) --- */}
        <div className="space-y-3">
          <div
            onClick={() => setLightboxIndex(11)}
            role="button"
            tabIndex={0}
            aria-label="Agrandir la photographie de la rue Saint-Nicolas à Rouen"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(11);
              }
            }}
            className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] max-h-[520px] w-full rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm group cursor-pointer"
          >
            <img
              src={editorialPhotos[11].src}
              alt={editorialPhotos[11].alt}
              className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#09090B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between text-white text-xs drop-shadow">
              <span className="font-medium">{editorialPhotos[11].caption}</span>
              <span className="text-white/80 font-mono text-[11px]">{editorialPhotos[11].place}</span>
            </div>
          </div>
          <p className="text-xs text-[#71717A] px-1">
            Perspective patrimoniale • Flèche de la cathédrale en arrière-plan
          </p>
        </div>

      </section>

      {/* ========================================================
          3. LE MARATHON DE VENISE : DISCIPLINE DE L'ENDURANCE
          (Faits réels : 26 oct 2025, 42.195 km, chrono 02h48'25)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="p-7 sm:p-12 rounded-3xl bg-zinc-50 border border-zinc-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-2">
              <div
                onClick={() => setLightboxIndex(allModalImages.length - 1)}
                role="button"
                tabIndex={0}
                aria-label="Agrandir la photographie du Marathon de Venise"
                className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 cursor-pointer group shadow-sm relative"
              >
                <img
                  src={athleticProof.image}
                  alt={marathonPhoto.alt}
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-xs text-[#71717A] text-center">
                {marathonPhoto.caption}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                <Compass className="w-4 h-4" />
                <span>Endurance &amp; Rigueur personnelle</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
                Le Marathon de Venise : La discipline de l'effort continu
              </h3>

              <p className="text-sm text-[#52525B] leading-relaxed">
                Courir un marathon en 2 h 48 min 25 s, c’est surtout des mois d’entraînement, des sorties par tous les temps et beaucoup de régularité. Il faut apprendre à gérer son effort, à tenir son allure et à continuer même quand les jambes commencent à peser.
              </p>

              <p className="text-sm text-[#52525B] leading-relaxed">
                J’y retrouve quelque chose qui me parle aussi dans la création : avancer avec méthode, accepter que tout ne se passe pas comme prévu et rester concentré jusqu’au bout. Le résultat compte, bien sûr, mais il représente surtout tout le travail réalisé en amont.
              </p>

              <div className="pt-2 grid grid-cols-3 gap-3 border-t border-zinc-200 text-xs">
                <div>
                  <span className="text-[#71717A] block text-[11px]">Épreuve</span>
                  <span className="font-bold text-[#09090B]">{athleticProof.event}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[11px]">Distance</span>
                  <span className="font-bold text-[#09090B]">{athleticProof.distance}</span>
                </div>
                <div>
                  <span className="text-[#71717A] block text-[11px]">Chrono officiel</span>
                  <span className="font-bold text-[#09090B] font-mono">{athleticProof.officialChrono}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. PARCOURS PROFESSIONNEL STRUCTURÉ & INTERNATIONAL
         ======================================================== */}
      <section id="experiences" className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-10">
        
        <div className="border-t border-zinc-200/80 pt-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            Parcours professionnel
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
            Trois années structurantes en B2B international &amp; studio indépendant
          </h2>
          <p className="text-sm text-[#52525B] max-w-2xl leading-relaxed">
            De la communication d'attractivité RH en cybersécurité jusqu'à la création d'espaces événementiels monumentaux en Europe et l'incarnation de marque sur le terrain.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-9 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/60 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] block">
                    {exp.type}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#09090B] mt-0.5">
                    {exp.role} — {exp.company}
                  </h3>
                </div>
                <div className="flex flex-col sm:items-end">
                  <span className="text-xs font-semibold text-zinc-900 bg-white px-3 py-1 rounded-full border border-zinc-200 w-fit">
                    {exp.period}
                  </span>
                  <span className="text-[11px] text-[#71717A] mt-1">
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                {exp.context}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#52525B] leading-relaxed">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#09090B]">
                      {h.title}
                    </h4>
                    <p>{h.desc}</p>
                  </div>
                ))}
              </div>

              {exp.resultCollective && (
                <div className="pt-3 border-t border-zinc-200/60 flex items-center gap-2 text-xs text-[#71717A]">
                  <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
                  <span className="font-semibold text-[#09090B]">{exp.resultCollective}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. FORMATION ACADÉMIQUE
         ======================================================== */}
      <section id="formation" className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8">
        <div className="border-t border-zinc-200/80 pt-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            Formation académique
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
            Double cursus scientifique et stratégique
          </h2>
          <p className="text-sm text-[#52525B] max-w-2xl leading-relaxed">
            L'alliance entre la structure de pensée d'un profil scientifique et la compréhension des enjeux de marque globaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[#FFAD00]">
                {idx === 0 && <GraduationCap className="w-5 h-5" />}
                {idx === 1 && <Award className="w-5 h-5" />}
                {idx === 2 && <HeartHandshake className="w-5 h-5" />}
              </div>
              <h3 className="text-base font-bold text-[#09090B]">
                {edu.degree}
              </h3>
              <p className="text-xs font-semibold text-[#71717A]">{edu.institution}</p>
              <p className="text-xs text-[#52525B] leading-relaxed pt-1">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. COMPÉTENCES OPÉRATIONNELLES & STACK TECHNIQUE
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8">
        <div className="border-t border-zinc-200/80 pt-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Compétences &amp; Maîtrise logicielle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
            Capacités d'exécution autonome
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeSkillGroups.map((skillGroup) => (
            <div
              key={skillGroup.id}
              className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-white/10 pb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#09090B] dark:text-white">
                    {skillGroup.category}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-[#52525B] dark:text-zinc-300 leading-relaxed">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

            {/* ========================================================
          7. SECTION ÉDITORIALE CV SYNTHÉTIQUE (GLASS DESIGN)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pb-8">
        <div className="p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-white/75 dark:bg-zinc-900/70 border border-zinc-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                Document de synthèse
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] dark:text-white tracking-tight">
              Consulter mon CV synthétique
            </h3>
            <p className="text-xs sm:text-sm text-[#52525B] dark:text-zinc-300 leading-relaxed">
              Consultez et téléchargez la version condensée de mon parcours professionnel, mes compétences logicielles et mes diplômes académiques dans une mise en page claire et imprimable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#FFAD00]" />
              <span>Ouvrir le CV interactif</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-800 text-[#09090B] dark:text-white text-xs font-semibold hover:border-[#FFAD00] transition-colors"
            >
              <span>Prendre contact</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
            </a>
          </div>
        </div>
      </section>

{/* ========================================================
          VISIONNEUSE PLEIN ÉCRAN (LIGHTBOX INTERACTIVE ÉDITORIALE)
          Portalisée directement sur document.body (zéro fuite d'arrière-plan au sommet)
         ======================================================== */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[99999] w-screen h-screen bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 select-none"
                onClick={() => setLightboxIndex(null)}
              >
                {/* Barre supérieure flottante — Glass Design Premium Luminous */}
                <div
                  className="flex items-center justify-between text-zinc-900 text-xs w-full max-w-5xl mx-auto z-40 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-zinc-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-zinc-950 font-bold text-xs px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 tracking-wider">
                      {String(lightboxIndex + 1).padStart(2, '0')} <span className="text-[#FFAD00]">/</span> {String(allModalImages.length).padStart(2, '0')}
                    </span>
                    {allModalImages[lightboxIndex]?.category && (
                      <span className="inline-flex px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-semibold tracking-wide">
                        {allModalImages[lightboxIndex].category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden md:inline-block text-[11px] text-zinc-500 font-mono">
                      Échap pour fermer • Flèches pour naviguer
                    </span>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(null)}
                      className="px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                      aria-label="Fermer la visionneuse"
                    >
                      <X className="w-4 h-4 text-[#FFAD00]" />
                      <span>Fermer</span>
                    </button>
                  </div>
                </div>

                {/* Boutons de navigation latéraux Glass Design */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev - 1 + allModalImages.length) % allModalImages.length);
                  }}
                  className="fixed left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-zinc-900 border border-zinc-200/90 transition-all hover:scale-105 active:scale-95 shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer"
                  aria-label="Photographie précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev + 1) % allModalImages.length);
                  }}
                  className="fixed right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-zinc-900 border border-zinc-200/90 transition-all hover:scale-105 active:scale-95 shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer"
                  aria-label="Photographie suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Zone centrale : Image plein format sans rognage */}
                <div
                  className="relative flex-1 min-h-0 w-full flex items-center justify-center px-4 sm:px-12 md:px-20 py-2 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={lightboxIndex}
                      src={allModalImages[lightboxIndex].src}
                      alt={allModalImages[lightboxIndex].alt}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-zinc-200/80"
                    />
                  </AnimatePresence>
                </div>

                {/* Légende intégrée haute lisibilité et sélecteur de miniatures */}
                <div
                  className="text-center text-zinc-900 max-w-2xl mx-auto w-full space-y-3 z-40 py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white/90 backdrop-blur-xl border border-zinc-200/90 rounded-2xl px-6 py-3.5 shadow-xl max-w-xl mx-auto space-y-1">
                    <p className="font-bold text-sm sm:text-base text-zinc-950 tracking-tight">
                      {allModalImages[lightboxIndex].caption || allModalImages[lightboxIndex].alt}
                    </p>
                    {allModalImages[lightboxIndex].place && (
                      <div className="flex items-center justify-center gap-1.5 text-[#FFAD00] text-xs font-mono font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-zinc-600 font-semibold">{allModalImages[lightboxIndex].place}</span>
                      </div>
                    )}
                  </div>

                  {/* Barre de vignettes / pagination miniature */}
                  <div className="flex items-center justify-center gap-1.5 pt-1 overflow-x-auto max-w-full pb-1">
                    {allModalImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className={`h-8 w-11 sm:h-10 sm:w-14 rounded-md overflow-hidden border transition-all shrink-0 cursor-pointer ${
                          idx === lightboxIndex
                            ? 'border-[#FFAD00] scale-105 opacity-100 ring-2 ring-[#FFAD00]/40 shadow-md'
                            : 'border-zinc-200 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`Afficher la photo ${idx + 1}`}
                      >
                        <img src={img.src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

    </div>
  );
}
