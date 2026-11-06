import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  Users,
  Compass,
  FileText,
  Download,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Activity,
  Smartphone,
  Monitor,
  Tablet,
  MousePointer,
  ShieldCheck
} from 'lucide-react';
import {
  authenticateAnalytics,
  isAnalyticsAuthenticated,
  logoutAnalytics,
  getLockoutStatus
} from '../lib/analyticsAuth';
import {
  getAnalyticsDataset,
  exportAnalyticsToCsv
} from '../lib/analyticsStore';

/**
 * ============================================================================
 * ANALYTICS DASHBOARD — ESPACE ANALYTICS PRIVÉ STUDIO ROOM241
 * Studio ROOM241 • Rémi Brocart
 *
 * Route protégée /analytics (invisible de la navigation publique)
 * - Authentification sécurisée par mot de passe et hachage SHA-256 avec sel
 * - Mesure first-party, heatmaps normalisées, scrollmaps et funnels d'intention
 * - Respect rigoureux des tokens de marque ROOM241 (#FAF8F5, #1A1918, #C5A880, #FFAD00)
 * ============================================================================
 */

export default function AnalyticsDashboard({ navigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockout, setLockout] = useState({ locked: false, remainingSeconds: 0 });

  // Contrôles du tableau de bord
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'audience' | 'projects' | 'conversion' | 'heatmaps' | 'technical'
  const [period, setPeriod] = useState('30d'); // 'today' | '7d' | '30d' | '90d'
  const [dataSource, setDataSource] = useState('demo'); // 'demo' | 'real'
  const [heatmapPage, setHeatmapPage] = useState('/');
  const [heatmapDevice, setHeatmapDevice] = useState('desktop'); // 'desktop' | 'mobile' | 'tablet'

  // Vérification de session au montage
  useEffect(() => {
    if (isAnalyticsAuthenticated()) {
      setIsAuthenticated(true);
    }
    const lk = getLockoutStatus();
    setLockout(lk);
  }, []);

  // Décompte de verrouillage
  useEffect(() => {
    if (!lockout.locked) return;
    const interval = setInterval(() => {
      const lk = getLockoutStatus();
      setLockout(lk);
      if (!lk.locked) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [lockout.locked]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    try {
      const res = await authenticateAnalytics(passwordInput);
      if (res.success) {
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setAuthError(res.error || 'Erreur d\'authentification');
        const lk = getLockoutStatus();
        setLockout(lk);
      }
    } catch {
      setAuthError('Une erreur inattendue est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logoutAnalytics();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const dataset = getAnalyticsDataset(dataSource);

  // ==========================================================================
  // ÉCRAN DE CONNEXION SÉCURISÉ (Si non authentifié)
  // ==========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A1918] flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md rounded-3xl bg-white border border-zinc-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 sm:p-10 space-y-8 relative overflow-hidden">
          
          {/* Liseré ambré discret supérieur */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A880] via-[#FFAD00] to-[#C5A880]" />

          {/* En-tête de la carte */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-zinc-200/80 flex items-center justify-center mx-auto text-[#1A1918] shadow-2xs">
              <Lock className="w-5 h-5 text-[#FFAD00]" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-500 block">
                ROOM241 · ESPACE ANALYTICS PRIVÉ
              </span>
              <h1 className="text-2xl font-extrabold text-[#1A1918] tracking-tight">
                Accès restreint studio
              </h1>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-xs mx-auto">
              Mesure d'audience first-party, heatmaps et suivi des interactions réservés à l'administration.
            </p>
          </div>

          {/* Formulaire de mot de passe */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="analytics-password"
                className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-600"
              >
                Mot de passe d'authentification
              </label>

              <div className="relative">
                <input
                  id="analytics-password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  disabled={isSubmitting || lockout.locked}
                  placeholder="Saisissez le mot de passe studio..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-[#FAF8F5] text-sm text-[#1A1918] placeholder-zinc-400 focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#FFAD00]/20 transition-all font-mono"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200/80 flex items-start gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{authError}</span>
              </div>
            )}

            {lockout.locked && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800 text-center font-mono">
                Verrouillage actif : {lockout.remainingSeconds}s restantes
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || lockout.locked}
              className="w-full py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FFAD00]" />
                  <span>Vérification du hash...</span>
                </>
              ) : (
                <span>Déverrouiller le dashboard</span>
              )}
            </button>
          </form>

          {/* Lien de retour */}
          <div className="pt-4 border-t border-zinc-100 text-center">
            <button
              type="button"
              onClick={() => navigate ? navigate('/') : window.location.href = '/'}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              ← Revenir au portfolio public
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================================================
  // TABLEAU DE BORD AUTHENTIFIÉ
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1918] font-sans selection:bg-[#FFAD00] selection:text-black">
      
      {/* 1. BARRE DE COMMANDE SUPÉRIEURE ÉDITORIALE */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 px-5 sm:px-8 py-3.5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & statut */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-900">
                ROOM241 // ANALYTICS
              </span>
            </div>
            <span className="text-zinc-300">|</span>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              Session privée active
            </span>
          </div>

          {/* Contrôles : Période, Source de données, Export, Déconnexion */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Bascule Source de données */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-zinc-100 border border-zinc-200 text-xs">
              <button
                type="button"
                onClick={() => setDataSource('demo')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  dataSource === 'demo' ? 'bg-white text-zinc-950 font-bold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Données Démo
              </button>
              <button
                type="button"
                onClick={() => setDataSource('real')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  dataSource === 'real' ? 'bg-white text-zinc-950 font-bold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Session Réelle
              </button>
            </div>

            {/* Sélecteur de période */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-zinc-100 border border-zinc-200 text-xs">
              {['today', '7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    period === p ? 'bg-white text-zinc-950 font-bold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {p === 'today' ? '24h' : p}
                </button>
              ))}
            </div>

            {/* Bouton Export CSV */}
            <button
              type="button"
              onClick={() => exportAnalyticsToCsv(dataset)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-800 text-xs font-semibold hover:border-[#FFAD00] transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#FFAD00]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Bouton Déconnexion */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>

          </div>

        </div>
      </header>

      {/* 2. BARRE D'ONGLETS THÉMATIQUES */}
      <nav className="bg-[#FAF8F5] border-b border-zinc-200/80 px-5 sm:px-8 overflow-x-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 py-2">
          {[
            { id: 'overview', label: '01. Vue d\'ensemble', icon: TrendingUp },
            { id: 'audience', label: '02. Audience & Provenance', icon: Users },
            { id: 'projects', label: '03. Études de cas', icon: Compass },
            { id: 'conversion', label: '04. Funnel & Intentions', icon: FileText },
            { id: 'heatmaps', label: '05. Heatmaps & Scroll', icon: MousePointer },
            { id: 'technical', label: '06. Technique & Vitals', icon: Activity }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-white/60 text-zinc-600 hover:bg-white hover:text-zinc-950 border border-zinc-200/60'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FFAD00]' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. CONTENU PRINCIPAL PAR ONGLET */}
      <main className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 sm:py-10 space-y-10">

        {/* ==================================================================
            TAB 1 : VUE D'ENSEMBLE (OVERVIEW)
           ================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* 4 Cartes de statistiques clés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: 'Visites totales', value: dataset.summary.totalVisits, trend: dataset.summary.vsPreviousPeriod.visits, note: '30 derniers jours' },
                { label: 'Visiteurs uniques', value: dataset.summary.uniqueVisitors, trend: dataset.summary.vsPreviousPeriod.uniques, note: 'Estimé (sans fingerprinting)' },
                { label: 'Pages consultées', value: dataset.summary.pageViews, trend: dataset.summary.vsPreviousPeriod.pageViews, note: 'Ratio 2.7 pages / session' },
                { label: 'Taux d\'engagement', value: dataset.summary.engagementRate, trend: dataset.summary.vsPreviousPeriod.engagement, note: `Dwell moyen : ${dataset.summary.avgDwellTime}` }
              ].map((kpi, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-3"
                >
                  <span className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider block">
                    {kpi.label}
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#1A1918] font-mono tracking-tight">
                      {kpi.value}
                    </span>
                    <span className="inline-flex items-center text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {kpi.trend}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-sans border-t border-zinc-100 pt-2">
                    {kpi.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Graphique de trafic quotidien (SVG réactif) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#1A1918] tracking-tight">
                    Évolution du trafic &amp; consultations du CV
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Volume quotidien des visites et des ouvertures de la modale CV sur la période.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-zinc-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A1918]" /> Visites totales
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFAD00]" /> Vues CV
                  </span>
                </div>
              </div>

              {/* Barres proportionnelles quotidiennes */}
              <div className="h-56 sm:h-64 flex items-end gap-2 sm:gap-4 pt-6 pb-2">
                {dataset.dailyTraffic.map((d, i) => {
                  const maxVal = 90;
                  const hPercent = Math.round((d.visits / maxVal) * 100);
                  const cvPercent = Math.round((d.cvViews / maxVal) * 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                      
                      {/* Tooltip au survol */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-zinc-900 text-white text-[10px] font-mono px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                        {d.date} : {d.visits} visites · {d.cvViews} CV
                      </div>

                      <div className="w-full max-w-[28px] flex items-end justify-center gap-1 h-full">
                        {/* Barre visites */}
                        <div
                          style={{ height: `${hPercent}%` }}
                          className="w-full bg-zinc-800 group-hover:bg-[#C5A880] rounded-t transition-all duration-300"
                        />
                        {/* Barre CV */}
                        <div
                          style={{ height: `${cvPercent}%` }}
                          className="w-full bg-[#FFAD00] rounded-t transition-all duration-300"
                        />
                      </div>

                      <span className="text-[10px] font-mono text-zinc-400 rotate-45 sm:rotate-0 mt-1 truncate">
                        {d.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ==================================================================
            TAB 2 : AUDIENCE & PROVENANCE
           ================================================================== */}
        {activeTab === 'audience' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
            
            {/* Canaux d'acquisition */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-[#1A1918] tracking-tight border-b border-zinc-100 pb-3">
                Sources de trafic &amp; Référents
              </h3>
              <div className="space-y-4">
                {dataset.trafficSources.map((src, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-800">{src.name}</span>
                      <span className="font-mono text-zinc-600 font-bold">{src.percent}% ({src.visits})</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
                      <div
                        style={{ width: `${src.percent}%` }}
                        className="h-full bg-zinc-900 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Répartition terminaux */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-[#1A1918] tracking-tight border-b border-zinc-100 pb-3">
                Terminaux de consultation
              </h3>
              <div className="space-y-4">
                {dataset.devices.map((dev, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-zinc-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {idx === 0 ? <Monitor className="w-5 h-5 text-zinc-800" /> : <Smartphone className="w-5 h-5 text-zinc-800" />}
                      <div>
                        <div className="text-xs font-bold text-zinc-900">{dev.type}</div>
                        <div className="text-[11px] text-zinc-500 font-mono">{dev.count} sessions enregistrées</div>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-extrabold text-[#1A1918]">
                      {dev.percent}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Pages les plus consultées */}
              <div className="pt-4 border-t border-zinc-100 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                  Top 3 Pages consultées
                </span>
                <div className="space-y-2">
                  {dataset.topPages.slice(0, 3).map((page, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs border-b border-zinc-100 pb-2">
                      <span className="font-mono text-zinc-600 truncate max-w-[200px] sm:max-w-xs">{page.path}</span>
                      <span className="font-mono font-bold text-zinc-900">{page.views} vues</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================================================================
            TAB 3 : PERFORMANCE DES ÉTUDES DE CAS
           ================================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1918] tracking-tight">
                  Engagement par étude de cas
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500">
                  Mesure de l'intérêt suscité par chaque réalisation, des ouvertures de détails et des visionnages de terrain.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-zinc-200 font-mono uppercase text-zinc-400 text-[10px] tracking-wider">
                      <th className="pb-3 font-semibold">Projet &amp; Réalisation</th>
                      <th className="pb-3 font-semibold">Vues globales</th>
                      <th className="pb-3 font-semibold">Ouvertures dossier</th>
                      <th className="pb-3 font-semibold">Engagement</th>
                      <th className="pb-3 font-semibold">Dwell moyen</th>
                      <th className="pb-3 font-semibold">Lectures vidéo</th>
                      <th className="pb-3 font-semibold">Liens externes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {dataset.caseStudiesPerformance.map((cs) => (
                      <tr key={cs.id} className="hover:bg-zinc-50/80 transition-colors">
                        <td className="py-4 font-bold text-zinc-950 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                          {cs.name}
                        </td>
                        <td className="py-4 font-mono font-semibold">{cs.views}</td>
                        <td className="py-4 font-mono">{cs.detailOpens}</td>
                        <td className="py-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-bold">
                            {cs.engagement}
                          </span>
                        </td>
                        <td className="py-4 font-mono text-zinc-600">{cs.avgDwellSeconds}s</td>
                        <td className="py-4 font-mono">{cs.videoPlays > 0 ? cs.videoPlays : '—'}</td>
                        <td className="py-4 font-mono text-zinc-600">{cs.externalClicks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Note d'intégrité éditoriale */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-zinc-200/60 text-xs text-zinc-600 space-y-1">
                <strong className="text-zinc-900 block font-semibold">Rappel d'intégrité éditoriale :</strong>
                <p>
                  Les métriques ci-dessus quantifient la consultation des projets au sein de ROOM241. Le badge Jardimax qualifie une démonstration créative de recrutement (1 journée de production), sans fausse audience commerciale attribuée.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 4 : FUNNEL DE CONVERSION & INTENTIONS
           ================================================================== */}
        {activeTab === 'conversion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
            
            {/* Entonnoir de conversion 4 étapes */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#1A1918] tracking-tight">
                  Tunnel de conversion &amp; progression visiteur
                </h3>
                <p className="text-xs text-zinc-500">
                  Parcours des recruteurs et clients de la première impression à l'intention de contact.
                </p>
              </div>

              <div className="space-y-3">
                {dataset.funnel.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-zinc-200/60 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-900">{step.step}</span>
                      <span className="font-mono font-bold text-[#C5A880]">{step.rate} ({step.count})</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div
                        style={{ width: step.rate }}
                        className="h-full bg-gradient-to-r from-zinc-900 to-[#C5A880] rounded-full"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intentions de contact qualifiées */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#1A1918] tracking-tight">
                  Intentions de contact qualifiées
                </h3>
                <p className="text-xs text-zinc-500">
                  Actions démontrant une démarche concrète de prise de contact ou d'enregistrement.
                </p>
              </div>

              <div className="space-y-3">
                {dataset.contactIntentions.map((intent, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200/60 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-zinc-900">{intent.label}</div>
                      <div className="text-[10px] text-zinc-500">{intent.note}</div>
                    </div>
                    <span className="font-mono text-sm font-extrabold text-[#1A1918] shrink-0">
                      {intent.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-100 text-[11px] text-zinc-500 leading-relaxed">
                <em>Note d'exactitude :</em> Un clic e-mail ou téléphone représente une intention de prise de contact et non l'envoi certain d'un courriel.
              </div>
            </div>

          </div>
        )}

        {/* ==================================================================
            TAB 5 : HEATMAPS & SCROLLMAPS
           ================================================================== */}
        {activeTab === 'heatmaps' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Contrôles de page et de format */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">
                  Page analysée :
                </span>
                <select
                  value={heatmapPage}
                  onChange={(e) => setHeatmapPage(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-zinc-200 bg-[#FAF8F5] text-xs font-semibold text-zinc-900 focus:outline-none"
                >
                  <option value="/">Page d'accueil (/)</option>
                  <option value="/parcours">Parcours &amp; CV (/parcours)</option>
                  <option value="/projets">Réalisations (/projets)</option>
                  <option value="/etudes-de-cas/hornetsecurity">Étude FIC Lille (/etudes-de-cas/hornetsecurity)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">
                  Format d'écran :
                </span>
                <div className="inline-flex items-center p-0.5 rounded-xl bg-zinc-100 border border-zinc-200 text-xs">
                  {[
                    { id: 'desktop', label: 'Desktop 1440', icon: Monitor },
                    { id: 'tablet', label: 'Tablette 768', icon: Tablet },
                    { id: 'mobile', label: 'Mobile 390', icon: Smartphone }
                  ].map((dev) => {
                    const DevIcon = dev.icon;
                    return (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => setHeatmapDevice(dev.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                          heatmapDevice === dev.id ? 'bg-white text-zinc-950 font-bold shadow-2xs' : 'text-zinc-500'
                        }`}
                      >
                        <DevIcon className="w-3.5 h-3.5" />
                        <span>{dev.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Vue Heatmap visuelle & Scrollmap étagée */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Carte des clics (Heatmap canvas stylisé) */}
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-[#1A1918]">
                      Carte de chaleur des interactions (Clics &amp; Taps)
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Coordonnées normalisées relatives pour éviter la superposition de résolutions incompatibles.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    {dataset.heatmapClicks.filter(c => c.page === heatmapPage).length} zones chaudes
                  </span>
                </div>

                {/* Simulation de la surface de page avec points thermiques */}
                <div className="relative w-full h-[420px] rounded-2xl bg-[#FAF8F5] border border-zinc-300/80 overflow-hidden shadow-inner flex flex-col justify-between p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* Points thermiques */}
                  {dataset.heatmapClicks
                    .filter(c => c.page === heatmapPage)
                    .map((click, i) => (
                      <div
                        key={i}
                        style={{
                          left: `${click.x}%`,
                          top: `${click.y}%`
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      >
                        {/* Halo thermique ambre / rouge */}
                        <div
                          style={{
                            width: `${Math.max(click.weight / 1.8, 28)}px`,
                            height: `${Math.max(click.weight / 1.8, 28)}px`
                          }}
                          className={`rounded-full blur-md transition-transform group-hover:scale-125 ${
                            click.weight > 70
                              ? 'bg-rose-500/50'
                              : click.weight > 40
                              ? 'bg-[#FFAD00]/60'
                              : 'bg-emerald-500/40'
                          }`}
                        />
                        {/* Point central */}
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-white shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                        {/* Tooltip au survol */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-950 text-white text-[11px] font-sans px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap pointer-events-none z-30">
                          <strong>{click.label}</strong> ({click.weight} interactions)
                        </div>
                      </div>
                    ))}

                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>Haut de page (0 %)</span>
                    <span>Zone d'accroche principale</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-zinc-200/60 pt-2">
                    <span>Bas de page (100 %)</span>
                    <span>Pied de page &amp; Contact</span>
                  </div>
                </div>

                {/* Légende thermique */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Forte intensité (&gt; 70)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFAD00]" /> Fréquence moyenne (40-70)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Interaction ponctuelle (&lt; 40)
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollmap étagée (Pénétration verticale) */}
              <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-5">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#1A1918]">
                    Profondeur de scroll
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Taux de visiteurs atteignant chaque niveau de la page.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {dataset.scrollmap.depths.map((depth, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-zinc-800">{depth.depth}</span>
                        <span className="font-mono font-extrabold text-[#C5A880]">{depth.reach}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
                        <div
                          style={{ width: depth.reach }}
                          className="h-full bg-zinc-900 rounded-full"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500">{depth.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-100 text-xs font-mono text-zinc-600 flex items-center justify-between">
                  <span>Scroll moyen global :</span>
                  <span className="font-bold text-zinc-950">{dataset.scrollmap.avgScrollPercentage}</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================================
            TAB 6 : TECHNIQUE, WEB VITALS & SÉCURITÉ
           ================================================================== */}
        {activeTab === 'technical' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
            
            {/* Core Web Vitals */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#1A1918] tracking-tight">
                  Core Web Vitals &amp; Performance réelle
                </h3>
                <p className="text-xs text-zinc-500">
                  Mesures de vitesse d'affichage et de réactivité sur les sessions mesurées.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'LCP (Largest Contentful Paint)', val: dataset.webVitals.lcp.value, target: dataset.webVitals.lcp.target, status: dataset.webVitals.lcp.status },
                  { label: 'CLS (Cumulative Layout Shift)', val: dataset.webVitals.cls.value, target: dataset.webVitals.cls.target, status: dataset.webVitals.cls.status },
                  { label: 'INP (Interaction to Next Paint)', val: dataset.webVitals.inp.value, target: dataset.webVitals.inp.target, status: dataset.webVitals.inp.status },
                  { label: 'TTFB (Time to First Byte)', val: dataset.webVitals.ttfb.value, target: dataset.webVitals.ttfb.target, status: dataset.webVitals.ttfb.status }
                ].map((vital, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-zinc-200/60 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block truncate">{vital.label}</span>
                    <div className="text-2xl font-mono font-extrabold text-zinc-950">{vital.val}</div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>Cible : {vital.target}</span>
                      <span className="text-emerald-600 font-bold">{vital.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-between text-xs text-emerald-800">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Journal des erreurs d'exécution JavaScript</span>
                </span>
                <strong className="font-mono">{dataset.webVitals.jsErrorsCount} erreur</strong>
              </div>
            </div>

            {/* Respect de la vie privée & CNIL / RGPD */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#1A1918] tracking-tight">
                  Architecture de confidentialité (CNIL / RGPD)
                </h3>
                <p className="text-xs text-zinc-500">
                  Garanties techniques de protection des visiteurs appliquées dans ROOM241.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { title: 'Zéro cookie tiers', desc: 'Aucun traceur publicitaire ou commercial externe (Google, Meta, TikTok) n\'est chargé sur le domaine.' },
                  { title: 'Respect du Do Not Track (DNT)', desc: 'Si le navigateur transmet le signal DNT=1, l\'ensemble de la télémétrie est immédiatement inhibé.' },
                  { title: 'Anonymisation des coordonnées', desc: 'Les heatmaps enregistrent des ratios relatifs x%/y% sans jamais capturer le contenu des champs ou des frappes de touches.' },
                  { title: 'Durée de rétention limitée', desc: 'Les journaux de session locaux sont purgés automatiquement et limités aux 500 événements les plus récents.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200/60 space-y-1">
                    <strong className="text-zinc-900 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FFAD00]" />
                      {item.title}
                    </strong>
                    <p className="text-zinc-600 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
