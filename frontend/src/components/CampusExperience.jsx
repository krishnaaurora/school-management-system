import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { CAMPUS_SPACES } from '../data/schoolData';
import { MapPin, CheckCircle2, ChevronDown } from 'lucide-react';

export default function CampusExperience() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Monitor the scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Automatically update active scene index based strictly on vertical scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // 6 scenes mapped evenly across [0, 1]
    const segment = 1 / CAMPUS_SPACES.length;
    const computedIndex = Math.min(
      CAMPUS_SPACES.length - 1,
      Math.max(0, Math.floor(latest / segment))
    );
    if (computedIndex !== activeIdx) {
      setActiveIdx(computedIndex);
    }
  });

  const activeSpace = CAMPUS_SPACES[activeIdx] || CAMPUS_SPACES[0];

  return (
    <section
      id="campus"
      ref={containerRef}
      className="relative bg-forest-950 text-ivory h-[600vh]"
    >
      {/* Background Architectural Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Sticky Viewport Container: Stays fixed while the user scrolls down through all 6 scenes */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-10 select-none">
        
        {/* Section Header (Fixed Top) */}
        <div className="w-full border-b border-forest-800/80 pb-4 sm:pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="w-5 h-[1.5px] bg-gold-400" />
                <span className="text-[11px] uppercase tracking-super-wide font-bold text-gold-400">
                  Campus & Environment
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-ivory leading-tight">
                More Than a School
              </h2>
            </div>

            <p className="font-serif italic text-xs sm:text-sm text-gold-200/80 max-w-md text-left sm:text-right">
              “Every space at GIS is designed to encourage curiosity, collaboration, creativity, and confidence.”
            </p>
          </div>
        </div>

        {/* Central Stage: Left Image + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center my-auto w-full py-4 sm:py-6">
          
          {/* LEFT: Large School Image with Cinematic Blur & Zoom Crossfade */}
          <div className="lg:col-span-7 relative h-56 sm:h-80 md:h-96 lg:h-[420px] xl:h-[460px] rounded-2xl overflow-hidden shadow-photo-frame border border-gold-500/25 bg-forest-900/90">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeSpace.id}`}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={activeSpace.image}
                  alt={activeSpace.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/25 to-transparent pointer-events-none" />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold bg-forest-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold-400/25 text-gold-300">
                    Scene {activeSpace.index} of 06
                  </span>

                  <span className="text-[10px] sm:text-[11px] font-medium text-ivory/80 bg-forest-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-forest-700 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    <span>Hyderabad Campus</span>
                  </span>
                </div>

                {/* Bottom Tag */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <span className="text-xs font-serif italic text-gold-200 block drop-shadow-sm">
                    {activeSpace.tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Fixed Physical Information Panel with Smooth Vertical Content Transitions */}
          <div className="lg:col-span-5 relative flex flex-col justify-center min-h-[260px] sm:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeSpace.id}`}
                className="w-full bg-forest-900/80 rounded-2xl p-6 sm:p-8 border border-gold-500/20 backdrop-blur-md shadow-editorial"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Category Eyebrow */}
                <div className="inline-block text-[10px] sm:text-[11px] uppercase tracking-widest-plus font-bold text-gold-400 bg-forest-950/90 px-3 py-1 rounded-full border border-gold-400/30 mb-3">
                  {activeSpace.category}
                </div>

                {/* Scene Title */}
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory mb-3 leading-snug">
                  {activeSpace.title}
                </h3>

                {/* Description */}
                <p className="text-ivory/85 text-xs sm:text-sm lg:text-base leading-relaxed mb-5 font-normal">
                  {activeSpace.description}
                </p>

                {/* Architectural Highlights */}
                <div className="space-y-2 pt-4 border-t border-forest-800/80">
                  {activeSpace.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-ivory/75">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Status & Non-Clickable Scroll Progress Indicator */}
        <div className="w-full pt-4 border-t border-forest-800/80 flex items-center justify-between text-xs text-ivory/70">
          
          {/* Active Scene Counter */}
          <div className="flex items-center gap-2 font-mono">
            <span className="text-gold-400 font-bold text-sm">
              {activeSpace.index}
            </span>
            <span className="text-ivory/40">/</span>
            <span className="text-ivory/50">06</span>
          </div>

          {/* Non-Clickable Dot Indicators (● ○ ○ ○ ○ ○) */}
          <div className="flex items-center gap-2" aria-hidden="true">
            {CAMPUS_SPACES.map((space, i) => (
              <span
                key={`dot-${space.id}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIdx === i
                    ? 'w-6 h-2 bg-gold-400'
                    : 'w-2 h-2 bg-forest-800 opacity-60'
                }`}
              />
            ))}
          </div>

          {/* Scroll Cue (Non-clickable guidance) */}
          <div className="flex items-center gap-1.5 text-gold-300/80 text-[11px] uppercase tracking-wider">
            <span>Scroll to navigate</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-gold-400" />
          </div>

        </div>

      </div>
    </section>
  );
}
