import React from 'react';
import { Users } from 'lucide-react';

export default function AudienceWidget() {
  return (
    <div className="card-lift bg-room-surface border border-room-border p-6 sm:p-8 flex flex-col justify-between h-full group">
      <div>
        {/* Header meta */}
        <div className="flex items-center justify-between text-[11px] font-mono text-room-darkMuted uppercase tracking-wider mb-6">
          <span className="text-room-amber font-bold">WIDGET.02</span>
          <div className="flex items-center gap-1.5 text-room-muted">
            <Users className="w-3.5 h-3.5 text-room-amber" />
            <span>PÉNÉTRATION D'AUDIENCE</span>
          </div>
        </div>

        {/* Big metric */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl sm:text-6xl font-extrabold font-mono text-white tracking-tight">
            66 %
          </span>
          <span className="text-xs font-mono text-room-amber uppercase tracking-wider">
            Hors réseau
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-6">
          Découverte hors réseau existant
        </h3>

        {/* Segmented bar graph */}
        <div className="space-y-3 mb-6">
          <div className="w-full h-4 bg-room-card border border-room-border flex overflow-hidden">
            <div 
              className="bg-room-subtle h-full transition-all duration-500" 
              style={{ width: '34%' }}
              title="34% Followers"
            />
            <div 
              className="bg-room-amber h-full transition-all duration-500" 
              style={{ width: '66%' }}
              title="66% Non-followers"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-room-subtle inline-block" />
              <span className="text-room-muted">34 % Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-room-amber inline-block" />
              <span className="text-white font-bold">66 % Non-followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-room-border/40 flex items-center justify-between text-[10px] font-mono text-room-darkMuted">
        <span>AUDIENCE ACQUISITION</span>
        <span>ALGORITHM DISTRIBUTION</span>
      </div>
    </div>
  );
}
