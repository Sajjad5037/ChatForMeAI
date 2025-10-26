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

// --- Login Page ---
function LoginPage({ setIsLoggedIn, setDoctorData, setSessionToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const server = "https://krishbackend-production.up.railway.app";

  // --- Handle Login ---
  const handleLogin = async () => {
    try {
      setError(null);

      if (!username || !password) {
        setError("Please enter both username and password.");
        return;
      }

      console.log("[INFO] Attempting password login:", username);

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

        if (data?.name === "Admin") {
          navigate("/AdminPanel");
        } else {
          navigate("/view-doctors");
        }
      } else {
        setError(data.detail || "Invalid username or password.");
      }
    } catch (err) {
      console.error("[ERROR] Login failed:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Login</h2>

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
  return isLoggedIn ? children : <Navigate to="/" />;
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

        {/* Admin Routes */}
        <Route
          path="/AdminPanel"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AdminPanel />
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
    background: "#f0f2f5",
  },
  loginBox: {
    padding: "30px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    minWidth: "320px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "4px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default App;
