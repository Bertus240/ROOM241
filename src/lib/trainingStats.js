/**
 * Module de calcul autonome pour le compteur d'entraînement
 * Studio ROOM241 — Rémi Brocart
 *
 * Spécifications :
 * - Date d'ancrage : Lundi 2 novembre 2026 à 00:00:00 (Europe/Paris)
 * - Semaines de référence initiales : 325 (remontant à août 2020)
 * - Incrément : +1 semaine chaque lundi à 00:00:00 Europe/Paris
 * - Gestion du fuseau horaire Europe/Paris et transition heure été / hiver
 *   sans dérive de millisecondes brutes.
 */

export const TRAINING_CONFIG = {
  ANCHOR_YEAR: 2026,
  ANCHOR_MONTH: 11, // Novembre (1-indexed pour lisibilité)
  ANCHOR_DAY: 2,    // Lundi 2 novembre 2026
  ANCHOR_WEEKS: 325,
  TIMEZONE: 'Europe/Paris',
};

/**
 * Extrait les composants calendaires civils dans le fuseau Europe/Paris.
 *
 * @param {Date|string|number} [date=new Date()]
 * @returns {{ year: number, month: number, day: number, dayOfWeek: number, hour: number, minute: number, second: number }}
 */
export function getParisDateParts(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TRAINING_CONFIG.TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(d);
  const map = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  const year = parseInt(map.year, 10);
  const month = parseInt(map.month, 10);
  const day = parseInt(map.day, 10);
  const hour = parseInt(map.hour === '24' ? '0' : map.hour, 10);
  const minute = parseInt(map.minute, 10);
  const second = parseInt(map.second, 10);

  // Normalisation du jour de la semaine (Lundi = 1, Dimanche = 7)
  const dayOfWeekMap = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  const dayOfWeek = dayOfWeekMap[map.weekday] || 1;

  return { year, month, day, dayOfWeek, hour, minute, second };
}

/**
 * Calcule le nombre de semaines consécutives d'entraînement écoulées en heure légale française (Europe/Paris).
 *
 * Le compteur s'incrémente de +1 chaque lundi à 00:00:00 (Europe/Paris) et demeure strictement stable
 * du lundi 00:00:00 au dimanche 23:59:59.
 *
 * @param {Date|string|number} [now=new Date()]
 * @returns {{ weeks: number }}
 */
export function getTrainingStats(now = new Date()) {
  const parts = getParisDateParts(now);

  // Lundi calendaire de la semaine courante en Europe/Paris
  const currentMondayUtc = Date.UTC(parts.year, parts.month - 1, parts.day - (parts.dayOfWeek - 1));

  // Lundi calendaire de référence (2 novembre 2026)
  const anchorMondayUtc = Date.UTC(
    TRAINING_CONFIG.ANCHOR_YEAR,
    TRAINING_CONFIG.ANCHOR_MONTH - 1,
    TRAINING_CONFIG.ANCHOR_DAY
  );

  // Différence en jours calendaires entiers (insensible aux heures d'été/hiver)
  const diffDays = Math.round((currentMondayUtc - anchorMondayUtc) / (24 * 60 * 60 * 1000));
  const elapsedWeeks = Math.max(0, Math.floor(diffDays / 7));

  return {
    weeks: TRAINING_CONFIG.ANCHOR_WEEKS + elapsedWeeks,
  };
}
