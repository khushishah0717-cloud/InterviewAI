import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // ================= MOBILE STATE =================
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);
  const [mobileQuestionsOpen, setMobileQuestionsOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const profileRef = useRef(null);
  const navbarRef = useRef(null);

  // ================= AUTH STATE =================
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  // ================= CLOSE MENUS WHEN CLICKING OUTSIDE =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }

      // Close mobile menu
      // Close mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }

      // Close desktop mega menu
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ================= PROTECTED ACTION =================
  const handleProtectedAction = (authenticatedCallback) => {
    if (!user) {
      navigate("/signup");
    } else {
      authenticatedCallback();
    }
  };

  // ================= CLOSE ALL MENUS =================
  const closeAllMenus = () => {
    setActiveMenu(null);
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    setMobilePracticeOpen(false);
    setMobileQuestionsOpen(false);
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProfileMenuOpen(false);
    setActiveMenu(null);
    setMobileMenuOpen(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  // ================= MOBILE DASHBOARD =================
  const handleMobileDashboard = () => {
    handleProtectedAction(() => {
      closeAllMenus();
      navigate("/dashboard");
    });
  };

  return (
    <header
      ref={navbarRef}
      onMouseLeave={() => {
        // Close desktop dropdown when mouse leaves
        // the complete navbar + mega menu area.
        setActiveMenu(null);
      }}
      className="sticky top-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#1E293B]"
    >

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* ================= BRAND ================= */}

        <Link
          to="/"
          onClick={closeAllMenus}
          className="flex items-center group"
        >
          <span className="text-2xl font-black tracking-tight text-white">
            Interview<span className="text-[#6366F1]">AI</span>
          </span>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}

        <nav className="hidden md:flex items-center gap-10">

          {/* ---------- PRACTICE ---------- */}

          <div className="relative py-6">

            <button
              onMouseEnter={() => {
                if (user) {
                  setActiveMenu("practice");
                  setProfileMenuOpen(false);
                }
              }}
              onClick={() => {
                handleProtectedAction(() => {
                  setActiveMenu(
                    activeMenu === "practice"
                      ? null
                      : "practice"
                  );

                  setProfileMenuOpen(false);
                });
              }}
              className={`text-base font-bold flex items-center gap-2 transition-colors ${activeMenu === "practice"
                  ? "text-[#6366F1]"
                  : "text-slate-200 hover:text-white"
                }`}
            >
              Practice

              <svg
                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "practice"
                    ? "rotate-180 text-[#6366F1]"
                    : "text-slate-500"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

          </div>

          {/* ---------- QUESTIONS ---------- */}

          <div className="relative py-6">

            <button
              onMouseEnter={() => {
                if (user) {
                  setActiveMenu("questions");
                  setProfileMenuOpen(false);
                }
              }}
              onClick={() => {
                handleProtectedAction(() => {
                  setActiveMenu(
                    activeMenu === "questions"
                      ? null
                      : "questions"
                  );

                  setProfileMenuOpen(false);
                });
              }}
              className={`text-base font-bold flex items-center gap-2 transition-colors ${activeMenu === "questions"
                  ? "text-[#10B981]"
                  : "text-slate-200 hover:text-white"
                }`}
            >
              Questions

              <svg
                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "questions"
                    ? "rotate-180 text-[#10B981]"
                    : "text-slate-500"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

          </div>

          {/* ---------- DASHBOARD ---------- */}

          <button
            onMouseEnter={() => {
              // Moving the mouse to Dashboard
              // closes Practice/Questions dropdown.
              setActiveMenu(null);
            }}
            onClick={() => {
              handleProtectedAction(() => {
                setActiveMenu(null);
                setProfileMenuOpen(false);
                navigate("/dashboard");
              });
            }}
            className="text-base font-bold text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            Dashboard
          </button>

        </nav>

        {/* ================= AUTH / PROFILE ================= */}

        <div className="flex items-center gap-2 sm:gap-3">

          {!user ? (

            <>
              {/* SIGN IN */}

              <Link
                to="/signin"
                className="px-3 sm:px-5 py-2.5 rounded-lg text-white font-bold text-sm hover:text-[#6366F1] transition-colors"
              >
                Sign In
              </Link>

              {/* SIGN UP */}

              <Link
                to="/signup"
                className="px-4 sm:px-6 py-2.5 rounded-lg border border-[#1E293B] bg-[#111827] text-white font-bold text-sm hover:border-[#6366F1]/50 hover:bg-[#1E293B] active:scale-95 transition-all shadow-md"
              >
                Sign Up
              </Link>

            </>

          ) : (

            /* ================= PROFILE ================= */

            <div
              ref={profileRef}
              className="relative"
            >

              {/* PROFILE BUTTON */}

              <button
                onClick={() => {
                  setProfileMenuOpen(!profileMenuOpen);
                  setActiveMenu(null);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-xl hover:bg-[#111827] transition-colors"
              >

                {/* PROFILE CIRCLE */}

                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#10B981] flex items-center justify-center text-white font-bold text-sm">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                {/* USER NAME */}

                <span className="hidden lg:block text-sm font-bold text-white">
                  {user.name || "User"}
                </span>

                {/* DOWN ARROW */}

                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${profileMenuOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

              </button>

              {/* PROFILE DROPDOWN */}

              {profileMenuOpen && (

                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#111827] border border-[#1E293B] shadow-2xl overflow-hidden">

                  {/* PROFILE */}

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-[#1E293B] hover:text-white transition-colors"
                  >
                    Profile
                  </button>

                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-[#1E293B] hover:text-white transition-colors border-t border-[#1E293B]"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            ref={mobileMenuButtonRef}
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setProfileMenuOpen(false);
              setActiveMenu(null);
            }}
            className="md:hidden ml-1 w-10 h-10 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-[#111827] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >

            {mobileMenuOpen ? (

              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

            ) : (

              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

            )}

          </button>

        </div>

      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenuOpen && (

        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-[#1E293B] bg-[#0E131F] shadow-2xl"
        >

          <div className="px-4 py-4 space-y-2">

            {/* ================= MOBILE PRACTICE ================= */}

            <div>

              <button
                onClick={() => {
                  handleProtectedAction(() => {
                    setMobilePracticeOpen(!mobilePracticeOpen);
                    setMobileQuestionsOpen(false);
                  });
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-200 hover:bg-[#111827] transition-colors"
              >

                <span className="font-bold">
                  Practice
                </span>

                <svg
                  className={`w-4 h-4 transition-transform ${mobilePracticeOpen
                      ? "rotate-180 text-[#6366F1]"
                      : "text-slate-500"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

              </button>

              {mobilePracticeOpen && user && (

                <div className="ml-3 mt-1 border-l border-[#1E293B] pl-3 space-y-1">

                  <Link
                    to="/practice"
                    onClick={closeAllMenus}
                    className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                  >
                    DSA & Algorithms
                  </Link>

                  <Link
                    to="/practice"
                    onClick={closeAllMenus}
                    className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                  >
                    Programming Concepts
                  </Link>

                  <Link
                    to="/practice"
                    onClick={closeAllMenus}
                    className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                  >
                    System Design
                  </Link>

                  <Link
                    to="/practice"
                    onClick={closeAllMenus}
                    className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                  >
                    Technical Fundamentals
                  </Link>

                  <div className="pt-2">

                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                      Behavioral & HR
                    </p>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Tell me about yourself
                    </Link>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Strengths & Weaknesses
                    </Link>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Situational Scenarios
                    </Link>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      STAR-Based Questions
                    </Link>

                  </div>

                  <div className="pt-2">

                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Role-Specific
                    </p>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Frontend Developer
                    </Link>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Backend Developer
                    </Link>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Data Analyst
                    </Link>

                    <Link
                      to="/practice"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Software Developer
                    </Link>

                  </div>

                </div>

              )}

            </div>

            {/* ================= MOBILE QUESTIONS ================= */}

            <div>

              <button
                onClick={() => {
                  handleProtectedAction(() => {
                    setMobileQuestionsOpen(!mobileQuestionsOpen);
                    setMobilePracticeOpen(false);
                  });
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-200 hover:bg-[#111827] transition-colors"
              >

                <span className="font-bold">
                  Questions
                </span>

                <svg
                  className={`w-4 h-4 transition-transform ${mobileQuestionsOpen
                      ? "rotate-180 text-[#10B981]"
                      : "text-slate-500"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

              </button>

              {mobileQuestionsOpen && user && (

                <div className="ml-3 mt-1 border-l border-[#1E293B] pl-3 space-y-1">

                  <Link
                    to="/question"
                    onClick={closeAllMenus}
                    className="block px-3 py-2.5 text-sm text-slate-400 hover:text-[#10B981] rounded-lg hover:bg-[#111827]"
                  >
                    Technical Questions
                  </Link>

                  <Link
                    to="/question"
                    onClick={closeAllMenus}
                    className="block px-3 py-2.5 text-sm text-slate-400 hover:text-[#10B981] rounded-lg hover:bg-[#111827]"
                  >
                    Behavioral & HR
                  </Link>

                  <Link
                    to="/question"
                    onClick={closeAllMenus}
                    className="block px-3 py-2.5 text-sm text-slate-400 hover:text-[#10B981] rounded-lg hover:bg-[#111827]"
                  >
                    System Design Problems
                  </Link>

                  <div className="pt-2">

                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Popular Topics
                    </p>

                    <Link
                      to="/question"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      React & Frontend Concepts
                    </Link>

                    <Link
                      to="/question"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      Data Structures & Algorithms
                    </Link>

                    <Link
                      to="/question"
                      onClick={closeAllMenus}
                      className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[#111827]"
                    >
                      URL Shortener & Microservices
                    </Link>

                  </div>

                </div>

              )}

            </div>

            {/* ================= MOBILE DASHBOARD ================= */}

            <button
              onClick={handleMobileDashboard}
              className="w-full text-left px-4 py-3 rounded-xl text-slate-200 font-bold hover:bg-[#111827] transition-colors"
            >
              Dashboard
            </button>

          </div>

        </div>

      )}

      {/* =====================================================
          DESKTOP MEGA MENU
      ===================================================== */}

      {activeMenu && user && (

        <div
          className="hidden md:block border-t border-[#1E293B] bg-[#0E131F]/98 backdrop-blur-xl py-8 shadow-2xl"
        >

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ================= PRACTICE MENU ================= */}

            {activeMenu === "practice" && (

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Technical */}

                <div className="space-y-3">

                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-[#6366F1]" />

                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#6366F1]">
                      Technical & System Design
                    </span>

                  </div>

                  <ul className="space-y-2 text-sm">

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        DSA & Algorithms
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Programming Concepts
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        System Design
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Technical Fundamentals
                      </Link>
                    </li>

                  </ul>

                </div>

                {/* Behavioral */}

                <div className="space-y-3">

                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />

                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#10B981]">
                      Behavioral & HR
                    </span>

                  </div>

                  <ul className="space-y-2 text-sm">

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Tell me about yourself
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Strengths & Weaknesses
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Situational Scenarios
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        STAR-Based Questions
                      </Link>
                    </li>

                  </ul>

                </div>

                {/* Role Specific */}

                <div className="space-y-3">

                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-amber-400" />

                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-400">
                      Role-Specific
                    </span>

                  </div>

                  <ul className="space-y-2 text-sm">

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Frontend Developer
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Backend Developer
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Data Analyst
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/practice"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Software Developer
                      </Link>
                    </li>

                  </ul>

                </div>

                {/* Practice Information */}

                <div className="bg-[#111827] border border-[#6366F1]/40 rounded-xl p-5 flex flex-col justify-between space-y-4">

                  <div>

                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6366F1] bg-[#6366F1]/10 px-2.5 py-1 rounded">
                      Interview Practice
                    </span>

                    <h4 className="text-base font-bold text-white mt-2">
                      Build confidence through practice
                    </h4>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Choose a category, topic, difficulty, and practice mode to simulate an interview and improve your answers.
                    </p>

                  </div>

                  <Link
                    to="/practice"
                    onClick={() => setActiveMenu(null)}
                    className="w-full py-2 bg-[#6366F1] text-white text-xs font-bold text-center rounded-md hover:bg-indigo-500 transition-colors"
                  >
                    Start Practicing →
                  </Link>

                </div>

              </div>

            )}

            {/* ================= QUESTIONS MENU ================= */}

            {activeMenu === "questions" && (

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Browse */}

                <div className="space-y-3">

                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#10B981]">
                    Browse Question Library
                  </span>

                  <p className="text-xs text-slate-400">
                    Explore and revise questions by role, topic, and difficulty before starting an interview simulation.
                  </p>

                  <ul className="space-y-2 text-sm pt-1">

                    <li>
                      <Link
                        to="/question"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-[#10B981] font-medium block"
                      >
                        Technical Questions
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/question"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-[#10B981] font-medium block"
                      >
                        Behavioral & HR
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/question"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-[#10B981] font-medium block"
                      >
                        System Design Problems
                      </Link>
                    </li>

                  </ul>

                </div>

                {/* Popular Topics */}

                <div className="space-y-3">

                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-400">
                    Popular Topics
                  </span>

                  <ul className="space-y-2 text-sm">

                    <li>
                      <Link
                        to="/question"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        React & Frontend Concepts
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/question"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        Data Structures & Algorithms
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/question"
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-300 hover:text-white font-medium block"
                      >
                        URL Shortener & Microservices
                      </Link>
                    </li>

                  </ul>

                </div>

                {/* Question Library */}

                <div className="bg-[#111827] border border-[#10B981]/30 rounded-xl p-5 flex flex-col justify-between">

                  <div>

                    <h4 className="text-base font-bold text-white">
                      Question Library
                    </h4>

                    <p className="text-xs text-slate-400 mt-1">
                      Review questions, answers, and explanations before your interview practice.
                    </p>

                  </div>

                  <Link
                    to="/question"
                    onClick={() => setActiveMenu(null)}
                    className="w-full py-2 bg-[#10B981] text-white text-xs font-bold text-center rounded-md hover:bg-emerald-500 transition-colors mt-4"
                  >
                    Explore All Questions →
                  </Link>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </header>
  );
}