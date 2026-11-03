const assert = require('assert');

// Simple mock/import for CJS
const TRAINING_CONFIG = {
  BASE_DATE_ISO: "2026-11-02T00:00:00Z",
  BASE_WEEKS: 325,
  BASE_ACTIVITIES: 5618,
  MS_PER_WEEK: 7 * 24 * 60 * 60 * 1000,
};

function getTrainingStats(now = new Date()) {
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

const tests = [
  { name: '1. Avant date ancrage (2026-10-15)', date: new Date('2026-10-15T12:00:00Z'), expectedWeeks: 325 },
  { name: '2. Jour de l ancrage (2026-11-02 00:00:00Z)', date: new Date('2026-11-02T00:00:00Z'), expectedWeeks: 325 },
  { name: '3. Jour de l ancrage soir (2026-11-02 23:59:59Z)', date: new Date('2026-11-02T23:59:59Z'), expectedWeeks: 325 },
  { name: '4. Six jours après (2026-11-08 23:59:59Z)', date: new Date('2026-11-08T23:59:59Z'), expectedWeeks: 325 },
  { name: '5. Sept jours après (2026-11-09 00:00:00Z)', date: new Date('2026-11-09T00:00:00Z'), expectedWeeks: 326 },
  { name: '6. Quatorze jours après (2026-11-16 00:00:00Z)', date: new Date('2026-11-16T00:00:00Z'), expectedWeeks: 327 },
  { name: '7. Cinq semaines après (2026-12-07 10:00:00Z)', date: new Date('2026-12-07T10:00:00Z'), expectedWeeks: 330 },
  { name: '8. Un an après (2027-11-02 00:00:00Z, 52 semaines)', date: new Date('2027-11-02T00:00:00Z'), expectedWeeks: 377 },
];

console.log('--- TEST DU CALCULATEUR AUTONOME STRAVA ---');
let allPassed = true;
tests.forEach(t => {
  const res = getTrainingStats(t.date);
  const ok = res.weeks === t.expectedWeeks && res.activities === 5618;
  console.log(`[${ok ? 'OK' : 'FAIL'}] ${t.name} -> ${res.weeks} semaines, ${res.activities} activités (attendu: ${t.expectedWeeks})`);
  if (!ok) allPassed = false;
});

if (!allPassed) {
  console.error('Certains tests ont échoué !');
  process.exit(1);
} else {
  console.log('TOUS LES TESTS DU COMPTEUR ONT RÉUSSI (8/8).');
}

