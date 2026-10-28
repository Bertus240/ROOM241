import React from 'react';
import { X, ArrowRight, ExternalLink, CheckCircle2, Shield, Calendar, Users, Award, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-200/80 dark:border-white/10 z-10 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-neutral-950/80 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                {project.id} • {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8 font-sans">
            
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
                {project.subtitle}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Strip */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/10">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#FFAD00] block tracking-tight">
                      {m.value}
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white block">
                      {m.label}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block leading-tight">
                      {m.detail}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Main Image or Video */}
            {project.image && (
              <div className="rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/10 shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover max-h-[460px]"
                />
              </div>
            )}

            {/* Narrative: 3 Acts (Le Défi, L'Arbitrage Créatif, L'Impact Mesurable) */}
            <div className="space-y-6 pt-2">
              {project.act1 && (
                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/40 border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#FFAD00] font-semibold">
                    {project.act1.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {project.act1.text}
                  </p>
                </div>
              )}

              {project.act2 && (
                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/40 border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#FFAD00] font-semibold">
                    {project.act2.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {project.act2.text}
                  </p>
                </div>
              )}

              {project.act3 && (
                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/40 border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#FFAD00] font-semibold">
                    {project.act3.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {project.act3.text}
                  </p>
                </div>
              )}
            </div>

            {/* Proof Assets Gallery (if available, e.g. for Resin'Architecte) */}
            {project.proofAssets && project.proofAssets.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Supports déployés &amp; Preuves terrain
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.proofAssets.map((asset, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden border border-zinc-200/80 dark:border-white/10 p-3 bg-zinc-50 dark:bg-white/[0.02] flex flex-col justify-between"
                    >
                      <div className="w-full bg-white dark:bg-black/30 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2">
                        <img
                          src={asset.src}
                          alt={asset.title}
                          className="max-h-[260px] w-auto object-contain rounded"
                          loading="lazy"
                        />
                      </div>
                      <div className="pt-3">
                        <h5 className="text-xs font-bold text-zinc-900 dark:text-white">
                          {asset.title}
                        </h5>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          {asset.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Modal CTA */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-neutral-950/80 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between gap-4">
            <span className="text-xs text-zinc-500">
              Dossier complet disponible sur demande
            </span>
            <a
              href="mailto:brocart.remi02@gmail.com?subject=Demande%20d%27information%20sur%20le%20projet%20"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Échanger sur ce projet</span>
              <span className="text-[#FFAD00]">↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
