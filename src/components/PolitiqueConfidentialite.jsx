import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '../lib/motion';
import { resetConsent } from '../lib/visitorChoice';

export default function PolitiqueConfidentialite({ navigate }) {
  const handleBack = (e) => {
    e.preventDefault();
    if (navigate) navigate('/');
    else window.location.href = '/';
  };

  const handleReset = () => {
    resetConsent();
    window.location.reload();
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
            Conformité RGPD
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-room-text leading-[1.1] mb-4">
            Politique de confidentialité.
          </h1>
          <p className="text-xs font-mono text-room-subtle uppercase mb-12">
            Dernière mise à jour : septembre 2026
          </p>
        </Reveal>

        <div className="space-y-10 text-sm sm:text-base font-sans leading-relaxed">
          <Reveal>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              1. Données collectées
            </h2>
            <div className="text-room-muted space-y-2">
              <p>
                Après votre consentement explicite via le bandeau dédié, le site mesure
                l'audience <strong className="text-room-text font-semibold">localement, dans
                votre navigateur</strong> (stockage local) : pages visitées et horodatage,
                durée et origine approximative du trafic, interactions (clics de
                réservation, formules consultées, demandes de présentation, envois de
                formulaire).
              </p>
              <p>
                Aucune donnée directement identifiante n'est stockée par cet outil. Le
                contenu du formulaire de contact n'est transmis à aucun traceur.
              </p>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              2. Finalité et base légale
            </h2>
            <p className="text-room-muted">
              Ces mesures servent exclusivement à l'amélioration du service. La base
              légale est votre <strong className="text-room-text font-semibold">consentement</strong>,
              recueilli avant toute mesure et modifiable à tout moment (voir section 6).
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              3. Durée de conservation
            </h2>
            <p className="text-room-muted">
              Les données de mesure sont conservées{' '}
              <strong className="text-room-text font-semibold">13 mois maximum</strong>.
              Passé ce délai, le stockage local est purgé et votre consentement est
              demandé à nouveau.
            </p>
          </Reveal>


          <Reveal delay={150}>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              4. Vos droits
            </h2>
            <p className="text-room-muted">
              Accès, rectification, suppression, opposition : écrivez à{' '}
              <a
                href="mailto:contact@room241.fr"
                className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150"
              >
                contact@room241.fr
              </a>{' '}
              — réponse sous 30 jours.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              5. Transferts et services externes
            </h2>
            <div className="text-room-muted space-y-2">
              <p>
                La mesure est strictement locale :{' '}
                <strong className="text-room-text font-semibold">aucun transfert hors UE</strong> par
                cet outil, aucun cookie tiers déposé par le site lui-même.
              </p>
              <p>
                Hébergeur : Vercel Inc. (USA, journaux techniques selon sa politique).
                Services externes : Google Agenda (réservation) et YouTube (lecteur de
                l'étude Fresh Data, cookies possibles à la lecture).
              </p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
              6. Modifier mon choix
            </h2>
            <p className="text-room-muted mb-5">
              Retirez votre consentement à tout moment : les données locales sont effacées
              et le bandeau réapparaît.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary inline-flex items-center justify-center px-5 py-3 text-xs font-sans font-semibold rounded-lg"
            >
              Réinitialiser mon choix
            </button>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
