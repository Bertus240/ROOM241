import React from 'react';
import { ArrowLeft, Shield, FileText, Scale, Lock, Server } from 'lucide-react';
import { Reveal } from '../lib/motion';

export default function MentionsLegales({ navigate }) {
  const handleBack = (e) => {
    e.preventDefault();
    if (navigate) navigate('/');
    else window.location.href = '/';
  };

  return (
    <article className="bg-luxe py-16 sm:py-24 border-b border-room-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <a
          href="/"
          onClick={handleBack}
          className="link-arrow inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-room-muted hover:text-room-text transition-colors duration-150 py-2 mb-10"
        >
          <ArrowLeft className="w-4 h-4 text-room-amber" />
          <span>Retour à l'accueil</span>
        </a>

        <Reveal>
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-room-amber" />
            <span className="text-xs font-mono text-room-muted tracking-wider uppercase font-medium">
              Cadre réglementaire & mentions obligatoires
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-room-text leading-[1.1] mb-4">
            Mentions légales.
          </h1>
          <p className="text-xs font-mono text-room-subtle uppercase mb-12">
            Dernière mise à jour : novembre 2026
          </p>
        </Reveal>

        <div className="space-y-12 text-sm sm:text-base font-sans leading-relaxed">
          {/* 1. Éditeur du site */}
          <Reveal>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-room-amber" />
                <h2 className="text-xl font-bold text-room-text tracking-tight">
                  1. Édition du site et identification de l'entreprise
                </h2>
              </div>
              <div className="text-room-muted space-y-2.5">
                <p>
                  <strong className="text-room-text font-semibold">Éditeur :</strong> Rémi Brocart, Entrepreneur Individuel (EI).
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Régime juridique :</strong> Micro-entreprise.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Nom commercial :</strong> ROOM241.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Numéro SIREN :</strong> 934 313 305.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Numéro SIRET :</strong> 934 313 305 00013.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Code APE / NAF :</strong> 70.21Z — Conseil en relations publiques et communication (activités exercées : marketing, communication, digital, design).
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Inscription au RNE :</strong> Inscrit au Registre National des Entreprises (RNE) depuis le 17 octobre 2024.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Registre du Commerce et des Sociétés (RCS) :</strong> Non inscrit. En raison de la nature libérale et des prestations de services intellectuels exercées, l'entrepreneur individuel n'est pas assujetti à l'obligation d'immatriculation au RCS.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Taxe sur la Valeur Ajoutée (TVA) :</strong> Franchise en base de TVA — <em className="text-room-text font-medium not-italic">« TVA non applicable, article 293 B du CGI »</em>.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Adresse professionnelle :</strong>{' '}
                  <span className="text-room-subtle italic">
                    [Adresse professionnelle — Cysoing (59830) / Métropole Européenne de Lille — à confirmer avant publication définitive]
                  </span>
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Directeur de la publication :</strong> Rémi Brocart.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Adresse électronique officielle :</strong>{' '}
                  <a
                    href="mailto:brocart.remi02@gmail.com"
                    className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150"
                  >
                    brocart.remi02@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Profil LinkedIn :</strong>{' '}
                  <a
                    href="https://www.linkedin.com/in/remibrocart/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150"
                  >
                    linkedin.com/in/remibrocart
                  </a>
                </p>
              </div>
            </div>
          </Reveal>

          {/* 2. Hébergement */}
          <Reveal delay={50}>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-room-amber" />
                <h2 className="text-xl font-bold text-room-text tracking-tight">
                  2. Hébergement du site
                </h2>
              </div>
              <div className="text-room-muted space-y-3">
                <p>
                  Le site <strong className="text-room-text font-semibold">ROOM241</strong> est hébergé sur les infrastructures mondiales et le réseau de distribution de contenu (Edge Network) de :
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Vercel Inc.</strong><br />
                  440 N Barranca Ave #4133<br />
                  Covina, CA 91723, États-Unis<br />
                  Site web :{' '}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150"
                  >
                    vercel.com
                  </a>
                </p>
                <p className="text-xs text-room-subtle">
                  La plateforme d'hébergement opère avec des protocoles de sécurité avancés et un chiffrement strict des flux en transit (HTTPS / TLS).
                </p>
              </div>
            </div>
          </Reveal>

          {/* 3. Propriété intellectuelle */}
          <Reveal delay={100}>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-room-amber" />
                <h2 className="text-xl font-bold text-room-text tracking-tight">
                  3. Propriété intellectuelle et conditions d'exploitation
                </h2>
              </div>
              <div className="text-room-muted space-y-4">
                <div>
                  <h3 className="text-room-text font-semibold mb-1">
                    3.1 Créations et éléments propres au portfolio
                  </h3>
                  <p>
                    L'architecture générale du site, le code source, les compositions typographiques, les animations, les éléments interactifs, le graphisme, les textes, ainsi que les éléments d'identité de marque (dont la dénomination ROOM241 et sa charte graphique) sont protégés par le Code de la Propriété Intellectuelle (articles L. 111-1 et suivants) et constituent des œuvres originales de Rémi Brocart.
                  </p>
                  <p className="mt-2">
                    Toute reproduction, représentation, diffusion, adaptation ou rediffusion, totale ou partielle, sans l'accord écrit exprès et préalable de Rémi Brocart, est formellement interdite et constitue une contrefaçon passible des sanctions prévues aux articles L. 335-2 et suivants du Code de la Propriété Intellectuelle.
                  </p>
                </div>

                <div>
                  <h3 className="text-room-text font-semibold mb-1">
                    3.2 Créations réalisées pour le compte de commanditaires & cession de droits
                  </h3>
                  <p>
                    Conformément aux dispositions de l'article L. 131-3 du Code de la Propriété Intellectuelle, la cession des droits patrimoniaux d'auteur sur les créations réalisées par Rémi Brocart au profit de ses clients est subordonnée à ce que chacun des droits cédés fasse l'objet d'une mention expresse et délimitée (droits de reproduction, de représentation, étendue, destination, supports définis, territoire géographique et durée déterminée).
                  </p>
                  <p className="mt-2">
                    Sauf stipulation conventionnelle contraire expressément formulée au devis ou au contrat signé entre les parties, toute cession éventuelle de droits patrimoniaux est expressément conditionnée au complet paiement de l'intégralité des sommes convenues. Les fichiers sources, ébauches et déclinaisons non retenues demeurent la propriété exclusive de leur créateur.
                  </p>
                  <p className="mt-2">
                    En application de la législation française, Rémi Brocart conserve en toute circonstance son droit moral perpétuel, inaliénable et imprescriptible d'auteur (droit à la paternité de son nom et respect de l'œuvre), ainsi que le droit de présenter les créations achevées et validées à titre d'illustration de son savoir-faire dans son portfolio professionnel et ses démarches de prospection (droit de citation et de référence), sous réserve des impératifs de confidentialité convenus.
                  </p>
                </div>

                <div>
                  <h3 className="text-room-text font-semibold mb-1">
                    3.3 Marques et éléments graphiques de tiers
                  </h3>
                  <p>
                    Les marques, dénominations sociales, logotypes, produits ou contenus de tiers cités ou reproduits au titre des études de cas et collaborations professionnelles demeurent la propriété exclusive de leurs détenteurs respectifs. Leur mention sur ce portfolio intervient au titre de la stricte valorisation de références professionnelles réelles.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4. Confidentialité et projets sous scellé */}
          <Reveal delay={150}>
            <div id="engagement-nda" className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30 scroll-mt-28">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-room-amber" />
                <h2 className="text-xl font-bold text-room-text tracking-tight">
                  4. Confidentialité des échanges et projets sous scellé
                </h2>
              </div>
              <div className="text-room-muted space-y-3">
                <p>
                  Dans le cadre des prises de contact, demandes de chiffrage et missions confiées au studio, des informations stratégiques, financières, commerciales ou techniques à caractère non public peuvent être échangées entre les parties.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Cadre contractuel :</strong> Lorsque les devis ou contrats conclus le prévoient expressément, ou lors des échanges préalables nécessitant la communication de données non publiques, les parties conviennent de préserver la confidentialité réciproque de ces informations et de ne pas les divulguer sans accord préalable, selon les durées et modalités stipulées contractuellement.
                </p>
                <p>
                  Ne sont pas couvertes par cette obligation les informations déjà accessibles au public au jour de leur communication, celles légitimement reçues d'un tiers sans obligation de secret, ou celles dont la communication est exigée par une décision judiciaire ou réglementaire exécutoire.
                </p>
                <p>
                  <strong className="text-room-text font-semibold">Projets « sous scellé » & accord dédié (NDA) :</strong> Certaines études de cas figurant au portfolio sont présentées avec des restrictions visuelles partielles (« sous scellé ») par respect pour la stratégie de mise sur le marché de nos partenaires. Pour tout projet requérant des garanties juridiques renforcées avant la transmission d'éléments confidentiels, un accord de confidentialité bilatéral dédié (NDA ad hoc) peut être conclu sur simple demande préalable.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 5. Responsabilité et liens hypertextes */}
          <Reveal delay={200}>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5 text-room-amber" />
                <h2 className="text-xl font-bold text-room-text tracking-tight">
                  5. Responsabilité et liens hypertextes
                </h2>
              </div>
              <div className="text-room-muted space-y-3">
                <p>
                  Rémi Brocart met en œuvre l'ensemble des moyens raisonnables pour assurer l'exactitude des informations publiées et la continuité d'accès au portfolio. Toutefois, sa responsabilité ne saurait être engagée pour tout dysfonctionnement temporaire du réseau Internet, indisponibilité de l'hébergeur ou erreurs matérielles involontaires.
                </p>
                <p>
                  Le site contient des liens hypertextes orientant vers des sites externes (notamment LinkedIn, Google Agenda, Vercel, YouTube). ROOM241 n'exerce aucun contrôle sur ces plateformes tierces et ne peut être tenu responsable de leurs contenus, de leurs politiques de confidentialité ou de leurs éventuels changements de conditions d'utilisation.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
