// scripts/test-training-stats.cjs
// Tests exhaustifs : Marathon fixe & Constance Strava dynamique déterministe
// Studio ROOM241 • Rémi Brocart

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const trainingSrc = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'trainingStats.js'), 'utf8');
const persoSrc = fs.readFileSync(path.join(ROOT, 'src', 'pages', 'PersonalUniverse.jsx'), 'utf8');

console.log('====================================================');
console.log(' TESTS D\'INTÉGRITÉ : MARATHON FIXE & STRAVA DYNAMIQUE');
console.log('====================================================\n');

let passed = 0;
let total = 0;

function check(name, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  [OK] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
  }
}

// 1. Structure de données et exports
check('1.1 Export des constantes MARATHON_RECORD et STRAVA_CONFIG', () => {
  assert(trainingSrc.includes('export const MARATHON_RECORD'), 'MARATHON_RECORD manquant');
  assert(trainingSrc.includes('export const STRAVA_CONFIG'), 'STRAVA_CONFIG manquant');
  assert(trainingSrc.includes('export function getTrainingStats'), 'getTrainingStats manquant');
});

// Évaluation CJS du module trainingStats
const { MARATHON_RECORD, STRAVA_CONFIG, getTrainingStats, getParisDateParts } = (() => {
  const m = { exports: {} };
  const cleaned = trainingSrc.replace(/export\s+const\s+/g, 'const ').replace(/export\s+function\s+/g, 'function ');
  const fn = new Function('module', 'exports', cleaned + '\nmodule.exports = { MARATHON_RECORD, STRAVA_CONFIG, getTrainingStats, getParisDateParts };');
  fn(m, m.exports);
  return m.exports;
})();

// 2. Marathon : Immuabilité absolue (aucune dérivation temporelle)
check('2.1 Marathon : Le chrono et les données restent strictement constants sur toute date', () => {
  const testDates = [
    '2026-11-02T00:00:00Z',
    '2026-11-09T00:00:00Z',
    '2027-03-29T00:00:00Z',
    '2027-10-31T00:00:00Z',
    '2030-01-01T00:00:00Z',
  ];
  for (const d of testDates) {
    const stats = getTrainingStats(d);
    assert.strictEqual(stats.marathon.time, '2 h 48', `Chrono altéré pour ${d}`);
    assert.strictEqual(stats.marathon.timeExact, '2h48m25s', `Chrono exact altéré pour ${d}`);
    assert.strictEqual(stats.marathon.distance, '42,195 km', `Distance altérée pour ${d}`);
    assert.strictEqual(stats.marathon.date, '26 octobre 2025', `Date altérée pour ${d}`);
  }
});

// 3. Strava : Progression hebdomadaire dynamique déterministe
check('3.1 Strava : Dimanche soir 23h59:59 Paris -> ancienne valeur de semaine (325)', () => {
  const sunday = getTrainingStats('2026-11-08T22:59:59Z'); // 23h59:59 Paris (UTC+1)
  assert.strictEqual(sunday.weeks, 325, `Attendu 325, reçu ${sunday.weeks}`);
});

check('3.2 Strava : Lundi minuit 00h00:00 Paris -> incrément de +1 semaine validée (326)', () => {
  const mondayMidnight = getTrainingStats('2026-11-08T23:00:00Z'); // 00h00:00 Paris
  assert.strictEqual(mondayMidnight.weeks, 326, `Attendu 326, reçu ${mondayMidnight.weeks}`);
});

check('3.3 Strava : Idempotence stricte en milieu de semaine (mardi midi -> reste 326)', () => {
  const tuesdayMidday = getTrainingStats('2026-11-10T11:00:00Z'); // Mardi 12h00 Paris
  assert.strictEqual(tuesdayMidday.weeks, 326, `Attendu 326, reçu ${tuesdayMidday.weeks}`);
});

check('3.4 Strava : Lundi suivant -> deuxième incrément (+2 total = 327)', () => {
  const nextMonday = getTrainingStats('2026-11-15T23:00:00Z'); // 16 nov 00h00 Paris
  assert.strictEqual(nextMonday.weeks, 327, `Attendu 327, reçu ${nextMonday.weeks}`);
});

check('3.5 Strava : Passage à l\'heure d\'été (mars 2027) sans dérive DST', () => {
  const preDst = getTrainingStats('2027-03-28T00:30:00Z'); // Dimanche pré-changement
  const postDst = getTrainingStats('2027-03-28T02:30:00Z'); // Dimanche post-changement
  assert.strictEqual(preDst.weeks, postDst.weeks, 'Le dimanche de changement d\'heure ne doit pas incrémenter');
  const mondaySummer = getTrainingStats('2027-03-28T22:00:00Z'); // Lundi 00h00 Paris (UTC+2)
  assert.strictEqual(mondaySummer.weeks, preDst.weeks + 1, 'Le lundi doit incrémenter de +1 exactement');
});

// 4. Présentation invisible dans l'interface (Section 1.3)
check('4.1 Interface : Aucune mention d\'incrémentation automatique ou d\'algorithme', () => {
  const lower = persoSrc.toLowerCase();
  assert(!lower.includes('+1 chaque lundi'), 'Ne doit pas afficher "+1 chaque lundi"');
  assert(!lower.includes('mise à jour automatique'), 'Ne doit pas afficher "mise à jour automatique"');
  assert(!lower.includes('compteur incrémenté'), 'Ne doit pas afficher "compteur incrémenté"');
  assert(!lower.includes('incrémentation automatique'), 'Ne doit pas afficher "incrémentation automatique"');
  assert(!lower.includes('00:00 utc'), 'Ne doit pas afficher de date technique de recalcul');
});

check('4.2 Interface : Présentation naturelle du compteur', () => {
  assert(persoSrc.includes('semaines consécutives'), 'Doit afficher "semaines consécutives"');
  assert(persoSrc.includes('trainingStats.currentWeeks') || persoSrc.includes('trainingStats.weeks'), 'Doit afficher la valeur dynamique');
});

console.log('\n====================================================');
console.log(` BILAN DE LA MISSION 1 : ${passed} / ${total} tests réussis`);
console.log('====================================================\n');

module.exports = { MARATHON_RECORD, STRAVA_CONFIG, getTrainingStats };

if (passed !== total) {
  process.exit(1);
}
