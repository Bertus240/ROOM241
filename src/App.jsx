import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Parcours from './pages/Parcours';
import PersonalUniverse from './pages/PersonalUniverse';
import FooterContact from './components/FooterContact';
import CvModal from './components/CvModal';
import AdminDashboard from './components/AdminDashboard';
import ProjectDetail from './components/ProjectDetail';
import HornetCaseStudy from './pages/HornetCaseStudy';
import MentionsLegales from './components/MentionsLegales';
import PolitiqueConfidentialite from './components/PolitiqueConfidentialite';
import BackToTop from './components/BackToTop';
import StudioPointer from './components/StudioPointer';
import Kuro from './components/Kuro';
import Blocked from './pages/Blocked';
import { projectsData } from './data/projects';
import { incrementPageView } from './lib/telemetry';
import { initTheme, syncThemeWithRoute, applyTheme } from './lib/theme';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isCvModalOpen, setIsCvModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('cv') === 'open' || window.location.hash === '#cv';
    }
    return false;
  });

  // Initialisation du thème déterministe et gestion de la persistance de scroll au reload
  useEffect(() => {
    initTheme(window.location.pathname);

    // Empêcher le navigateur de reset le scroll avant que React ait monté les composants
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleHashChange = () => {
      if (window.location.hash === '#cv') {
        setIsCvModalOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    // Restauration du scroll mémorisé au rechargement de page (reload)
    const savedPath = sessionStorage.getItem('room241_last_path');
    const savedScroll = sessionStorage.getItem(`room241_scroll_pos_${window.location.pathname}`);

    // Si on n'a pas de hash spécifique dans l'URL (#contact, etc.) et qu'on a un scroll mémorisé
    if (!window.location.hash && savedScroll) {
      const targetY = parseInt(savedScroll, 10);
      if (!isNaN(targetY) && targetY > 0) {
        // Double tentative pour garantir la restauration après chargement des images et polices
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        });
        setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }, 120);
        setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }, 300);
      }
    }
  }, []);

  // Mémorisation continue de la position de scroll pour le chemin actif
  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        if (!window.location.hash) {
          try {
            sessionStorage.setItem(`room241_scroll_pos_${currentPath}`, String(Math.round(window.scrollY)));
            sessionStorage.setItem('room241_last_path', currentPath);
          } catch (e) {
            // Ignore quota errors
          }
        }
      }, 150);
    };

    const handleBeforeUnload = () => {
      try {
        sessionStorage.setItem(`room241_scroll_pos_${currentPath}`, String(Math.round(window.scrollY)));
        sessionStorage.setItem('room241_last_path', currentPath);
      } catch (e) {
        // Ignore quota errors
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentPath]);

  // Écoute de l'historique du navigateur (boutons précédent / suivant)
  useEffect(() => {
    const handleLocationChange = () => {
      const nextPath = window.location.pathname || '/';
      syncThemeWithRoute(nextPath);
      setCurrentPath(nextPath);
      incrementPageView();
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Synchronisation stricte et déterministe du thème avec la route active
  useEffect(() => {
    syncThemeWithRoute(currentPath);
  }, [currentPath]);

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

    const targetPath = pathname || '/';
    syncThemeWithRoute(targetPath);
    window.history.pushState({}, '', path);
    setCurrentPath(targetPath);
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

  // Page 403 / restriction d'accès dédiée (support URL directe et simulation locale ?test_country=DE)
  if (
    currentPath === '/403' ||
    currentPath === '/blocked' ||
    (typeof window !== 'undefined' && window.location.search.includes('test_country=DE'))
  ) {
    return <Blocked navigate={navigate} />;
  }

  // Prise en charge des routes dédiées aux études de cas (/realisations/:slug et /projets/:slug)
  const isRealisationRoute = currentPath.startsWith('/realisations/');
  const isProjetDetailRoute = currentPath.startsWith('/projets/') && currentPath !== '/projets/';
  const isProjectDetailRoute = isRealisationRoute || isProjetDetailRoute;
  const projectSlug = isRealisationRoute
    ? currentPath.replace('/realisations/', '')
    : (isProjetDetailRoute ? currentPath.replace('/projets/', '') : null);

  if (isProjectDetailRoute && projectSlug && projectsData[projectSlug]) {
    const isHornet = projectSlug === 'hornetsecurity';
    return (
      <div className="bg-[#FFFFFF] dark:bg-[#0B0A09] text-[#09090B] dark:text-[#EDEDED] min-h-screen font-sans selection:bg-[#FFAD00] selection:text-black flex flex-col justify-between transition-colors duration-300">
        <StudioPointer />
        <Header currentPath={currentPath} navigate={navigate} />
        <main className="flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex-grow flex flex-col"
            >
              {isHornet ? (
                <HornetCaseStudy navigate={navigate} />
              ) : (
                <ProjectDetail slug={projectSlug} navigate={navigate} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
        <FooterContact navigate={navigate} />
        <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
        <Kuro currentPath={currentPath} navigate={navigate} onOpenCvModal={() => setIsCvModalOpen(true)} />
        <BackToTop />
        <SpeedInsights />
      </div>
    );
  }

  // Rendu des rubriques principales (avec alias rétro-compatibles)
  const renderPage = () => {
    switch (currentPath) {
      // 2. Projets (regroupant toutes les études de cas documentées)
      case '/projets':
      case '/realisations':
      case '/studio':
        return <Projects navigate={navigate} />;

      case '/hornetsecurity':
        return <HornetCaseStudy navigate={navigate} />;

      // 3. Parcours (profil, expérience, compétences, CV)
      case '/parcours':
      case '/a-propos':
        return <Parcours navigate={navigate} onOpenCvModal={() => setIsCvModalOpen(true)} />;

      // 4. Univers Personnel (« Au-delà du travail » • Véritable mode sombre)
      case '/hors-cadre':
      case '/au-dela-du-travail':
        return (
          <PersonalUniverse
            navigate={navigate}
            onSwitchToPro={() => {
              applyTheme('light');
              navigate('/');
            }}
          />
        );

      // 5. Mentions légales et politique de confidentialité
      case '/mentions-legales':
        return <MentionsLegales navigate={navigate} />;

      case '/politique-de-confidentialite':
      case '/politique-confidentialite':
        return <PolitiqueConfidentialite navigate={navigate} />;

      // 1. Accueil par défaut
      case '/':
      default:
        return <Home navigate={navigate} onOpenCvModal={() => setIsCvModalOpen(true)} />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#0B0A09] text-[#09090B] dark:text-[#EDEDED] min-h-screen font-sans selection:bg-[#FFAD00] selection:text-black flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      
      {/* Halo jaune fluide ambiant qui suit la souris */}
      <StudioPointer />

      {/* 1. Header fixe épuré avec logo ROOM241 et exactement 3 entrées */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* 2. Contenu principal selon la rubrique active avec transition de page fluide */}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow flex flex-col"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer sobre avec coordonnées directes */}
      <FooterContact navigate={navigate} />

      {/* Bouton retour en haut de page */}
      <BackToTop />

      {/* Compagnon interactif Kuro */}
      <Kuro currentPath={currentPath} navigate={navigate} onOpenCvModal={() => setIsCvModalOpen(true)} />

      {/* Modale CV synthétique téléchargeable */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Mesure de performance Vercel Speed Insights */}
      <SpeedInsights />

    </div>
  );
}
