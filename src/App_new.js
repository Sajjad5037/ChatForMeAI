import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

// Layout component for pages with Navbar
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
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
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <p>
                  
                  <br />
                  <a href="https://chat-for-me-ai-login.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Click here to login
                  </a>
                </p>
              </div>
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

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            !isLoggedIn || !sessionToken
              ? <Navigate to="/login" />
              : role === "doctor"
              ? <DashboardPage />
              : <Navigate to="/AdminPanel" />
          }
        />
        <Route
          path="/AdminPanel"
          element={
            !isLoggedIn || !sessionToken
              ? <Navigate to="/login" />
              : role === "admin"
              ? <AdminPanel />
              : <Navigate to="/dashboard" />
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
