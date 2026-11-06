import { track } from '@vercel/analytics';

/**
 * ============================================================================
 * TÉLÉMÉTRIE & ÉVÉNEMENTS — ROOM241 (MODE SOBRE / DÉSACTIVATION FIRST-PARTY)
 * Studio ROOM241 • Rémi Brocart
 *
 * Décision de consolidation :
 * - Aucune collecte de données superflue ou intrusive.
 * - Collecte locale first-party désactivée en l'absence de dashboard actif.
 * - Seules les métriques de base Vercel Web Analytics (si activées en production)
 *   restent opérationnelles, dans le respect total du Do-Not-Track.
 * ============================================================================
 */

export function trackEvent(eventName, properties = {}) {
  try {
    // Respect strict du signal Do Not Track
    if (typeof window !== 'undefined' && (navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
      return;
    }

    // Transmission exclusive à Vercel Web Analytics si hébergé en production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      try {
        track(eventName, properties);
      } catch {
        // Ignorer si analytics non initialisé
      }
    }
  } catch {
    // Échec silencieux sans impact sur l'expérience
  }
}

/**
 * Enregistrement des clics pour heatmap (Inactif en mode Option 1)
 */
export function trackClickForHeatmap(_event) {
  // Aucun enregistrement
}

/**
 * Incrémente le compteur de pages vues
 */
export function incrementPageView() {
  trackEvent('page_view', {
    url: typeof window !== 'undefined' ? window.location.pathname : '/'
  });
}

/**
 * Paliers de scroll (Inactif en mode Option 1)
 */
export function trackScrollDepth(_percent) {
  // Inactif
}

export function trackProjectInteraction(slug, action = 'view') {
  trackEvent('project_interaction', { slug, action });
}

export function trackCvAction(action) {
  trackEvent('cv_action', { action });
}

export function trackContactIntent(channel, value = '') {
  trackEvent('contact_intent', { channel, value });
}

export function trackVideoAction(videoTitle, action) {
  trackEvent('video_action', { videoTitle, action });
}

export function trackKuroAction(action, details = {}) {
  trackEvent('kuro_action', { action, ...details });
}

export function getEventLogs() {
  return [];
}

export function getAnalyticsMetrics() {
  return { visits: 0, calClicks: 0, ndaRequests: 0, forms: 0, conversionRate: '0.0' };
}

export function get14DayCalendarClicks() {
  return [];
}
