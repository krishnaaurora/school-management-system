import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { LEADERSHIP_PROFILES } from '../../../data/schoolData';

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 lg:py-28 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-gold-600" />
            <span className="text-xs uppercase tracking-super-wide font-bold text-forest-800">
              Institutional Governance
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 leading-tight mb-4">
            Leadership with Purpose
          </h2>
          <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
            Guiding the vision, culture, and academic journey of Greenfield International School with decades of proven educational governance.
          </p>
        </div>

        {/* 4 Portrait Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {LEADERSHIP_PROFILES.map((leader) => (
            <motion.div
              key={leader.id}
              className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-editorial transition-shadow duration-300 cursor-pointer group"
              style={{ aspectRatio: '3 / 4' }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {/* ── Portrait (always visible, blurs on hover) ── */}
              <img
                src={leader.image}
                alt={leader.name}
                className="absolute inset-0 w-full h-full object-cover object-top
                           transition-all duration-500 ease-out
                           group-hover:scale-105 group-hover:blur-md group-hover:brightness-50"
                loading="lazy"
              />

              {/* Resting gradient — just name at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent
                              group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

              {/* Resting name strip */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12
                              bg-gradient-to-t from-forest-950/95 via-forest-950/50 to-transparent
                              group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <h3 className="font-serif text-base font-bold text-ivory leading-snug">
                  {leader.name}
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold mt-0.5">
                  {leader.role}
                </p>
              </div>

              {/* ── Hover overlay — FULLY OPAQUE solid dark bg, no image showing ── */}
              <div
                className="absolute inset-0 flex flex-col justify-center
                           bg-[#0B2E23]
                           px-6 py-7
                           opacity-0 group-hover:opacity-100
                           translate-y-4 group-hover:translate-y-0
                           transition-all duration-350 ease-out"
              >
                {/* Qualification badge */}
                <span className="inline-block self-start text-[10px] text-gold-300
                                 bg-forest-800/60 border border-gold-500/30
                                 px-2.5 py-0.5 rounded uppercase tracking-widest font-semibold mb-4">
                  {leader.qualification}
                </span>

                {/* Name */}
                <h3 className="font-serif text-xl font-bold text-ivory leading-snug mb-1">
                  {leader.name}
                </h3>

                {/* Role */}
                <p className="text-[11px] uppercase tracking-widest text-gold-400 font-bold mb-4">
                  {leader.role}
                </p>

                {/* Gold rule */}
                <div className="w-8 h-[1.5px] bg-gold-500 mb-5" />

                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="w-4 h-4 text-gold-400/60 mb-2 rotate-180" />
                  <p className="font-serif italic text-ivory/95 text-sm leading-relaxed">
                    {leader.quote}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-[11px] text-ivory/70 leading-relaxed line-clamp-4 border-t border-forest-700/60 pt-4">
                  {leader.bio}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
