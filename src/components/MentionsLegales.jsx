import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '../lib/motion';

export default function MentionsLegales({ navigate }) {
  const handleBack = (e) => {
    e.preventDefault();
    if (navigate) navigate('/');
    else window.location.href = '/';
  };

  return (
    <article className="bg-luxe py-16 sm:py-24 border-b border-room-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <a
          href="/"
          onClick={handleBack}
          className="link-arrow inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-room-muted hover:text-room-text transition-colors duration-150 py-2 mb-10"
        >
          <ArrowLeft className="w-4 h-4 text-room-amber" />
          <span>Retour à l'accueil</span>
        </a>

        <Reveal>
          <span className="text-xs font-mono text-room-muted tracking-wider uppercase font-medium mb-3 block">
            Conformité légale
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-room-text leading-[1.1] mb-4">
            Mentions légales.
          </h1>
          <p className="text-xs font-mono text-room-subtle uppercase mb-12">
            Dernière mise à jour : septembre 2026
          </p>
        </Reveal>

        <div className="space-y-10 text-sm sm:text-base font-sans leading-relaxed">
          <Reveal>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              1. Édition du site
            </h2>
            <div className="text-room-muted space-y-2">
              <p>
                <strong className="text-room-text font-semibold">Éditeur :</strong> Studio
                ROOM241 — Rémi Brocart, Entrepreneur Individuel (micro-entreprise).
              </p>
              <p>
                <strong className="text-room-text font-semibold">SIRET :</strong> numéro en
                cours de communication — il sera affiché ici dès sa fourniture. Aucun
                numéro fictif n'est présenté sur cette page.
              </p>
              <p>
                <strong className="text-room-text font-semibold">Siège :</strong> Métropole
                Européenne de Lille (Hauts-de-France), France.
              </p>
              <p>
                <strong className="text-room-text font-semibold">TVA :</strong> TVA non
                applicable, article 293 B du CGI.
              </p>
              <p>
                <strong className="text-room-text font-semibold">Directeur de la
                publication :</strong> Rémi Brocart.
              </p>
              <p>
                <strong className="text-room-text font-semibold">Contact :</strong>{' '}
                <a
                  href="mailto:contact@room241.fr"
                  className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150"
                >
                  contact@room241.fr
                </a>
              </p>
              <p>
                <strong className="text-room-text font-semibold">LinkedIn :</strong>{' '}
                <a
                  href="https://www.linkedin.com/in/remibrocart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150"
                >
                  linkedin.com/in/remibrocart
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              2. Hébergement
            </h2>
            <p className="text-room-muted">
              Ce site est hébergé par <strong className="text-room-text font-semibold">Vercel
              Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              3. Propriété intellectuelle
            </h2>
            <p className="text-room-muted">
              L'ensemble des réalisations, systèmes visuels et créations présentés sur ce
              site sont la propriété exclusive de ROOM241 ou de ses clients respectifs.
              Les droits d'exploitation et fichiers sources sont intégralement cédés aux
              clients à la clôture de chaque projet. Toute reproduction, représentation ou
              diffusion sans autorisation écrite préalable est interdite.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2 id="engagement-nda" className="text-xl font-bold text-room-text tracking-tight mb-3 scroll-mt-28">
              4. Engagement NDA
            </h2>
            <p className="text-room-muted">
              Le studio s'engage par contrat au secret professionnel le plus strict. Les
              études de cas estampillées sous scellé font l'objet d'accords de
              non-divulgation stricts protégeant les données stratégiques de nos
              partenaires. Les visuels complets de ces missions ne sont présentés que sur
              demande, aux marques et pairs du secteur.
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
