import React, { useState, useEffect } from 'react';
import { getConsentState, saveConsent } from '../lib/visitorChoice';

/**
 * ROOM241 — Bandeau d'information (mesure de visite, RGPD).
 *
 * NB : nom de composant, de fichier et de classe CSS volontairement neutres
 * afin de ne pas déclencher les filtres des bloqueurs de publicité.
 *
 * Affiché uniquement à la première visite (ou après expiration du choix).
 * Aucune mesure ne se charge avant un choix explicite.
 */
export default function SiteNotice({ navigate }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const state = getConsentState();
    if (state === 'pending' || state === 'expired') {
      const t = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(t);
    }
  }, []);

  const choose = (choice) => {
    saveConsent(choice);
    setVisible(false);
  };

  const goToPrivacy = (e) => {
    e.preventDefault();
    if (navigate) navigate('/politique-de-confidentialite');
    else window.location.href = '/politique-de-confidentialite';
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Préférence de mesure de visite"
      className="site-notice fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[90] rounded-2xl p-5 sm:p-6 shadow-2xl"
    >
      <p className="text-xs font-mono uppercase tracking-wider font-semibold mb-2 opacity-70">
        Mesure d'audience
      </p>
      <p className="text-sm leading-relaxed mb-5">
        Nous mesurons la fréquentation <strong>localement, dans votre navigateur</strong>,
        pour améliorer le site. Aucun traceur publicitaire, aucune revente de données.
        Acceptez-vous cette mesure ?
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => choose('refused')}
          className="btn-secondary flex-1 inline-flex items-center justify-center px-5 py-3 text-xs font-sans font-semibold rounded-lg"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="btn-primary flex-1 inline-flex items-center justify-center px-5 py-3 bg-room-text text-room-bg text-xs font-sans font-semibold rounded-lg"
        >
          Accepter
        </button>
      </div>
      <button
        type="button"
        onClick={goToPrivacy}
        className="mt-4 text-xs underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity duration-150"
      >
        En savoir plus — Politique de confidentialité
      </button>
    </div>
  );
}
