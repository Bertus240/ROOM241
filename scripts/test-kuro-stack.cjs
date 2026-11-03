const assert = require('assert');

// Simulation de la pile de navigation de Kuro
function createNavigationStack(initial = ['home']) {
  let history = [...initial];
  let direction = 1;

  return {
    getHistory: () => [...history],
    getCurrentStep: () => history[history.length - 1],
    pushStep: (step) => {
      direction = 1;
      history.push(step);
    },
    popStep: () => {
      if (history.length > 1) {
        direction = -1;
        history.pop();
      }
    },
    resetHistory: () => {
      direction = -1;
      history = ['home'];
    },
    canGoBack: () => history.length > 1,
    getDirection: () => direction,
  };
}

console.log('=== TEST DU SCÉNARIO OBLIGATOIRE DE PILE KURO ===');

const nav = createNavigationStack(['home']);
assert.strictEqual(nav.getCurrentStep(), 'home');
assert.strictEqual(nav.canGoBack(), false, 'Home ne doit pas avoir de bouton retour');
console.log('[OK] 1. Départ sur Accueil (home), pas de retour');

// Accueil -> Catégories
nav.pushStep('categories');
assert.strictEqual(nav.getCurrentStep(), 'categories');
assert.strictEqual(nav.canGoBack(), true);
assert.deepStrictEqual(nav.getHistory(), ['home', 'categories']);
console.log('[OK] 2. Accueil -> Catégories, retour disponible');

// Catégories -> Vidéo & Motion
nav.pushStep('category_motion');
assert.strictEqual(nav.getCurrentStep(), 'category_motion');
assert.strictEqual(nav.canGoBack(), true);
assert.deepStrictEqual(nav.getHistory(), ['home', 'categories', 'category_motion']);
console.log('[OK] 3. Catégories -> Vidéo & Motion, retour disponible');

// Vidéo & Motion -> Projet (Jardimax)
nav.pushStep('project_jardimax');
assert.strictEqual(nav.getCurrentStep(), 'project_jardimax');
assert.strictEqual(nav.canGoBack(), true);
assert.deepStrictEqual(nav.getHistory(), ['home', 'categories', 'category_motion', 'project_jardimax']);
console.log('[OK] 4. Vidéo & Motion -> Projet, retour disponible');

// Projet -> Retour (Vidéo & Motion)
nav.popStep();
assert.strictEqual(nav.getCurrentStep(), 'category_motion');
assert.strictEqual(nav.canGoBack(), true);
assert.strictEqual(nav.getDirection(), -1);
assert.deepStrictEqual(nav.getHistory(), ['home', 'categories', 'category_motion']);
console.log('[OK] 5. Projet -> Retour -> Vidéo & Motion');

// Vidéo & Motion -> Retour (Catégories)
nav.popStep();
assert.strictEqual(nav.getCurrentStep(), 'categories');
assert.strictEqual(nav.canGoBack(), true);
assert.strictEqual(nav.getDirection(), -1);
assert.deepStrictEqual(nav.getHistory(), ['home', 'categories']);
console.log('[OK] 6. Vidéo & Motion -> Retour -> Catégories');

// Catégories -> Retour (Accueil)
nav.popStep();
assert.strictEqual(nav.getCurrentStep(), 'home');
assert.strictEqual(nav.canGoBack(), false);
assert.strictEqual(nav.getDirection(), -1);
assert.deepStrictEqual(nav.getHistory(), ['home']);
console.log('[OK] 7. Catégories -> Retour -> Accueil, pile revenue à 1 élément');

console.log('TOUS LES TESTS DU SCÉNARIO DE NAVIGATION SONT VALIDÉS AVEC SUCCÈS (7/7).');

