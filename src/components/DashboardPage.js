import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardPage({ setIsLoggedIn, doctorData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const wsRef = useRef(null);

  const [doctorId, setDoctorId] = useState("");
  const [DoctorName, setDoctorName] = useState("");
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [averageInspectionTime, setAverageInspectionTime] = useState(300);
  const [timers, setTimers] = useState({});
  const [newPatientName, setNewPatientName] = useState("");
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");
  const [shareableUrl, setShareableUrl] = useState("Fetching URL...");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [messages, setMessages] = useState([{ text: "Hello! How can I help you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [publicToken, setPublicToken] = useState(null);

  const server = "https://web-production-e5ae.up.railway.app";
  const sessionToken = doctorData?.session_token;

  const queryParams = new URLSearchParams(location.search);
  const publicTokenFromUrl = queryParams.get("publicToken");
  const isPublicMode = !!publicTokenFromUrl;

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // Utility
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Fetch doctor ID and name
  useEffect(() => {
    const fetchDoctorData = async () => {
      const urlSessionToken = queryParams.get("sessionToken");
      const token = urlSessionToken || sessionToken;
      if (!token) return console.error("No session token available.");

      try {
        const idRes = await fetch(`${server}/get-doctor-id/${token}`);
        const idData = await idRes.json();
        if (!idData.doctor_id) return console.error("Error fetching doctor ID:", idData.error);

        setDoctorId(idData.doctor_id);

        const nameRes = await fetch(`${server}/get-doctor-name/${idData.doctor_id}`);
        const nameData = await nameRes.json();
        setDoctorName(nameData.doctor_name || "Doctor");
      } catch (err) {
        console.error("Error fetching doctor data:", err);
      }
    };

    fetchDoctorData();
  }, [sessionToken]);

  // Fetch public token for authenticated mode
  useEffect(() => {
    if (isPublicMode) return; // skip in public mode
    if (!sessionToken) return console.error("No session token found.");

    fetch(`${server}/dashboard/public-token?session_token=${sessionToken}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return console.error("Error fetching public token:", data.error);
        setPublicToken(data.publicToken);
      })
      .catch((err) => console.error("Error fetching public token:", err));
  }, [sessionToken, isPublicMode]);

  // Generate shareable URL and QR code
  useEffect(() => {
    const token = isPublicMode ? publicTokenFromUrl : publicToken;
    if (!token || !sessionToken) return;

    const url = `${window.location.origin}/dashboard?publicToken=${token}&sessionToken=${sessionToken}`;
    setShareableUrl(url);

    const fetchQRCode = async () => {
      try {
        const qrRes = await fetch(`${server}/generate-qr/${token}/${sessionToken}`);
        if (!qrRes.ok) throw new Error("Failed to fetch QR code");
        const blob = await qrRes.blob();
        setQrCodeUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error("Error fetching QR code:", err);
      }
    };
    fetchQRCode();
  }, [publicToken, sessionToken, isPublicMode, publicTokenFromUrl]);

  // Countdown timers
  useEffect(() => {
    if (!patients.length) return setTimers({});
    const updatedTimers = {};
    for (let i = 1; i < patients.length; i++) updatedTimers[i] = averageInspectionTime * i;
    setTimers(updatedTimers);

    const interval = setInterval(() => {
      setTimers((prev) => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach((k) => newTimers[k] = Math.max(newTimers[k] - 1, 0));
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [patients, averageInspectionTime]);

  // WebSocket setup
  useEffect(() => {
    if (wsRef.current) return; // prevent duplicate

    const resolvedSessionToken = isPublicMode ? publicTokenFromUrl : sessionToken;
    if (!resolvedSessionToken) return console.warn("No session token for WebSocket.");

    const ws = new WebSocket(`wss://web-production-e5ae.up.railway.app/ws/${resolvedSessionToken}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "update_state") {
          setPatients(msg.data.patients || []);
          setCurrentPatient(msg.data.currentPatient);
          setAverageInspectionTime(msg.data.averageInspectionTime || 300);
        }
        if (msg.type === "update_notices") setNotices(msg.data.notices || []);
        if (msg.type === "connection_closed") {
          alert("Broadcaster disconnected. Refresh page.");
          setPatients([]);
          setCurrentPatient(null);
          setTimers({});
          setAverageInspectionTime(300);
          navigate("/");
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.warn("WebSocket closed");

    return () => wsRef.current?.close();
  }, [sessionToken, publicTokenFromUrl, isPublicMode, navigate]);

  // Actions
  const addPatient = () => {
    if (!newPatientName.trim()) return;
    wsRef.current?.send(JSON.stringify({ type: "add_patient", patient: newPatientName, session_token: sessionToken }));
    setNewPatientName("");
  };
  const markAsDone = () => {
    if (!currentPatient || isPublicMode) return;
    wsRef.current?.send(JSON.stringify({ type: "mark_done", session_token: sessionToken }));
  };
  const ResetAll = () => wsRef.current?.send(JSON.stringify({ type: "reset_all", session_token: sessionToken }));
  const addNotice = () => {
    if (!newNotice.trim()) return;
    wsRef.current?.send(JSON.stringify({ type: "add_notice", notice: newNotice, session_token: sessionToken }));
    setNewNotice("");
  };
  const removeNotice = (index) => wsRef.current?.send(JSON.stringify({ type: "remove_notice", index, session_token: sessionToken }));
  const handleLogout = () => {
    wsRef.current?.send(JSON.stringify({ type: "close_connection", session_token: sessionToken }));
    setIsLoggedIn(false);
  };
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch(`${server}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, user_id: doctorId }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
    } catch (err) {
      console.error("Error fetching chat response:", err);
    }
  };

  // Render
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{DoctorName || doctorData?.name}</h1>
      <h3 style={styles.averageTime}>Average Inspection Time: {formatTime(averageInspectionTime)}</h3>

      <div>
        <h2>Waiting List</h2>
        {!currentPatient && <p style={styles.noPatient}>No client is currently being served.</p>}
        <ul style={styles.patientList}>
          {patients.map((patient, i) => (
            <li key={i} style={styles.patientItem}>
              {patient} - <span style={styles.timer}>Wait Time: {formatTime(timers[i] || 0)}</span>
            </li>
          ))}
        </ul>
      </div>

      {!isPublicMode && (
        <div>
          <input
            type="text"
            value={newPatientName}
            onChange={(e) => setNewPatientName(e.target.value)}
            placeholder="Enter client's name"
            style={{ ...styles.input, width: "150px", marginBottom: "15px" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <button onClick={addPatient} style={{ ...styles.addButton, width: "150px" }}>Add Client</button>
            {currentPatient && <button onClick={markAsDone} style={{ ...styles.doneButton, width: "150px" }}>Done (Next)</button>}
            <button onClick={ResetAll} style={{ ...styles.resetButton, width: "150px" }}>Reset All</button>
          </div>

          <div>
            <p>Share this URL with patients:</p>
            <input type="text" value={shareableUrl} readOnly style={styles.shareInput} />
            <button onClick={() => navigator.clipboard.writeText(shareableUrl)} style={styles.copyButton}>Copy</button>
            {qrCodeUrl && (
              <div>
                <p>Display this QR code so clients can connect:</p>
                <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer">View QR Code</a>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={styles.noticeBoardContainer}>
        <h2>Notice Board</h2>
        <ul style={styles.noticeList}>
          {notices.length === 0 ? <p style={styles.noNotices}>No notices available.</p> :
            notices.map((notice, i) => (
              <li key={i} style={{ ...styles.noticeItem, display: "flex", justifyContent: "space-between" }}>
                <span>{notice}</span>
                {!isPublicMode && <button onClick={() => removeNotice(i)} style={styles.removeNoticeButton}>❌ Remove</button>}
              </li>
            ))}
        </ul>
        {!isPublicMode && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <textarea rows={5} value={newNotice} onChange={(e) => setNewNotice(e.target.value)} placeholder="Write a new notice..." style={styles.textArea} />
            <button onClick={addNotice} style={styles.addNoticeButton}>Add Notice</button>
          </div>
        )}
      </div>

      {!isPublicMode && <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>}

      {isPublicMode && (
        <div>
          <button onClick={toggleChat} style={{ position: "fixed", bottom: "20px", left: "20px", backgroundColor: "#2980b9", color: "white", padding: "10px 20px", borderRadius: "20px", cursor: "pointer" }}>
            {isChatOpen ? "Close Chat" : "Chat with us"}
          </button>
          {isChatOpen && (
            <div style={{ position: "fixed", bottom: "70px", left: "20px", width: "300px", height: "400px", backgroundColor: "#f4f4f9", borderRadius: "10px", display: "flex", flexDirection: "column", padding: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}>
              <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: "10px" }}>
                    <span style={{ backgroundColor: msg.sender === "user" ? "#2980b9" : "#ddd", color: msg.sender === "user" ? "white" : "black", padding: "8px 12px", borderRadius: "10px", display: "inline-block" }}>
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", padding: "10px" }}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: "8px", borderRadius: "5px" }} />
                <button onClick={sendMessage} style={{ marginLeft: "5px", padding: "8px 12px", backgroundColor: "#2980b9", color: "white", borderRadius: "5px" }}>Send</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Styles (unchanged)
const styles = {
  container: { textAlign: "center", marginTop: "50px", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" },
  title: { fontSize: "32px", fontWeight: "bold", color: "#2c3e50" },
  averageTime: { fontSize: "20px", fontWeight: "bold", color: "#2980b9", marginTop: "10px" },
  patientList: { listStyleType: "none", padding: 0, marginTop: "20px" },
  patientItem: { fontSize: "18px", padding: "10px", backgroundColor: "#fff", margin: "5px auto", width: "80%", borderRadius: "5px", boxShadow: "0 0 5px rgba(0,0,0,0.2)" },
  timer: { fontSize: "16px", color: "#d35400", fontWeight: "bold" },
  logoutButton: { padding: "10px 20px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", margin: "10px" },
  shareInput: { width: "50%", padding: "5px", margin: "10px" },
  copyButton: { padding: "5px 10px", backgroundColor: "#2980b9", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  removeNoticeButton: { padding: "5px 10px", backgroundColor: "#e74c3c", color: "white", borderRadius: "5px", cursor: "pointer", border: "none" },
  noticeBoardContainer: { textAlign: "center", padding: "20px", backgroundColor: "#f4f4f9", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "80%", margin: "20px auto" },
  noticeItem: { backgroundColor: "#fff", padding: "10px", margin: "5px 0", borderRadius: "5px", boxShadow: "0 0 5px rgba(0,0,0,0.2)" },
  textArea: { width: "100%", padding: "10px", borderRadius: "5px" },
  addNoticeButton: { padding: "10px 15px", backgroundColor: "#2980b9", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default DashboardPage;
