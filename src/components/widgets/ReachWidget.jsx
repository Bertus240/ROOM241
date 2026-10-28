import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function ReachWidget() {
  return (
    <div className="card-lift bg-room-surface border border-room-border p-6 sm:p-8 flex flex-col justify-between h-full group">
      <div>
        {/* Header meta */}
        <div className="flex items-center justify-between text-[11px] font-mono text-room-darkMuted uppercase tracking-wider mb-6">
          <span className="text-room-amber font-bold">WIDGET.01</span>
          <div className="flex items-center gap-1.5 text-room-amber">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>VISIBILITÉ ORGANIQUE</span>
          </div>
        </div>

        {/* Big number & title */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl sm:text-6xl font-extrabold font-mono text-room-amber tracking-tight">
            +219 %
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-6">
          Portée organique au premier mois
        </h3>

        {/* Comparative Bars */}
        <div className="space-y-4 mb-6">
          {/* Baseline */}
          <div>
            <div className="flex justify-between text-xs font-mono text-room-muted mb-1.5">
              <span>Moyenne historique</span>
              <span className="text-white">273 vues</span>
            </div>
            <div className="w-full h-2.5 bg-room-card border border-room-border">
              <div className="h-full bg-room-darkMuted w-[31%]" />
            </div>
          </div>

          {/* Room241 Sprint */}
          <div>
            <div className="flex justify-between text-xs font-mono text-room-muted mb-1.5">
              <span className="text-white font-medium">Sprint Room241</span>
              <span className="text-room-amber font-bold">871 vues</span>
            </div>
            <div className="w-full h-2.5 bg-room-card border border-room-border">
              <div className="h-full bg-room-amber w-full transition-all duration-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-room-border/40 flex items-center justify-between text-[10px] font-mono text-room-darkMuted">
        <span>ACTIVATION BTP · RÉSIN'ARCHITECTE</span>
        <span>BENCHMARK VERIFIED</span>
      </div>
    </div>
  );
}
