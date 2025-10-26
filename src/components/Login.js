import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// --- Components ---
import AdminPanel from "./AdminPage";
import AddDoctor from "./AddDoctorPage";
import EditDoctor from "./EditDoctorPage";
import ViewDoctors from "./ViewDoctors";
import DeleteDoctor from "./DeleteDoctor";
import DashboardPage from "./DashboardPage"
// --- Login Page ---
function LoginPage({ setIsLoggedIn, setDoctorData, setSessionToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const server = "https://krishbackend-production.up.railway.app";

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      console.log("[INFO] Logging in:", username);

      const response = await fetch(`${server}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: username, password }),
      });

      const data = await response.json();
      console.log("[DEBUG] Login response:", data);

      if (response.ok) {
        setIsLoggedIn(true);
        setDoctorData(data);
        setSessionToken(data.session_token || null);

        // Redirect based on role
        if (data?.name === "Admin") navigate("/admin");
        else navigate("/view-doctors");
      } else {
        setError(data.detail || "Invalid username or password.");
      }
    } catch (err) {
      console.error("[ERROR] Login failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Clinic Login</h2>

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

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

// --- Private Route Wrapper ---
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

// --- Main App ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    document.title = "Clinic Management System";
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setDoctorData={setDoctorData}
              setSessionToken={setSessionToken}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            (() => {
              const urlParams = new URLSearchParams(window.location.search);
              const publicToken = urlParams.get("publicToken");
              const SToken = urlParams.get("sessionToken");

              if (publicToken && !SToken) return <Navigate to="/" />;
              if (isLoggedIn && !SessionToken) return <Navigate to="/" />;

              return <DashboardPage />;
            })()
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdminPanel doctorData={doctorData} />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-doctor"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AddDoctor />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-doctor"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <EditDoctor />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-doctors"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ViewDoctors />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-doctor"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <DeleteDoctor />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// --- Styles ---
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f8fafc",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "360px",
  },
  title: {
    fontSize: "26px",
    marginBottom: "1.5rem",
    color: "#1e293b",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "500",
  },
  error: {
    marginTop: "10px",
    color: "#ef4444",
    fontSize: "14px",
  },
};

export default App;
