const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Question() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // --------------------------------------------------
  // FETCH QUESTION BANK FROM MONGODB
  // --------------------------------------------------

  useEffect(() => {
    const fetchQuestionBank = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/question-bank`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load question bank."
          );
        }

        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Question Bank Error:", err);
        setError("Unable to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionBank();
  }, [navigate]);

  // --------------------------------------------------
  // CATEGORY OPTIONS
  // --------------------------------------------------

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        questions
          .map((question) => question.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [questions]);

  // --------------------------------------------------
  // DIFFICULTY OPTIONS
  // --------------------------------------------------

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // --------------------------------------------------
  // FILTER QUESTIONS
  // --------------------------------------------------

 const filteredQuestions = useMemo(() => {
  const searchText = search.trim().toLowerCase();

  return questions.filter((item) => {
    // 1. Normalize fields (handling potential different property names in MongoDB)
    const questionText = (
      item.question || 
      item.title || 
      item.questionText || 
      ""
    ).toLowerCase();

    const subcategory = (item.subcategory || "").toLowerCase();
    const itemCategory = (item.category || "").toLowerCase();
    
    // Optional: Search inside options and answers as well
    const optionsText = Array.isArray(item.options) 
      ? item.options.join(" ").toLowerCase() 
      : "";
    const answerText = (item.answer || item.explanation || "").toLowerCase();

    // 2. Category & Difficulty match
    const selectedCategory =
      category === "All" || item.category === category;

    const selectedDifficulty =
      difficulty === "All" || item.difficulty === difficulty;

    // 3. Search match (checks question text, subcategory, category, options, and answer)
    const searchMatch =
      !searchText ||
      questionText.includes(searchText) ||
      subcategory.includes(searchText) ||
      itemCategory.includes(searchText) ||
      optionsText.includes(searchText) ||
      answerText.includes(searchText);

    return selectedCategory && selectedDifficulty && searchMatch;
  });
}, [questions, category, difficulty, search]);

  // --------------------------------------------------
  // TOGGLE QUESTION
  // --------------------------------------------------

  const toggleQuestion = (id) => {
    setExpandedId((currentId) =>
      currentId === id ? null : id
    );
  };

  // --------------------------------------------------
  // START PRACTICE
  // --------------------------------------------------

  const handleStartQuestionPractice = (question) => {
    navigate("/interview/active", {
      state: {
        title: question.question,
        category: question.category,
        subcategory: question.subcategory,
        difficulty: question.difficulty,
        format: "Standard Question & Answer",
        totalQuestions: 1,
        questionId: question._id,
      },
    });
  };

  return (
    <div className="bg-[#0A0A0C] text-[#F8FAFC] min-h-screen">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');

        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <main className="clarkson-font max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* ==================================================
            PAGE HEADER
            ================================================== */}

        <div className="max-w-4xl space-y-4">

          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Question Bank
          </p>

          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-[1.05]">
            Explore questions. <br />
            Review solutions.
          </h1>

          <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-md pt-2">
            Search top interview prompts, review core answer frameworks, and practice answering them live.
          </p>

        </div>

        {/* ==================================================
            QUESTION BANK
            ================================================== */}

        <section>

          <div className="max-w-6xl mx-auto">

            {/* --------------------------------------------------
                FILTERS
                -------------------------------------------------- */}

            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Search */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Search
                </label>

                <input
                  type="text"
                  placeholder="Search questions or topics..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#111114] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-purple-500"
                />
              </div>

              {/* Category */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#111114] border border-white/10 text-white outline-none focus:border-purple-500"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#111114] border border-white/10 text-white outline-none focus:border-purple-500"
                >
                  {difficulties.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* --------------------------------------------------
                RESULT COUNT
                -------------------------------------------------- */}

            {!loading && !error && (
              <div className="mb-5">

                <p className="text-sm text-gray-500">
                  Showing {filteredQuestions.length}{" "}
                  {filteredQuestions.length === 1
                    ? "question"
                    : "questions"}
                </p>

              </div>
            )}

            {/* --------------------------------------------------
                LOADING
                -------------------------------------------------- */}

            {loading && (
              <div className="py-16 text-center">

                <p className="text-gray-400">
                  Loading questions...
                </p>

              </div>
            )}

            {/* --------------------------------------------------
                ERROR
                -------------------------------------------------- */}

            {!loading && error && (
              <div className="py-16 text-center">

                <p className="text-red-400 mb-4">
                  {error}
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
                >
                  Try Again
                </button>

              </div>
            )}

            {/* --------------------------------------------------
                NO QUESTIONS
                -------------------------------------------------- */}

            {!loading &&
              !error &&
              filteredQuestions.length === 0 && (
                <div className="py-16 text-center">

                  <p className="text-gray-300 text-lg">
                    No questions found.
                  </p>

                  <p className="mt-2 text-gray-500">
                    Try changing your search or filters.
                  </p>

                </div>
              )}

            {/* --------------------------------------------------
                QUESTIONS LIST
                -------------------------------------------------- */}

            {!loading &&
              !error &&
              filteredQuestions.length > 0 && (
                <div className="space-y-4">

                  {filteredQuestions.map((question, index) => {
                    const questionId =
                      question._id || index;

                    const isExpanded =
                      expandedId === questionId;

                    return (
                      <div
                        key={questionId}
                        className="rounded-xl border border-white/10 bg-[#111114] overflow-hidden"
                      >

                        {/* QUESTION HEADER */}

                        <button
                          onClick={() =>
                            toggleQuestion(questionId)
                          }
                          className="w-full text-left p-5 md:p-6 hover:bg-white/[0.02] transition"
                        >

                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                            <div className="flex-1">

                              {/* Tags */}

                              <div className="flex flex-wrap items-center gap-2 mb-3">

                                {question.category && (
                                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300">
                                    {question.category}
                                  </span>
                                )}

                                {question.subcategory && (
                                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
                                    {question.subcategory}
                                  </span>
                                )}

                                {question.difficulty && (
                                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
                                    {question.difficulty}
                                  </span>
                                )}

                              </div>

                              {/* Question */}

                              <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed">
                                {index + 1}.{" "}
                                {question.question}
                              </h2>

                            </div>

                            {/* Expand icon */}

                            <span className="text-gray-500 text-xl font-bold">
                              {isExpanded ? "−" : "+"}
                            </span>

                          </div>

                        </button>

                        {/* ==================================================
                            EXPANDED ANSWER SECTION
                            ================================================== */}

                        {isExpanded && (
                          <div className="border-t border-white/10 px-5 md:px-6 py-6 bg-[#0D0D10]/50 space-y-6">

                            {/* OPTIONS */}

                            {Array.isArray(question.options) &&
                              question.options.length > 0 && (

                                <div>

                                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                                    Options
                                  </h3>

                                  <div className="space-y-2">

                                    {question.options.map(
                                      (option, optionIndex) => {

                                        const isCorrect =
                                          option ===
                                          question.correctAnswer ||
                                          optionIndex ===
                                          question.correctAnswerIndex;

                                        return (
                                          <div
                                            key={optionIndex}
                                            className={`px-4 py-3 rounded-lg border ${
                                              isCorrect
                                                ? "border-green-500/30 bg-green-500/10 text-green-300"
                                                : "border-white/10 bg-[#0D0D10] text-gray-400"
                                            }`}
                                          >

                                            <div className="flex items-center gap-3">

                                              <span className="text-sm font-bold">
                                                {String.fromCharCode(
                                                  65 + optionIndex
                                                )}
                                                .
                                              </span>

                                              <span>
                                                {option}
                                              </span>

                                              {isCorrect && (
                                                <span className="ml-auto text-xs text-green-400 font-semibold">
                                                  Correct Answer
                                                </span>
                                              )}

                                            </div>

                                          </div>
                                        );
                                      }
                                    )}

                                  </div>

                                </div>
                              )}

                            {/* ANSWER */}

                            <div>

                              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                                Answer & Solution
                              </h3>

                              <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 px-4 py-4">

                                <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                                  {question.answer ||
                                    question.correctAnswer ||
                                    question.explanation ||
                                    "Answer not available."}
                                </p>

                              </div>

                            </div>

                            

                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>
              )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Question;