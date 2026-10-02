import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import GisEmblem from '../ui/GisEmblem';

export default function Navbar({ onOpenAdmissions, onOpenLogin, onOpenAssistant }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Academics', href: '#features' },
    { name: 'Campus', href: '#campus' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else if (onOpenAdmissions) {
      onOpenAdmissions();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-editorial border-b border-ivory-border/80 py-3.5'
          : 'bg-transparent py-5 lg:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          <GisEmblem size="md" className="group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-black leading-tight">
              GREENFIELD
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-plus text-charcoal-700 font-semibold">
              International School
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-2 text-sm font-medium text-charcoal-700 hover:text-forest-900 transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold tracking-wide text-forest-800 bg-forest-50 hover:bg-forest-100 border border-forest-800/15 rounded-md transition-colors cursor-pointer"
            title="School Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Assistant</span>
          </button>

          <button
            onClick={handleLoginClick}
            className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-bold text-ivory bg-forest-900 hover:bg-forest-800 border border-forest-950 rounded-md shadow-sm transition-all hover:shadow-subtle-elevated group cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleLoginClick}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ivory bg-forest-900 rounded-md"
          >
            Login
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-forest-900 hover:bg-ivory-dark rounded-md focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory border-b border-ivory-border px-6 pt-4 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-serif font-medium text-charcoal-800 hover:text-forest-900 py-2 border-b border-ivory-border/40"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssistant();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-forest-900 bg-forest-50 border border-forest-800/20 rounded-md"
              >
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>Talk to School Assistant</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
