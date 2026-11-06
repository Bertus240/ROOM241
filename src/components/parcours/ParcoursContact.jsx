import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export default function ParcoursContact({ onOpenCvModal }) {
  return (
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
            Consultez et téléchargez la version condensée de mon parcours, mes compétences logicielles et mes diplômes académiques dans une mise en page claire et imprimable.
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
  );
}

