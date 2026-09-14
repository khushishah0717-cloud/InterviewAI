import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-[#0A0A0C] text-[#F8FAFC] py-24 sm:py-32 overflow-hidden border-b border-[#1E293B]">
      
      {/* Clarkson Font Import & Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>

      {/* BACKGROUND AMBIENT NEON GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#6366F1]/15 to-[#10B981]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="clarkson-font max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* SMALL LABEL */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase">
            AI-Powered Interview Practice
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
          Practice interviews.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#94A3B8]">
            Build confidence.
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#10B981]">
            Get better.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
          Prepare for technical, behavioral, and role-specific interviews with realistic questions and personalized feedback.
        </p>

        {/* ACTION BUTTONS */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Primary CTA */}
          <Link
            to="/practice"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-extrabold text-base hover:shadow-lg hover:shadow-[#6366F1]/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            Start Practicing
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/question"
            className="w-full sm:w-auto px-8 py-4 rounded-lg border border-[#1E293B] bg-[#111827] text-slate-200 font-bold text-base hover:text-white hover:border-slate-600 hover:bg-[#1E293B] active:scale-95 transition-all duration-200 flex items-center justify-center"
          >
            Explore Questions
          </Link>

        </div>

      </div>

    </section>
  );
}