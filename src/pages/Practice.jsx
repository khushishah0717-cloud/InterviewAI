import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PracticePage() {
  const navigate = useNavigate();

  // Categories & Topics Definition
  const categoriesData = {
    'Technical Interview': {
      description: 'For testing technical knowledge and problem-solving.',
      topics: [
        'Programming',
        'DSA',
        'JavaScript',
        'React',
        'Databases',
        'System Design',
        'Git/GitHub',
      ],
    },
    'Behavioral & HR': {
      description: 'For communication and common HR interview preparation.',
      topics: [
        'Introduction',
        'Strengths & Weaknesses',
        'Situational Questions',
        'Teamwork',
        'Conflict Resolution',
        'STAR Method',
        'Career/Motivation Questions',
      ],
    },
    'Role-Specific': {
      description: 'Deep, targeted practice for specific industry roles.',
      topics: [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'Data Analyst',
        'Software Developer',
      ],
    },
  };

  // Selection States
  const [selectedCategory, setSelectedCategory] = useState('Technical Interview');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [sessionMode, setSessionMode] = useState('Standard Mode');

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedTopic('');
  };

  const handleLaunchSession = () => {
    if (!selectedTopic) return;

    navigate('/interview/active', {
      state: {
        title: `${selectedTopic} Session`,
        category: selectedCategory,
        topic: selectedTopic,
        difficulty,
        totalQuestions: questionCount,
        mode: sessionMode,
        allowedTypes:
          sessionMode === 'Rapid Fire'
            ? ['MCQ', 'Short Answer']
            : ['MCQ', 'Short Answer', 'Open-Ended'],
        allowPrevious: true,
        hideProgress: true,
        requireAnswerToNext: true,
      },
    });
  };

  const isReadyToStart = Boolean(selectedTopic);

  return (
    <div className="bg-[#050507] text-white min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

        .clarkson-font {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <main className="clarkson-font w-full max-w-[1200px] mx-auto space-y-8">
        {/* PAGE HEADER */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-mono font-bold text-sky-400 uppercase tracking-widest">
            Practice Hub
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Customize Your Mock Interview
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Select your configuration below to launch your session.
          </p>
        </div>

        {/* STEP 1: SELECT CATEGORY */}
        <div className="bg-[#121826] border border-slate-700 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl">
          <label className="text-sm sm:text-base font-mono font-bold uppercase text-sky-400 block tracking-wider">
            1. Select Category
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(categoriesData).map((catName) => {
              const isSelected = selectedCategory === catName;

              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => handleCategoryChange(catName)}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-150 ${
                    isSelected
                      ? 'bg-white text-black border-white ring-4 ring-white/30 scale-[1.01]'
                      : 'bg-[#0B0F17] text-slate-200 border-slate-700 hover:border-slate-400 hover:bg-[#161f30]'
                  }`}
                >
                  <p className="text-lg sm:text-sm font-black uppercase tracking-wide">
                    {catName}
                  </p>

                  <p
                    className={`text-sm mt-2 font-medium leading-relaxed ${
                      isSelected ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {categoriesData[catName].description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: TOPIC SELECTION */}
        <div className="bg-[#121826] border border-slate-700 rounded-2xl p-6 sm:p-7 space-y-7 shadow-2xl">
          <label className="text-sm sm:text-base font-mono font-bold uppercase text-sky-400 block tracking-wider">
            2. Select Topic / Role
          </label>

          <div className="flex flex-wrap gap-3">
            {categoriesData[selectedCategory].topics.map((topic) => {
              const isSelected = selectedTopic === topic;

              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`py-3 px-6 rounded-xl text-sm font-extrabold uppercase tracking-wider border-2 transition-all ${
                    isSelected
                      ? 'bg-sky-400 text-black border-sky-400 ring-4 ring-sky-400/30'
                      : 'bg-[#0B0F17] text-slate-200 border-slate-700 hover:border-slate-400 hover:bg-[#161f30]'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3 & 4: DIFFICULTY & QUESTION COUNT */}
        <div className="bg-[#121826] border border-slate-700 rounded-2xl p-6 sm:p-7 space-y-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DIFFICULTY */}
            <div className="space-y-3">
              <label className="text-sm sm:text-base font-mono font-bold uppercase text-sky-400 block tracking-wider">
                3. Difficulty
              </label>

              <div className="grid grid-cols-3 gap-3">
                {['Easy', 'Medium', 'Hard'].map((lvl) => {
                  const isSelected = difficulty === lvl;

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDifficulty(lvl)}
                      className={`py-3 rounded-xl text-sm font-extrabold uppercase border-2 transition-all ${
                        isSelected
                          ? 'bg-white text-black border-white ring-4 ring-white/30'
                          : 'bg-[#0B0F17] text-slate-200 border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUESTION COUNT (Only 5 and 10 options) */}
            <div className="space-y-3">
              <label className="text-sm sm:text-base font-mono font-bold uppercase text-sky-400 block tracking-wider">
                4. Number of Questions
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[5, 10].map((num) => {
                  const isSelected = questionCount === num;

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount(num)}
                      className={`py-3 rounded-xl text-sm font-extrabold uppercase border-2 transition-all ${
                        isSelected
                          ? 'bg-white text-black border-white ring-4 ring-white/30'
                          : 'bg-[#0B0F17] text-slate-200 border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {num} Questions
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MODE SELECTION */}
          <div className="space-y-3 pt-5 border-t border-slate-800">
            <label className="text-sm sm:text-base font-mono font-bold uppercase text-sky-400 block tracking-wider">
              5. Select Mode
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Standard Mode */}
              <button
                type="button"
                onClick={() => setSessionMode('Standard Mode')}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  sessionMode === 'Standard Mode'
                    ? 'bg-white text-black border-white ring-4 ring-white/30'
                    : 'bg-[#0B0F17] border-slate-700 text-slate-200 hover:border-slate-400'
                }`}
              >
                <p className="text-sm font-black uppercase tracking-wide">
                  Standard Mode
                </p>

                <p
                  className={`text-sm mt-2 font-medium leading-relaxed ${
                    sessionMode === 'Standard Mode'
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  MCQ, Short Answer, & Open-Ended questions. Includes untimed
                  thinking periods.
                </p>
              </button>

              {/* Rapid Fire Mode */}
              <button
                type="button"
                onClick={() => setSessionMode('Rapid Fire')}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  sessionMode === 'Rapid Fire'
                    ? 'bg-white text-black border-white ring-4 ring-white/30'
                    : 'bg-[#0B0F17] border-slate-700 text-slate-200 hover:border-slate-400'
                }`}
              >
                <p className="text-sm font-black uppercase tracking-wide">
                  Rapid Fire Mode
                </p>

                <p
                  className={`text-sm mt-2 font-medium leading-relaxed ${
                    sessionMode === 'Rapid Fire'
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  Strictly MCQ & Short Answer. Paced with tight session timers.
                </p>
              </button>
            </div>
          </div>

          {/* LAUNCH BUTTON */}
          <div className="pt-5 border-t border-slate-800">
            <button
              type="button"
              disabled={!isReadyToStart}
              onClick={handleLaunchSession}
              className={`w-full font-black text-base sm:text-lg uppercase tracking-widest py-4 sm:py-5 rounded-xl transition-all ${
                isReadyToStart
                  ? 'bg-sky-400 text-black hover:bg-sky-300 shadow-lg shadow-sky-400/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isReadyToStart
                ? `Start Interview (${questionCount} Questions) →`
                : 'Select a Topic Above to Begin'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}