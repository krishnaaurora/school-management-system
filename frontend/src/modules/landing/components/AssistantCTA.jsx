import React from 'react';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function AssistantCTA({ onOpenAssistant }) {
  return (
    <section className="py-14 bg-forest-900 text-ivory border-y border-forest-950 relative overflow-hidden">
      {/* Editorial Decorative Watermark */}
      <div className="absolute right-8 -bottom-8 opacity-5 font-serif text-9xl font-bold select-none pointer-events-none text-gold-300">
        GIS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10 bg-forest-950/60 p-6 sm:p-8 rounded-2xl border border-gold-500/25 backdrop-blur-sm shadow-editorial">
          
          {/* Left: Assistant Info */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative w-12 h-12 rounded-xl bg-forest-800 border border-gold-400/40 flex items-center justify-center flex-shrink-0 text-gold-400">
              <Sparkles className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-forest-950" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold-400">
                  Institutional Information Service
                </span>
                <span className="text-xs text-ivory/40">·</span>
                <span className="text-[11px] text-ivory/70">Instant 24/7 Guidance</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ivory mb-1">
                Need a quick answer?
              </h3>

              <p className="text-xs sm:text-sm text-ivory/80 max-w-xl leading-relaxed">
                Our school assistant can help you find information about admissions, academics, activities, facilities, transport routes, and more.
              </p>
            </div>
          </div>

          {/* Right: Trigger Button */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenAssistant}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-forest-950 bg-gold-400 hover:bg-gold-300 rounded-md shadow-sm hover:shadow-subtle-elevated transition-all group"
            >
              <MessageSquare className="w-4 h-4 text-forest-900" />
              <span>Talk to Our Assistant</span>
              <ArrowRight className="w-4 h-4 text-forest-900 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
