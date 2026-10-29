import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Parcours from './pages/Parcours';
import FooterContact from './components/FooterContact';
import CvModal from './components/CvModal';
import AdminDashboard from './components/AdminDashboard';
import ProjectDetail from './components/ProjectDetail';
import MentionsLegales from './components/MentionsLegales';
import PolitiqueConfidentialite from './components/PolitiqueConfidentialite';
import BackToTop from './components/BackToTop';
import StudioPointer from './components/StudioPointer';
import Kuro from './components/Kuro';
import { projectsData } from './data/projects';
import { incrementPageView } from './lib/telemetry';
import { initTheme } from './lib/theme';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // Initialisation du thème light-mode pur
  useEffect(() => {
    initTheme();
  }, []);

  // Écoute de l'historique du navigateur (boutons précédent / suivant)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
      incrementPageView();
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Navigation client fluide avec pushState
  const navigate = (path) => {
    const [pathname, hash] = path.split('#');
    
    // Si c'est juste un hash sur la même page
    if (!pathname && hash) {
      window.history.pushState({}, '', `#${hash}`);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(pathname || '/');
    incrementPageView();

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Accès administrateur
  if (currentPath === '/admin' || window.location.hash.includes('#admin')) {
    return <AdminDashboard />;
  }

  // Rétro-compatibilité pour les liens profonds /realisations/:slug
  const isProjectDetailRoute = currentPath.startsWith('/realisations/');
  const projectSlug = isProjectDetailRoute ? currentPath.replace('/realisations/', '') : null;

  if (isProjectDetailRoute && projectsData[projectSlug]) {
    return (
      <div className="bg-[#FFFFFF] text-[#09090B] min-h-screen font-sans selection:bg-[#FFAD00] selection:text-black flex flex-col justify-between">
        <StudioPointer />
        <Header currentPath={currentPath} navigate={navigate} />
        <main className="flex-grow">
          <ProjectDetail slug={projectSlug} navigate={navigate} />
        </main>
        <FooterContact navigate={navigate} />
        <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
        <Kuro navigate={navigate} />
        <BackToTop />
      </div>
    );
  }

  // Rendu des 3 rubriques principales (avec alias rétro-compatibles)
  const renderPage = () => {
    switch (currentPath) {
      // 2. Projets (regroupant toutes les études de cas documentées)
      case '/projets':
      case '/hornetsecurity':
      case '/studio':
        return <Projects navigate={navigate} />;

      // 3. Parcours (profil, expérience, compétences, photographies, marathon)
      case '/parcours':
      case '/a-propos':
      case '/hors-cadre':
        return <Parcours navigate={navigate} onOpenCvModal={() => setIsCvModalOpen(true)} />;

      // 4. Mentions légales et politique de confidentialité
      case '/mentions-legales':
        return <MentionsLegales navigate={navigate} />;

      case '/politique-de-confidentialite':
      case '/politique-confidentialite':
        return <PolitiqueConfidentialite navigate={navigate} />;

      // 1. Accueil par défaut
      case '/':
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#09090B] min-h-screen font-sans selection:bg-[#FFAD00] selection:text-black flex flex-col justify-between overflow-x-hidden">
      
      {/* Halo jaune fluide ambiant qui suit la souris */}
      <StudioPointer />

      {/* 1. Header fixe épuré avec logo ROOM241 et exactement 3 entrées */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* 2. Contenu principal selon la rubrique active */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* 3. Footer sobre avec coordonnées directes */}
      <FooterContact navigate={navigate} />

      {/* Bouton retour en haut de page */}
      <BackToTop />

      {/* Compagnon interactif Kuro */}
      <Kuro navigate={navigate} />

      {/* Modale CV synthétique téléchargeable */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

    </div>
  );
}
