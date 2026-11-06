/**
 * Données sportives officielles de Rémi Brocart
 * Studio ROOM241 — Métropole Européenne de Lille / Cysoing
 *
 * 1. Marathon de Venise (26 octobre 2025) :
 *    Données historiques certifiées et strictement immuables.
 *    Aucune dérivation temporelle ni incrémentation automatique.
 *
 * 2. Constance d'entraînement Strava :
 *    Incrémentation déterministe hebdomadaire : chaque nouvelle semaine civile
 *    pleinement validée (au franchissement du lundi à 00:00:00 Europe/Paris)
 *    ajoute 1 semaine consécutive au compteur.
 *    Idempotence stricte : aucune double incrémentation au cours de la même semaine.
 */

/**
 * Données officielles certifiées du Marathon de Venise (26 octobre 2025)
 * Données d'archives historiques invariables.
 */
export const MARATHON_RECORD = {
  event: 'Wizz Air Venice Marathon',
  date: '26 octobre 2025',
  distance: '42,195 km',
  time: '2 h 48',
  timeExact: '2h48m25s',
  pace: "3'59",
  paceUnit: 'au km',
  bibVerification: 'Tableau des engagés',
  location: 'Venise (Italie)',
  photo: '/assets/autres/marathon6.jpg',
};

/**
 * Configuration de référence pour la constance Strava
 */
export const STRAVA_CONFIG = {
  athleteId: '64835803',
  profileUrl: 'https://www.strava.com/athletes/64835803',
  ANCHOR_YEAR: 2026,
  ANCHOR_MONTH: 11, // Novembre (1-indexed)
  ANCHOR_DAY: 2,    // Lundi 2 novembre 2026
  ANCHOR_WEEKS: 325,
  TIMEZONE: 'Europe/Paris',
};

/**
 * Extrait les composantes de date civile dans le fuseau Europe/Paris.
 *
 * @param {Date|string|number} [date=new Date()]
 * @returns {{ year: number, month: number, day: number, dayOfWeek: number, hour: number, minute: number, second: number }}
 */
export function getParisDateParts(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: STRAVA_CONFIG.TIMEZONE,
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

  // Normalisation Lundi = 1, Dimanche = 7 (ISO 8601)
  const dayOfWeekMap = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  const dayOfWeek = dayOfWeekMap[map.weekday] || 1;

  return { year, month, day, dayOfWeek, hour, minute, second };
}

/**
 * Calcule les statistiques d'entraînement et le cumul de semaines consécutives validées.
 *
 * Logique :
 * - Le Marathon demeure strictement fixe (aucune modification temporelle).
 * - Le compteur Strava s'incrémente de +1 lorsqu'une semaine complète est validée
 *   (franchissement du lundi 00:00:00 Europe/Paris).
 * - Idempotence : la valeur reste constante du lundi au dimanche 23:59:59.
 *
 * @param {Date|string|number} [now=new Date()]
 * @returns {{ weeks: number, currentWeeks: number, marathon: typeof MARATHON_RECORD, strava: { athleteId: string, profileUrl: string, consecutiveWeeks: number, tagline: string } }}
 */
export function getTrainingStats(now = new Date()) {
  const parts = getParisDateParts(now);

  // Lundi calendaire UTC de la semaine courante en Europe/Paris
  const currentMondayUtc = Date.UTC(parts.year, parts.month - 1, parts.day - (parts.dayOfWeek - 1));

  // Lundi calendaire UTC de référence (Lundi 2 novembre 2026)
  const anchorMondayUtc = Date.UTC(
    STRAVA_CONFIG.ANCHOR_YEAR,
    STRAVA_CONFIG.ANCHOR_MONTH - 1,
    STRAVA_CONFIG.ANCHOR_DAY
  );

  // Calcul du nombre de semaines civiles pleines écoulées (en jours entiers pour immunité DST)
  const diffDays = Math.round((currentMondayUtc - anchorMondayUtc) / (24 * 60 * 60 * 1000));
  const elapsedWeeks = Math.max(0, Math.floor(diffDays / 7));
  const totalWeeks = STRAVA_CONFIG.ANCHOR_WEEKS + elapsedWeeks;

  return {
    weeks: totalWeeks,
    currentWeeks: totalWeeks,
    currentStreak: totalWeeks,
    longestStreak: Math.max(totalWeeks, STRAVA_CONFIG.ANCHOR_WEEKS),
    lastValidatedWeek: `2026-W${44 + elapsedWeeks}`,
    marathon: { ...MARATHON_RECORD },
    strava: {
      athleteId: STRAVA_CONFIG.athleteId,
      profileUrl: STRAVA_CONFIG.profileUrl,
      consecutiveWeeks: totalWeeks,
      currentStreak: totalWeeks,
      longestStreak: Math.max(totalWeeks, STRAVA_CONFIG.ANCHOR_WEEKS),
      tagline: 'La régularité se construit dans la durée, semaine après semaine.',
    },
  };
}
