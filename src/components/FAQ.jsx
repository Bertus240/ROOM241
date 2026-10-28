import React, { useState } from 'react';
import { Reveal, stagger } from '../lib/motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "Sous quel délai voit-on les premiers livrables ?",
      a: "Dès la fin de la première semaine. On ne passe pas trois mois en phase d'audit théorique : on cale le besoin le lundi et vous avez vos premiers visuels ou montages le vendredi."
    },
    {
      q: "Comment se passent les échanges au quotidien ?",
      a: "En direct, sur Slack ou par message, sans intermédiaire. Quand vous avez une question ou un retour, vous parlez directement avec Rémi. Pas de ticket d'assistance ni de délai de réponse de 4 jours."
    },
    {
      q: "Comment fonctionne l'abonnement mensuel ?",
      a: "C'est un rythme continu : un format pilier livré chaque semaine, décliné pour vos différents canaux. Sans engagement long terme contraignant : vous pouvez suspendre ou ajuster d'un mois sur l'autre selon votre actualité."
    },
    {
      q: "Prenez-vous en charge les sujets très techniques (SaaS, industrie, BTP) ?",
      a: "Oui, c'est notre spécialité. La plupart de nos clients ont un produit complexe que leurs prospects avaient du mal à comprendre. Notre travail consiste justement à décortiquer ce métier pour le rendre limpide et percutant en vidéo, sur un stand ou sur le web."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 border-b border-room-border bg-room-bg">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-mono text-room-muted tracking-wider uppercase font-medium mb-3 block">
              05 / QUESTIONS COURANTES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-room-text leading-[1.1]">
              Ce qu'on nous demande souvent.
            </h2>
          </div>
          <p className="text-room-muted text-base max-w-md font-sans leading-relaxed">
            Des réponses simples sur la manière dont on travaille ensemble.
          </p>
        </Reveal>

        {/* Accordion Container */}
        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal
                key={idx}
                delay={stagger(idx)}
                className="card-lift bg-room-surface border border-room-border rounded-xl"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-room-amber/40"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-room-amber font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-room-text font-sans">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-room-muted shrink-0 transition-transform duration-200 ease-premium ${
                      isOpen ? 'rotate-180 text-room-amber' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="enter-soft px-6 pb-6 pt-2 border-t border-room-border">
                    <p className="text-sm sm:text-base text-room-muted leading-relaxed font-sans pl-8">
                      {faq.a}
                    </p>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

