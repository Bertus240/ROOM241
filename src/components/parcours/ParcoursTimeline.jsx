import React from 'react';
import { MapPin, Maximize2 } from 'lucide-react';
import StatGroup from '../StatGroup';

const HORNET_TIMELINE_STATS = [
  {
    value: '> 150 m²',
    label: "Stand d'exposition FIC",
    description: "Scénographie et modélisation 3D à Lille Grand Palais",
    attribution: "Conception visuelle"
  },
  {
    value: '4 000+',
    label: "Contacts B2B enregistrés",
    description: "Volume recueilli sur le stand par l'équipe commerciale",
    attribution: "Bilan collectif FIC"
  },
  {
    value: '36 h',
    label: "Design Sprint à Hanovre",
    description: "Création graphique de l'héroïne Helix Nova au siège",
    attribution: "Production autonome"
  },
  {
    value: 'Europe',
    label: "Salons & coordination",
    description: "Lille, Nuremberg, Hanovre : collaboration en anglais",
    attribution: "Équipe internationale",
    animated: false
  }
];

export default function ParcoursTimeline({ onOpenLightbox }) {
  return (
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
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-900 bg-white px-3 py-1 rounded-full border border-zinc-200/80 shadow-2xs w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
              <span>Équipe basée à Hanovre • 100 % anglais au quotidien</span>
            </span>
          </div>
        </div>

        {/* Contexte éditorial fluide */}
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-4xl">
            Au sein du leader européen de la cybersécurité Cloud, évolution au sein d'une équipe design internationale basée au siège à Hanovre (Allemagne) avec déplacements réguliers sur place toutes les 6 semaines : conception d'espaces événementiels à fort enjeu, direction graphique de supports de communication et pratique 100 % en anglais au quotidien. Deux opérations de rachat successives (Vade racheté par Hornetsecurity, puis rachat par Proofpoint) ont rythmé cette expérience internationale.
          </p>
        </div>

        {/* Repères chiffrés et chronologiques — Style Studio Minimaliste */}
        <StatGroup stats={HORNET_TIMELINE_STATS} variant="card" size="card" />

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
                onClick={() => onOpenLightbox(12)}
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
                  <span className="font-mono text-[11px] text-white/90 shrink-0 ml-1">Agrandir ↗</span>
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
                onClick={() => onOpenLightbox(13)}
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
                  <span className="font-mono text-[11px] text-white/90 shrink-0 ml-1">Agrandir ↗</span>
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
            Accompagnement de projets reliant réflexion stratégique, création graphique et production de terrain : campagne Fresh Data Ulule validée à 116 % et formalisation de l'identité de Résin'Architecte avec 2 chantiers documentés.
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
  );
}

