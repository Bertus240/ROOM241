import React, { useState, useEffect } from 'react';
import { profileData } from '../data/profile';
import { editorialPhotos, marathonPhoto } from '../data/gallery';
import EditorialViewer from '../components/EditorialViewer';
import ParcoursHero from '../components/parcours/ParcoursHero';
import ParcoursGallery from '../components/parcours/ParcoursGallery';
import ParcoursTimeline from '../components/parcours/ParcoursTimeline';
import ParcoursFormation from '../components/parcours/ParcoursFormation';
import ParcoursAthleticProof from '../components/parcours/ParcoursAthleticProof';
import ParcoursSkills from '../components/parcours/ParcoursSkills';
import ParcoursContact from '../components/parcours/ParcoursContact';

export default function Parcours({ onOpenCvModal }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Liste complète des images pour la visionneuse plein écran (incluant réalisations in situ)
  const allModalImages = [
    ...editorialPhotos,
    {
      src: "/assets/hornetsecurity/fic/Stand/IMG20250401075301.jpg",
      alt: "Stand Hornetsecurity > 150 m² au FIC (Zénith de Lille)",
      caption: "Scénographie et flux visiteurs — Stand 150 m² au FIC (Zénith de Lille, accès Grand Palais)",
      place: "Lille, France",
      category: "Scénographie"
    },
    {
      src: "/assets/hornetsecurity/arch_back_motion.png",
      alt: "Rendu After Effects de l'arche vidéo d'accueil LED",
      caption: "Animation After Effects 1080p 60fps diffusée sur l'arche LED du FIC 2026",
      place: "After Effects 1080p",
      category: "Motion Design"
    },
    {
      src: marathonPhoto.src,
      alt: marathonPhoto.alt,
      caption: marathonPhoto.caption,
      place: "Venise, Italie",
      category: "Marathon"
    }
  ];

  // Gestion clavier pour la visionneuse plein écran
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % allModalImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + allModalImages.length) % allModalImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allModalImages.length]);

  // Verrouillage du scroll en mode lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const { identity, manifesto, skills, athleticProof } = profileData;

  return (
    <div className="pt-24 sm:pt-28 pb-28 space-y-24 sm:space-y-36">

      {/* 1. Premier écran : Photographie forte immédiate & Ouverture personnelle */}
      <ParcoursHero
        identity={identity}
        manifesto={manifesto}
        photo={editorialPhotos[0]}
        onOpenCvModal={onOpenCvModal}
        onOpenLightbox={setLightboxIndex}
      />

      {/* 2. Galerie éditoriale personnelle */}
      <ParcoursGallery
        editorialPhotos={editorialPhotos}
        onOpenLightbox={setLightboxIndex}
      />

      {/* 3. Expérience centrale : Hornetsecurity (CDI) & Piliers documentés */}
      <ParcoursTimeline
        onOpenLightbox={setLightboxIndex}
      />

      {/* 4. Formation académique structurée */}
      <ParcoursFormation />

      {/* 5. Preuve athlétique & Rigueur personnelle */}
      <ParcoursAthleticProof
        athleticProof={athleticProof}
        marathonPhoto={marathonPhoto}
        onOpenLightbox={setLightboxIndex}
      />

      {/* 6. Compétences opérationnelles & Stack technique */}
      <ParcoursSkills
        skills={skills}
      />

      {/* 7. Section éditoriale CV synthétique & Contact */}
      <ParcoursContact
        onOpenCvModal={onOpenCvModal}
      />

      {/* Visionneuse plein écran haut de gamme — ROOM241 Editorial Viewer */}
      <EditorialViewer
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={allModalImages}
        currentIndex={lightboxIndex || 0}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        projectContext="Parcours · Photographies & Hors-cadre"
      />

    </div>
  );
}
