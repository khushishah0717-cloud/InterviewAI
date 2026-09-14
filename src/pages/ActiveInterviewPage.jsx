const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import React, {
  useEffect,
  useRef,
  useState
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

export default function ActiveInterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // --------------------------------------------------
  // INTERVIEW DETAILS
  // --------------------------------------------------

  const {
    category = "Technical Interview",
    topic = "JavaScript",
    totalQuestions = 10,
    mode = "Standard Mode",
    difficulty = "Medium"
  } = location.state || {};

  // --------------------------------------------------
  // RAPID FIRE CHECK
  // --------------------------------------------------

  const isRapidFire =
    mode === "Rapid Fire" ||
    mode === "Rapid Fire Mode";

  // --------------------------------------------------
  // RAPID FIRE TIME
  // --------------------------------------------------

  const initialRapidTime =
    Number(totalQuestions) <= 5 ? 60 : 120;

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [userAnswers, setUserAnswers] = useState({});

  const [isCompleted, setIsCompleted] =
    useState(false);

  const [timedOut, setTimedOut] =
    useState(false);

  const [result, setResult] = useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [aiFeedback, setAiFeedback] =
    useState("");

  const [aiFeedbackLoading, setAiFeedbackLoading] =
    useState(false);

  const [seconds, setSeconds] = useState(
    isRapidFire
      ? initialRapidTime
      : 0
  );

  // --------------------------------------------------
  // REFS
  // --------------------------------------------------

  const userAnswersRef =
    useRef({});

  const secondsRef = useRef(
    isRapidFire
      ? initialRapidTime
      : 0
  );

  // --------------------------------------------------
  // FETCH QUESTIONS
  // --------------------------------------------------

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/questions`
        );

        if (!response.ok) {
          throw new Error(
            `Server returned status ${response.status}`
          );
        }

        const data =
          await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid question data received from server."
          );
        }

        // --------------------------------------------------
        // DETERMINE ACTUAL SUBCATEGORY
        // --------------------------------------------------

        let actualSubcategory = topic;

        if (
          category === "Role-Specific" &&
          topic.includes(" - ")
        ) {
          actualSubcategory =
            topic
              .split(" - ")
              .slice(1)
              .join(" - ");
        }

        // --------------------------------------------------
        // FILTER QUESTIONS
        // --------------------------------------------------

        let filteredQuestions =
          data.filter((question) => {
            const categoryMatches =
              question.category ===
              category;

            const subcategoryMatches =
              question.subcategory ===
              actualSubcategory;

            return (
              categoryMatches &&
              subcategoryMatches
            );
          });

        // --------------------------------------------------
        // CHECK QUESTIONS
        // --------------------------------------------------

        if (
          filteredQuestions.length === 0
        ) {
          throw new Error(
            `No questions found for ${category} → ${actualSubcategory}.`
          );
        }

        // --------------------------------------------------
        // SHUFFLE QUESTIONS
        // --------------------------------------------------

        filteredQuestions = [
          ...filteredQuestions
        ].sort(
          () => Math.random() - 0.5
        );

        // --------------------------------------------------
        // SELECT REQUIRED NUMBER
        // --------------------------------------------------

        filteredQuestions =
          filteredQuestions.slice(
            0,
            Number(totalQuestions)
          );

        // --------------------------------------------------
        // CHECK QUESTION COUNT
        // --------------------------------------------------

        if (
          filteredQuestions.length <
          Number(totalQuestions)
        ) {
          throw new Error(
            `Only ${filteredQuestions.length} questions are available for ${category} → ${actualSubcategory}. You requested ${totalQuestions}.`
          );
        }

        // --------------------------------------------------
        // FORMAT QUESTIONS
        // --------------------------------------------------

        const formattedQuestions =
          filteredQuestions.map((q) => ({
            id: q._id,

            category: q.category,

            subcategory:
              q.subcategory,

            question: q.question,

            options:
              Array.isArray(q.options)
                ? q.options
                : [],

            difficulty:
              q.difficulty || "Easy"
          }));

        setQuestions(
          formattedQuestions
        );

      } catch (err) {
        console.error(
          "Error loading questions from MongoDB:",
          err
        );

        setError(
          err.message ||
            "Unable to load questions. Please make sure the backend is running."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

  }, [
    category,
    topic,
    totalQuestions
  ]);

  // --------------------------------------------------
  // TIMER
  // --------------------------------------------------

  useEffect(() => {
    if (
      isCompleted ||
      timedOut ||
      loading ||
      questions.length === 0
    ) {
      return;
    }

    const timer =
      setInterval(() => {
        setSeconds((prev) => {

          // --------------------------------------------------
          // RAPID FIRE TIMER
          // --------------------------------------------------

          if (isRapidFire) {

            if (prev <= 1) {
              clearInterval(timer);

              secondsRef.current = 0;

              // IMPORTANT:
              // Do NOT submit the interview.
              // Show Time's Up screen instead.

              setTimedOut(true);

              return 0;
            }

            const newValue =
              prev - 1;

            secondsRef.current =
              newValue;

            return newValue;
          }

          // --------------------------------------------------
          // STANDARD MODE TIMER
          // --------------------------------------------------

          const newValue =
            prev + 1;

          secondsRef.current =
            newValue;

          return newValue;
        });

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [
    isRapidFire,
    isCompleted,
    timedOut,
    loading,
    questions.length
  ]);

  // --------------------------------------------------
  // FORMAT TIME
  // --------------------------------------------------

  const formatTime = (totalSecs) => {
    const mins =
      Math.floor(
        totalSecs / 60
      );

    const secs =
      totalSecs % 60;

    return `${mins
      .toString()
      .padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // --------------------------------------------------
  // CURRENT QUESTION
  // --------------------------------------------------

  const currentQuestion =
    questions[currentIndex];

  const selectedOption =
    userAnswers[currentIndex];

  const isAnswerProvided =
    Boolean(selectedOption);

  // --------------------------------------------------
  // PROGRESS
  // --------------------------------------------------
  // Starts at 0%.
  // After each submitted/answered question,
  // progress increases based on the number of
  // completed questions.

  const completedQuestions =
    Object.keys(userAnswers).length;

  const progressPercentage =
    questions.length > 0
      ? Math.round(
          (completedQuestions /
            questions.length) *
            100
        )
      : 0;

  // --------------------------------------------------
  // SELECT OPTION
  // --------------------------------------------------

  const handleSelectOption = (
    option
  ) => {
    const updatedAnswers = {
      ...userAnswersRef.current,
      [currentIndex]: option
    };

    userAnswersRef.current =
      updatedAnswers;

    setUserAnswers(
      updatedAnswers
    );
  };

  // --------------------------------------------------
  // NEXT QUESTION
  // --------------------------------------------------

  const handleNext = () => {
    if (!isAnswerProvided) {
      return;
    }

    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (previous) =>
          previous + 1
      );
    } else {
      finishInterview();
    }
  };

  // --------------------------------------------------
  // PREVIOUS QUESTION
  // --------------------------------------------------

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) =>
          previous - 1
      );
    }
  };

  // --------------------------------------------------
  // GENERATE AI FEEDBACK
  // --------------------------------------------------

  const generateAIFeedback = async ({
    token,
    score,
    percentage,
    review,
    actualSubcategory
  }) => {
    try {
      setAiFeedbackLoading(true);
      setAiFeedback("");

      const response = await fetch(
        `${API_URL}/api/interview/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            category,
            subcategory: actualSubcategory,
            mode,
            difficulty,
            score,
            percentage,
            totalQuestions: questions.length,
            review
          })
        }
      );

      const data = await response.json().catch(
        () => null
      );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `AI feedback request failed with status ${response.status}`
        );
      }

      if (data?.success && data?.feedback) {
        setAiFeedback(data.feedback);
      } else {
        throw new Error(
          "AI feedback was not returned by the server."
        );
      }
    } catch (err) {
      console.error(
        "Error generating AI feedback:",
        err
      );

      // AI feedback is optional. The normal interview
      // result should still remain available if AI fails.
      setAiFeedback(
        "AI feedback is currently unavailable. Please review your answers and try again later."
      );
    } finally {
      setAiFeedbackLoading(false);
    }
  };

  // --------------------------------------------------
  // SUBMIT INTERVIEW
  // --------------------------------------------------

  const finishInterview =
    async () => {

      if (
        isCompleted ||
        timedOut ||
        submitting ||
        questions.length === 0
      ) {
        return;
      }

      setSubmitting(true);

      try {

        // --------------------------------------------------
        // GET LOGIN TOKEN
        // --------------------------------------------------

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          alert(
            "Your session has expired. Please sign in again."
          );

          setSubmitting(false);

          navigate("/signin");

          return;
        }

        // --------------------------------------------------
        // PREPARE ANSWERS
        // --------------------------------------------------

        const answers =
          questions.map(
            (question, index) => ({
              questionId:
                question.id,

              selectedAnswer:
                userAnswersRef
                  .current[index] ||
                null
            })
          );

        // --------------------------------------------------
        // CALCULATE ELAPSED TIME
        // --------------------------------------------------

        let timeTaken =
          secondsRef.current;

        if (isRapidFire) {
          timeTaken =
            initialRapidTime -
            secondsRef.current;
        }

        // --------------------------------------------------
        // DETERMINE SUBCATEGORY
        // --------------------------------------------------

        const actualSubcategory =
          category ===
            "Role-Specific" &&
          topic.includes(" - ")
            ? topic
                .split(" - ")
                .slice(1)
                .join(" - ")
            : topic;

        // --------------------------------------------------
        // SEND TO BACKEND
        // --------------------------------------------------

        const response =
          await fetch(
            `${API_URL}/api/interview/submit`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`
              },

              body: JSON.stringify({
                category,

                subcategory:
                  actualSubcategory,

                mode,

                difficulty,

                totalQuestions:
                  questions.length,

                answers,

                timeTaken
              })
            }
          );

        // --------------------------------------------------
        // HANDLE ERROR RESPONSE
        // --------------------------------------------------

        if (!response.ok) {

          const errorData =
            await response
              .json()
              .catch(
                () => null
              );

          throw new Error(
            errorData?.message ||
              `Submission failed with status ${response.status}`
          );
        }

        // --------------------------------------------------
        // GET RESULT
        // --------------------------------------------------

        const data =
          await response.json();

        console.log(
          "Interview submission successful:",
          data
        );

        // --------------------------------------------------
        // SHOW RESULT
        // --------------------------------------------------

        setResult(data);

        setIsCompleted(
          true
        );

        // Generate personalized AI feedback after
        // the normal interview result is available.
        generateAIFeedback({
          token,
          score: data.score,
          percentage: data.percentage,
          review: data.review || [],
          actualSubcategory
        });

      } catch (err) {

        console.error(
          "Error submitting interview:",
          err
        );

        setError(
          err.message ||
            "Unable to calculate your result. Please make sure the backend submission API is running."
        );

      } finally {

        setSubmitting(false);
      }
    };

  // --------------------------------------------------
  // RESTART INTERVIEW
  // --------------------------------------------------

  const handleRestart = () => {

    setUserAnswers({});

    userAnswersRef.current =
      {};

    setCurrentIndex(0);

    setResult(null);

    setAiFeedback("");
    setAiFeedbackLoading(false);

    setError("");

    setIsCompleted(
      false
    );

    setTimedOut(
      false
    );

    setSubmitting(
      false
    );

    const initialTime =
      isRapidFire
        ? initialRapidTime
        : 0;

    setSeconds(
      initialTime
    );

    secondsRef.current =
      initialTime;
  };

  // --------------------------------------------------
  // BACK TO PRACTICE
  // --------------------------------------------------

  const handleBackToPractice =
    () => {
      navigate("/practice");
    };

  // --------------------------------------------------
  // LOADING SCREEN
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-2xl font-semibold mb-3">
            Loading Questions...
          </div>

          <p className="text-gray-400">
            Fetching questions from
            InterviewAI.
          </p>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // ERROR SCREEN
  // --------------------------------------------------

  if (
    error &&
    questions.length === 0
  ) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center px-6">

        <div className="max-w-lg w-full text-center">

          <div className="text-2xl font-semibold mb-4">
            Unable to Load Questions
          </div>

          <p className="text-gray-400 mb-6">
            {error}
          </p>

          <div className="flex justify-center gap-3">

            <button
              onClick={
                handleBackToPractice
              }
              className="px-5 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900 transition"
            >
              Back to Practice
            </button>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="px-5 py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // TIME'S UP SCREEN
  // --------------------------------------------------

  if (timedOut) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center px-6">

        <div className="max-w-lg w-full text-center">

          <div className="rounded-2xl border border-gray-800 bg-[#0b0b0f] p-8 md:p-10">

            <div className="text-4xl mb-5">
              ⏰
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Time's Up!
            </h1>

            <p className="text-gray-400 leading-7 mb-8">
              Your Rapid Fire interview time has ended.
              This interview was not submitted.
              Please start a new practice session to try again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={
                  handleRestart
                }
                className="flex-1 px-5 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
              >
                Start Practice Again
              </button>

              <button
                onClick={
                  handleBackToPractice
                }
                className="flex-1 px-5 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900 transition"
              >
                Back to Practice
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // RESULT SCREEN
  // --------------------------------------------------

  if (isCompleted) {

    const score =
      result?.score ?? 0;

    const total =
      result?.totalQuestions ??
      questions.length;

    const percentage =
      result?.percentage ??
      (
        total > 0
          ? Math.round(
              (score / total) * 100
            )
          : 0
      );

    const correct =
      result?.correct ??
      score;

    const incorrect =
      result?.incorrect ??
      total - correct;

    const review =
      result?.review || [];

    return (
      <div className="min-h-screen bg-[#050507] text-white px-6 py-10">

        <div className="max-w-5xl mx-auto">

          {/* HEADER */}

          <div className="mb-10">

            <p className="text-sm text-gray-500 mb-2">
              {category} • {topic}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              Interview Complete
            </h1>

            <p className="text-gray-400 mt-2">
              Here is your performance
              summary.
            </p>

          </div>

          {/* SUBMISSION ERROR */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          )}

          {/* SCORE CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            {/* SCORE */}

            <div className="rounded-xl border border-gray-800 bg-[#0b0b0f] p-6">

              <p className="text-sm text-gray-500 mb-2">
                Score
              </p>

              <p className="text-4xl font-bold">
                {score}/{total}
              </p>

            </div>

            {/* PERCENTAGE */}

            <div className="rounded-xl border border-gray-800 bg-[#0b0b0f] p-6">

              <p className="text-sm text-gray-500 mb-2">
                Percentage
              </p>

              <p className="text-4xl font-bold">
                {percentage}%
              </p>

            </div>

            {/* RESULT */}

            <div className="rounded-xl border border-gray-800 bg-[#0b0b0f] p-6">

              <p className="text-sm text-gray-500 mb-2">
                Result
              </p>

              <p className="text-2xl font-semibold">

                {percentage >= 80
                  ? "Excellent"
                  : percentage >= 60
                  ? "Good"
                  : "Keep Practicing"}

              </p>

            </div>

          </div>

          {/* PERFORMANCE SUMMARY */}

          <div className="rounded-xl border border-gray-800 bg-[#0b0b0f] p-6 mb-8">

            <h2 className="text-xl font-semibold mb-5">
              Performance Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* QUESTIONS */}

              <div>

                <p className="text-gray-500 text-sm">
                  Total Questions
                </p>

                <p className="text-xl font-semibold mt-1">
                  {total}
                </p>

              </div>

              {/* CORRECT */}

              <div>

                <p className="text-gray-500 text-sm">
                  Correct
                </p>

                <p className="text-xl font-semibold mt-1">
                  {correct}
                </p>

              </div>

              {/* INCORRECT */}

              <div>

                <p className="text-gray-500 text-sm">
                  Incorrect
                </p>

                <p className="text-xl font-semibold mt-1">
                  {incorrect}
                </p>

              </div>

            </div>

            {/* TIME */}

            {isRapidFire && (
              <div className="mt-5 pt-5 border-t border-gray-800">

                <p className="text-gray-500 text-sm">
                  Time
                </p>

                <p className="text-xl font-semibold mt-1">
                  {formatTime(
                    result?.timeTaken ??
                      secondsRef.current
                  )}
                </p>

              </div>
            )}

          </div>

          {/* AI FEEDBACK */}

          <div className="rounded-xl border border-gray-800 bg-[#0b0b0f] p-6 mb-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">

              <h2 className="text-xl font-semibold">
                AI Feedback
              </h2>

              {aiFeedbackLoading && (
                <span className="text-sm text-gray-500">
                  Analyzing your performance...
                </span>
              )}

            </div>

            {aiFeedbackLoading ? (
              <div className="space-y-3">

                <div className="h-4 bg-gray-800 rounded animate-pulse w-11/12" />

                <div className="h-4 bg-gray-800 rounded animate-pulse w-full" />

                <div className="h-4 bg-gray-800 rounded animate-pulse w-4/5" />

              </div>
            ) : (
              <div className="text-gray-300 leading-7 whitespace-pre-line">
                {aiFeedback ||
                  "AI feedback will appear here after your interview result is calculated."}
              </div>
            )}

          </div>

          {/* QUESTION REVIEW */}

          <div className="rounded-xl border border-gray-800 bg-[#0b0b0f] p-6 mb-8">

            <h2 className="text-xl font-semibold mb-6">
              Question Review
            </h2>

            <div className="space-y-6">

              {review.map(
                (item, index) => {

                  const selected =
                    item.selectedAnswer;

                  const correctAnswer =
                    item.correctAnswer;

                  const isCorrect =
                    item.isCorrect;

                  return (
                    <div
                      key={
                        item.questionId ||
                        index
                      }
                      className="border-b border-gray-800 last:border-b-0 pb-6 last:pb-0"
                    >

                      {/* QUESTION */}

                      <div className="flex gap-3">

                        <span className="text-gray-500">
                          {index + 1}.
                        </span>

                        <div className="flex-1">

                          <p className="text-gray-200 leading-6">
                            {item.question}
                          </p>

                          {/* YOUR ANSWER */}

                          <div className="mt-4">

                            <p className="text-sm text-gray-500 mb-1">
                              Your answer
                            </p>

                            <p
                              className={
                                isCorrect
                                  ? "text-green-400"
                                  : "text-red-400"
                              }
                            >
                              {selected ||
                                "Not answered"}
                            </p>

                          </div>

                          {/* CORRECT ANSWER */}

                          <div className="mt-3">

                            <p className="text-sm text-gray-500 mb-1">
                              Correct answer
                            </p>

                            <p className="text-green-400">
                              {correctAnswer ||
                                "Not available"}
                            </p>

                          </div>

                          {/* STATUS */}

                          <div className="mt-3">

                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-sm ${
                                isCorrect
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {isCorrect
                                ? "Correct"
                                : "Incorrect"}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={
                handleRestart
              }
              className="flex-1 px-5 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Practice Again
            </button>

            <button
              onClick={
                handleBackToPractice
              }
              className="flex-1 px-5 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900 transition"
            >
              Back to Practice
            </button>

          </div>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // NO CURRENT QUESTION
  // --------------------------------------------------

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-semibold mb-3">
            No Question Available
          </h2>

          <p className="text-gray-400 mb-5">
            Please go back and start the
            interview again.
          </p>

          <button
            onClick={
              handleBackToPractice
            }
            className="px-5 py-3 rounded-lg bg-white text-black"
          >
            Back to Practice
          </button>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // ACTIVE INTERVIEW
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-[#050507] text-white">

      {/* HEADER */}

      <header className="border-b border-gray-800">

        <div className="max-w-5xl mx-auto px-6 py-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <p className="text-sm text-gray-500">
                {category} • {topic}
              </p>

              <h1 className="text-xl font-semibold mt-1">
                Interview Session
              </h1>

            </div>

            <div className="flex items-center gap-4">

              <div className="text-sm text-gray-400">

                Question{" "}

                <span className="text-white font-medium">
                  {currentIndex + 1}
                </span>

                {" "}of{" "}

                <span className="text-white font-medium">
                  {questions.length}
                </span>

              </div>

              <div className="px-4 py-2 rounded-lg border border-gray-800 bg-[#0b0b0f] text-sm">

                Time{" "}
                {formatTime(seconds)}

              </div>

              {/* EXIT */}

              <button
                onClick={
                  handleBackToPractice
                }
                className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition font-medium"
              >
                Exit Interview
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="max-w-4xl mx-auto px-6 py-10">

        {/* PROGRESS */}

        <div className="mb-8">

          <div className="flex justify-between text-sm text-gray-500 mb-2">

            <span>
              Progress
            </span>

            <span>
              {progressPercentage}%
            </span>

          </div>

          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">

            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${progressPercentage}%`
              }}
            />

          </div>

        </div>

        {/* QUESTION CARD */}

        <div className="rounded-2xl border border-gray-800 bg-[#0b0b0f] p-6 md:p-8">

          {/* QUESTION NUMBER */}

          <p className="text-sm text-gray-500 mb-4">
            Question {currentIndex + 1}
          </p>

          {/* QUESTION */}

          <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed mb-8">

            {currentQuestion.question}

          </h2>

          {/* OPTIONS */}

          <div className="space-y-3">

            {currentQuestion.options.map(
              (option, index) => {

                const isSelected =
                  selectedOption ===
                  option;

                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleSelectOption(
                        option
                      )
                    }
                    className={`w-full text-left rounded-xl border p-4 transition ${
                      isSelected
                        ? "border-white bg-white/10"
                        : "border-gray-800 hover:border-gray-600 bg-[#08080b]"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm shrink-0 ${
                          isSelected
                            ? "border-white"
                            : "border-gray-700"
                        }`}
                      >

                        {String.fromCharCode(
                          65 + index
                        )}

                      </div>

                      <span className="text-gray-200">
                        {option}
                      </span>

                    </div>

                  </button>
                );
              }
            )}

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex items-center justify-between mt-6">

          <button
            onClick={
              handlePrev
            }
            disabled={
              currentIndex === 0
            }
            className={`px-5 py-3 rounded-lg border transition ${
              currentIndex === 0
                ? "border-gray-900 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-gray-300 hover:bg-gray-900"
            }`}
          >
            Previous
          </button>

          <button
            onClick={
              handleNext
            }
            disabled={
              !isAnswerProvided ||
              submitting
            }
            className={`px-6 py-3 rounded-lg font-medium transition ${
              !isAnswerProvided ||
              submitting
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >

            {submitting
              ? "Submitting..."
              : currentIndex ===
                questions.length - 1
              ? "Finish Interview"
              : "Next Question"}

          </button>

        </div>

        {/* ANSWER REQUIRED */}

        {!isAnswerProvided && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Select an answer to continue.
          </p>
        )}

      </main>

    </div>
  );
}