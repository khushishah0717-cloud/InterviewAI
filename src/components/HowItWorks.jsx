export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose your interview',
      description:
        'Select a role, interview type, and difficulty that match your preparation goals.',
      accent: 'text-[#6366F1]',
      borderHover: 'hover:border-[#6366F1]/50',
      glow: 'group-hover:shadow-[#6366F1]/10',
    },
    {
      number: '02',
      title: 'Practice',
      description:
        'Answer realistic interview questions in a focused interview environment.',
      accent: 'text-[#10B981]',
      borderHover: 'hover:border-[#10B981]/50',
      glow: 'group-hover:shadow-[#10B981]/10',
    },
    {
      number: '03',
      title: 'Review & improve',
      description:
        'Get feedback on your performance and identify areas you can improve.',
      accent: 'text-amber-400',
      borderHover: 'hover:border-amber-400/50',
      glow: 'group-hover:shadow-amber-400/10',
    },
  ];

  return (
    <section className="bg-[#0A0A0C] text-[#F8FAFC] py-20 border-b border-[#1E293B]">
      
      {/* Clarkson Font Import & Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>

      <div className="clarkson-font max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION HEADING */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            From preparation to confidence in three steps.
          </h2>
        </div>

        {/* 3-STEP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group bg-[#111827] border border-[#1E293B] rounded-xl p-8 transition-all duration-300 shadow-xl ${step.borderHover} ${step.glow} flex flex-col justify-between`}
            >
              <div className="space-y-4">
                {/* STEP NUMBER */}
                <span className={`text-4xl font-black font-mono ${step.accent}`}>
                  {step.number}
                </span>

                {/* STEP TITLE */}
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {step.title}
                </h3>

                {/* STEP DESCRIPTION */}
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}