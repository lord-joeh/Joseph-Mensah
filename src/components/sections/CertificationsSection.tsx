"use client";

import React from 'react';
import { Award, ZoomIn, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { Certificate } from '@/lib/api';

export interface CertificationsSectionProps {
  certificates: Certificate[];
}

export function CertificationsSection({ certificates }: CertificationsSectionProps) {
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
        <SectionHeading
          eyebrow="CREDENTIALS"
          title="Verified Certifications & Experience"
          description="Professional accreditations and verified industry experience."
          align="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group p-6 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-300 flex flex-col space-y-6"
            >
              {/* Certificate Preview with Dialog Trigger */}
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-elevated border border-surface-border group-hover:scale-[1.02] transition-transform duration-300 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-lime"
                    aria-label={`View full certificate: ${cert.title}`}
                  >
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-canvas/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-elevated/90 border border-surface-border text-xs font-mono text-lime backdrop-blur-md">
                        <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                      </span>
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-4xl w-full bg-canvas/98 border-surface-border backdrop-blur-2xl p-4 sm:p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="relative max-h-[80vh] overflow-hidden rounded-xl bg-surface flex items-center justify-center p-4">
                      <img
                        src={cert.image_url}
                        alt={cert.title}
                        className="max-h-[75vh] w-auto object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-content-secondary">
                      <span className="text-lime font-bold">{cert.title}</span>
                      {cert.issue_date && (
                        <span>
                          Issued {new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </span>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Certificate Details */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-lime uppercase tracking-wider">
                    <Award className="w-3 h-3" />
                    <span>Verified Credential</span>
                  </div>
                  {cert.issue_date && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-content-muted">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(cert.issue_date).getFullYear()}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-content-primary group-hover:text-lime transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
