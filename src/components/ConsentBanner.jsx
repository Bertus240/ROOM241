import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { getConsentStatus, setConsentStatus } from '../lib/analyticsStore';

/**
 * ============================================================================
 * CONSENT BANNER — GESTION TRANSPARENTE DE LA VIE PRIVÉE (CNIL / RGPD)
 * Studio ROOM241 • Rémi Brocart
 *
 * Spécifications de confidentialité :
 * - Aucune mesure publicitaire ni traceur tiers
 * - Choix d'acceptation ou de refus clair et accessible
 * - Mémorisation du consentement sans collecte intrusive
 * ============================================================================
 */

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Si aucun choix n'a encore été formulé
    const status = getConsentStatus();
    if (status === 'unset') {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsentStatus('accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsentStatus('declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Gestion de la confidentialité"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="p-5 rounded-2xl bg-zinc-950/95 dark:bg-zinc-900/95 text-white backdrop-blur-xl border border-white/15 shadow-2xl space-y-3 font-sans">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              Vie privée &amp; Télémétrie
            </span>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            aria-label="Fermer le bandeau"
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          ROOM241 utilise une mesure d'audience first-party épurée, sans traceur publicitaire tiers ni revente de données, pour comprendre la navigation et perfectionner les études de cas.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 rounded-xl bg-[#FFAD00] hover:bg-[#E59B00] text-black font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accepter la mesure</span>
          </button>
          
          <button
            type="button"
            onClick={handleDecline}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-200 text-xs font-medium transition-colors cursor-pointer border border-white/10"
          >
            Refuser
          </button>

          <a
            href="/politique-de-confidentialite"
            className="text-[11px] text-zinc-400 hover:text-zinc-200 underline underline-offset-2 ml-auto"
          >
            En savoir plus
          </a>
        </div>

      </div>
    </aside>
  );
}
