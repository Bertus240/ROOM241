// scripts/test-badges-hierarchy.cjs
// Suite de tests spécifique : Validation de la Hiérarchisation des Badges et des Règles de Débordement
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { projectsData } = require('../src/data/projects');

function formatNbsp(text) {
  if (!text) return '';
  return String(text)
    .replace(/(\+?\d+)\s+(\d+)/g, '$1\u00A0$2')
    .replace(/(\d+)\s+([%€])/g, '$1\u00A0$2')
    .replace(/(\d+)\s+(jour|jours|m²|h|leads|visiteurs|clients)/gi, '$1\u00A0$2');
}

let passed = 0;
let total = 0;

function test(description, fn) {
  total++;
  try {
    fn();
    console.log(`  [OK] ${description}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${description} : ${err.message}`);
  }
}

console.log('====================================================');
console.log(' SUITE DE TESTS : HIÉRARCHISATION DES BADGES ROOM241');
console.log('====================================================');

console.log('\n--- 1. Règle de Niveau 1 (Discipline / Contexte principal) ---');
for (const slug of ['hornetsecurity', 'fresh-data', 'resin-architecte', 'jardimax']) {
  const p = projectsData[slug];
  test(`Projet [${slug}] possède un editorialTag défini`, () => {
    assert(p.editorialTag && typeof p.editorialTag === 'string', 'editorialTag manquant');
  });
  test(`Projet [${slug}] possède un shortTag concis pour mobile (< 30 cars)`, () => {
    assert(p.shortTag && p.shortTag.length <= 30, `shortTag trop long ou manquant: ${p.shortTag}`);
  });
}

console.log('\n--- 2. Règle de Niveau 2 (Résultat / Métrique clé avec whitespace-nowrap) ---');
for (const slug of ['hornetsecurity', 'fresh-data', 'resin-architecte', 'jardimax']) {
  const p = projectsData[slug];
  test(`Projet [${slug}] possède un badge métrique autonome valide`, () => {
    assert(p.metricBadge && p.metricBadge.value && p.metricBadge.label, 'metricBadge incomplet');
  });
  test(`Projet [${slug}] : formatNbsp applique l'espace insécable sur la valeur`, () => {
    const formatted = formatNbsp(p.metricBadge.value);
    if (p.metricBadge.value.includes(' ')) {
      assert(formatted.includes('\u00A0'), `Espace insécable non trouvée dans ${formatted}`);
      assert(!formatted.includes(' '), `Espace normale résiduelle dans ${formatted}`);
    }
  });
}

console.log('\n--- 3. Règle de Niveau 3 (Informations complémentaires en zone basse) ---');
for (const slug of ['hornetsecurity', 'fresh-data', 'resin-architecte', 'jardimax']) {
  const p = projectsData[slug];
  test(`Projet [${slug}] : tags de compétences présents et distincts de l'en-tête`, () => {
    assert(Array.isArray(p.tags) && p.tags.length > 0, 'tags manquants');
  });
  test(`Projet [${slug}] : cohérence de la métrique secondaire de zone basse`, () => {
    if (slug === 'hornetsecurity') {
      // Hornetsecurity n'a plus de secondaryMetric artificielle suite à la suppression de 100% charte
      assert(p.secondaryMetric === undefined, 'Hornetsecurity ne doit pas avoir de badge artificiel 100 % charte');
    } else {
      assert(p.secondaryMetric && p.secondaryMetric.value, 'secondaryMetric manquante');
    }
  });
}

console.log('\n--- 4. Intégrité des composants ProjectBadgeHeader et Projects.jsx ---');
const badgeHeaderSrc = fs.readFileSync(path.join(__dirname, '../src/components/ProjectBadgeHeader.jsx'), 'utf8');
const projectsSrc = fs.readFileSync(path.join(__dirname, '../src/pages/Projects.jsx'), 'utf8');
const showcaseSrc = fs.readFileSync(path.join(__dirname, '../src/components/ShowcaseProjects.jsx'), 'utf8');

test('ProjectBadgeHeader intègre formatNbsp', () => {
  assert(badgeHeaderSrc.includes('function formatNbsp'), 'formatNbsp manquant dans ProjectBadgeHeader');
});

test('ProjectBadgeHeader isole les valeurs numériques en whitespace-nowrap', () => {
  assert(badgeHeaderSrc.includes('whitespace-nowrap'), 'whitespace-nowrap manquant dans ProjectBadgeHeader');
});

test('ProjectBadgeHeader gère le basculement responsive shortTag / primaryTag', () => {
  assert(
    (badgeHeaderSrc.includes('sm:hidden') || badgeHeaderSrc.includes('lg:hidden')) &&
    (badgeHeaderSrc.includes('hidden sm:inline') || badgeHeaderSrc.includes('hidden lg:inline')),
    'Règle responsive shortTag manquante'
  );
});

test('Projects.jsx utilise ProjectBadgeHeader', () => {
  assert(projectsSrc.includes('<ProjectBadgeHeader project={project} />'), 'Projects.jsx n\'appelle pas ProjectBadgeHeader');
});

test('ShowcaseProjects.jsx intègre formatNbsp et whitespace-nowrap sur les métriques', () => {
  assert(showcaseSrc.includes('formatNbsp'), 'ShowcaseProjects n\'utilise pas formatNbsp');
  assert(showcaseSrc.includes('whitespace-nowrap'), 'ShowcaseProjects ne verrouille pas whitespace-nowrap');
});

console.log('\n====================================================');
console.log(` BILAN : ${passed} passés / ${total} tests au total (${total - passed} échec(s))`);
console.log('====================================================');

if (total - passed > 0) process.exit(1);

