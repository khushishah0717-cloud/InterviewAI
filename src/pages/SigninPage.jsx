const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SigninPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Field-specific validation error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [message, setMessage] = useState("");

  const handleClose = () => {
    navigate("/");
  };

  // Email Validation Logic
  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setEmailError("");
    } else if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Password Validation Logic
  const validatePassword = (val) => {
    if (!val) {
      setPasswordError("");
      return;
    }

    const hasUppercase = /[A-Z]/.test(val);
    const hasLowercase = /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasMinLength = val.length >= 8;

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, and number."
      );
    } else {
      setPasswordError("");
    }
  };

  // Input Handlers with Real-Time Validation
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    validateEmail(val);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    validatePassword(val);
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    setMessage("");

    // Final Email validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Final Password validation check
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 8 || !hasUppercase || !hasLowercase || !hasNumber) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, and number."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password.");
        return;
      }

      // Save token
localStorage.setItem("token", data.token);

// Save user information
localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

// Tell Navbar that the user has logged in
window.dispatchEvent(new Event("authChanged"));

setMessage("Login successful!");

// Go to home page immediately
navigate("/");

    } catch (error) {
      console.error("Signin error:", error);
      setMessage("Unable to connect to server.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto">

      {/* Sign In Modal */}
      <div className="relative w-full max-w-lg bg-[#111827] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-6 text-slate-400 hover:text-white text-3xl leading-none transition"
          aria-label="Close"
        >
          ×
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white mb-1">
          Sign In
        </h1>

        <p className="text-slate-400 text-sm mb-5">
          Sign in to continue using InterviewAI.
        </p>

        <form onSubmit={handleSignin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`w-full bg-black/50 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none transition ${
                emailError
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-slate-700 focus:border-indigo-500"
              }`}
              required
            />

            {/* Email Error Message */}
            {emailError && (
              <p className="text-xs text-rose-500 mt-1.5 font-medium">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full bg-black/50 border rounded-xl px-4 py-2.5 pr-12 text-white placeholder-slate-500 focus:outline-none transition ${
                  passwordError
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-slate-700 focus:border-indigo-500"
                }`}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                aria-label="Show or hide password"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {/* Password Error Message */}
            {passwordError && (
              <p className="text-xs text-rose-500 mt-1.5 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 mt-2 rounded-xl transition"
          >
            Sign In
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-slate-300 mt-4">
            {message}
          </p>
        )}

        {/* Sign Up */}
        <p className="text-center text-sm text-slate-400 mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default SigninPage;