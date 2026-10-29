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
import AnimatedStat from '../components/AnimatedStat';
import { editorialPhotos, marathonPhoto } from '../data/gallery';

export default function Parcours({ navigate, onOpenCvModal }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  // Liste complète des images pour la visionneuse plein écran
  // Liste complète des images pour la visionneuse plein écran (incluant réalisations in situ)
  const allModalImages = [
    ...editorialPhotos,
    {
      src: "/assets/hornetsecurity/fic/Stand/IMG20250401075301.jpg",
      alt: "Stand Hornetsecurity > 150 m² au FIC (Zénith de Lille)",
      caption: "Scénographie et flux visiteurs — Stand 150 m² au FIC (Zénith de Lille, accès Grand Palais)",
      place: "Lille, France",
      category: "Scénographie"
    },
    {
      src: "/assets/hornetsecurity/arch_back_motion.png",
      alt: "Rendu After Effects de l'arche vidéo d'accueil LED",
      caption: "Animation After Effects 1080p 60fps diffusée sur l'arche LED du FIC 2026",
      place: "After Effects 1080p",
      category: "Motion Design"
    },
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

  // Organisation sécurisée, défensive et structurée par 4 catégories Glass Studio
  const safeSkillGroups = React.useMemo(() => {
    // Cas 1 : Si skills est un tableau personnalisé de catégories
    if (Array.isArray(skills)) {
      return skills.map((group, idx) => ({
        id: `skill-group-${idx}`,
        category: group?.category || 'Compétences',
        items: Array.isArray(group?.items) ? group.items : [],
      }));
    }

    // Cas 2 : Catégories éditoriales Glass Studio à partir des compétences documentées
    const glassStudioSkills = [
      {
        id: 'scenography',
        category: 'Scénographie & 3D',
        items: [
          'Scénographie événementielle & Stands (> 150 m²)',
          'Signalétique & Habillage d\'espaces',
          'Parcours visiteurs & Salons européens',
          'Coordination prestataires techniques'
        ]
      },
      {
        id: 'motion',
        category: 'Motion & Vidéo',
        items: [
          'Adobe After Effects (Animations & Boucles LED)',
          'Adobe Premiere Pro (Montage & Titrages)',
          'Production vidéo & Captations de terrain',
          'Direction de contenus audiovisuels'
        ]
      },
      {
        id: 'art-direction',
        category: 'Direction Artistique & UI',
        items: [
          'Direction artistique & Identité de marque',
          'Adobe Illustrator (Design vectoriel, chartes)',
          'Adobe Photoshop (Retouche photo, compositing)',
          'Adobe InDesign (Édition, fiches techniques, print)',
          'Figma (Design system & Ergonomie d\'interfaces)'
        ]
      },
      {
        id: 'tools-tech',
        category: 'Outils & Tech',
        items: [
          'Suite Adobe Creative Cloud',
          'Figma UI/UX',
          'Intelligence Artificielle (ChatGPT, Claude, Gemini)',
          'Supports commerciaux & Sales Enablement'
        ]
      }
    ];

    return glassStudioSkills;
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
          3. EXPÉRIENCE CENTRALE : HORNETSECURITY (HIGHLIGHT MAJEUR)
          (Point central du parcours avec 3 piliers de réalisation documentés)
         ======================================================== */}
      <section id="experiences" className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-12">
        
        {/* En-tête de section sobre et éditorial */}
        <div className="border-t border-zinc-200/80 pt-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200/80 text-xs font-semibold text-[#09090B] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-600">
              Parcours professionnel · Direction &amp; Réalisations
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#09090B] leading-[1.15]">
            Expérience internationale &amp; créativité opérationnelle
          </h2>

          <p className="text-base sm:text-lg text-[#52525B] max-w-3xl leading-relaxed">
            De la stratégie de marque employeur jusqu'à la scénographie de stands d'exposition (&gt; 150 m²) et la création vidéo de terrain pour des événements européens.
          </p>
        </div>

        {/* ========================================================
            CARTE ÉDITORIALE MAJEURE : HORNETSECURITY (CDI)
            (Design System ROOM241 : fond satiné, bordures ultra-fines, typographie hiérarchisée, zéro aplat criard)
           ======================================================== */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-zinc-50/90 backdrop-blur-xl border border-zinc-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-10 transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] group">
          
          {/* Ligne d'en-tête de l'expérience */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-zinc-200/60 pb-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950 text-white text-xs font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)] animate-pulse" />
                  <span>Highlight • Expérience majeure CDI</span>
                </span>
                <span className="text-xs font-mono font-semibold text-zinc-700 bg-white px-3 py-1 rounded-full border border-zinc-200/70 shadow-2xs">
                  Septembre 2025 – Octobre 2026
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090B] tracking-tight">
                  Graphic Designer &amp; Brand Production
                </h3>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-sm sm:text-base font-semibold text-zinc-800">
                  <span className="text-zinc-950 font-bold">Hornetsecurity by Proofpoint</span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                    Leader européen de la cybersécurité Cloud
                  </span>
                </div>
              </div>
            </div>

            {/* Badges géographiques et linguistiques */}
            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-800 bg-white px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs w-fit">
                <MapPin className="w-3.5 h-3.5 text-[#FFAD00]" />
                <span>Lille • Salons européens (Nuremberg, Hanovre)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 bg-white/80 px-3 py-1 rounded-full border border-zinc-200/60 w-fit">
                <span>Équipe design internationale • Travail quotidien en anglais</span>
              </span>
            </div>
          </div>

          {/* Contexte éditorial fluide */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-4xl">
              Au sein du leader européen de la cybersécurité Cloud, évolution au sein d'une équipe design internationale basée principalement en Allemagne : conception d'espaces événementiels à fort enjeu, direction graphique de supports publicitaires de performance et coordination quotidienne en anglais avec les partenaires scéniques.
            </p>
          </div>

          {/* Repères chiffrés et chronologiques — Style Studio Minimaliste */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
            <div className="space-y-1 p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#09090B] tracking-tight block">
                &gt; 150 m²
              </span>
              <span className="text-xs font-bold text-zinc-900 block">Stand au Zénith</span>
              <span className="text-[11px] text-[#71717A] leading-tight block">
                Forum InCyber (FIC) à Lille Grand Palais
              </span>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#09090B] tracking-tight block">
                4 000+
              </span>
              <span className="text-xs font-bold text-zinc-900 block">Contacts enregistrés</span>
              <span className="text-[11px] text-[#71717A] leading-tight block">
                Résultat collectif sur stand
              </span>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#09090B] tracking-tight block">
                36 h
              </span>
              <span className="text-xs font-bold text-zinc-900 block">Design Sprint autonome</span>
              <span className="text-[11px] text-[#71717A] leading-tight block">
                Siège à Hanovre, Allemagne
              </span>
            </div>

            <div className="space-y-1 p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#09090B] tracking-tight block">
                Europe
              </span>
              <span className="text-xs font-bold text-zinc-900 block">Lille, Nuremberg, Hanovre</span>
              <span className="text-[11px] text-[#71717A] leading-tight block">
                Équipe internationale (Anglais)
              </span>
            </div>
          </div>

          {/* Les 3 Piliers de Réalisation documentés */}
          <div className="space-y-5 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                Trois piliers d'intervention documentés
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pilier 01 : Scénographie événementielle */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-4 flex flex-col justify-between hover:border-zinc-300 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#FFAD00] tracking-wider">
                      01 / Scénographie
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      Stands &gt; 150 m²
                    </span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                    Scénographie événementielle &amp; orientation des flux
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Conception graphique et signalétique des stands pour les salons européens (dont le stand de plus de 150 m² au Forum InCyber au Zénith de Lille avec accès Grand Palais, ainsi qu'à it-sa Nuremberg). Traitement de l'espace, hiérarchie de l'information et coordination avec les prestataires techniques pour une orientation fluide des visiteurs professionnels.
                  </p>
                </div>

                {/* Miniature in situ cliquable vers la lightbox */}
                <div
                  onClick={() => setLightboxIndex(12)}
                  role="button"
                  tabIndex={0}
                  className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-200/80 bg-zinc-950 cursor-pointer group shadow-2xs mt-2"
                >
                  <img
                    src="/assets/hornetsecurity/fic/Stand/IMG20250401075301.jpg"
                    alt="Vue plongeante du stand Hornetsecurity > 150 m² au FIC (Zénith de Lille)"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
                    <span className="font-medium truncate drop-shadow">Stand 150 m² au Zénith (accès Grand Palais)</span>
                    <span className="font-mono text-[10px] text-white/80 shrink-0 ml-1">Agrandir ↗</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200/50 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <span>Résultat collectif : plus de 4 000 contacts B2B enregistrés sur l'événement.</span>
                </div>
              </div>

              {/* Pilier 02 : Motion design et vidéo */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-4 flex flex-col justify-between hover:border-zinc-300 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#FFAD00] tracking-wider">
                      02 / Motion Design
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      After Effects 1080p
                    </span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                    Animation de l'arche vidéo LED d'accueil
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Conception et réalisation sur Adobe After Effects de l’animation vidéo diffusée sur l'arche vidéo d'accueil à l’entrée du stand. Cette boucle dynamique accompagnait la transition de co-branding « HORNETSECURITY FORMERLY Vade », captivait le regard des flux visiteurs et scénarisait l'entrée sur le stand.
                  </p>
                </div>

                {/* Miniature After Effects cliquable vers la lightbox */}
                <div
                  onClick={() => setLightboxIndex(13)}
                  role="button"
                  tabIndex={0}
                  className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-200/80 bg-zinc-950 cursor-pointer group shadow-2xs mt-2"
                >
                  <img
                    src="/assets/hornetsecurity/arch_back_motion.png"
                    alt="Rendu After Effects 1080p de l'animation de l'arche LED"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
                    <span className="font-medium truncate drop-shadow">Rendu After Effects 1080p 60fps</span>
                    <span className="font-mono text-[10px] text-white/80 shrink-0 ml-1">Agrandir ↗</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200/50 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <span>Boucle 60 fps synchronisée pour un impact visuel direct dès l'accueil.</span>
                </div>
              </div>

              {/* Pilier 03 : Création et expérimentation */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-4 md:col-span-2 hover:border-zinc-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#FFAD00] tracking-wider">
                    03 / Création &amp; Expérimentation
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Hanovre · Scène plénière
                  </span>
                </div>
                <h5 className="text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                  Design Sprint de 36 h à Hanovre &amp; Incarnation de marque sur scène
                </h5>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-4xl">
                  Participation active au Design Sprint de 36 heures en Allemagne au sein de l'équipe internationale : développement narratif, univers cyber et modélisation 3D du personnage dans un cadre temporel strict. En complément, incarnation en costume du personnage Captain Security sur la grande scène plénière du FIC et dans les allées, créant une passerelle directe et humaine entre la marque et le public professionnel.
                </p>
                <div className="pt-2 border-t border-zinc-200/50 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <span>Distinction claire : travail d'équipe collectif international et contribution personnelle en création de contenus et animation de terrain.</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================
            EXPÉRIENCE PRÉCÉDENTE : HORNETSECURITY / VADE (ALTERNANCE)
           ======================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-5 transition-all duration-300 hover:bg-white/90 hover:border-zinc-300/60 hover:shadow-md hover:shadow-zinc-950/[0.05]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/50 pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                Alternance Master · 2 ans
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950 mt-0.5">
                Chargé de marque employeur — Vade, puis Hornetsecurity
              </h3>
            </div>
            <div className="flex flex-col sm:items-end">
              <span className="text-xs font-semibold text-zinc-800 bg-white px-3 py-1 rounded-full border border-zinc-200/60 w-fit">
                Septembre 2023 – Août 2025
              </span>
              <span className="text-[11px] text-zinc-400 font-mono mt-1">
                Métropole Européenne de Lille
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Accompagnement de la transition d'identité suite au rachat de Vade par Hornetsecurity, en lien direct avec les équipes RH et communication.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-zinc-600">
            <div className="space-y-1.5 p-4 rounded-xl bg-white/60 border border-zinc-200/40">
              <h4 className="text-xs font-bold text-zinc-950">
                Attractivité &amp; Recrutement tech
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Campagnes de communication pour attirer des profils techniques pointus (ingénieurs en détection de menaces, développeurs).
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-white/60 border border-zinc-200/40">
              <h4 className="text-xs font-bold text-zinc-950">
                Employee Advocacy sur LinkedIn
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Structuration du programme d'ambassadeurs internes et accompagnement individuel des collaborateurs pour valoriser leur prise de parole.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-white/60 border border-zinc-200/40">
              <h4 className="text-xs font-bold text-zinc-950">
                Vidéos internes &amp; Séminaires
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Production de vidéos d'onboarding, kits de communication et organisation des séminaires d'intégration post-acquisition.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            AUTRES EXPÉRIENCES : STUDIO ROOM241 (FREELANCE) & SENCROP
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-3xl bg-zinc-50/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFAD00]">
                Activité indépendante
              </span>
              <span className="text-xs font-semibold text-zinc-700 bg-white px-2.5 py-0.5 rounded border border-zinc-200/60">
                Depuis Octobre 2024
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-950">
              Studio ROOM241 — Communication &amp; Design
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Accompagnement de projets reliant réflexion stratégique, création graphique et production de terrain : campagne Fresh Data Ulule validée à 116 % et formalisation de l'identité de Résin'Architecte avec 8 chantiers documentés.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                Stage conventionné
              </span>
              <span className="text-xs font-semibold text-zinc-700 bg-white px-2.5 py-0.5 rounded border border-zinc-200/60">
                Lille
              </span>
            </div>
            <h4 className="text-base font-bold text-zinc-950">
              Sencrop — Community Management
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Entreprise européenne de stations météo connectées et d'agriculture de précision : gestion de communauté, déclinaison de visuels digitaux et participation au planning éditorial.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================
          4. FORMATION ACADÉMIQUE STRUCTURÉE (SOBRE & SANS BADGE SSI)
         ======================================================== */}
      <section id="formation" className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8">
        <div className="border-t border-zinc-200/80 pt-10 space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#FFAD00]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
              Formation académique
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            Double cursus scientifique et stratégique
          </h2>
          <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
            L'alliance entre la structure de pensée cartésienne d'un parcours scientifique initial et la vision stratégique de marque développée en école de communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Master ISEG */}
          <div className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
            <span className="font-mono text-xs font-bold text-zinc-950 block">
              2023 — 2025 · Cérémonie 2026
            </span>
            <h3 className="text-base font-bold text-zinc-950 leading-snug">
              Master Marketing, communication et digital
            </h3>
            <p className="text-xs font-semibold text-zinc-600">ISEG Lille</p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Vision stratégique globale, positionnement concurrentiel, architecture de marque, direction de campagnes et pilotage de projets de communication digitaux et événementiels.
            </p>
          </div>

          {/* Sciences de l'Ingénieur */}
          <div className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
            <span className="font-mono text-xs font-bold text-zinc-950 block">
              Mention Bien · 2020
            </span>
            <h3 className="text-base font-bold text-zinc-950 leading-snug">
              Sciences de l'Ingénieur
            </h3>
            <p className="text-xs font-semibold text-zinc-600">Parcours scientifique initial</p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Formation scientifique axée sur la méthode, la résolution logique de problèmes, la modélisation et la rigueur dans la gestion des contraintes techniques.
            </p>
          </div>

          {/* BAFA */}
          <div className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
            <span className="font-mono text-xs font-bold text-zinc-950 block">
              2019
            </span>
            <h3 className="text-base font-bold text-zinc-950 leading-snug">
              Brevet d'Aptitude aux Fonctions d'Animateur (BAFA)
            </h3>
            <p className="text-xs font-semibold text-zinc-600">Animation &amp; Dynamique de groupe</p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Sens du collectif, prise de parole en public, écoute active, animation de groupe et pédagogie opérationnelle en situation réelle.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================
          5. COMPLÉMENTS DE PARCOURS : MARATHON DE VENISE & RIGUEUR
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="p-7 sm:p-10 md:p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-2">
              <div
                onClick={() => setLightboxIndex(14)}
                role="button"
                tabIndex={0}
                aria-label="Agrandir la photographie du Marathon de Venise"
                className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 cursor-pointer group shadow-sm relative"
              >
                <img
                  src={athleticProof.image}
                  alt={marathonPhoto.alt}
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                  <span className="font-medium truncate drop-shadow">Venise, Italie</span>
                  <span className="font-mono text-[10px] text-white/80 shrink-0">Agrandir ↗</span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 text-center">
                {marathonPhoto.caption}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                <Compass className="w-4 h-4" />
                <span>Endurance &amp; Rigueur personnelle</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                Le Marathon de Venise : La discipline de l'effort continu
              </h3>

              <p className="text-sm text-zinc-600 leading-relaxed">
                Courir un marathon en 2 h 48 min 25 s, c’est surtout des mois d’entraînement, des sorties par tous les temps et beaucoup de régularité. Il faut apprendre à gérer son effort, à tenir son allure et à continuer même quand les jambes commencent à peser.
              </p>

              <p className="text-sm text-zinc-600 leading-relaxed">
                J’y retrouve quelque chose qui me parle aussi dans la création : avancer avec méthode, accepter que tout ne se passe pas comme prévu et rester concentré jusqu’au bout. Le résultat compte, bien sûr, mais il représente surtout tout le travail réalisé en amont.
              </p>

              <div className="pt-2 grid grid-cols-3 gap-3 border-t border-zinc-200/60 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px]">Épreuve</span>
                  <span className="font-bold text-zinc-950">{athleticProof.event}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">Distance</span>
                  <span className="font-bold text-zinc-950">{athleticProof.distance}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">Chrono officiel</span>
                  <span className="font-semibold text-zinc-950 font-sans tabular-nums">{athleticProof.officialChrono}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          6. COMPÉTENCES OPÉRATIONNELLES & STACK TECHNIQUE (TAGS GLASS STUDIO)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8">
        <div className="border-t border-zinc-200/80 pt-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
              Compétences &amp; Stack logicielle
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            Capacités d'exécution autonome
          </h2>
          <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Organisation des compétences clés mobilisées au quotidien dans la conception graphique, le motion design et les projets de marque.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeSkillGroups.map((skillGroup) => (
            <div
              key={skillGroup.id}
              className="p-6 sm:p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-4 hover:bg-white/90 hover:border-zinc-300/60 hover:shadow-md hover:shadow-zinc-950/[0.05] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950">
                    {skillGroup.category}
                  </h3>
                </div>

                {/* Tags discrets Glass Studio */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {skillGroup.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/60 border border-zinc-200/50 text-xs font-medium text-zinc-700 backdrop-blur-sm shadow-2xs hover:bg-white transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. SECTION ÉDITORIALE CV SYNTHÉTIQUE (GLASS DESIGN)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pb-8">
        <div className="p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-white/75 border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                Document de synthèse
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Consulter mon CV synthétique
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Consultez et téléchargez la version condensée de mon parcours professionnel, mes compétences logicielles et mes diplômes académiques dans une mise en page claire et imprimable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white text-xs font-bold hover:bg-zinc-800 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-zinc-200/90 bg-white text-zinc-950 text-xs font-semibold hover:border-[#FFAD00] transition-colors"
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
