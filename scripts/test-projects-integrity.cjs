// scripts/test-projects-integrity.cjs
// Test automatisé d'intégrité et de non-désynchronisation des cartes projets
// Studio ROOM241 • Rémi Brocart

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [OK] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
  }
}

async function runTests() {
  console.log('====================================================');
  console.log(' SUITE DE TESTS : INTÉGRITÉ DES CARTES PROJETS');
  console.log('====================================================\n');

  // 1. Chargement des données sources
  const projectsModule = await import('file:///' + path.join(ROOT, 'src', 'data', 'projects.js').replace(/\\/g, '/'));
  const projectsData = projectsModule.projectsData;

  const showcaseSrc = fs.readFileSync(path.join(ROOT, 'src', 'components', 'ShowcaseProjects.jsx'), 'utf8');
  const projectDetailSrc = fs.readFileSync(path.join(ROOT, 'src', 'components', 'ProjectDetail.jsx'), 'utf8');

  console.log('--- 1. Présence et complétude des projets requis ---');
  const requiredSlugs = ['hornetsecurity', 'fresh-data', 'resin-architecte', 'jardimax'];
  assert(projectsData !== undefined && typeof projectsData === 'object', 'projectsData est exporté');
  
  for (const slug of requiredSlugs) {
    const p = projectsData[slug];
    assert(p !== undefined, `Projet [${slug}] existe dans projectsData`);
    assert(p.slug === slug, `Projet [${slug}] a son slug aligné`);
    assert(typeof p.title === 'string' && p.title.length > 5, `Projet [${slug}] a un titre éditorial valide`);
    assert(typeof p.description === 'string' && p.description.length > 10, `Projet [${slug}] a une description valide`);
    assert(typeof p.image === 'string' && p.image.startsWith('/'), `Projet [${slug}] a un chemin d'image valide`);
    assert(p.metricBadge && p.metricBadge.value && p.metricBadge.label, `Projet [${slug}] a un badge métrique autonome`);

    // Vérification de l'existence physique du média
    const relativeImgPath = p.image.startsWith('/') ? p.image.slice(1) : p.image;
    const fullImgPath = path.join(PUBLIC_DIR, relativeImgPath);
    assert(fs.existsSync(fullImgPath), `L'image de [${slug}] existe sur disque (${relativeImgPath})`);
  }

  console.log('\n--- 2. Spécification exacte du projet FIC / Hornetsecurity ---');
  const hornet = projectsData['hornetsecurity'];
  assert(
    hornet.editorialTag === 'SALON INTERNATIONAL & EXPÉRIENCE DE MARQUE' ||
    hornet.tag === 'SALON INTERNATIONAL & EXPÉRIENCE DE MARQUE',
    'Tag Hornetsecurity : SALON INTERNATIONAL & EXPÉRIENCE DE MARQUE'
  );
  assert(
    hornet.title === "Scénographie et stand d'envergure (> 150 m²)",
    "Titre Hornetsecurity : Scénographie et stand d'envergure (> 150 m²)"
  );
  assert(
    hornet.description.includes('leader européen de la cybersécurité'),
    'Description Hornetsecurity décrit un leader européen de la cybersécurité'
  );
  assert(
    hornet.metricBadge.value === '+4 000' && hornet.metricBadge.label.includes('visiteurs accueillis'),
    'Métrique principale Hornetsecurity : +4 000 visiteurs accueillis'
  );
  assert(
    hornet.secondaryMetric === undefined,
    'Hornetsecurity : Suppression du badge secondaire artificiel 100 % charte'
  );
  assert(
    !JSON.stringify(hornet.metrics).includes('100 %') && !JSON.stringify(hornet.metrics).includes('3 Salons'),
    'Hornetsecurity : Suppression des indicateurs artificiels (100% charte, 3 salons)'
  );
  assert(
    hornet.heroStage &&
    hornet.heroStage.tag === 'SALON INTERNATIONAL & ÉVÉNEMENTIEL B2B' &&
    hornet.heroStage.title === "Arche d'entrée immersive et scénographie au FIC" &&
    hornet.heroStage.description.includes('leader européen en cybersécurité') &&
    hornet.heroStage.metricBadge.value === '+4 000' &&
    hornet.heroStage.metricBadge.label.includes('visiteurs accueillis sur le stand'),
    'HeroStage Hornetsecurity : Contenus FIC exacts prescrits'
  );
  assert(
    hornet.image === '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
    'Image Hornetsecurity : Photographie du stand FIC'
  );
  assert(
    !hornet.title.includes('Résin') && !hornet.description.includes('résine'),
    'Aucune mention de Résin dans le projet Hornetsecurity'
  );

  console.log('\n--- 3. Spécification exacte du projet Résin\'Architecte ---');
  const resin = projectsData['resin-architecte'];
  assert(
    resin.editorialTag === 'BTP, ARTISANAT & SAVOIR-FAIRE' ||
    resin.tag === 'BTP, ARTISANAT & SAVOIR-FAIRE',
    'Tag Résin\'Architecte : BTP, ARTISANAT & SAVOIR-FAIRE'
  );
  assert(
    resin.title.includes('Résin\'Architecte') && resin.title.includes('chantiers'),
    'Titre Résin\'Architecte orienté chantiers et valorisation technique'
  );
  assert(
    resin.image.startsWith('/assets/social-proof-ra/'),
    'Image Résin\'Architecte provient du dossier social-proof-ra'
  );
  assert(
    resin.metricBadge.value === '+219 %' && resin.metricBadge.label.includes('portée'),
    'Métrique Résin\'Architecte : +219 % portée organique'
  );
  assert(
    !resin.title.includes('FIC') && !resin.description.includes('cybersécurité'),
    'Aucune mention de cybersécurité ou de salon FIC dans Résin\'Architecte'
  );
  assert(
    resin.heroStage &&
    resin.heroStage.tag === 'IMMERSION CHANTIER & SAVOIR-FAIRE' &&
    resin.heroStage.title === "Précision de pose aux abords d'une piscine résidentielle" &&
    resin.heroStage.description.includes('revêtement drainant') &&
    resin.heroStage.metricBadge.value === '+219% ORGANIQUE' &&
    resin.heroStage.metricBadge.label === "0 € D'ACHAT D'ESPACE",
    'HeroStage Résin\'Architecte : Contenus artisanat et chantier préservés'
  );
  assert(
    !JSON.stringify(resin).includes('8 mm') && !JSON.stringify(resin).includes('8mm'),
    'Résin\'Architecte : Suppression intégrale de la règle des 8 mm drainants'
  );

  console.log('\n--- 4. Spécification exacte de Fresh Data et Jardimax ---');
  const fresh = projectsData['fresh-data'];
  assert(
    fresh.metricBadge.value === '116 %',
    'Métrique Fresh Data : 116 % objectif Ulule'
  );
  assert(
    fresh.image === '/assets/fresh-data-video-cover.jpg',
    'Image Fresh Data : cover vidéo salon MEDFEL'
  );

  const jardi = projectsData['jardimax'];
  assert(
    jardi.metricBadge.value === '1 journée' && jardi.metricBadge.label.includes('travail'),
    'Métrique Jardimax : 1 journée de travail'
  );
  assert(
    !JSON.stringify(jardi.metrics).includes('430 €'),
    'Jardimax : Suppression des 430 € des résultats et indicateurs'
  );
  assert(
    jardi.image === '/assets/jardimax/jardimax_cover.jpg',
    'Image Jardimax : cover showroom et atelier'
  );

  console.log('\n--- 5. Non-désynchronisation de SHOWCASE_PROJECTS ---');
  assert(showcaseSrc.includes("import { projectsData } from '../data/projects'"), 'ShowcaseProjects importe la source unique projectsData');
  assert(showcaseSrc.includes('Object.values(projectsData)'), 'SHOWCASE_PROJECTS est dérivé de projectsData sans tableau parallèle codé en dur');
  assert(showcaseSrc.includes('currentProject.metricBadge'), 'ShowcaseProjects intègre le badge métrique en verre dépoli');
  assert(showcaseSrc.includes('from-black/85 via-black/35 to-transparent'), 'ShowcaseProjects intègre le dégradé progressif sur le visuel');

  console.log('\n--- 6. Découplage strict et suppression des fallbacks croisés dans ProjectDetail.jsx ---');
  // Vérification de l'absence de toute condition par slug dans le heroStage de ProjectDetail.jsx
  assert(!projectDetailSrc.includes("project.slug === 'hornetsecurity'"), 'ProjectDetail.jsx ne contient aucun ternaire basé sur le slug hornetsecurity');
  assert(!projectDetailSrc.includes("project.slug === 'resin-architecte'"), 'ProjectDetail.jsx ne contient aucun ternaire basé sur le slug resin-architecte');
  
  // Vérification de l'absence de fallbacks textuels croisés en dur
  assert(!projectDetailSrc.includes("|| 'IMMERSION CHANTIER & SAVOIR-FAIRE'"), 'ProjectDetail.jsx ne contient aucun fallback textuel en dur vers Résin\'Architecte');
  assert(!projectDetailSrc.includes('|| "Arche d\'entrée immersive'), 'ProjectDetail.jsx ne contient aucun fallback textuel en dur vers Hornetsecurity');
  assert(!projectDetailSrc.includes("|| '+219% ORGANIQUE'"), 'ProjectDetail.jsx ne contient aucun fallback de métrique en dur');
  assert(!projectDetailSrc.includes("|| '+4 000'"), 'ProjectDetail.jsx ne contient aucun fallback de métrique Hornetsecurity en dur');

  // Vérification que le rendu du heroStage est 100% conditionnel à project.heroStage
  assert(projectDetailSrc.includes('{project.heroStage && ('), 'ProjectDetail.jsx conditionne l\'overlay à la présence effective de project.heroStage');
  assert(projectDetailSrc.includes('{project.heroStage.tag && ('), 'ProjectDetail.jsx vérifie project.heroStage.tag');
  assert(projectDetailSrc.includes('{project.heroStage.title && ('), 'ProjectDetail.jsx vérifie project.heroStage.title');
  assert(projectDetailSrc.includes('{project.heroStage.description && ('), 'ProjectDetail.jsx vérifie project.heroStage.description');
  assert(projectDetailSrc.includes('{project.heroStage.metricBadge && ('), 'ProjectDetail.jsx vérifie project.heroStage.metricBadge');

  // Isolation stricte des données entre projets
  assert(hornet.heroStage.tag !== resin.heroStage.tag, 'Tags heroStage strictement distincts entre Hornetsecurity et Résin\'Architecte');
  assert(hornet.heroStage.title !== resin.heroStage.title, 'Titres heroStage strictement distincts entre Hornetsecurity et Résin\'Architecte');
  assert(hornet.heroStage.metricBadge.value !== resin.heroStage.metricBadge.value, 'Valeurs de métrique heroStage strictement distinctes');
  assert(!hornet.heroStage.description.includes('drainant'), 'La description heroStage de Hornetsecurity ne mentionne aucun terme de résine drainante');
  assert(!resin.heroStage.description.includes('cybersécurité'), 'La description heroStage de Résin\'Architecte ne mentionne aucun terme de cybersécurité');

  // Vérification qu'un projet sans heroStage (fresh-data, jardimax) n'a pas d'objet heroStage fantôme
  assert(projectsData['fresh-data'].heroStage === undefined, 'Fresh Data n\'a pas de heroStage (utilise son propre videoStage)');
  assert(projectsData['jardimax'].heroStage === undefined, 'Jardimax n\'a pas de heroStage (pas de pollution croisée)');

  console.log('\n--- 7. Coordonnées et validation éditoriale globale ---');
  const profileModule = await import('file:///' + path.join(ROOT, 'src', 'data', 'profile.js').replace(/\\/g, '/'));
  assert(profileModule.profileData.identity.links.phoneFormatted === '07 67 12 38 58', 'Numéro visible : 07 67 12 38 58');
  assert(profileModule.profileData.identity.links.phone === '+33767123858', 'Numéro technique : tel:+33767123858');

  console.log('\n====================================================');
  console.log(` BILAN : ${passedTests} passés / ${totalTests} tests au total (${failedTests} échec(s))`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Erreur inattendue durant les tests :', err);
  process.exit(1);
});
