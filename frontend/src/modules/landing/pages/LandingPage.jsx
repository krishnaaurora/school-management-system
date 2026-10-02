import React from 'react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Leadership from '../components/Leadership';
import SpecialFeatures from '../components/SpecialFeatures';
import CampusExperience from '../components/CampusExperience';
import AssistantCTA from '../components/AssistantCTA';
import Contact from '../components/Contact';

export default function LandingPage({
  onOpenAdmissions,
  onOpenAssistant,
  onOpenLogin,
}) {
  return (
    <div className="min-h-screen bg-ivory text-charcoal-800 font-sans relative">
      {/* Navigation */}
      <Navbar
        onOpenAdmissions={onOpenAdmissions}
        onOpenLogin={onOpenLogin}
        onOpenAssistant={onOpenAssistant}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenAdmissions={onOpenAdmissions}
          onOpenAssistant={onOpenAssistant}
        />

        <Intro onOpenAdmissions={onOpenAdmissions} />

        <Leadership />

        <SpecialFeatures onOpenAdmissions={onOpenAdmissions} />

        <CampusExperience />

        <AssistantCTA onOpenAssistant={onOpenAssistant} />

        <Contact onOpenAssistant={onOpenAssistant} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmissions={onOpenAdmissions}
        onOpenAssistant={onOpenAssistant}
      />
    </div>
  );
}
