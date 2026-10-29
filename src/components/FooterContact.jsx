import React, { useState } from 'react';
import { Mail, Phone, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profile';

export default function FooterContact({ navigate }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { identity } = profileData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(identity.links.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  return (
    <footer
      id="contact"
      className="relative py-20 sm:py-28 pb-28 sm:pb-24 bg-gradient-to-b from-white via-zinc-50/50 to-white text-[#09090B] border-t border-zinc-200/80 scroll-mt-16 overflow-hidden"
    >
      {/* Halo ambré doux d'ambiance en arrière-plan */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FFAD00]/8 via-amber-100/5 to-transparent rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-sky-100/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-16">
        
        {/* Composition éditoriale en 2 colonnes équilibrées */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Colonne Gauche : Présentation, posture et disponibilité */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 text-xs font-semibold text-zinc-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)] animate-pulse" />
              <span>{identity.brand} • {identity.name}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#09090B] leading-[1.12]">
              Échangeons sur vos projets &amp; opportunités
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-lg">
              Disponible pour échanger sur vos besoins en direction artistique, scénographie événementielle, création de marque ou sur un poste en design graphique.
            </p>

            {/* Badges de réassurance et disponibilité */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-zinc-700 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                <span>Disponible immédiatement • Lille &amp; Hybride</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 bg-zinc-100/80 px-3 py-1.5 rounded-full border border-zinc-200/60">
                <span>⏱ Réponse sous 24h ouvrées</span>
              </span>
            </div>
          </div>

          {/* Colonne Droite : 3 Cartes de coordonnées directes en Floating Glass Design */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Carte Email */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-xl border border-zinc-200/80 hover:border-[#FFAD00]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-[#FFAD00]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    Email direct
                  </span>
                  <a
                    href={`mailto:${identity.links.email}`}
                    className="text-base sm:text-lg font-bold text-zinc-950 hover:text-[#FFAD00] transition-colors break-all"
                  >
                    {identity.links.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 pl-14 sm:pl-0">
                <a
                  href={`mailto:${identity.links.email}`}
                  className="px-4 py-2 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <span>Écrire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="Copier l'adresse email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Carte Téléphone */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-xl border border-zinc-200/80 hover:border-[#FFAD00]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-zinc-700" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    Téléphone professionnel
                  </span>
                  <a
                    href={`tel:${identity.links.phone}`}
                    className="text-base sm:text-lg font-bold text-zinc-950 hover:text-[#FFAD00] transition-colors"
                  >
                    {identity.links.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 pl-14 sm:pl-0">
                <a
                  href={`tel:${identity.links.phone}`}
                  className="px-4 py-2 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <span>Appeler</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="Copier le numéro de téléphone"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Carte LinkedIn */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-xl border border-zinc-200/80 hover:border-[#FFAD00]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    Profil LinkedIn
                  </span>
                  <a
                    href={identity.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-bold text-zinc-950 hover:text-[#FFAD00] transition-colors"
                  >
                    {identity.links.linkedinDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 pl-14 sm:pl-0">
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <span>Consulter le profil</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 5 entrées de navigation du pied de page & Copyright sobre (avec padding de sécurité pour Kuro) */}
        <div className="pt-8 border-t border-zinc-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-600 pl-20 sm:pl-24">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2" aria-label="Navigation pied de page">
            <a
              href="/"
              onClick={handleNav('/')}
              className="hover:text-zinc-950 transition-colors"
            >
              Accueil
            </a>
            <a
              href="/projets"
              onClick={handleNav('/projets')}
              className="hover:text-zinc-950 transition-colors"
            >
              Projets
            </a>
            <a
              href="/parcours"
              onClick={handleNav('/parcours')}
              className="hover:text-zinc-950 transition-colors"
            >
              Parcours
            </a>
            <a
              href="/mentions-legales"
              onClick={handleNav('/mentions-legales')}
              className="hover:text-zinc-950 transition-colors"
            >
              Mentions légales
            </a>
            <a
              href="/politique-de-confidentialite"
              onClick={handleNav('/politique-de-confidentialite')}
              className="hover:text-zinc-950 transition-colors"
            >
              Politique de confidentialité
            </a>
          </nav>

          <div className="text-xs text-zinc-400 font-mono">
            <span>© 2026 {identity.brand} • {identity.name}. Tous droits réservés.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
