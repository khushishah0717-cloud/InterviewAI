export default function WhyInterviewAI() {
  const features = [
    {
      icon: '⏰',
      title: 'Practice Anytime',
      description: 'Prepare whenever you want without waiting for a mock interviewer.',
      badge: '24/7 Access',
      accent: 'border-l-[#6366F1]',
      glow: 'hover:border-[#6366F1]/40',
    },
    {
      icon: '🎯',
      title: 'Realistic Practice',
      description: 'Practice questions based on real interview categories and job roles.',
      badge: 'Role Specific',
      accent: 'border-l-[#10B981]',
      glow: 'hover:border-[#10B981]/40',
    },
    {
      icon: '💡',
      title: 'Learn From Every Answer',
      description: "Don't just get a score. Understand how to improve your response.",
      badge: 'Deep Feedback',
      accent: 'border-l-amber-500',
      glow: 'hover:border-amber-500/40',
    },
    {
      icon: '📈',
      title: 'Track Your Growth',
      description: 'Review previous interviews and see how your performance changes.',
      badge: 'Analytics',
      accent: 'border-l-purple-500',
      glow: 'hover:border-purple-500/40',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0C] border-b border-[#1E293B] relative overflow-hidden">
      
      {/* Clarkson Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      {/* Background Glow Accent */}
      <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#6366F1]/15 to-[#10B981]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="clarkson-font max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Header Pitch */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">
                Why InterviewAI?
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Why Should You <br className="hidden lg:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-indigo-300 to-[#10B981]">
                Use This?
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
              No scheduling hassle, no expensive coaches. Get infinite realistic practice with instant action-oriented feedback.
            </p>

            {/* Quick Metrics */}
            <div className="pt-4 border-t border-[#1E293B] grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-[#111827] p-4 rounded-2xl border border-[#1E293B] text-center lg:text-left shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-[#10B981] tracking-tight">0 Min</div>
                <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mt-1">Wait Time</div>
              </div>
              <div className="bg-[#111827] p-4 rounded-2xl border border-[#1E293B] text-center lg:text-left shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-[#6366F1] tracking-tight">100%</div>
                <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mt-1">Private & Safe</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Stacked Feature Cards */}
          <div className="lg:col-span-7 space-y-4">
            {features.map((item) => (
              <div
                key={item.title}
                className={`group bg-[#111827] border border-[#1E293B] ${item.glow} border-l-4 ${item.accent} rounded-2xl p-6 transition-all duration-300 lg:hover:translate-x-2 shadow-xl flex items-start gap-5`}
              >
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-[#0A0A0C] border border-[#1E293B] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#6366F1] transition-colors tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 bg-[#0A0A0C] px-2.5 py-1 rounded-md border border-[#1E293B] shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}