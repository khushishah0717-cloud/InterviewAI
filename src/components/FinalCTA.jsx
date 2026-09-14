export default function FinalCTA() {
  return (
    <section className="bg-[#0A0A0C] text-[#F8FAFC] py-28 border-b border-[#1E293B]">
      
      {/* Clarkson Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <div className="clarkson-font max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-10">
          
          {/* HEADING */}
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            Your next interview <br />
            starts here.
          </h2>

          {/* ACTION AREA (BUTTON + DESCRIPTION MATCHING THE REFERENCE LAYOUT) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
            
            {/* SOLID WHITE BUTTON */}
            <a
              href="/practice"
              className="inline-flex items-center justify-center bg-white text-black text-sm font-extrabold tracking-wider uppercase px-8 py-4 rounded-md hover:bg-slate-200 transition-colors duration-200 shrink-0"
            >
              Start Practicing →
            </a>

            {/* SIDE DESCRIPTION */}
            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-xs">
              Practice one question today. <br />
              Walk into your next interview more prepared.
            </p>

          </div>

        </div>
      </div>

    </section>
  );
}