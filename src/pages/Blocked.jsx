import React, { useState } from 'react';

const translations = {
  en: {
    badge: '403 Something went wrong',
    title: "Oops, this page isn't available right now.",
    description: "Something went wrong while trying to load this page. You can still get in touch with me using the links below.",
    note: "Want to discuss a project or explore a creative collaboration?",
    linkedin: "View LinkedIn profile ↗",
    email: "Send an email",
    footer: "Studio ROOM241 • Rémi Brocart"
  },
  fr: {
    badge: '403 Une erreur est survenue',
    title: 'Oups, cette page est momentanément indisponible.',
    description: "Un problème est survenu lors du chargement de cette page. Vous pouvez toujours me contacter grâce aux liens ci-dessous.",
    note: "Vous souhaitez discuter d'un projet ou explorer une collaboration créative ?",
    linkedin: "Voir le profil LinkedIn ↗",
    email: "Envoyer un e-mail",
    footer: "Studio ROOM241 • Rémi Brocart"
  }
};

export default function Blocked() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col justify-between items-center p-6 sm:p-8 font-sans antialiased relative selection:bg-[#FFAD00] selection:text-black">
      {/* Halo ambré doux */}
      <div 
        aria-hidden="true" 
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-[#FFAD00]/8 to-transparent blur-3xl pointer-events-none"
      />

      {/* Header bar avec logo officiel */}
      <header className="w-full max-w-xl flex items-center justify-between z-10 py-1">
        <a href="/" className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]" aria-label="Studio ROOM241">
          <img
            src="/assets/logos/430x95_Framer_Black@4x.png"
            alt="Studio ROOM241"
            className="h-7 sm:h-8 w-auto object-contain"
            loading="eager"
          />
        </a>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-mono text-zinc-600 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)] animate-pulse" />
          <span>{t.badge}</span>
        </div>
      </header>

      {/* Main container */}
      <main className="w-full max-w-lg my-auto py-8 flex flex-col items-center text-center z-10 space-y-6">
        {/* Kuro Avatar 72px */}
        <div className="relative w-20 h-20 flex items-center justify-center select-none" aria-hidden="true">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#FFAD00]/20 to-transparent blur-md" />
          <div className="relative w-[72px] h-[72px] rounded-full bg-[#09090B] flex items-center justify-center shadow-[0_14px_28px_-6px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.8)] border border-white/20 animate-[pulse_4.8s_ease-in-out_infinite]">
            <div className="flex items-center gap-2.5 -translate-y-0.5">
              <div className="w-3.5 h-4.5 rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="w-2 h-2.5 rounded-full bg-[#09090B] relative">
                  <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
              <div className="w-3.5 h-4.5 rounded-full bg-white flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="w-2 h-2.5 rounded-full bg-[#09090B] relative">
                  <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sélecteur de langue EN / FR */}
        <div className="inline-flex items-center p-1 bg-zinc-100 rounded-full border border-zinc-200/80 shadow-inner" role="group" aria-label="Language / Langue">
          <button
            type="button"
            lang="en"
            aria-pressed={lang === 'en'}
            onClick={() => setLang('en')}
            className={`px-3.5 py-1 text-xs font-mono font-semibold rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] ${
              lang === 'en'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            lang="fr"
            aria-pressed={lang === 'fr'}
            onClick={() => setLang('fr')}
            className={`px-3.5 py-1 text-xs font-mono font-semibold rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] ${
              lang === 'fr'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            FR
          </button>
        </div>

        {/* Message neutre */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-md mx-auto">
            {t.description}
          </p>
          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed max-w-sm mx-auto">
            {t.note}
          </p>
        </div>

        {/* CTAs de contact direct */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-2">
          <a
            href="https://www.linkedin.com/in/remibrocart"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 min-h-[46px] px-6 py-2.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            {t.linkedin}
          </a>
          <a
            href="mailto:brocart.remi02@gmail.com"
            className="w-full sm:w-auto flex-1 min-h-[46px] px-6 py-2.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-all shadow-xs hover:shadow-sm active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            {t.email}
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-zinc-400 font-mono py-2 z-10">
        {t.footer}
      </footer>
    </div>
  );
}
