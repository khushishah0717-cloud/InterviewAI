import { useNavigate } from "react-router-dom";

export default function PracticeOption() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Technical & System Design",
      description:
        "Test your technical knowledge, problem-solving skills, and understanding of system design.",

      mockupImage: "/images/techin.png",

      floatingPillsLeft: [
        { title: "System Design", sub: "Distributed Systems" },
      ],
      floatingPillsRight: ["DSA", "React", "Python"],
    },
    {
      title: "Behavioral & HR",
      description:
        "Prepare clear, confident answers for the questions recruiters ask most often.",

      mockupImage: "/images/HR.png",

      floatingPillsLeft: [
        { title: "STAR Method", sub: "Situation & Task" },
      ],
      floatingPillsRight: ["Self Intro", "Strengths", "Leadership"],
    },
    {
      title: "Role-Specific",
      description:
        "Practice questions tailored specifically to the role you're targeting.",

      mockupImage: "/images/role.png",

      floatingPillsLeft: [
        { title: "Target Track", sub: "Frontend / Backend" },
      ],
      floatingPillsRight: ["Frontend", "Backend", "Data Analyst"],
    },
  ];

  return (
    <section className="bg-[#0A0A0C] text-[#F8FAFC] py-24 border-b border-[#1E293B]">

      {/* Clarkson Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');

        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .practice-mockup-image {
          image-rendering: auto;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      <div className="clarkson-font max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* SECTION HEADING */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-widest">
            Categories
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Practice the interviews that matter to you.
          </h2>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {categories.map((cat, index) => (

            <div
              key={index}
              onClick={() => navigate("/practice")}
              className="group relative h-[520px] rounded-3xl bg-gradient-to-b from-[#0A0A0C] via-[#1E293B] to-[#0c3f8b] border border-white/10 overflow-hidden p-8 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 shadow-2xl cursor-pointer"
            >

              {/* TOP CONTENT */}
              <div className="relative z-10 space-y-3">

                <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {cat.description}
                </p>

              </div>

              {/* CENTER DISPLAY */}
              <div className="relative z-10 my-auto flex items-center justify-center">

                {/* CENTRAL MOCKUP CONTAINER */}
                <div
                  className="
                    w-[180px] sm:w-[200px]
                    h-[220px]
                    bg-[#111827]
                    border border-white/15
                    rounded-2xl
                    shadow-2xl
                    overflow-hidden
                    p-3
                    relative
                  "
                >

                  <img
                    src={cat.mockupImage}
                    alt={cat.title}
                    className="
                      practice-mockup-image
                      block
                      w-full
                      h-full
                      object-contain
                      rounded-xl
                    "
                  />

                </div>

                {/* LEFT FLOATING DETAIL CARD */}
                {cat.floatingPillsLeft.map((pill, pIdx) => (

                  <div
                    key={pIdx}
                    className="
                      absolute
                      -left-2
                      bottom-6
                      bg-white
                      text-black
                      px-3.5
                      py-2
                      rounded-xl
                      shadow-2xl
                      border
                      border-black/10
                      text-left
                      transition-transform
                      duration-300
                      group-hover:-translate-x-1
                    "
                  >

                    <div className="text-[11px] font-bold leading-tight">
                      {pill.title}
                    </div>

                    <div className="text-[9px] text-slate-500 font-medium">
                      {pill.sub}
                    </div>

                  </div>

                ))}

                {/* RIGHT STACKED TAG PILLS */}
                <div
                  className="
                    absolute
                    -right-2
                    top-4
                    flex
                    flex-col
                    gap-2
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >

                  {cat.floatingPillsRight.map((tag, tIdx) => (

                    <div
                      key={tIdx}
                      className="
                        bg-white/90
                        backdrop-blur-md
                        text-slate-900
                        font-bold
                        text-[10px]
                        px-3
                        py-1.5
                        rounded-lg
                        shadow-lg
                        border
                        border-white/40
                        flex
                        items-center
                        justify-center
                      "
                    >
                      {tag}
                    </div>

                  ))}

                </div>

              </div>

              {/* BOTTOM RIGHT ARROW */}
              <div className="relative z-10 flex justify-end">

                <span className="text-white text-2xl group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}