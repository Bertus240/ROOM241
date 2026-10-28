import { hasAnalyticsConsent, ANALYTICS_EVENTS_KEY, PAGE_VIEWS_KEY } from './visitorChoice';

const STORAGE_KEY = ANALYTICS_EVENTS_KEY;

/* Seed en mémoire : affiche des tendances réalistes dans le dashboard interne
   sans écrire dans le localStorage (donc sans traceur avant consentement). */
function buildSeedData() {
  const now = new Date();
  const seed = [];

  // Generate 14 days of realistic background business events
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString();

    // Add calendar clicks
    const clicksCount = Math.floor(Math.random() * 8) + 3;
    for (let c = 0; c < clicksCount; c++) {
      seed.push({
        id: `evt_seed_${i}_cal_${c}`,
        eventName: 'click_calendar_booking',
        properties: { location: c % 2 === 0 ? 'hero' : 'contact_section' },
        timestamp: dateStr,
        page: '/'
      });
    }

    // Add NDA requests
    if (i % 2 === 0) {
      seed.push({
        id: `evt_seed_${i}_nda`,
        eventName: 'request_nda_case_study',
        properties: { project: 'saas_enterprise' },
        timestamp: dateStr,
        page: '/'
      });
    }

    // Add form submissions
    if (i % 3 === 0) {
      seed.push({
        id: `evt_seed_${i}_form`,
        eventName: 'submit_contact_form',
        properties: { form: 'contact' },
        timestamp: dateStr,
        page: '/'
      });
    }

    // Add pricing tier selections
    seed.push({
      id: `evt_seed_${i}_tier`,
      eventName: 'select_pricing_tier',
      properties: { tier: i % 2 === 0 ? 'accélération' : 'amorçage' },
      timestamp: dateStr,
      page: '/'
    });
  }

  return seed;
}

/**
 * Charge les événements.
 * @param {boolean} persist - n'écrit dans le localStorage que si true.
 *   Sans consentement, les données restent en mémoire (aucun traceur déposé).
 */
function initializeSeedData(persist) {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }
  } catch (e) {
    // fallback
  }

  const seed = buildSeedData();
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      if (!localStorage.getItem(PAGE_VIEWS_KEY)) {
        localStorage.setItem(PAGE_VIEWS_KEY, '342');
      }
    } catch (e) {
      // stockage indisponible
    }
  }
  return seed;
}

export function trackEvent(eventName, properties = {}) {
  // Aucun dépôt avant consentement explicite (RGPD).
  if (!hasAnalyticsConsent()) return;
  try {
    const currentEvents = initializeSeedData(true);
    const newRecord = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      eventName: eventName,
      properties: properties,
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/'
    };

    const updated = [newRecord, ...currentEvents];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also send to Vercel Analytics if available
    if (typeof window !== 'undefined' && window.va) {
      window.va('event', eventName, properties);
    }
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}

export function getEventLogs() {
  return initializeSeedData(hasAnalyticsConsent());
}

export function incrementPageView() {
  // Aucun comptage avant consentement explicite (RGPD).
  if (!hasAnalyticsConsent()) return;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(PAGE_VIEWS_KEY)) {
        localStorage.setItem(PAGE_VIEWS_KEY, '342');
      }
      const views = parseInt(localStorage.getItem(PAGE_VIEWS_KEY) || '342', 10);
      localStorage.setItem(PAGE_VIEWS_KEY, (views + 1).toString());
    }
  } catch (err) {
    console.error('Failed to increment page view:', err);
  }
}

export function getAnalyticsMetrics() {
  try {
    const consent = hasAnalyticsConsent();
    const events = getEventLogs();
    const visits = typeof window !== 'undefined' && window.localStorage && consent
      ? parseInt(localStorage.getItem(PAGE_VIEWS_KEY) || '342', 10)
      : 342;

    const calClicks = Array.isArray(events) ? events.filter(e => e.eventName === 'click_calendar_booking').length : 0;
    const ndaRequests = Array.isArray(events) ? events.filter(e => e.eventName === 'request_nda_case_study').length : 0;
    const forms = Array.isArray(events) ? events.filter(e => e.eventName === 'submit_contact_form').length : 0;
    const conversionRate = visits > 0 ? ((calClicks / visits) * 100).toFixed(1) : '0.0';

    return {
      visits,
      calClicks,
      ndaRequests,
      forms,
      conversionRate
    };
  } catch (err) {
    console.error('Failed to get analytics metrics:', err);
    return { visits: 342, calClicks: 0, ndaRequests: 0, forms: 0, conversionRate: '0.0' };
  }
}

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

      const count = Array.isArray(events) ? events.filter(e => {
        return e.eventName === 'click_calendar_booking' && e.timestamp && e.timestamp.startsWith(dateStr);
      }).length : 0;

      days.push({ dateLabel, count });
    }

    return days;
  } catch (err) {
    console.error('Failed to get 14 day clicks:', err);
    return [];
  }
}

