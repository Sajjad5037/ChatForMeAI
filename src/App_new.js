import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar"; // your Navbar component
import Home from "./Home";
import Features from "./Features";
import Pricing from "./Pricing";
import Signup from "./Signup";
import LoginPage from "./components/Login";

import AdminPanel from "./AdminPage";
import DashboardPage from "./DashboardPage";
import AddDoctor from "./AddDoctorPage";
import EditDoctor from "./EditDoctorPage";
import ViewDoctors from "./ViewDoctors";
import DeleteDoctor from "./DeleteDoctor";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [role, setRole] = useState(null); // admin or doctor

  useEffect(() => {
    document.title = "Class Management System";
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setDoctorData={setDoctorData}
              setSessionToken={setSessionToken}
              setRole={setRole} // pass role setter to LoginPage
            />
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
