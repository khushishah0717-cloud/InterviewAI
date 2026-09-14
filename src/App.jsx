import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home.jsx';
import Practice from './pages/Practice';
import Question from './pages/Question';
import ActiveInterviewPage from './pages/ActiveInterviewPage';

import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';

import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0C] text-[#F8FAFC] flex flex-col justify-between">

        <Navbar />

        <main className="flex-1">
          <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<SignupPage />} />

            <Route path="/signin" element={<SigninPage />} />


            {/* Protected Pages */}
            <Route
              path="/practice"
              element={
                <ProtectedRoute>
                  <Practice />
                </ProtectedRoute>
              }
            />

            <Route
              path="/question"
              element={
                <ProtectedRoute>
                  <Question />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview/active"
              element={
                <ProtectedRoute>
                  <ActiveInterviewPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;