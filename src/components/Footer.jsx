import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0C] text-[#F8FAFC] pt-20 pb-12 border-t border-[#1E293B]">

      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');

        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <div className="clarkson-font max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* TOP SECTION: BRAND & 3 COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-2xl font-black text-white tracking-tight">
              InterviewAI
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-normal">
              Practice smarter. Prepare with confidence.
            </p>
          </div>

          {/* 3 LINKS COLUMNS */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">

            {/* COLUMN 1: PRACTICE */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Practice
              </h4>

              <ul className="space-y-2.5 text-sm text-slate-400">

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Technical Interviews
                  </Link>
                </li>

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Behavioral & HR
                  </Link>
                </li>

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    System Design
                  </Link>
                </li>

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Practice Interview
                  </Link>
                </li>

              </ul>
            </div>

            {/* COLUMN 2: ROLES */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Roles
              </h4>

              <ul className="space-y-2.5 text-sm text-slate-400">

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Frontend Developer
                  </Link>
                </li>

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Backend Developer
                  </Link>
                </li>

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Data Analyst
                  </Link>
                </li>

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Software Developer
                  </Link>
                </li>

              </ul>
            </div>

            {/* COLUMN 3: RESOURCES */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Resources
              </h4>

              <ul className="space-y-2.5 text-sm text-slate-400">

                {/* Question Bank */}
                <li>
                  <Link
                    to="/question"
                    className="hover:text-white transition-colors"
                  >
                    Question Bank
                  </Link>
                </li>

                {/* Interview Practice */}
                <li>
                  <Link
                    to="/practice"
                    className="hover:text-white transition-colors"
                  >
                    Interview Practice
                  </Link>
                </li>

                {/* Dashboard */}
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>

              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM COPYRIGHT SECTION */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-slate-400">

          <p>© 2026 InterviewAI</p>

          <p>Built for better interview preparation.</p>

        </div>

      </div>
    </footer>
  );
}