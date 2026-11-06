import React from 'react';
import { Camera, Maximize2 } from 'lucide-react';

export default function ParcoursGallery({ editorialPhotos = [], onOpenLightbox }) {
  if (!editorialPhotos || editorialPhotos.length === 0) return null;

  return (
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
      {editorialPhotos[1] && (
        <div className="space-y-3">
          <div
            onClick={() => onOpenLightbox(1)}
            role="button"
            tabIndex={0}
            aria-label="Agrandir la photographie de Paris"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(1);
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
      )}

      {/* --- SÉQUENCE 2 : Diptyque Minéral & Architecture (Étretat & Rouen voûte) --- */}
      {editorialPhotos[2] && editorialPhotos[3] && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          <div
            onClick={() => onOpenLightbox(2)}
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
            onClick={() => onOpenLightbox(3)}
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
      )}

      {/* --- SÉQUENCE 3 : Diptyque Urbanisme & Nature (Lille Faidherbe & Reflets calmes) --- */}
      {editorialPhotos[4] && editorialPhotos[10] && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          <div
            onClick={() => onOpenLightbox(4)}
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
            onClick={() => onOpenLightbox(10)}
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
      )}

      {/* --- SÉQUENCE 4 : Triptyque Vertical (Gros-Horloge rue, Cathédrale gothique, Piments) --- */}
      {editorialPhotos[6] && editorialPhotos[7] && editorialPhotos[8] && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6">
          
          <div
            onClick={() => onOpenLightbox(6)}
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
            onClick={() => onOpenLightbox(7)}
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
            onClick={() => onOpenLightbox(8)}
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
              <span className="text-[#71717A] text-[11px]">Teinte & matière</span>
            </div>
          </div>

        </div>
      )}

      {/* --- SÉQUENCE 5 : Diptyque Signal nocturne & Cookie pistache --- */}
      {editorialPhotos[5] && editorialPhotos[9] && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          {/* Signal nocturne */}
          <div
            onClick={() => onOpenLightbox(5)}
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
              <span className="text-[#71717A] text-[11px] font-mono">Typographie & Nuit</span>
            </div>
          </div>

          {/* Cookie pistache */}
          <div
            onClick={() => onOpenLightbox(9)}
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
              <span className="text-[#71717A] text-[11px] font-mono">Texture & Matière</span>
            </div>
          </div>

        </div>
      )}

      {/* --- SÉQUENCE 6 : Perspective urbaine & patrimoine (Rouen, Rue Saint-Nicolas) --- */}
      {editorialPhotos[11] && (
        <div className="space-y-3">
          <div
            onClick={() => onOpenLightbox(11)}
            role="button"
            tabIndex={0}
            aria-label="Agrandir la photographie de la rue Saint-Nicolas à Rouen"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(11);
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
      )}

    </section>
  );
}

