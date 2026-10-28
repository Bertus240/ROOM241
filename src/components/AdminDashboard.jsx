import React, { useState, useEffect } from 'react';
import { getAnalyticsMetrics, getEventLogs, get14DayCalendarClicks } from '../lib/telemetry';
import { Shield, Lock, Eye, Calendar, FileText, Send, TrendingUp, RefreshCw, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [metrics, setMetrics] = useState(getAnalyticsMetrics());
  const [logs, setLogs] = useState(getEventLogs());
  const [timeline, setTimeline] = useState(get14DayCalendarClicks());

  useEffect(() => {
    // Check if session token exists
    if (sessionStorage.getItem('room241_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '241' || passcode === 'admin241' || passcode === 'room241') {
      setIsAuthenticated(true);
      sessionStorage.setItem('room241_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Code d\'accès incorrect. (Indice : 241)');
    }
  };

  const handleRefresh = () => {
    setMetrics(getAnalyticsMetrics());
    setLogs(getEventLogs());
    setTimeline(get14DayCalendarClicks());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-room-bg text-white flex items-center justify-center p-6">
        <div className="bg-room-surface border border-room-border max-w-md w-full p-8 relative shadow-2xl">
          <div className="w-12 h-12 bg-room-card border border-room-border text-room-amber flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="text-center mb-6">
            <span className="font-mono text-xs text-room-amber tracking-widest uppercase font-bold">
              ROOM241 / DASHBOARD PRIVÉ
            </span>
            <h1 className="text-2xl font-bold text-white mt-1">Accès restreint Admin</h1>
            <p className="text-xs text-room-muted mt-2 font-mono">
              Veuillez saisir le code de sécurité studio pour accéder aux métriques business.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-xs font-mono text-room-darkMuted uppercase mb-2">
                Code secret d'accès
              </label>
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Entrez 241..."
                className="w-full bg-room-card border border-room-border px-4 py-3 font-mono text-center text-lg text-white placeholder-room-subtle focus:outline-none focus:border-room-amber"
              />
            </div>

            {authError && (
              <div className="text-xs font-mono text-red-400 text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-room-amber hover:bg-room-amberHover text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Déverrouiller le dashboard
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-room-border/40 text-center">
            <a href="#" className="text-xs font-mono text-room-muted hover:text-white inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Revenir à la landing page
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Calculate max count for 14-day timeline scaling
  const maxCount = Math.max(...timeline.map(t => t.count), 1);

  return (
    <div className="min-h-screen bg-room-bg text-white font-sans p-6 sm:p-10">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-room-border gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-room-surface border border-room-border flex items-center justify-center font-mono font-bold text-xs text-room-amber">
              241
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">ROOM241 ANALYTICS</h1>
                <span className="text-[10px] font-mono text-room-amber bg-room-amber/10 border border-room-amber/30 px-2 py-0.5 uppercase">
                  INTERNAL PILOT
                </span>
              </div>
              <p className="text-xs font-mono text-room-muted">
                DASHBOARD METRICS &amp; EVENT LOGS · LIVE PERSISTED STREAM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-room-surface hover:bg-[#1A1A1A] border border-room-border text-xs font-mono uppercase tracking-wider flex items-center gap-2 text-room-muted hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rafraîchir</span>
            </button>

            <a
              href="#"
              className="px-4 py-2 bg-room-card hover:bg-[#1A1A1A] border border-room-border text-xs font-mono uppercase tracking-wider text-room-muted hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voir le site</span>
            </a>
          </div>
        </div>

        {/* 5 KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* KPI 01: Visites */}
          <div className="bg-room-surface border border-room-border p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-room-darkMuted uppercase mb-4">
              <span>KPI.01</span>
              <Eye className="w-4 h-4 text-room-muted" />
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">
                {metrics.visits}
              </div>
              <div className="text-xs font-bold text-white mb-1">Visiteurs uniques</div>
              <div className="text-[11px] font-mono text-room-muted">Comptage global Vercel</div>
            </div>
          </div>

          {/* KPI 02: Clics Calendrier */}
          <div className="bg-room-surface border border-room-border p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-room-darkMuted uppercase mb-4">
              <span>KPI.02</span>
              <Calendar className="w-4 h-4 text-room-amber" />
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono text-room-amber mb-1">
                {metrics.calClicks}
              </div>
              <div className="text-xs font-bold text-white mb-1">Clics Calendrier</div>
              <div className="text-[11px] font-mono text-room-muted">Intention RDV audit</div>
            </div>
          </div>

          {/* KPI 03: Demandes NDA */}
          <div className="bg-room-surface border border-room-border p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-room-darkMuted uppercase mb-4">
              <span>KPI.03</span>
              <FileText className="w-4 h-4 text-room-muted" />
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">
                {metrics.ndaRequests}
              </div>
              <div className="text-xs font-bold text-white mb-1">Demandes NDA</div>
              <div className="text-[11px] font-mono text-room-muted">Projet SaaS Enterprise</div>
            </div>
          </div>

          {/* KPI 04: Formulaires */}
          <div className="bg-room-surface border border-room-border p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-room-darkMuted uppercase mb-4">
              <span>KPI.04</span>
              <Send className="w-4 h-4 text-room-muted" />
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono text-white mb-1">
                {metrics.forms}
              </div>
              <div className="text-xs font-bold text-white mb-1">Formulaires reçus</div>
              <div className="text-[11px] font-mono text-room-muted">Leads qualifiés écrites</div>
            </div>
          </div>

          {/* KPI 05: Conversion Calendrier */}
          <div className="bg-room-surface border border-room-border p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-room-darkMuted uppercase mb-4">
              <span>KPI.05</span>
              <TrendingUp className="w-4 h-4 text-room-amber" />
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono text-room-amber mb-1">
                {metrics.conversionRate} %
              </div>
              <div className="text-xs font-bold text-white mb-1">Taux conversion RDV</div>
              <div className="text-[11px] font-mono text-room-muted">Calcul: Clics / Visiteurs</div>
            </div>
          </div>

        </div>

        {/* 14-Day Timeline Chart */}
        <div className="bg-room-surface border border-room-border p-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-room-border">
            <div>
              <h2 className="text-lg font-bold text-white">Intention de Réservation (14 derniers jours)</h2>
              <p className="text-xs font-mono text-room-muted mt-1">
                Volume de clics sur le widget calendrier par jour.
              </p>
            </div>
            <span className="font-mono text-xs text-room-amber uppercase font-semibold">
              REAL-TIME SVG TIMELINE
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-48 w-full flex items-end justify-between gap-2 pt-6">
            {timeline.map((item, idx) => {
              const heightPercent = Math.max(12, Math.round((item.count / maxCount) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-room-muted group-hover:text-room-amber transition-colors">
                    {item.count}
                  </span>
                  <div className="w-full bg-room-card border border-room-border rounded-none h-full flex items-end">
                    <div 
                      className="w-full bg-room-amber/80 group-hover:bg-room-amber transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-room-darkMuted mt-1">
                    {item.dateLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Interaction Event Logs Table */}
        <div className="bg-room-surface border border-room-border p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Dernières interactions</h2>
              <p className="text-xs font-mono text-room-muted mt-1">
                Flux en direct des événements métiers déclenchés.
              </p>
            </div>
            <span className="font-mono text-xs text-room-darkMuted">
              {logs.length} ÉVÉNEMENTS REGISTRÉS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-room-border text-room-darkMuted uppercase">
                  <th className="py-3 px-4">Heure</th>
                  <th className="py-3 px-4">Événement</th>
                  <th className="py-3 px-4">Page</th>
                  <th className="py-3 px-4">Détails Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-room-border/40">
                {logs.slice(0, 15).map((log) => (
                  <tr key={log.id} className="hover:bg-room-card/50 transition-colors">
                    <td className="py-3 px-4 text-room-muted whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-none ${
                        log.eventName === 'click_calendar_booking' 
                          ? 'bg-room-amber/20 text-room-amber border border-room-amber/40'
                          : log.eventName === 'submit_contact_form'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-room-card text-white border border-room-border'
                      }`}>
                        {log.eventName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-room-muted">
                      {log.page}
                    </td>
                    <td className="py-3 px-4 text-room-darkMuted font-mono text-[11px]">
                      {JSON.stringify(log.properties)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
