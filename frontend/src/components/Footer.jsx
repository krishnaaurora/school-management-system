import React from 'react';
import GisEmblem from './GisEmblem';
import { SCHOOL_INFO } from '../data/schoolData';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmissions, onOpenAssistant }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-forest-950 text-ivory border-t border-forest-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Branding Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-forest-800/70 gap-6">
          <div className="flex items-center gap-4">
            <GisEmblem size="lg" />
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-ivory tracking-wide">
                {SCHOOL_INFO.name}
              </h3>
              <p className="text-xs uppercase tracking-widest-plus text-gold-400 font-semibold mt-0.5">
                {SCHOOL_INFO.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-ivory/60 hover:text-gold-300 transition-colors p-2 rounded-md hover:bg-forest-900 focus:outline-none"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 text-gold-400" />
          </button>
        </div>

        {/* Four Editorial Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12 border-b border-forest-800/70 text-sm">
          
          {/* Column 1: School */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
              School
            </p>
            <ul className="space-y-2.5 text-ivory/70">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-ivory transition-colors">
                  About Greenfield
                </a>
              </li>
              <li>
                <a href="#leadership" onClick={(e) => handleLinkClick(e, '#leadership')} className="hover:text-ivory transition-colors">
                  Leadership & Faculty
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => handleLinkClick(e, '#features')} className="hover:text-ivory transition-colors">
                  Academics & STEM
                </a>
              </li>
              <li>
                <a href="#campus" onClick={(e) => handleLinkClick(e, '#campus')} className="hover:text-ivory transition-colors">
                  Campus Facilities
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => handleLinkClick(e, '#features')} className="hover:text-ivory transition-colors">
                  Sports & Arts Activities
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Admissions */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
              Admissions
            </p>
            <ul className="space-y-2.5 text-ivory/70">
              <li>
                <button onClick={onOpenAdmissions} className="hover:text-ivory text-left transition-colors font-medium text-gold-300">
                  Admissions 2026–27
                </button>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-ivory transition-colors">
                  Fee Structure & Criteria
                </a>
              </li>
              <li>
                <button onClick={onOpenAdmissions} className="hover:text-ivory text-left transition-colors">
                  Schedule Campus Tour
                </button>
              </li>
              <li>
                <span className="text-ivory/40 cursor-not-allowed">Student Portal (SIS)</span>
              </li>
              <li>
                <span className="text-ivory/40 cursor-not-allowed">Parent Portal</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
              Resources
            </p>
            <ul className="space-y-2.5 text-ivory/70">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-ivory transition-colors">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#campus" onClick={(e) => handleLinkClick(e, '#campus')} className="hover:text-ivory transition-colors">
                  News & Campus Events
                </a>
              </li>
              <li>
                <button onClick={onOpenAssistant} className="hover:text-ivory text-left transition-colors font-medium text-gold-300">
                  School Assistant 24/7
                </button>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-ivory transition-colors">
                  Bus Transportation Network
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
              Contact GIS
            </p>
            <div className="space-y-3 text-xs text-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.generalEmail}`} className="hover:text-gold-300">
                  {SCHOOL_INFO.generalEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{SCHOOL_INFO.phone}</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 text-[10px] bg-forest-900 border border-gold-400/20 rounded text-gold-300">
                  Affiliated with Cambridge & IB
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 gap-4">
          <p>
            © {SCHOOL_INFO.established} {SCHOOL_INFO.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-ivory cursor-pointer">Privacy Policy</span>
            <span className="hover:text-ivory cursor-pointer">Terms of Use</span>
            <span className="hover:text-ivory cursor-pointer">Mandatory Public Disclosures</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
