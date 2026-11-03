/**
 * Module de calcul autonome pour le compteur d'entraînement
 * Studio ROOM241 — Rémi Brocart
 *
 * Centralisation des valeurs de référence :
 * - Date d'ancrage : 2 novembre 2026 à 00:00:00 UTC
 * - Semaines de référence initiales : 325
 * - Activités enregistrées de référence : 5 618 (valeur fixe, sans incrément arbitraire)
 *
 * Choix UTC : Le calcul utilise des horodatages UTC absolus pour neutraliser
 * tout décalage d'heure d'hiver/été ou fuseau horaire local.
 */

export const TRAINING_CONFIG = {
  BASE_DATE_ISO: "2026-11-02T00:00:00Z",
  BASE_WEEKS: 325,
  BASE_ACTIVITIES: 5618,
  MS_PER_WEEK: 7 * 24 * 60 * 60 * 1000, // 604 800 000 ms
};

/**
 * Calcule la progression théorique du nombre de semaines écoulées depuis la date d'ancrage.
 * Le total d'activités demeure strictement fixe à 5 618 conformément aux données de référence.
 *
 * @param {Date|string|number} [now=new Date()]
 * @returns {{ weeks: number, activities: number, baseDateFormatted: string }}
 */
export function getTrainingStats(now = new Date()) {
  const baseTime = new Date(TRAINING_CONFIG.BASE_DATE_ISO).getTime();
  const currentTime = now instanceof Date ? now.getTime() : new Date(now).getTime();
  const elapsedMs = Math.max(0, currentTime - baseTime);

  const weeksElapsed = Math.floor(elapsedMs / TRAINING_CONFIG.MS_PER_WEEK);

  return {
    weeks: TRAINING_CONFIG.BASE_WEEKS + weeksElapsed,
    activities: TRAINING_CONFIG.BASE_ACTIVITIES,
    baseDateFormatted: "2 novembre 2026",
  };
}

