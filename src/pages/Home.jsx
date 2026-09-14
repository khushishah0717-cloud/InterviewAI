import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import PracticeOption from '../components/PracticeOption';
import WhyInterviewAI from '../components/WhyInterviewAI';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC]">
      <main>
        <HeroSection />
        <HowItWorks />
        <PracticeOption/>
        <WhyInterviewAI/>
        <FinalCTA/>
      </main>
    </div>
  );
}