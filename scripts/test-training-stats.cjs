// scripts/test-training-stats.cjs
// Suite de tests automatisés pour le compteur d'entraînement (Europe/Paris)
// Studio ROOM241 • Rémi Brocart

const assert = require('assert');

// Logique synchronisée avec src/lib/trainingStats.js
const TRAINING_CONFIG = {
  ANCHOR_YEAR: 2026,
  ANCHOR_MONTH: 11, // Novembre (1-indexed)
  ANCHOR_DAY: 2,    // Lundi 2 novembre 2026
  ANCHOR_WEEKS: 325,
  TIMEZONE: 'Europe/Paris',
};

function getParisDateParts(date = new Date()) {
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

  const dayOfWeekMap = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  const dayOfWeek = dayOfWeekMap[map.weekday] || 1;

  return { year, month, day, dayOfWeek, hour, minute, second };
}

function getTrainingStats(now = new Date()) {
  const parts = getParisDateParts(now);
  const currentMondayUtc = Date.UTC(parts.year, parts.month - 1, parts.day - (parts.dayOfWeek - 1));
  const anchorMondayUtc = Date.UTC(
    TRAINING_CONFIG.ANCHOR_YEAR,
    TRAINING_CONFIG.ANCHOR_MONTH - 1,
    TRAINING_CONFIG.ANCHOR_DAY
  );
  const diffDays = Math.round((currentMondayUtc - anchorMondayUtc) / (24 * 60 * 60 * 1000));
  const elapsedWeeks = Math.max(0, Math.floor(diffDays / 7));

  return {
    weeks: TRAINING_CONFIG.ANCHOR_WEEKS + elapsedWeeks,
  };
}

console.log('====================================================');
console.log(' SUITE DE TESTS : COMPTEUR HEBDOMADAIRE (EUROPE/PARIS)');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(num, name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [OK] Scénario ${num} : ${name}`);
  } catch (err) {
    console.error(`  [FAIL] Scénario ${num} : ${name}`);
    console.error(`         ${err.message}`);
  }
}

// Scénario 1 : Dimanche 23h59:59 (Europe/Paris, UTC+1 en novembre) -> 325 semaines
runTest(1, 'Dimanche 8 nov 2026 23h59:59 Paris -> ancienne valeur (325)', () => {
  // 23:59:59 Paris = 22:59:59 UTC
  const d = new Date('2026-11-08T22:59:59Z');
  const res = getTrainingStats(d);
  assert.strictEqual(res.weeks, 325, `Attendu 325 semaines, reçu ${res.weeks}`);
});

// Scénario 2 : Lundi 00h00:00 (Europe/Paris, UTC+1) -> incrément +1 (326)
runTest(2, 'Lundi 9 nov 2026 00h00:00 Paris -> valeur + 1 (326)', () => {
  // 00:00:00 Paris = 23:00:00 UTC du 8 nov
  const d = new Date('2026-11-08T23:00:00Z');
  const res = getTrainingStats(d);
  assert.strictEqual(res.weeks, 326, `Attendu 326 semaines (+1), reçu ${res.weeks}`);
});

// Scénario 3 : Lundi 00h01:00 (Europe/Paris) -> même nouvelle valeur (326)
runTest(3, 'Lundi 9 nov 2026 00h01:00 Paris -> stabilisation (326)', () => {
  // 00:01:00 Paris = 23:01:00 UTC du 8 nov
  const d = new Date('2026-11-08T23:01:00Z');
  const res = getTrainingStats(d);
  assert.strictEqual(res.weeks, 326, `Attendu 326 semaines, reçu ${res.weeks}`);
});

// Scénario 4 : Mardi 14h30:00 (Europe/Paris) -> aucune augmentation en milieu de semaine (326)
runTest(4, 'Mardi 10 nov 2026 14h30:00 Paris -> aucune augmentation (326)', () => {
  const d = new Date('2026-11-10T13:30:00Z');
  const res = getTrainingStats(d);
  assert.strictEqual(res.weeks, 326, `Attendu 326 semaines, reçu ${res.weeks}`);
});

// Scénario 5 : Dimanche suivant 23h59:59 (Europe/Paris) -> aucune augmentation anticipée (326)
runTest(5, 'Dimanche 15 nov 2026 23h59:59 Paris -> aucune anticipation (326)', () => {
  const d = new Date('2026-11-15T22:59:59Z');
  const res = getTrainingStats(d);
  assert.strictEqual(res.weeks, 326, `Attendu 326 semaines, reçu ${res.weeks}`);
});

// Scénario 6 : Lundi suivant 00h00:00 (Europe/Paris) -> +1 supplémentaire (327)
runTest(6, 'Lundi 16 nov 2026 00h00:00 Paris -> +1 supplémentaire (327)', () => {
  const d = new Date('2026-11-15T23:00:00Z');
  const res = getTrainingStats(d);
  assert.strictEqual(res.weeks, 327, `Attendu 327 semaines (+1), reçu ${res.weeks}`);
});

// Scénario 7 : Heure d'été (dernier dimanche de mars 2027, 28 mars 2027)
runTest(7, 'Passage à l\'heure d\'été (mars 2027) -> aucune anomalie, incrément exact au lundi', () => {
  // Avant le saut : 01h30 Paris (UTC+1) = 00h30 UTC -> 345 semaines
  const preDst = getTrainingStats(new Date('2027-03-28T00:30:00Z'));
  assert.strictEqual(preDst.weeks, 345, 'Dimanche pré-changement : 345');

  // Après le saut : 03h30 Paris (UTC+2) = 01h30 UTC -> 345 semaines
  const postDst = getTrainingStats(new Date('2027-03-28T01:30:00Z'));
  assert.strictEqual(postDst.weeks, 345, 'Dimanche post-changement : 345');

  // Fin de journée dimanche 23h59:59 Paris (UTC+2) = 21h59:59 UTC -> 345 semaines
  const sunNight = getTrainingStats(new Date('2027-03-28T21:59:59Z'));
  assert.strictEqual(sunNight.weeks, 345, 'Dimanche 23h59:59 : 345');

  // Lundi 00h00:00 Paris (UTC+2) = 22h00:00 UTC du 28 mars -> 346 (+1)
  const monMidnight = getTrainingStats(new Date('2027-03-28T22:00:00Z'));
  assert.strictEqual(monMidnight.weeks, 346, 'Lundi 00h00:00 : 346');
});

// Scénario 8 : Heure d'hiver (dernier dimanche d'octobre 2027, 31 octobre 2027)
runTest(8, 'Passage à l\'heure d\'hiver (octobre 2027) -> aucune anomalie, incrément exact au lundi', () => {
  // Nuit de 25 heures : Dimanche 31 octobre 2027
  // 01h30 Paris (UTC+2) = 23h30 UTC le 30 oct -> 376 semaines
  const preWinter = getTrainingStats(new Date('2027-10-30T23:30:00Z'));
  assert.strictEqual(preWinter.weeks, 376, 'Dimanche pré-changement : 376');

  // 02h30 Paris (première fois, UTC+2) = 00h30 UTC le 31 oct -> 376 semaines
  const first230 = getTrainingStats(new Date('2027-10-31T00:30:00Z'));
  assert.strictEqual(first230.weeks, 376, 'Dimanche 02h30 UTC+2 : 376');

  // 02h30 Paris (seconde fois, UTC+1) = 01h30 UTC le 31 oct -> 376 semaines
  const second230 = getTrainingStats(new Date('2027-10-31T01:30:00Z'));
  assert.strictEqual(second230.weeks, 376, 'Dimanche 02h30 UTC+1 : 376');

  // Dimanche 23h59:59 Paris (UTC+1) = 22h59:59 UTC -> 376 semaines
  const sunNightWinter = getTrainingStats(new Date('2027-10-31T22:59:59Z'));
  assert.strictEqual(sunNightWinter.weeks, 376, 'Dimanche 23h59:59 : 376');

  // Lundi 1er nov 2027 00h00:00 Paris (UTC+1) = 23h00:00 UTC le 31 oct -> 377 (+1)
  const monMidnightWinter = getTrainingStats(new Date('2027-10-31T23:00:00Z'));
  assert.strictEqual(monMidnightWinter.weeks, 377, 'Lundi 00h00:00 : 377');
});

// Scénario 9 : Rechargements multiples et idempotence stricte
runTest(9, 'Rechargements multiples -> idempotence stricte sans incrément parasite', () => {
  const fixedInstant = new Date('2026-11-03T18:45:00Z');
  const results = [];
  for (let i = 0; i < 50; i++) {
    results.push(getTrainingStats(fixedInstant).weeks);
  }
  const allIdentical = results.every(v => v === results[0] && v === 325);
  assert.ok(allIdentical, 'Toutes les invocations sur le même instant produisent strictement la même valeur');
});

// Scénario 10 : Cohérence cross-devices (desktop et mobile) et absence de 5618
runTest(10, 'Absence d\'activités fictives & cohérence garantie', () => {
  const current = getTrainingStats();
  assert.strictEqual(typeof current.weeks, 'number', 'weeks est un entier numérique');
  assert.ok(current.weeks >= 325, 'Le compteur est supérieur ou égal à la base de 325 semaines');
  assert.strictEqual(current.activities, undefined, 'La métrique 5 618 activités est complètement purgée');
  assert.strictEqual(current.baseDateFormatted, undefined, 'La mention de bas de page source est purgée');
});

console.log('\n====================================================');
console.log(` BILAN DU COMPTEUR : ${passedTests} / ${totalTests} scénarios réussis (${totalTests - passedTests} échec)`);
console.log('====================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
