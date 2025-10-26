import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import AdminPanel from "./AdminPage";
import AddDoctor from "./AddDoctorPage";
import EditDoctor from "./EditDoctorPage";
import ViewDoctors from "./ViewDoctors";
import DeleteDoctor from "./DeleteDoctor";
import DashboardPage from "./DashboardPage";




function LoginPage({ setIsLoggedIn, setDoctorData, setSessionToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const server = "https://web-production-e5ae.up.railway.app";
  // const server = "http://localhost:3000";

  const handleLogin = async () => {
    try {
      setIsLoggedIn(false);
      setDoctorData(null);

      const response = await fetch(`${server}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setDoctorData(data);
        setSessionToken(data.session_token || null);
        setError(null);

        if (data?.id === 1) {
          navigate("/AdminPanel");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to login");
    }
  };

  const handleSignUp = () => navigate("/signup");

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
          <button onClick={handleLogin} style={styles.button}>Login</button>
          <button onClick={handleSignUp} style={styles.button}>Sign Up</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    document.title = "Class Management System";
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} setDoctorData={setDoctorData} setSessionToken={setSessionToken} />}
        />
        <Route
          path="/dashboard"
          element={
            (!isLoggedIn || !sessionToken) ? <Navigate to="/" /> : <DashboardPage />
          }
        />
        <Route
          path="/AdminPanel"
          element={isLoggedIn ? <AdminPanel /> : <Navigate to="/" />}
        />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/edit-doctor" element={<EditDoctor />} />
        <Route path="/view-doctors" element={<ViewDoctors />} />
        <Route path="/delete-doctor" element={<DeleteDoctor />} />
        
      </Routes>
    </Router>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  loginBox: {
    backgroundColor: "#ffffff",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    display: "inline-block",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    margin: "10px",
    width: "80%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0078D4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default App;
