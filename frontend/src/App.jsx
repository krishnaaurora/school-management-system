import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Leadership from './components/Leadership';
import SpecialFeatures from './components/SpecialFeatures';
import CampusExperience from './components/CampusExperience';
import AssistantCTA from './components/AssistantCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SchoolAssistantModal from './components/SchoolAssistantModal';
import AdmissionsModal from './components/AdmissionsModal';
import LoginPage from './components/LoginPage';

export default function App() {
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'landing'

  // Hash route listener for easy #login / #home switching
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#landing' || hash === '#home' || hash === '#about' || hash === '#academics' || hash === '#features' || hash === '#campus' || hash === '#contact') {
        setCurrentView('landing');
      } else if (hash === '#login') {
        setCurrentView('login');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-ivory text-charcoal-800 font-sans relative">
        <LoginPage
          onNavigateHome={() => {
            setCurrentView('landing');
            window.location.hash = '#home';
          }}
          onOpenAdmissions={() => setAdmissionsOpen(true)}
          onOpenAssistant={() => setAssistantOpen(true)}
        />

        {/* Global Modals */}
        <SchoolAssistantModal
          isOpen={assistantOpen}
          onClose={() => setAssistantOpen(false)}
          onOpenAdmissions={() => {
            setAssistantOpen(false);
            setAdmissionsOpen(true);
          }}
        />

        <AdmissionsModal
          isOpen={admissionsOpen}
          onClose={() => setAdmissionsOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal-800 font-sans relative">
      {/* Navigation */}
      <Navbar
        onOpenAdmissions={() => setAdmissionsOpen(true)}
        onOpenLogin={() => {
          setCurrentView('login');
          window.location.hash = '#login';
        }}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic 3D Hero */}
        <Hero
          onOpenAdmissions={() => setAdmissionsOpen(true)}
          onOpenAssistant={() => setAssistantOpen(true)}
        />

        {/* 2. Editorial Introduction */}
        <Intro
          onOpenAdmissions={() => setAdmissionsOpen(true)}
        />

        {/* 3. Leadership with Purpose */}
        <Leadership />

        {/* 4. What Makes Greenfield Special (Editorial Bento) */}
        <SpecialFeatures
          onOpenAdmissions={() => setAdmissionsOpen(true)}
        />

        {/* 5. Campus Experience (More Than a School) */}
        <CampusExperience
          onOpenAdmissions={() => setAdmissionsOpen(true)}
        />

        {/* 6. Institutional Assistant CTA */}
        <AssistantCTA
          onOpenAssistant={() => setAssistantOpen(true)}
        />

        {/* 7. Contact & Inquiries */}
        <Contact
          onOpenAssistant={() => setAssistantOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmissions={() => setAdmissionsOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Modals */}
      <SchoolAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onOpenAdmissions={() => {
          setAssistantOpen(false);
          setAdmissionsOpen(true);
        }}
      />

      <AdmissionsModal
        isOpen={admissionsOpen}
        onClose={() => setAdmissionsOpen(false)}
      />
    </div>
  );
}

