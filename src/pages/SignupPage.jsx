const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // EMAIL VALIDATION
  // --------------------------------------------------

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

  // --------------------------------------------------
  // PASSWORD VALIDATION
  // --------------------------------------------------

  const validatePassword = (val) => {
    if (!val) {
      setPasswordError("");
      return;
    }

    const hasUppercase = /[A-Z]/.test(val);
    const hasLowercase = /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasMinLength = val.length >= 8;

    if (
      !hasMinLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber
    ) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, and number."
      );
    } else {
      setPasswordError("");
    }
  };

  // --------------------------------------------------
  // INPUT HANDLERS
  // --------------------------------------------------

  const handleEmailChange = (e) => {
    const val = e.target.value;

    setEmail(val);
    validateEmail(val);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;

    setPassword(val);
    validatePassword(val);

    if (confirmPassword && val !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;

    setConfirmPassword(val);

    if (password && val !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // --------------------------------------------------
  // SIGN UP
  // --------------------------------------------------

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    // Final email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Final password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (
      password.length < 8 ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber
    ) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, and number."
      );
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);


    try {
      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Signup response:", data);

      // Signup failed
      if (!response.ok) {
        setLoading(false);
        setMessage(data.message || "Unable to create account.");
        return;
      }

      // --------------------------------------------------
      // AUTOMATIC LOGIN
      // --------------------------------------------------

      if (!data.token) {
        console.error("Signup succeeded but no token was returned.");
        setLoading(false);
        setMessage(
          "Account created, but automatic login failed. Please check the backend response."
        );
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user || {
            name: name,
            email: email,
          }
        )
      );

      // Tell Navbar that authentication state changed
      window.dispatchEvent(new Event("authChanged"));

      // Go directly to Home Page
      navigate("/", { replace: true });

    } catch (error) {
      console.error("Signup error:", error);

      setLoading(false);
      setMessage("Unable to connect to server.");
    }
  };

  // --------------------------------------------------
  // CLOSE
  // --------------------------------------------------

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto">

      {/* Sign Up Modal */}
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
          Create Account
        </h1>

        <p className="text-slate-400 text-sm mb-5">
          Create your InterviewAI account to start practicing.
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>

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
              className={`w-full bg-black/50 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none transition ${emailError
                ? "border-rose-500 focus:border-rose-500"
                : "border-slate-700 focus:border-indigo-500"
                }`}
              required
            />

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
                className={`w-full bg-black/50 border rounded-xl px-4 py-2.5 pr-12 text-white placeholder-slate-500 focus:outline-none transition ${passwordError
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

            {passwordError && (
              <p className="text-xs text-rose-500 mt-1.5 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full bg-black/50 border rounded-xl px-4 py-2.5 pr-12 text-white placeholder-slate-500 focus:outline-none transition ${confirmPasswordError
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-slate-700 focus:border-indigo-500"
                  }`}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                aria-label="Show or hide confirm password"
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </button>
            </div>

            {confirmPasswordError && (
              <p className="text-xs text-rose-500 mt-1.5 font-medium">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {/* Create Account */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/60 disabled:cursor-not-allowed text-white font-semibold py-3 mt-2 rounded-xl transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-slate-300 mt-4">
            {message}
          </p>
        )}

        {/* Sign In */}
        <p className="text-center text-sm text-slate-400 mt-5">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default SignupPage;