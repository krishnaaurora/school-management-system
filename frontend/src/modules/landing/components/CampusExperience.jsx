import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { CAMPUS_SPACES } from '../../../data/schoolData';
import { MapPin, CheckCircle2, ChevronDown, Footprints, Compass, X, Volume2, VolumeX, Building2, Sparkles } from 'lucide-react';
import SchoolScene from './SchoolScene';

// 3D Virtual Campus Walk Modal Component
function VirtualWalkModal({ isOpen, onClose, spaceName }) {
  const [activeWaypoint, setActiveWaypoint] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const waypoints = [
    { name: "Main Academic Building", tag: "LEED Gold Certified", desc: "Passive thermal architecture with natural daylighting, energy-efficient glazing, and shaded colonnades." },
    { name: "Central Courtyard", tag: "200+ Native Trees", desc: "Tranquil open green spaces fostering student collaboration, outdoor learning, and serene contemplation." },
    { name: "Cantilevered Library", tag: "20,000+ Volumes", desc: "Double-height glass façade overlooking central gardens, with quiet study carrels and digital repositories." },
    { name: "STEM & Robotics Pavilion", tag: "High-Tech Maker Hub", desc: "State-of-the-art innovation wing equipped with 3D printers, laser cutters, and IoT research benches." },
    { name: "Sports Arena & Track", tag: "Olympic Standard", desc: "400m synthetic running track and 8-lane semi-Olympic pool with underground rainwater retention." },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-forest-950/95 backdrop-blur-xl select-none"
      >
        <div className="relative w-full max-w-6xl h-[90vh] bg-forest-900 border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-forest-800 bg-forest-950/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-400 shrink-0">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-super-wide text-gold-400 font-bold">
                  Virtual Campus Architecture
                </p>
                <h3 className="text-base sm:text-xl font-serif font-bold text-ivory flex items-center gap-2">
                  Interactive 3D Campus Walk
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">
                    Live 3D
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  soundEnabled
                    ? 'bg-gold-400/20 border-gold-400 text-gold-300 shadow-md'
                    : 'bg-forest-800/80 border-forest-700 text-ivory/60 hover:text-ivory'
                }`}
                title={soundEnabled ? "Mute Campus Ambiance" : "Play Campus Ambiance"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-forest-800/80 hover:bg-forest-700 text-ivory border border-forest-700 transition-colors cursor-pointer"
                title="Close Virtual Walk"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main 3D Canvas Area */}
          <div className="relative flex-1 bg-forest-950 overflow-hidden">
            <SchoolScene />

            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 bg-forest-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gold-500/20 text-xs text-ivory/80 flex items-center gap-2 pointer-events-none shadow-md">
              <Compass className="w-4 h-4 text-gold-400 animate-spin-slow" />
              <span>Move cursor to tilt & inspect 3D architecture</span>
            </div>

            {/* Waypoint Selector overlay at bottom of canvas */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 bg-forest-950/85 backdrop-blur-md rounded-2xl border border-gold-500/20 shadow-xl scrollbar-none">
              <span className="text-[11px] uppercase tracking-wider text-gold-400 font-bold flex items-center gap-1.5 mr-2 flex-shrink-0">
                <Building2 className="w-3.5 h-3.5 text-gold-400" /> Spots:
              </span>
              {waypoints.map((wp, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveWaypoint(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeWaypoint === idx
                      ? 'bg-gold-400 text-forest-950 font-bold shadow-md scale-105'
                      : 'bg-forest-900/90 text-ivory/80 hover:bg-forest-800 border border-forest-700'
                  }`}
                >
                  {wp.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Spot Info Footer */}
          <div className="p-4 px-6 bg-forest-950/95 border-t border-forest-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-gold-400">
                  Spot {activeWaypoint + 1} of {waypoints.length}: {waypoints[activeWaypoint].name}
                </span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-forest-800 text-gold-300 border border-forest-700">
                  {waypoints[activeWaypoint].tag}
                </span>
              </div>
              <p className="text-xs text-ivory/70 max-w-2xl">
                {waypoints[activeWaypoint].desc}
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-forest-950 font-bold text-xs transition-colors cursor-pointer flex-shrink-0"
            >
              Exit Tour
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CampusExperience() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isWalkModalOpen, setIsWalkModalOpen] = useState(false);

  // Monitor scroll progress through section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Parallax transforms for high-end scroll depth
  const bgPatternY = useTransform(scrollYProgress, [0, 1], ['0px', '140px']);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['-20px', '100px']);
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Update active scene index based on vertical scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
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
    <>
      <section
        id="campus"
        ref={containerRef}
        className="relative bg-forest-950 text-ivory h-[600vh] overflow-hidden"
      >
        {/* Parallax Background Architectural Grid & Texture Overlay */}
        <motion.div
          style={{ y: bgPatternY }}
          className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A880_1.5px,transparent_1.5px)] [background-size:28px_28px]"
        />

        {/* Ambient Glowing Parallax Orbs */}
        <motion.div
          style={{ rotate: orbRotate }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ rotate: orbRotate }}
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none"
        />

        {/* Parallax Background Watermark */}
        <motion.div
          style={{ y: watermarkY }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none text-forest-900/40 text-[10vw] lg:text-[12vw] font-serif font-black tracking-tighter whitespace-nowrap select-none z-0 uppercase"
        >
          Campus Architecture
        </motion.div>

        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-10 select-none">
          
          {/* Section Header */}
          <div className="w-full border-b border-forest-800/80 pb-4 sm:pb-5 z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-[1.5px] bg-gold-400" />
                  <span className="text-[11px] uppercase tracking-super-wide font-bold text-gold-400">
                    Campus & Environment
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-ivory leading-tight flex items-center gap-3">
                  More Than a School
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* Header Virtual Walk Quick Action */}
                <button
                  onClick={() => setIsWalkModalOpen(true)}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/90 border border-gold-400/40 hover:border-gold-400 text-gold-300 text-xs font-semibold transition-all hover:bg-forest-800 cursor-pointer shadow-md group"
                >
                  <Footprints className="w-3.5 h-3.5 text-gold-400 transition-transform group-hover:scale-110" />
                  <span>Walk Campus</span>
                </button>

                <p className="font-serif italic text-xs sm:text-sm text-gold-200/80 max-w-md text-left sm:text-right hidden md:block">
                  “Every space at GIS is designed to encourage curiosity, collaboration, creativity, and confidence.”
                </p>
              </div>
            </div>
          </div>

          {/* Central Stage: Parallax Left Image + Parallax Right Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center my-auto w-full py-2 sm:py-4">
            
            {/* LEFT: School Image with Scroll Parallax & Zoom Crossfade */}
            <motion.div
              style={{ y: imageParallaxY }}
              className="lg:col-span-7 relative h-56 sm:h-80 md:h-96 lg:h-[420px] xl:h-[460px] rounded-2xl overflow-hidden shadow-photo-frame border border-gold-500/25 bg-forest-900/90"
            >
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
                  
                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/30 to-transparent pointer-events-none" />

                  {/* Top Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold bg-forest-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-gold-400/25 text-gold-300 shadow-sm">
                      Scene {activeSpace.index} of 06
                    </span>

                    <span className="text-[10px] sm:text-[11px] font-medium text-ivory/80 bg-forest-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-forest-700 flex items-center gap-1.5 shadow-sm">
                      <MapPin className="w-3 h-3 text-gold-400" />
                      <span>Hyderabad Campus</span>
                    </span>
                  </div>

                  {/* Bottom Image Tag */}
                  <div className="absolute bottom-4 left-4 pointer-events-none max-w-[60%]">
                    <span className="text-xs font-serif italic text-gold-200 block drop-shadow-md">
                      {activeSpace.tag}
                    </span>
                  </div>

                  {/* Interactive Virtual Walk Overlay Button on Image */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsWalkModalOpen(true)}
                    className="absolute bottom-4 right-4 z-20 bg-forest-950/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-gold-400/50 text-ivory flex items-center gap-2.5 shadow-2xl hover:border-gold-400 cursor-pointer group"
                  >
                    <div className="text-left hidden xs:block">
                      <span className="text-[9px] uppercase tracking-wider text-gold-300 font-bold block leading-none mb-0.5">
                        dive into our campus virtually
                      </span>
                      <span className="text-xs font-bold text-ivory leading-none flex items-center gap-1">
                        Walk <Sparkles className="w-3 h-3 text-gold-400" />
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gold-400 text-forest-950 flex items-center justify-center font-bold group-hover:bg-gold-300 transition-colors shadow-sm">
                      <Footprints className="w-3.5 h-3.5" />
                    </div>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* RIGHT: Content Panel with Parallax Scroll & Smooth Transitions */}
            <motion.div
              style={{ y: contentParallaxY }}
              className="lg:col-span-5 relative flex flex-col justify-center min-h-[260px] sm:min-h-[300px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeSpace.id}`}
                  className="w-full bg-forest-900/85 rounded-2xl p-5 sm:p-7 border border-gold-500/25 backdrop-blur-md shadow-editorial"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Category Eyebrow */}
                  <div className="inline-block text-[10px] sm:text-[11px] uppercase tracking-widest-plus font-bold text-gold-400 bg-forest-950/90 px-3 py-1 rounded-full border border-gold-400/30 mb-3 shadow-sm">
                    {activeSpace.category}
                  </div>

                  {/* Scene Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-ivory mb-2.5 leading-snug">
                    {activeSpace.title}
                  </h3>

                  {/* Description */}
                  <p className="text-ivory/85 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 font-normal">
                    {activeSpace.description}
                  </p>

                  {/* Architectural Highlights */}
                  <div className="space-y-2 pt-3 border-t border-forest-800/80">
                    {activeSpace.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-ivory/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Caption & Walk Button Block */}
                  <div className="mt-4 pt-3.5 border-t border-forest-800/80 bg-forest-950/60 p-3.5 rounded-xl border border-gold-500/20 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-semibold text-gold-300 block leading-tight">
                        dive into our campus virtually
                      </span>
                      <span className="text-[10px] text-ivory/60 block mt-0.5">
                        Interactive 3D architecture tour
                      </span>
                    </div>

                    <button
                      onClick={() => setIsWalkModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-forest-950 font-bold text-xs shadow-md hover:shadow-gold-400/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer group shrink-0"
                    >
                      <Footprints className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      <span>Walk</span>
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Bottom Status Bar */}
          <div className="w-full pt-4 border-t border-forest-800/80 flex items-center justify-between text-xs text-ivory/70 z-10">
            
            {/* Active Scene Counter */}
            <div className="flex items-center gap-2 font-mono">
              <span className="text-gold-400 font-bold text-sm">
                {activeSpace.index}
              </span>
              <span className="text-ivory/40">/</span>
              <span className="text-ivory/50">06</span>
            </div>

            {/* Dot Indicators */}
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

            {/* Scroll Guidance */}
            <div className="flex items-center gap-1.5 text-gold-300/80 text-[11px] uppercase tracking-wider">
              <span>Scroll for next scene</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-gold-400" />
            </div>

          </div>

        </div>
      </section>

      {/* Interactive 3D Virtual Walk Modal */}
      <VirtualWalkModal
        isOpen={isWalkModalOpen}
        onClose={() => setIsWalkModalOpen(false)}
        spaceName={activeSpace.title}
      />
    </>
  );
}

