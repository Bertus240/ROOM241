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
      className="py-16 sm:py-24 pb-24 sm:pb-20 bg-white text-[#09090B] border-t border-zinc-200/80 scroll-mt-16"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-14">
        
        {/* Composition éditoriale en 2 colonnes équilibrées */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Colonne Gauche : Présentation, posture et disponibilité */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-[#52525B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
              <span>{identity.brand} • {identity.name}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B] leading-[1.12]">
              Échangeons sur vos projets &amp; opportunités
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Disponible pour échanger sur vos besoins en direction artistique, scénographie événementielle, création de marque ou sur un poste en design graphique.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 bg-zinc-50 px-3.5 py-1.5 rounded-full border border-zinc-200/70">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                <span>Disponible immédiatement • Lille, Métropole &amp; Hybride</span>
              </span>
            </div>
          </div>

          {/* Colonne Droite : 3 Cartes de coordonnées directes et actions */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* Carte Email */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 hover:bg-zinc-50 border border-zinc-200/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  Email direct
                </span>
                <a
                  href={`mailto:${identity.links.email}`}
                  className="text-base font-bold text-zinc-950 hover:text-[#FFAD00] transition-colors break-all"
                >
                  {identity.links.email}
                </a>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`mailto:${identity.links.email}`}
                  className="px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Écrire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
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
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 hover:bg-zinc-50 border border-zinc-200/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  Téléphone professionnel
                </span>
                <a
                  href={`tel:${identity.links.phone}`}
                  className="text-base font-bold text-zinc-950 hover:text-[#FFAD00] transition-colors"
                >
                  {identity.links.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${identity.links.phone}`}
                  className="px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Appeler</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
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
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 hover:bg-zinc-50 border border-zinc-200/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  Profil LinkedIn
                </span>
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-zinc-950 hover:text-[#FFAD00] transition-colors"
                >
                  {identity.links.linkedinDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
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
