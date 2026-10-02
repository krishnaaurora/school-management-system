import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Intro({ onOpenAdmissions }) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-ivory-dark/60 border-y border-ivory-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Editorial Narrative */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-gold-600" />
              <span className="text-xs uppercase tracking-super-wide font-bold text-forest-800">
                Welcome to GIS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 leading-[1.15] mb-6">
              Education designed for the world students will lead.
            </h2>

            <div className="space-y-4 text-charcoal-700 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                At Greenfield International School, we believe education is not a standardized race, but a journey of self-discovery, critical inquiry, and global stewardship. Situated on a purpose-built 15-acre green campus in Hyderabad, GIS brings together international academic rigor and timeless ethical values.
              </p>
              <p className="text-sm sm:text-base text-charcoal-600">
                Our learners are not passive consumers of knowledge; they are thinkers, creators, and empathetic leaders prepared to navigate an interconnected world with clarity and purpose.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-ivory-border flex items-center gap-6">
              <button
                onClick={onOpenAdmissions}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-forest-900 hover:text-gold-700 transition-colors group"
              >
                <span>Discover Our Academic Philosophy</span>
                <ArrowUpRight className="w-4 h-4 text-gold-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Authentic Realistic School Campus Photograph */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative">
              {/* Photo Frame & Subtle Drop Shadow */}
              <div className="relative rounded-xl overflow-hidden shadow-photo-frame border border-ivory-border/80">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                  alt="Students engaged in collaborative international school classroom"
                  className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-ivory text-xs">
                  <p className="font-serif italic text-sm text-gold-200">Interactive Inquiry Session</p>
                  <p className="text-ivory/80 text-[11px]">Primary & Middle Years Learning Wing</p>
                </div>
              </div>

              {/* Offset Decorative Accent Badge */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-forest-900 text-ivory p-4 rounded-lg shadow-editorial border border-gold-500/20 max-w-[210px]">
                <p className="text-[10px] uppercase tracking-widest text-gold-400 font-bold mb-1">Pedagogical Core</p>
                <p className="font-serif text-xs leading-snug">Inquiry-driven, experiential, and globally benchmarked.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
