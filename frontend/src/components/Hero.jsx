import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

const ease = [0.22, 1, 0.36, 1];
const TYPEWRITER_TEXT = 'WELCOME TO GREENFIELD INTERNATIONAL SCHOOL';

export default function Hero({ onOpenAdmissions, onOpenAssistant }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        index += 1;
        setDisplayedText(TYPEWRITER_TEXT.slice(0, index));
        if (index >= TYPEWRITER_TEXT.length) {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 42);

      return () => clearInterval(interval);
    }, 700);

    return () => clearTimeout(startDelay);
  }, []);

  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-32 lg:pt-36 pb-16 overflow-hidden bg-[#F8F5EF]"
    >
      {/* Background Campus Image - Crisp & Visible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/greenfield-campus-bg.jpg"
          alt="Greenfield International School Campus"
          className="w-full h-full object-cover object-center opacity-75"
        />
        {/* Soft atmospheric gradient overlay for readability without washing out details */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 48%, rgba(248, 245, 239, 0.40) 0%, rgba(248, 245, 239, 0.18) 50%, rgba(248, 245, 239, 0.50) 100%)',
          }}
        />
      </div>

      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Centred composition ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl mx-auto my-auto">

        {/* 1 ── ANIMATED EXACT GIS CREST LOGO (Refined Compact Size) ── */}
        <div className="relative mb-4 sm:mb-6 flex items-center justify-center">

          {/* Ambient warm gold glow behind the crest */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.85, 0.6], scale: [0.6, 1.1, 1] }}
            transition={{ duration: 2.2, delay: 0.3, ease: 'easeOut' }}
            style={{
              width: '240px',
              height: '240px',
              background:
                'radial-gradient(circle, rgba(197,168,128,0.28) 0%, rgba(13,59,46,0.08) 45%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />

          {/* Floating wrapper for the entire animated emblem */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 5.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: 2.2,
            }}
          >
            {/* SVG Drawing Rings Overlay around the exact logo */}
            <svg
              className="absolute -inset-3.5 sm:-inset-4 w-[calc(100%+28px)] sm:w-[calc(100%+32px)] h-[calc(100%+28px)] sm:h-[calc(100%+32px)] pointer-events-none z-20"
              viewBox="0 0 340 340"
              fill="none"
            >
              {/* Outer Decorative Gold Trace Ring */}
              <motion.circle
                cx="170"
                cy="170"
                r="160"
                stroke="#C5A880"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
                initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                animate={{ pathLength: 1, opacity: 0.85, rotate: 0 }}
                transition={{ duration: 2.0, ease: 'easeInOut', delay: 0.1 }}
                style={{ transformOrigin: '170px 170px' }}
              />

              {/* Primary Forest Green Accent Ring */}
              <motion.circle
                cx="170"
                cy="170"
                r="152"
                stroke="#0D3B2E"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0, rotate: 90 }}
                animate={{ pathLength: 1, opacity: 0.9, rotate: 0 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                style={{ transformOrigin: '170px 170px' }}
              />

              {/* Cardinal Accent Points */}
              <motion.circle cx="170" cy="10" r="3" fill="#C5A880" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, duration: 0.4 }} />
              <motion.circle cx="330" cy="170" r="3" fill="#C5A880" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9, duration: 0.4 }} />
              <motion.circle cx="170" cy="330" r="3" fill="#C5A880" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.0, duration: 0.4 }} />
              <motion.circle cx="10" cy="170" r="3" fill="#C5A880" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.1, duration: 0.4 }} />
            </svg>

            {/* Exact Logo Container with Circular Mask Draw & Multiply Blend (Compact) */}
            <motion.div
              className="relative w-[140px] h-[140px] sm:w-[165px] sm:h-[165px] md:w-[185px] md:h-[185px] rounded-full overflow-hidden select-none flex items-center justify-center shadow-xl"
              initial={{
                clipPath: 'circle(0% at 50% 50%)',
                opacity: 0,
                scale: 0.82,
              }}
              animate={{
                clipPath: 'circle(52% at 50% 50%)',
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              style={{
                backgroundColor: '#FAF7F2',
              }}
            >
              {/* Exact Crest Image with blend */}
              <img
                src="/gis-crest.jpg"
                alt="Greenfield International School Crest"
                className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none p-0.5"
                draggable={false}
              />

              {/* Cinematic Light Sweep / Glint across the crest */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: '-150%', opacity: 0 }}
                animate={{ x: '180%', opacity: [0, 0.55, 0] }}
                transition={{
                  duration: 1.4,
                  delay: 1.35,
                  ease: 'easeInOut',
                }}
                style={{
                  background:
                    'linear-gradient(115deg, transparent 35%, rgba(197,168,128,0.5) 48%, rgba(255,255,255,0.85) 52%, transparent 65%)',
                  transform: 'skewX(-20deg)',
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 2 ── SCHOOL NAME — typewriter effect compact badge ── */}
        <div className="mb-4 sm:mb-5 min-h-[2rem] flex items-center justify-center">
          <div className="inline-flex items-center justify-center px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full bg-[#0D3B2E]/95 backdrop-blur-md border border-[#C5A880]/60 shadow-md shadow-[#0D3B2E]/20">
            <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs font-sans font-bold tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#F8F5EF] inline-flex items-center justify-center whitespace-nowrap">
              <span>{displayedText}</span>
              <motion.span
                className="inline-block w-[2px] h-[1.1em] bg-[#C5A880] ml-1 sm:ml-1.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.75,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </p>
          </div>
        </div>

        {/* 3 ── HEADLINE — single line without white container, with white 'Grow.' ── */}
        <div className="overflow-hidden mb-3 sm:mb-4">
          <motion.h1
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#07241B] tracking-tight leading-[1.15] whitespace-nowrap drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease, delay: 1.9 }}
          >
            Dream. Learn.{' '}
            <span className="italic font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)] px-1">
              Grow.
            </span>{' '}
            Lead.
          </motion.h1>
        </div>


      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#C5A880]/40 shadow-sm
                   text-[#0D3B2E] hover:text-[#07241B] hover:bg-white/90 transition-all focus:outline-none cursor-pointer"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.22em] font-bold">Discover GIS</span>
        <motion.svg
          className="w-3.5 h-3.5 text-[#96661E]"
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

    </section>
  );
}
