import React, { useState } from 'react';
import { Mail, Phone, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profile';

export default function FooterContact({ navigate }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { identity } = profileData;

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(identity.links.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch (e) {
      // Fallback
    }
  };

  const handleCopyPhone = () => {
    try {
      navigator.clipboard.writeText(identity.links.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch (e) {
      // Fallback
    }
  };

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  return (
    <footer
      id="contact"
      className="relative py-20 sm:py-28 pb-48 sm:pb-52 bg-gradient-to-b from-white via-zinc-50/70 to-zinc-100/50 dark:from-[#0B0A09] dark:via-zinc-950 dark:to-black text-[#09090B] dark:text-[#EDEDED] border-t border-zinc-200/80 dark:border-white/10 scroll-mt-16 overflow-hidden transition-colors duration-300"
    >
      {/* Lueur d'ambiance feutrée en arrière-plan */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#FFAD00]/5 via-amber-50/5 to-transparent rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-16">
        
        {/* Composition éditoriale en 2 colonnes équilibrées */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Colonne Gauche : Présentation, posture et disponibilité avec dégagement sécurisé */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#121214] backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.85)] animate-pulse" />
              <span>{identity.brand} • {identity.name}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#09090B] dark:text-white leading-[1.12]">
              Parlons de votre projet
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] dark:text-zinc-300 leading-relaxed max-w-lg">
              Je suis disponible pour échanger sur vos projets de communication, vos événements professionnels ou une opportunité en design graphique.
            </p>
          </div>

          {/* Colonne Droite : 3 Cartes de coordonnées directes en Floating Glass Design */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Carte Email */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/80 hover:bg-white dark:bg-[#121214] dark:hover:bg-[#18181b] backdrop-blur-2xl border border-zinc-200/80 hover:border-[#FFAD00]/60 dark:border-zinc-800 dark:hover:border-[#FFAD00]/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(255,173,0,0.08)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-[#FFAD00] transition-all">
                  <Mail className="w-5 h-5 text-[#FFAD00] group-hover:text-black transition-colors" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
                    Email direct
                  </span>
                  <a
                    href={`mailto:${identity.links.email}`}
                    className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-100 hover:text-[#FFAD00] transition-colors break-all"
                  >
                    {identity.links.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <a
                  href={`mailto:${identity.links.email}`}
                  className="px-4 py-2 min-h-[44px] rounded-full bg-[#09090B] hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border dark:border-zinc-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <span>Écrire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 min-h-[44px] rounded-full bg-white hover:bg-zinc-100 dark:bg-zinc-800/90 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-medium border border-zinc-200 dark:border-zinc-700 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
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
            <div className="p-5 sm:p-6 rounded-2xl bg-white/80 hover:bg-white dark:bg-[#121214] dark:hover:bg-[#18181b] backdrop-blur-2xl border border-zinc-200/80 hover:border-[#FFAD00]/60 dark:border-zinc-800 dark:hover:border-[#FFAD00]/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(255,173,0,0.08)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/90 dark:border-zinc-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-zinc-950 dark:group-hover:bg-zinc-700 transition-all">
                  <Phone className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
                    Téléphone professionnel
                  </span>
                  <a
                    href={`tel:${identity.links.phone}`}
                    className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-100 hover:text-[#FFAD00] transition-colors break-words"
                  >
                    {identity.links.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <a
                  href={`tel:${identity.links.phone}`}
                  className="px-4 py-2 min-h-[44px] rounded-full bg-[#09090B] hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border dark:border-zinc-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <span>Appeler</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3.5 py-2 min-h-[44px] rounded-full bg-white hover:bg-zinc-100 dark:bg-zinc-800/90 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-medium border border-zinc-200 dark:border-zinc-700 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
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
            <div className="p-5 sm:p-6 rounded-2xl bg-white/80 hover:bg-white dark:bg-[#121214] dark:hover:bg-[#18181b] backdrop-blur-2xl border border-zinc-200/80 hover:border-[#FFAD00]/60 dark:border-zinc-800 dark:hover:border-[#FFAD00]/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(255,173,0,0.08)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-[#0A66C2] transition-all">
                  <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
                    Profil LinkedIn
                  </span>
                  <a
                    href={identity.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-100 hover:text-[#FFAD00] transition-colors break-all"
                  >
                    {identity.links.linkedinDisplay}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 min-h-[44px] rounded-full bg-[#09090B] hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border dark:border-zinc-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <span>Consulter le profil</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 5 entrées de navigation du pied de page & Copyright sobre (centré sur mobile, aligné aux bords sur desktop) */}
        <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400 w-full">
          <nav className="w-full md:w-auto flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-center" aria-label="Navigation pied de page">
            <a
              href="/"
              onClick={handleNav('/')}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors py-1"
            >
              Accueil
            </a>
            <a
              href="/projets"
              onClick={handleNav('/projets')}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors py-1"
            >
              Projets
            </a>
            <a
              href="/parcours"
              onClick={handleNav('/parcours')}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors py-1"
            >
              Parcours
            </a>
            <a
              href="/hors-cadre"
              onClick={handleNav('/hors-cadre')}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors py-1 flex items-center gap-1 text-[#FFAD00]"
            >
              <span>Au-delà du travail</span>
            </a>
            <a
              href="/mentions-legales"
              onClick={handleNav('/mentions-legales')}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors py-1"
            >
              Mentions légales
            </a>
            <a
              href="/politique-de-confidentialite"
              onClick={handleNav('/politique-de-confidentialite')}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors py-1"
            >
              Politique de confidentialité
            </a>
          </nav>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 text-xs text-zinc-500 dark:text-zinc-400 text-center md:text-right">
            <a
              href="/"
              onClick={handleNav('/')}
              className="inline-flex items-center opacity-85 hover:opacity-100 transition-opacity"
              aria-label="Retour à l'accueil ROOM241"
            >
              <img
                src="/assets/logos/430x95_Framer_Black@4x.png"
                alt="ROOM241"
                className="h-4 sm:h-5 w-auto object-contain dark:hidden"
                loading="lazy"
              />
              <img
                src="/assets/logos/430x95_Framer_white@4x.png"
                alt="ROOM241"
                className="h-4 sm:h-5 w-auto object-contain hidden dark:block"
                loading="lazy"
              />
            </a>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
            <span>© 2026 {identity.brand} • {identity.name}. Tous droits réservés.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
