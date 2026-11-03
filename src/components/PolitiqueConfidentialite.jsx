import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, Calendar, Activity, HardDrive, Video, UserCheck, ExternalLink, RotateCcw } from 'lucide-react';
import { Reveal } from '../lib/motion';
import { resetConsent } from '../lib/visitorChoice';

export default function PolitiqueConfidentialite({ navigate }) {
  const handleBack = (e) => {
    e.preventDefault();
    if (navigate) navigate('/');
    else window.location.href = '/';
  };

  const handleReset = () => {
    resetConsent();
    window.location.reload();
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
            <ShieldCheck className="w-4 h-4 text-room-amber" />
            <span className="text-xs font-mono text-room-muted tracking-wider uppercase font-medium">
              Protection des données personnelles & RGPD
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-room-text leading-[1.1] mb-4">
            Politique de confidentialité.
          </h1>
          <p className="text-xs font-mono text-room-subtle uppercase mb-12">
            Dernière mise à jour : novembre 2026
          </p>
        </Reveal>

        <div className="space-y-12 text-sm sm:text-base font-sans leading-relaxed">
          {/* 1. Responsable du traitement */}
          <Reveal>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <h2 className="text-xl font-bold text-room-text tracking-tight mb-4">
                1. Responsable du traitement des données
              </h2>
              <div className="text-room-muted space-y-2">
                <p>
                  Les données à caractère personnel collectées lors de l'utilisation du portfolio{' '}
                  <strong className="text-room-text font-semibold">ROOM241</strong> sont traitées sous la responsabilité de :
                </p>
                <div className="pl-4 border-l-2 border-room-amber/40 my-3 space-y-1 text-sm">
                  <p><strong className="text-room-text font-medium">Rémi Brocart</strong> — Entrepreneur Individuel (EI)</p>
                  <p>Nom commercial : ROOM241 (Micro-entreprise)</p>
                  <p>SIREN : 934 313 305 — SIRET : 934 313 305 00013</p>
                  <p className="text-room-subtle italic">
                    [Adresse professionnelle — Cysoing (59830) / Métropole Européenne de Lille — à confirmer avant publication définitive]
                  </p>
                </div>
                <p>
                  Pour toute question relative à la protection de vos données ou pour exercer vos droits, vous pouvez contacter directement le responsable de traitement à l'adresse e-mail :{' '}
                  <a
                    href="mailto:brocart.remi02@gmail.com"
                    className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150 font-medium"
                  >
                    brocart.remi02@gmail.com
                  </a>.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 2. Traitements de données mis en œuvre */}
          <Reveal delay={50}>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-room-text tracking-tight mb-2">
                  2. Traitements de données mis en œuvre sur le site
                </h2>
                <p className="text-room-muted text-sm">
                  Le site ROOM241 privilégie une approche sobre et respectueuse de la vie privée. Aucun profilage publicitaire ni revente de données n'est opéré. Les traitements se limitent aux finalités professionnelles et techniques suivantes :
                </p>
              </div>

              {/* Traitement A : Contact e-mail direct */}
              <div className="border border-room-border/80 rounded-xl p-6 bg-room-surface/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-room-amber" />
                  <h3 className="text-base sm:text-lg font-bold text-room-text">
                    A. Prise de contact directe par messagerie électronique
                  </h3>
                </div>
                <ul className="text-room-muted text-sm space-y-1.5 list-disc list-inside pl-1">
                  <li>
                    <strong className="text-room-text font-medium">Finalités :</strong> Réception et traitement de vos demandes d'information, élaboration de devis, propositions commerciales et gestion des relations professionnelles.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Données traitées :</strong> Nom, prénom, adresse e-mail, objet du message, contenu de la correspondance et éventuelles pièces jointes transmises spontanément.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Base légale :</strong> Exécution de mesures précontractuelles ou contractuelles prises à la demande de l'utilisateur (art. 6.1.b du RGPD), et intérêt légitime à assurer le suivi commercial (art. 6.1.f du RGPD).
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Durée de conservation :</strong> 3 ans à compter du dernier contact actif pour un prospect (selon les recommandations de la CNIL) ; pour les clients, pendant toute la durée contractuelle, puis 5 ans en archivage intermédiaire au titre de la prescription légale (art. L. 110-4 du Code de commerce).
                  </li>
                </ul>
              </div>

              {/* Traitement B : Prise de rendez-vous en ligne (lien sortant) */}
              <div className="border border-room-border/80 rounded-xl p-6 bg-room-surface/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-room-amber" />
                  <h3 className="text-base sm:text-lg font-bold text-room-text">
                    B. Prise de rendez-vous en ligne (Lien externe sortant vers Google Agenda)
                  </h3>
                </div>
                <ul className="text-room-muted text-sm space-y-1.5 list-disc list-inside pl-1">
                  <li>
                    <strong className="text-room-text font-medium">Modalité technique :</strong> Il s'agit d'un lien hypertexte sortant pointant vers le service en ligne Google Agenda (<code className="text-xs bg-room-bg px-1.5 py-0.5 rounded font-mono text-room-amber">calendar.app.google</code>). Aucun script ou iframe Google n'est exécuté en arrière-plan sur les pages de ROOM241 pour ce service.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Traitement des données :</strong> Lorsque vous cliquez sur ce lien, vous quittez le site ROOM241. La réservation s'effectue directement sur l'infrastructure de Google Ireland Limited, qui opère ce service sous ses propres conditions d'utilisation et politique de confidentialité.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Données collectées à des fins de rendez-vous :</strong> Nom, prénom, adresse e-mail professionnelle, date et créneau horaire sélectionné, nécessaires à la confirmation de la visioconférence.
                  </li>
                </ul>
              </div>

              {/* Traitement C : Vercel Web Analytics */}
              <div className="border border-room-border/80 rounded-xl p-6 bg-room-surface/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-room-amber" />
                  <h3 className="text-base sm:text-lg font-bold text-room-text">
                    C. Mesure d'audience technique et agrégée (Vercel Web Analytics)
                  </h3>
                </div>
                <ul className="text-room-muted text-sm space-y-1.5 list-disc list-inside pl-1">
                  <li>
                    <strong className="text-room-text font-medium">Finalités :</strong> Mesure globale et anonyme de la fréquentation (pages consultées, volume de visites, type de terminal et répartition géographique macroscopique) afin de détecter les anomalies techniques et d'optimiser la performance du portfolio.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Architecture technique :</strong> La solution Vercel Web Analytics opère sans déposer de cookie persistant sur votre terminal, sans utiliser d'empreinte matérielle persistante (fingerprinting) et sans réaliser de recoupement intersites. Les adresses IP sont hachées de manière éphémère en mémoire avec un sel journalier tournant (rotation toutes les 24h) et ne sont pas conservées en base sous forme identifiable.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Précision réglementaire :</strong> Cette configuration est déployée avec le souci constant de minimiser les données traitées. ROOM241 suit avec attention les critères et recommandations de la CNIL relatifs à l'exemption de consentement des outils de mesure d'audience anonymes.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Opposition :</strong> Les signaux standards de votre navigateur (Do Not Track) ou l'utilisation d'extensions de blocage d'analyse sont respectés.
                  </li>
                </ul>
              </div>

              {/* Traitement D : Stockage local technique et absence de traceurs publicitaires */}
              <div className="border border-room-border/80 rounded-xl p-6 bg-room-surface/20 space-y-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-room-amber" />
                  <h3 className="text-base sm:text-lg font-bold text-room-text">
                    D. Stockage local technique & absence de cookies publicitaires
                  </h3>
                </div>
                <ul className="text-room-muted text-sm space-y-1.5 list-disc list-inside pl-1">
                  <li>
                    <strong className="text-room-text font-medium">Absence de cookies publicitaires :</strong> Le site ROOM241 ne dépose aucun cookie publicitaire, aucun pixel de reciblage (retargeting) et n'effectue aucun profilage commercial de ses visiteurs.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Stockage de session (sessionStorage) :</strong> De rares données strictement techniques et temporaires (mémorisation de la position de scroll lors du retour arrière, session de dialogue du compagnon Kuro) sont conservées uniquement pendant la durée de votre visite et sont automatiquement détruites dès la fermeture de l'onglet.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Préférences locales (localStorage) :</strong> Les éventuelles préférences enregistrées localement restent cantonnées à votre navigateur et ne sont jamais téléversées sur des serveurs tiers.
                  </li>
                </ul>
              </div>

              {/* Traitement E : Lecteurs vidéo intégrés YouTube */}
              <div className="border border-room-border/80 rounded-xl p-6 bg-room-surface/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-room-amber" />
                  <h3 className="text-base sm:text-lg font-bold text-room-text">
                    E. Lecteurs multimédias intégrés (YouTube en mode confidentialité renforcée)
                  </h3>
                </div>
                <ul className="text-room-muted text-sm space-y-1.5 list-disc list-inside pl-1">
                  <li>
                    <strong className="text-room-text font-medium">Finalités :</strong> Lecture de vidéos d'études de cas et démonstrations audiovisuelles.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Distinction technique importante :</strong> Les vidéos intégrées utilisent le domaine <code className="text-xs bg-room-bg px-1.5 py-0.5 rounded font-mono text-room-amber">youtube-nocookie.com</code>. Bien que ce mode prévienne le dépôt initial de cookies publicitaires au chargement passif de la page, le déclenchement actif de la lecture par l'utilisateur établit une connexion directe avec les serveurs de Google Ireland Limited / YouTube, susceptible d'engendrer des échanges techniques et le dépôt de cookies fonctionnels ou de mesure propres à la plateforme YouTube.
                  </li>
                  <li>
                    <strong className="text-room-text font-medium">Liens externes directs :</strong> Certains liens (« Ouvrir sur YouTube ») redirigent vers la plateforme externe YouTube sous ses propres conditions.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* 3. Destinataires et absence de cession */}
          <Reveal delay={100}>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
                3. Destinataires et politique de non-cession
              </h2>
              <p className="text-room-muted">
                Les données collectées sont strictement réservées à l'usage de ROOM241 et ne font l'objet d'aucune vente, location ou cession à des tiers à des fins publicitaires ou de prospection commerciale. Les seuls tiers susceptibles de traiter des données dans la limite de leurs attributions respectives sont nos sous-traitants techniques mentionnés ci-dessus (Vercel Inc. et Google Ireland Limited), soumis à de strictes obligations de confidentialité et de sécurité.
              </p>
            </div>
          </Reveal>

          {/* 4. Vos droits RGPD */}
          <Reveal delay={150}>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-5 h-5 text-room-amber" />
                <h2 className="text-xl font-bold text-room-text tracking-tight">
                  4. Vos droits et modalités d'exercice
                </h2>
              </div>
              <div className="text-room-muted space-y-3">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française n° 78-17 « Informatique et Libertés », vous disposez des droits suivants concernant vos données à caractère personnel :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm my-3">
                  <div className="p-3 rounded-lg bg-room-surface/50 border border-room-border/60">
                    <strong className="text-room-text font-semibold block mb-0.5">Droit d'accès (art. 15)</strong>
                    Obtenir la confirmation du traitement de vos données et en recevoir une copie.
                  </div>
                  <div className="p-3 rounded-lg bg-room-surface/50 border border-room-border/60">
                    <strong className="text-room-text font-semibold block mb-0.5">Droit de rectification (art. 16)</strong>
                    Faire corriger des informations inexactes, incomplètes ou obsolètes.
                  </div>
                  <div className="p-3 rounded-lg bg-room-surface/50 border border-room-border/60">
                    <strong className="text-room-text font-semibold block mb-0.5">Droit à l'effacement (art. 17)</strong>
                    Demander la suppression de vos données personnelles (« droit à l'oubli »).
                  </div>
                  <div className="p-3 rounded-lg bg-room-surface/50 border border-room-border/60">
                    <strong className="text-room-text font-semibold block mb-0.5">Droit à la limitation (art. 18)</strong>
                    Geler temporairement le traitement de vos données dans les cas prévus par la loi.
                  </div>
                  <div className="p-3 rounded-lg bg-room-surface/50 border border-room-border/60">
                    <strong className="text-room-text font-semibold block mb-0.5">Droit d'opposition (art. 21)</strong>
                    Vous opposer à tout moment à un traitement fondé sur l'intérêt légitime.
                  </div>
                  <div className="p-3 rounded-lg bg-room-surface/50 border border-room-border/60">
                    <strong className="text-room-text font-semibold block mb-0.5">Droit à la portabilité (art. 20)</strong>
                    Recevoir vos données dans un format structuré et lisible par machine.
                  </div>
                </div>

                <p>
                  <strong className="text-room-text font-semibold">Comment exercer vos droits :</strong><br />
                  Il vous suffit d'adresser votre demande par courrier électronique à :{' '}
                  <a
                    href="mailto:brocart.remi02@gmail.com"
                    className="text-room-text underline underline-offset-2 hover:text-room-amber transition-colors duration-150 font-medium"
                  >
                    brocart.remi02@gmail.com
                  </a>.
                  En cas de doute raisonnable sur votre identité, un justificatif pourra être sollicité afin d'éviter toute usurpation. Une réponse vous sera apportée dans un délai maximum de 30 jours calendaires suivant la réception de votre demande (prorogeable de 2 mois en cas de complexité particulière).
                </p>

                <p>
                  <strong className="text-room-text font-semibold">Réclamation auprès de l'autorité de contrôle :</strong><br />
                  Si vous estimez que le traitement de vos données ne respecte pas la réglementation en vigueur, vous disposez du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :<br />
                  En ligne :{' '}
                  <a
                    href="https://www.cnil.fr/fr/plaintes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-room-text underline underline-offset-2 hover:text-room-amber inline-flex items-center gap-1"
                  >
                    cnil.fr/fr/plaintes <ExternalLink className="w-3 h-3" />
                  </a><br />
                  Par voie postale : CNIL, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 5. Sécurité des transferts */}
          <Reveal delay={200}>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <h2 className="text-xl font-bold text-room-text tracking-tight mb-3">
                5. Sécurité et transferts hors Union Européenne
              </h2>
              <div className="text-room-muted space-y-2">
                <p>
                  L'ensemble des échanges entre votre terminal et le site ROOM241 est protégé par un chiffrement de bout en bout conforme aux normes TLS / HTTPS les plus récentes.
                </p>
                <p>
                  Les éventuels transferts de données techniques vers les infrastructures américaines de Vercel Inc. et Google sont encadrés par le Data Privacy Framework (DPF) UE-États-Unis et par les clauses contractuelles types validées par la Commission européenne, garantissant un niveau de protection substantiellement équivalent aux standards européens.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 6. Gestion du consentement local */}
          <Reveal delay={250}>
            <div className="border border-room-border/80 rounded-xl p-6 sm:p-8 bg-room-surface/30">
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw className="w-5 h-5 text-room-amber" />
                <h2 className="text-xl font-bold text-room-text tracking-tight">
                  6. Gérer ou réinitialiser mes préférences locales
                </h2>
              </div>
              <p className="text-room-muted mb-6 text-sm sm:text-base">
                Vous pouvez à tout moment révoquer votre choix et effacer l'ensemble des données enregistrées localement dans votre navigateur par ce portfolio. Le bandeau de choix réapparaîtra alors lors de votre prochaine interaction.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-mono font-semibold rounded-lg uppercase tracking-wider hover:border-room-amber transition-colors duration-150"
              >
                <RotateCcw className="w-3.5 h-3.5 text-room-amber" />
                <span>Réinitialiser mon choix</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
