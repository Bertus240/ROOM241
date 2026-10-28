import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowUpRight } from 'lucide-react';
import TrackedButton from './actions/TrackedButton';
import { Reveal, SpotCard } from '../lib/motion';

export default function Contact({ isFullPage }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={`bg-luxe border-b border-room-border scroll-mt-24 ${
        isFullPage ? 'pt-28 pb-20 sm:pt-32 sm:pb-28' : 'py-20 sm:py-28'
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <Reveal className="mb-20">
          <span className="text-xs font-mono text-room-muted tracking-wider uppercase font-medium mb-3 block">
            06 / CONTACT &amp; ÉCHANGE DIRECT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-room-text leading-[1.1]">
            Un projet à cadrer ? <br />
            Parlons-en.
          </h2>
        </Reveal>

        {/* 50/50 Desktop Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Founder Profile Card & Direct Google Calendar Link */}
          <Reveal className="space-y-8">
            
            {/* Founder Profile Card — carte cliquable vers le profil LinkedIn officiel */}
            <a
              href="https://www.linkedin.com/in/remibrocart/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir le profil LinkedIn de Rémi Brocart (nouvel onglet)"
              className="group block cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-room-amber/50"
            >
              <SpotCard className="card-lift bg-room-surface border border-room-border group-hover:border-room-borderHover rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src="/assets/remi-brocart-2026.png"
                  alt="Rémi Brocart — Directeur Artistique Room241"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-room-border shrink-0 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="space-y-2 text-center sm:text-left font-sans">
                  <span className="font-mono text-[11px] text-room-amber uppercase tracking-wider font-semibold block">
                    FONDATION &amp; DIRECTION ARTISTIQUE
                  </span>
                  <h3 className="text-xl font-bold text-room-text">
                    Rémi Brocart{' '}
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-room-amber font-semibold group-hover:underline transition-opacity">
                      LinkedIn ↗
                    </span>
                  </h3>
                  <p className="text-xs text-room-muted font-sans">Directeur Artistique &amp; Stratège de Contenu B2B</p>
                  <p className="text-xs text-room-muted leading-relaxed font-sans pt-2">
                    "Chaque système visuel que nous créons répond à un impératif business : éliminer la météo de l'acquisition et installer une autorité technique indiscutable."
                  </p>
                </div>
              </SpotCard>
            </a>

            {/* Direct Calendar Booking Box */}
            <SpotCard className="card-lift bg-room-surface border border-room-border rounded-2xl p-8">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-room-border text-xs font-sans">
                <span className="font-semibold text-room-text uppercase tracking-wider">
                  RÉSERVATION DIRECTE
                </span>
                <span className="text-room-subtle">30 MIN · SANS ENGAGEMENT</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-room-text mb-3 font-sans">
                30 minutes pour cadrer votre projet.
              </h3>
              <p className="text-sm text-room-muted leading-relaxed mb-8 font-sans">
                Sélectionnez un créneau dans notre agenda direct pour échanger en visioconférence.
              </p>

              {/* Action Button pointing to Google Calendar Link */}
              <TrackedButton
                eventName="click_calendar_booking"
                eventData={{ location: 'contact_section' }}
                href="https://calendar.app.google/VHHhkb2uunEeRVt67"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3.5 bg-room-text hover:opacity-90 text-room-bg text-xs font-sans font-semibold rounded-lg"
              >
                <span>Réserver un échange dans l'agenda ↗</span>
              </TrackedButton>

              <div className="mt-6 pt-4 border-t border-room-border flex items-center justify-between text-[11px] font-sans text-room-subtle">
                <span>SYNCHRONISATION EN TEMPS RÉEL</span>
                <span>CONFIRMATION INSTANTANÉE</span>
              </div>
            </SpotCard>

          </Reveal>

          {/* RIGHT: Written Form with 3 Fields */}
          <Reveal delay={100} className="card-lift bg-room-surface border border-room-border rounded-2xl p-8 sm:p-10">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-room-border text-xs font-sans">
              <span className="font-semibold text-room-text uppercase tracking-wider">
                FORMULAIRE ÉCRIT
              </span>
              <Mail className="w-4 h-4 text-room-muted" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-room-text mb-2 font-sans">
              Vous préférez l'écrit ?
            </h3>
            <p className="text-sm text-room-muted leading-relaxed mb-8 font-sans">
              Transmettez vos enjeux et recevez une réponse cadrée sous 24h ouvrées.
            </p>

            {formSubmitted ? (
              <div className="enter-soft p-8 bg-room-card border border-room-border rounded-xl text-center space-y-4 my-6">
                <CheckCircle className="w-10 h-10 text-room-amber mx-auto" />
                <h4 className="text-xl font-bold text-room-text font-sans">Message transmis.</h4>
                <p className="text-xs text-room-muted font-sans">
                  Merci {formData.fullName}. Notre équipe étudie votre demande et vous recontactera sous 24h ouvrées.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-sans text-room-text underline underline-offset-2 transition-colors duration-150 hover:text-room-muted"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Champ 01: Prénom & Nom */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-sans text-room-muted uppercase tracking-wider mb-2">
                    Prénom &amp; Nom *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="ex. Marc Dupont"
                    className="w-full bg-room-card border border-room-border rounded-lg px-4 py-3 text-sm text-room-text placeholder-room-subtle field-premium font-sans"
                  />
                </div>

                {/* Champ 02: Email professionnel */}
                <div>
                  <label htmlFor="email" className="block text-xs font-sans text-room-muted uppercase tracking-wider mb-2">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ex. m.dupont@entreprise.com"
                    className="w-full bg-room-card border border-room-border rounded-lg px-4 py-3 text-sm text-room-text placeholder-room-subtle field-premium font-sans"
                  />
                </div>

                {/* Champ 03: Enjeux & Délais */}
                <div>
                  <label htmlFor="message" className="block text-xs font-sans text-room-muted uppercase tracking-wider mb-2">
                    Enjeux &amp; Délais *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Présentez votre entreprise B2B, vos objectifs visuels et vos échéances..."
                    className="w-full bg-room-card border border-room-border rounded-lg px-4 py-3 text-sm text-room-text placeholder-room-subtle field-premium font-sans resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="space-y-3 pt-2">
                  <TrackedButton
                    eventName="submit_contact_form"
                    eventData={{ form: 'contact' }}
                    as="button"
                    type="submit"
                    className="btn-primary w-full inline-flex items-center justify-center py-3.5 px-6 bg-room-text hover:opacity-90 text-room-bg text-xs font-sans font-semibold rounded-lg"
                  >
                    <span>Démarrer la discussion ↗</span>
                  </TrackedButton>

                  <p className="text-center text-[11px] font-sans text-room-muted">
                    Réponse garantie sous <span className="text-room-text font-medium">24h ouvrées</span>.
                  </p>
                </div>
              </form>
            )}
          </Reveal>

        </div>

      </div>
    </section>
  );
}

