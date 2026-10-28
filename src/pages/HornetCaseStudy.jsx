import React, { useState } from 'react';
import { Shield, Play, ArrowLeft, ArrowUpRight, Award, CheckCircle2, Users, Globe2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import BadgesCarousel from '../components/BadgesCarousel';

export default function HornetCaseStudy({ navigate }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState('Platinum');

  const partnerBadges = [
    { name: 'Platinum', file: 'Platinum_partner.png', label: 'Platinum Partner' },
    { name: 'Gold', file: 'Gold_partner.png', label: 'Gold Partner' },
    { name: 'Silver', file: 'Silver_partner.png', label: 'Silver Partner' },
    { name: 'Bronze', file: 'Bronze_partner.png', label: 'Bronze Partner' },
    { name: 'OEM', file: 'OEM_partner.png', label: 'OEM Partner' },
    { name: 'VAR', file: 'Value_Added_Reseller.png', label: 'Value Added Reseller' },
    { name: 'VAD', file: 'Value_Added_Distributor.png', label: 'Value Added Distributor' },
  ];

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  return (
    <div className="pt-32 pb-28 space-y-28 sm:space-y-36">

      {/* ========================================================
          EN-TÊTE ÉDITORIAL & CONTEXTE
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={handleNav('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52525B] hover:text-[#09090B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'accueil</span>
            </a>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Étude de cas
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090B] leading-[1.08]">
              Hornetsecurity — Stands événementiels (&gt; 150 m² au FIC), branding et incarnation de marque.
            </h1>
            <p className="text-lg sm:text-xl text-[#52525B] leading-relaxed">
              Trois années d'évolution continue au sein du leader européen de la cybersécurité Cloud, de la marque employeur au design graphique d'espaces événementiels et à l'incarnation de Captain Security sur les scènes internationales.
            </p>
          </div>

          {/* Distinction stricte des deux périodes professionnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
            
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                  Période 1 • Alternance
                </span>
                <span className="text-xs font-semibold text-zinc-900 bg-white px-2.5 py-1 rounded-full border border-zinc-200">
                  Sept 2023 – Août 2025
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#09090B]">
                Chargé de marque employeur (Vade → Hornetsecurity)
              </h2>
              <ul className="text-xs text-[#52525B] space-y-1.5 leading-relaxed">
                <li>• Campagnes d'attractivité RH pour le recrutement de développeurs et ingénieurs cyber.</li>
                <li>• Structuration du programme d'employee advocacy et accompagnement des équipes sur LinkedIn.</li>
                <li>• Organisation logistique des séminaires internes et animation de la culture post-acquisition.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00]">
                  Période 2 • CDI
                </span>
                <span className="text-xs font-semibold text-zinc-900 bg-white px-2.5 py-1 rounded-full border border-zinc-200">
                  Sept 2025 – Octobre 2026
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#09090B]">
                Graphic Designer Junior (Hornetsecurity by Proofpoint)
              </h2>
              <ul className="text-xs text-[#52525B] space-y-1.5 leading-relaxed">
                <li>• Design graphique et habillage de stands événementiels européens (&gt; 150 m²).</li>
                <li>• Coordination avec les prestataires techniques et scénographes internationaux.</li>
                <li>• Création de supports publicitaires (Paid Ads), carrousels comparatifs et fiches solutions.</li>
                <li>• Travail quotidien en anglais au sein d'une équipe principalement allemande.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          ACTE I & II — LE DISPOSITIF ÉVÉNEMENTIEL (> 150 M²) : FORUM INCYBER (FIC 2025)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
            Acte I &amp; II • Scénographie &amp; Dispositif Événementiel
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            InCyber Forum (FIC) 2025 à Lille : Plus de 150 m² d'immersion
          </h2>
          <p className="text-base text-[#52525B] max-w-3xl leading-relaxed">
            Pour le plus grand rassemblement européen de cybersécurité à Lille Grand Palais, le dispositif combinait un stand d'exposition principal et une animation e-karting au Zénith de Lille.
          </p>
        </div>

        {/* Grande image d'ouverture : L'arche lumineuse */}
        <div className="space-y-3">
          <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-sm">
            <img
              src="/assets/hornetsecurity/FIC_photo+videos/Stand/IMG20250401075104.jpg"
              alt="Arche vidéo d'accueil lumineuse Hornetsecurity formerly Vade au Forum InCyber 2025"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#71717A] pt-1">
            <span>Arche vidéo d'accueil « HORNETSECURITY FORMERLY vade » • Totems partenaires</span>
            <span>Lille Grand Palais • 1-3 Avril 2025</span>
          </div>
        </div>

        {/* Triptyque : Affichage urbain Zénith + Couloir e-karting + Vue panoramique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Bâche urbaine Zénith */}
          <div className="space-y-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950">
              <img
                src="/assets/hornetsecurity/FIC_photo+videos/Stand/tmp_8551ceee-de3b-46ec-ba5a-a37cac8e00df.jpeg"
                alt="Affichage urbain géant sur la façade du Zénith de Lille invitant à l'animation e-karting"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs font-semibold text-[#09090B]">
              Affichage urbain grand format — Façade du Zénith
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Bâche extérieure : « Pendant le InCyber Forum, repoussez les limites de la cybersécurité. Venez nous rendre visite au Zénith. » avec visuel 3D du karting.
            </p>
          </div>

          {/* Couloir damier karting */}
          <div className="space-y-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950">
              <img
                src="/assets/hornetsecurity/FIC_photo+videos/Stand/IMG20250401075149.jpg"
                alt="Signalétique événementielle et couloir avec motif damier rouge et noir vers la piste karting"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs font-semibold text-[#09090B]">
              Signalétique directionnelle — Parcours e-karting
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Couloir de transition avec motif drapeau à damier et panneaux directionnels fléchant le flux de décideurs vers l'espace expérientiel.
            </p>
          </div>

          {/* Vue panoramique InCyber */}
          <div className="space-y-3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950">
              <img
                src="/assets/hornetsecurity/FIC_photo+videos/Stand/IMG20250401075301.jpg"
                alt="Vue panoramique en plongée du hall d'exposition InCyber Forum 2025"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs font-semibold text-[#09090B]">
              Perspective globale — Hall d'exposition
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Vue d'ensemble montrant l'envergure du salon, les structures suspendues et la visibilité de la marque au milieu des acteurs internationaux.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================
          ACTE III — L'INCARNATION DE LA MARQUE : CAPTAIN SECURITY
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Acte III • Présence Humaine &amp; Terrain
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Captain Security : Incarner la marque sur scène et dans les allées
          </h2>
          <p className="text-base text-[#52525B] max-w-3xl leading-relaxed">
            Ma relation à la marque ne s'arrête pas aux logiciels de PAO ou aux exports d'imprimerie. Lors des salons internationaux (FIC à Lille, it-sa à Nuremberg), j'ai incarné Captain Security, le héros emblématique de Hornetsecurity.
          </p>
        </div>

        {/* Diptyque Captain Security */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Photo 1 : Sur scène plénière (Format paysage majestueux) */}
          <div className="md:col-span-7 space-y-3">
            <div className="aspect-[16/11] w-full rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-sm">
              <img
                src="/assets/hornetsecurity/FIC_photo+videos/Capain/captain2.jpg"
                alt="Rémi Brocart en Captain Security sur la scène plénière avec les autres mascottes"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-[#09090B]">
                Plénière officielle devant l'écran LED géant
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Présence sur scène aux côtés des mascottes partenaires durant la plénière produit, illustrant l'énergie et la proximité de la marque face aux décideurs.
              </p>
            </div>
          </div>

          {/* Photo 2 : Passerelle terrain (Portrait) */}
          <div className="md:col-span-5 space-y-3">
            <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-sm">
              <img
                src="/assets/hornetsecurity/FIC_photo+videos/Capain/captain.jpeg"
                alt="Rémi Brocart en costume de Captain Security sur la passerelle d'accès du salon InCyber"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-[#09090B]">
                Engagement physique sur les passerelles du salon
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Cape, armure et masque : une incarnation exigeante qui crée une accroche immédiate avec les visiteurs et humanise la communication d'un éditeur tech.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          ACTE IV — SYSTÈMES GRAPHIQUES B2B & DÉCLINAISONS
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
            Acte IV • Systèmes Graphiques &amp; Cohérence de Marque
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Système de badges partenaires &amp; Campagnes d'acquisition
          </h2>
          <p className="text-base text-[#52525B] max-w-3xl leading-relaxed">
            Au-delà de l'événementiel, ma mission de Graphic Designer impliquait la rationalisation de supports B2B clés pour le réseau de distribution international et les campagnes publicitaires.
          </p>
        </div>

        {/* 1. Système de badges partenaires interactif */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-8">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00]">
              Programme Partenaires B2B
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] mt-1">
              Refonte du système de certification des partenaires
            </h3>
            <p className="text-xs sm:text-sm text-[#52525B] mt-1.5 max-w-2xl leading-relaxed">
              Harmonisation de la grille visuelle pour les 7 statuts officiels du programme (niveaux de revente, OEM, intégrateurs à valeur ajoutée et distributeurs).
            </p>
          </div>

          {/* Carrousel visuel horizontal des 7 badges sans texte */}
          <BadgesCarousel />

        </div>

        {/* 2. Campagnes Paid Ads & Carrousels SharePoint / Proofpoint */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Acquisition &amp; Paid Ads
            </span>
            <h3 className="text-2xl font-extrabold text-[#09090B]">
              Campagne comparative Proofpoint vs SharePoint
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Création d'une série de carrousels publicitaires ciblés sur LinkedIn : « The biggest risk in your SharePoint ». Mise en page chirurgicale, contrastes appuyés et vulgarisation de failles de sécurité pour interpeller les DSI et RSSI européens.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#71717A]">
              <span>Formats carrousels 1:1</span>
              <span>•</span>
              <span>Audience B2B européenne</span>
              <span>•</span>
              <span>Anglais natif</span>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 flex items-center justify-center p-3">
            <img
              src="/assets/hornetsecurity/Proofpoint_Sharepoint/1@4x.png"
              alt="Planche publicitaire SharePoint - The biggest risk in your SharePoint"
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>

        </div>

        {/* 3. Encadré sobre : Sprint créatif de 36 heures à Hanovre */}
        <div className="p-8 rounded-3xl bg-white border border-zinc-200/80 space-y-4">
          <div className="flex items-center gap-2 text-[#FFAD00]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Sprint créatif 36 heures chrono • Hanovre
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B]">
            Création d'un personnage 3D et montage d'ouverture de plénière
          </h3>
          <p className="text-sm text-[#52525B] leading-relaxed max-w-3xl">
            Lors d'un séminaire stratégique à Hanovre, j'ai participé à un sprint d'urgence créatif de 36 heures : écriture du script, modélisation et habillage d'un personnage 3D, animation, montage vidéo et livraison pour la plénière de direction. Un défi mené dans des délais extrêmement serrés, démontrant réactivité et maîtrise technique.
          </p>
        </div>

      </section>

      {/* ========================================================
          ACTE V — BILAN COLLECTIF & VIDÉO IMMERSIVE
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
            Acte V • Bilan &amp; Ambiance Terrain
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Dynamisme du stand et résultats collectifs
          </h2>
          <p className="text-base text-[#52525B] max-w-3xl leading-relaxed">
            Selon les données communiquées lors de l'événement, le Forum InCyber 2025 a généré plus de 4 000 leads qualifiés sur les trois jours. Ce résultat collectif témoigne de la puissance combinée de la scénographie, de l'animation e-karting et de la mobilisation des équipes.
          </p>
        </div>

        {/* Lecteur vidéo contrôlé (click-to-play avec poster) */}
        <div className="space-y-3">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-sm">
            {isVideoPlaying ? (
              <video
                src="/assets/hornetsecurity/FIC_photo+videos/Videos/vid4_fic.mp4"
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Lancer la vidéo d'ambiance du stand InCyber 2025"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsVideoPlaying(true);
                  }
                }}
                className="relative w-full h-full cursor-pointer group"
              >
                <img
                  src="/assets/hornetsecurity/FIC_photo+videos/Stand/IMG20250401075104.jpg"
                  alt="Aperçu vidéo du salon Forum InCyber Lille"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35 transition-opacity group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,173,0,0.4)] transition-transform duration-200 group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-0.5 text-black" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-[#71717A] text-center">
            Captation vidéo terrain • Stand et animations Forum InCyber Lille (Click to play)
          </p>
        </div>

        {/* Bouton de navigation vers les autres projets */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
          <a
            href="/"
            onClick={handleNav('/')}
            className="text-xs font-semibold text-[#52525B] hover:text-[#09090B] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à l'accueil</span>
          </a>

          <a
            href="/studio"
            onClick={handleNav('/studio')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <span>Découvrir les projets Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
          </a>
        </div>

      </section>

    </div>
  );
}
