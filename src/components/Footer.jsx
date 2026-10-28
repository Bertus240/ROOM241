import React from 'react';

export default function Footer({ navigate }) {
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <footer className="bg-room-bg border-t border-room-border pt-16 pb-12 text-room-muted">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">

        {/* Top Footer Grid */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-room-border">

          {/* Logo officiel Room241 — bascule thème en pur CSS (aucune désynchronisation d'état) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer hover:opacity-80 transition-opacity inline-flex items-center"
            role="button"
            tabIndex={0}
            aria-label="Retour en haut"
          >
            {/* Logo noir pour le thème clair */}
            <img
              src="/430x95_Framer_Black@4x.png"
              alt="ROOM241"
              className="h-6 sm:h-7 w-auto object-contain dark:hidden"
              loading="lazy"
            />
            {/* Logo blanc pour le thème sombre */}
            <img
              src="/430x95_Framer_white@4x.png"
              alt="ROOM241"
              className="h-6 sm:h-7 w-auto object-contain hidden dark:block"
              loading="lazy"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-8 text-sm font-sans text-room-muted">
            <a href="/realisations" onClick={(e) => handleNavClick(e, '/realisations')} className="nav-link hover:text-room-text">Réalisations</a>
            <a href="/approche" onClick={(e) => handleNavClick(e, '/approche')} className="nav-link hover:text-room-text">Approche</a>
            <a href="/offres" onClick={(e) => handleNavClick(e, '/offres')} className="nav-link hover:text-room-text">Offres</a>
            <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="nav-link hover:text-room-text">Contact</a>
          </nav>
        </div>

        {/* Pitch studio */}
        <div className="py-8 border-b border-room-border">
          <p className="text-xs font-sans text-room-muted leading-relaxed max-w-5xl">
            ROOM241 — Studio de direction artistique fondé par Rémi Brocart. Nous concevons les identités visuelles, les scénographies grand format et les contenus de terrain des entreprises B2B qui veulent marquer les esprits.
          </p>
        </div>

        {/* Bottom Legal / Copyright & Disponibilité sobre */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-room-subtle">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 ROOM241</span>
            <span>·</span>
            <span className="text-room-muted">Disponibilité : Prochains créneaux ouverts pour le trimestre en cours</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="/mentions-legales" onClick={(e) => handleNavClick(e, '/mentions-legales')} className="nav-link hover:text-room-text">Mentions Légales</a>
            <a href="/politique-de-confidentialite" onClick={(e) => handleNavClick(e, '/politique-de-confidentialite')} className="nav-link hover:text-room-text">Politique de Confidentialité</a>
            <a
              href="https://www.linkedin.com/in/remibrocart/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link hover:text-room-text"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
