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
      className="py-16 sm:py-24 bg-[#FFFFFF] text-[#09090B] border-t border-zinc-200/70 scroll-mt-16"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
        
        {/* Titre sobre & clair avec identité ROOM241 */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-[#52525B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>{identity.brand} • {identity.name}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Échangeons sur vos projets &amp; opportunités
          </h2>

          <p className="text-sm sm:text-base text-[#52525B] max-w-lg leading-relaxed">
            Disponible pour échanger sur vos besoins en direction artistique, en scénographie événementielle, en création de marque ou sur un poste en design graphique.
          </p>
        </div>

        {/* Coordonnées directes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-zinc-100">
          
          {/* Email */}
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A] block">
              Email
            </span>
            <a
              href={`mailto:${identity.links.email}`}
              className="text-base font-bold text-[#09090B] hover:text-[#FFAD00] transition-colors block break-all"
            >
              {identity.links.email}
            </a>
            <div className="flex items-center gap-3 text-xs pt-1">
              <a
                href={`mailto:${identity.links.email}`}
                className="text-[#52525B] hover:text-black font-medium inline-flex items-center gap-1"
              >
                <span>Écrire</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-zinc-400 hover:text-black inline-flex items-center gap-1 transition-colors"
                title="Copier l'adresse email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Téléphone */}
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A] block">
              Téléphone
            </span>
            <a
              href={`tel:${identity.links.phone}`}
              className="text-base font-bold text-[#09090B] hover:text-[#FFAD00] transition-colors block"
            >
              {identity.links.phoneFormatted}
            </a>
            <div className="flex items-center gap-3 text-xs pt-1">
              <a
                href={`tel:${identity.links.phone}`}
                className="text-[#52525B] hover:text-black font-medium inline-flex items-center gap-1"
              >
                <span>Appeler</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="text-zinc-400 hover:text-black inline-flex items-center gap-1 transition-colors"
                title="Copier le numéro de téléphone"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A] block">
              LinkedIn
            </span>
            <a
              href={identity.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-[#09090B] hover:text-[#FFAD00] transition-colors block"
            >
              {identity.links.linkedinDisplay}
            </a>
            <div className="text-xs pt-1">
              <a
                href={identity.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#52525B] hover:text-black font-medium inline-flex items-center gap-1"
              >
                <span>Consulter le profil</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
            </div>
          </div>

        </div>

        {/* 3 entrées principales de navigation & Copyright sobre */}
        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <nav className="flex items-center gap-6 text-[#52525B]" aria-label="Navigation pied de page">
            <a
              href="/"
              onClick={handleNav('/')}
              className="hover:text-black transition-colors"
            >
              Accueil
            </a>
            <a
              href="/projets"
              onClick={handleNav('/projets')}
              className="hover:text-black transition-colors"
            >
              Projets
            </a>
            <a
              href="/parcours"
              onClick={handleNav('/parcours')}
              className="hover:text-black transition-colors"
            >
              Parcours
            </a>
          </nav>

          <div className="text-xs text-[#71717A]">
            <span>© 2026 {identity.brand} • {identity.name}</span>
          </div>
        </div>

        {/* Bas de page sobre avec localisation */}
        <div className="pt-4 border-t border-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A]">
          <div>
            <span>{identity.location}</span>
          </div>
          <div>
            <span>{identity.role}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
