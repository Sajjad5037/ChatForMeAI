import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Signup from "./components/Signup";
import LoginPage from "./components/Login";

import AdminPanel from "./components/AdminPage";
import DashboardPage from "./components/DashboardPage";
import AddDoctor from "./components/AddDoctorPage";
import EditDoctor from "./components/EditDoctorPage";
import ViewDoctors from "./components/ViewDoctors";
import DeleteDoctor from "./components/DeleteDoctor";

// Layout wrapper with full white background
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">{children}</main>
    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [role, setRole] = useState(null); // "admin" or "doctor"

  useEffect(() => {
    document.title = "Class Management System";
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route
          path="/login"
          element={
            <MainLayout>
              <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                  <p className="text-lg text-gray-700">
                    Access your account or create a new one to start using the chatbot.
                  </p>

                  <div className="flex justify-center gap-4 flex-wrap">
                    <a
                      href="https://chat-for-me-ai-login.vercel.app"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Login
                    </a>

                    <Link
                      to="/signup"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </section>
            </MainLayout>
          }
        />

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/features"
          element={
            <MainLayout>
              <Features />
            </MainLayout>
          }
        />

        <Route
          path="/pricing"
          element={
            <MainLayout>
              <Pricing />
            </MainLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <MainLayout>
              <Signup />
            </MainLayout>
          }
        />

        {/* Protected pages */}
        <Route
          path="/dashboard"
          element={
            !isLoggedIn || !sessionToken ? (
              <Navigate to="/login" />
            ) : role === "doctor" ? (
              <DashboardPage />
            ) : (
              <Navigate to="/AdminPanel" />
            )
          }
        />

        <Route
          path="/AdminPanel"
          element={
            !isLoggedIn || !sessionToken ? (
              <Navigate to="/login" />
            ) : role === "admin" ? (
              <AdminPanel />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/edit-doctor" element={<EditDoctor />} />
        <Route path="/view-doctors" element={<ViewDoctors />} />
        <Route path="/delete-doctor" element={<DeleteDoctor />} />
      </Routes>
    </Router>
  );
}
