import { track } from '@vercel/analytics';

const LOCAL_EVENTS_KEY = 'room241_local_events_log';
const LOCAL_PAGEVIEWS_KEY = 'room241_local_pageviews';

/**
 * Enregistrement réel d'un événement utilisateur
 * Zéro fabrication de fausses données : seuls les événements réels sont enregistrés et transmis.
 */
export function trackEvent(eventName, properties = {}) {
  try {
    const newRecord = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      eventName,
      properties,
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/'
    };

    // 1. Mémorisation locale dans la session pour inspection dans l'Admin Dashboard
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const raw = sessionStorage.getItem(LOCAL_EVENTS_KEY);
        const list = raw ? JSON.parse(raw) : [];
        list.unshift(newRecord);
        sessionStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(list.slice(0, 100)));
      } catch (e) {
        // Ignorer si quota plein
      }
    }

    // 2. Envoi réel à Vercel Web Analytics
    try {
      track(eventName, properties);
    } catch {
      // Ignoré si indisponible
    }
  } catch (err) {
    console.error('[Room241 Telemetry] Erreur lors de l\'enregistrement de l\'événement :', err);
  }
}

/**
 * Incrémente le compteur réel de pages vues pour la session en cours
 */
export function incrementPageView() {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const current = parseInt(sessionStorage.getItem(LOCAL_PAGEVIEWS_KEY) || '0', 10);
      sessionStorage.setItem(LOCAL_PAGEVIEWS_KEY, String(current + 1));
    }
  } catch (err) {
    console.error('[Room241 Telemetry] Erreur incrément page view :', err);
  }
}

/**
 * Récupère les logs des événements réels enregistrés durant la session
 */
export function getEventLogs() {
  if (typeof window === 'undefined' || !window.sessionStorage) return [];
  try {
    const raw = sessionStorage.getItem(LOCAL_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Métriques réelles de la session pour le Dashboard Studio
 * (ZÉRO chiffre inventé, ZÉRO donnée fabriquée)
 */
export function getAnalyticsMetrics() {
  try {
    const visits = typeof window !== 'undefined' && window.sessionStorage
      ? parseInt(sessionStorage.getItem(LOCAL_PAGEVIEWS_KEY) || '0', 10)
      : 0;

    const events = getEventLogs();
    const calClicks = events.filter(e => e.eventName === 'click_calendar_booking').length;
    const ndaRequests = events.filter(e => e.eventName === 'request_nda_case_study').length;
    const forms = events.filter(e => e.eventName === 'submit_contact_form').length;
    const conversionRate = visits > 0 ? ((calClicks / visits) * 100).toFixed(1) : '0.0';

    return {
      visits,
      calClicks,
      ndaRequests,
      forms,
      conversionRate
    };
  } catch (err) {
    return { visits: 0, calClicks: 0, ndaRequests: 0, forms: 0, conversionRate: '0.0' };
  }
}

/**
 * Timeline des clics calendrier des 14 derniers jours basée sur les événements réels
 */
export function get14DayCalendarClicks() {
  try {
    const events = getEventLogs();
    const now = new Date();
    const days = [];

    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dateLabel = `${d.getDate()}/${d.getMonth() + 1}`;

      const count = events.filter(e => {
        return e.eventName === 'click_calendar_booking' && e.timestamp && e.timestamp.startsWith(dateStr);
      }).length;

      days.push({ dateLabel, count });
    }

    return days;
  } catch {
    return [];
  }
}
