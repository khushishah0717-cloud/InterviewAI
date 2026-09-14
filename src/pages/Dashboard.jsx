const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/api/interviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setInterviews(data.interviews);
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  // Calculate statistics
  const totalInterviews = interviews.length;

  const averageScore =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (sum, interview) => sum + (interview.percentage || 0),
            0
          ) / totalInterviews
        )
      : 0;

  const bestScore =
    totalInterviews > 0
      ? Math.max(
          ...interviews.map(
            (interview) => interview.percentage || 0
          )
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#0A0A0C] px-4 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Hello, {user?.name || "there"} 👋
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Ready to practice your interview skills?
          </p>
        </div>

        <div className="space-y-8">

          {/* Welcome Section */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Start Your Interview Practice
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Choose a category and start practicing for your next interview.
            </p>

            <button
              onClick={() => (window.location.href = "/practice")}
              className="mt-5 rounded-lg bg-white px-5 py-3 text-sm sm:text-base font-medium text-black transition hover:bg-gray-200"
            >
              Start Practice
            </button>
          </section>

          {/* Statistics */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Your Performance
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Total Interviews */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <p className="text-sm text-gray-400">
                  Total Interviews
                </p>

                <p className="mt-2 text-3xl font-semibold text-white">
                  {loading ? "..." : totalInterviews}
                </p>
              </div>

              {/* Average Score */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <p className="text-sm text-gray-400">
                  Average Score
                </p>

                <p className="mt-2 text-3xl font-semibold text-white">
                  {loading ? "..." : `${averageScore}%`}
                </p>
              </div>

              {/* Best Score */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <p className="text-sm text-gray-400">
                  Best Score
                </p>

                <p className="mt-2 text-3xl font-semibold text-white">
                  {loading ? "..." : `${bestScore}%`}
                </p>
              </div>

            </div>
          </section>

          {/* Recent Interviews */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">

            <h2 className="text-xl font-semibold text-white">
              Recent Interviews
            </h2>

            {loading ? (
              <p className="mt-4 text-gray-400">
                Loading interview history...
              </p>
            ) : interviews.length === 0 ? (
              <p className="mt-4 text-gray-400">
                No interviews completed yet.
              </p>
            ) : (
              <div className="mt-4 space-y-3">

                {interviews.map((interview) => (
                  <div
                    key={interview._id}
                    className="
                      rounded-xl
                      border border-white/10
                      p-4
                      transition-colors
                      hover:bg-white/[0.02]
                    "
                  >

                    {/* ================= MOBILE + DESKTOP CONTENT ================= */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      {/* LEFT SIDE */}
                      <div className="min-w-0 flex-1">

                        {/* Category */}
                        <p className="font-medium text-white break-words">
                          {interview.category}
                        </p>

                        {/* Topic + Mode */}
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">

                          <span className="break-words">
                            {interview.subcategory}
                          </span>

                          <span className="text-gray-600">
                            •
                          </span>

                          <span>
                            {interview.mode}
                          </span>

                        </div>

                      </div>

                      {/* RIGHT SIDE */}
                      <div
                        className="
                          flex
                          flex-col
                          sm:items-end
                          items-start
                          gap-1
                          sm:min-w-[150px]
                        "
                      >

                        {/* Score + Correct Answers */}
                        <div className="flex items-center gap-3">

                          <p className="font-semibold text-white">
                            {interview.percentage}%
                          </p>

                          <span className="text-gray-600">
                            •
                          </span>

                          <p className="text-sm text-gray-500">
                            {interview.score}/{interview.totalQuestions}
                          </p>

                        </div>

                        {/* Date + Time */}
                        <p className="text-xs text-gray-500">

                          {new Date(
                            interview.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}

                          <span className="mx-1.5 text-gray-600">
                            •
                          </span>

                          {new Date(
                            interview.createdAt
                          ).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}

                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;