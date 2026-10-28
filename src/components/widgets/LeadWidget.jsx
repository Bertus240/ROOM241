import React from 'react';
import { Target, Calendar } from 'lucide-react';

export default function LeadWidget() {
  return (
    <div className="card-lift bg-room-surface border border-room-border p-6 sm:p-8 flex flex-col justify-between h-full group">
      <div>
        {/* Header meta */}
        <div className="flex items-center justify-between text-[11px] font-mono text-room-darkMuted uppercase tracking-wider mb-6">
          <span className="text-room-amber font-bold">WIDGET.03</span>
          <div className="flex items-center gap-1.5 text-room-amber">
            <span className="status-dot" aria-hidden="true" />
            <span>ACTIVATION ÉVÉNEMENTIELLE</span>
          </div>
        </div>

        {/* Big metric */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl sm:text-6xl font-extrabold font-mono text-room-amber tracking-tight">
            +4 000
          </span>
          <span className="text-xs font-mono text-white uppercase tracking-wider">
            Leads B2B
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-6">
          Acquisition sur salon professionnel
        </h3>

        {/* Event Stats badge */}
        <div className="p-4 bg-room-card border border-room-border space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-room-muted">Durée du salon :</span>
            <span className="text-white font-bold">3 jours d'activation</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-room-muted">Secteur :</span>
            <span className="text-room-amber font-bold">SaaS Enterprise B2B</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-room-border/40 flex items-center justify-between text-[10px] font-mono text-room-darkMuted">
        <span>EVENT DESIGN XXL</span>
        <span>QUALIFIED LEADS</span>
      </div>
    </div>
  );
}
