import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";   
import LoginPage from "./components/Login";
function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">ChatForMe.ai</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/features" className="hover:text-blue-400">Features</Link>
        <Link to="/pricing" className="hover:text-blue-400">Pricing</Link>
        <Link to="/login" className="hover:text-blue-400">Login</Link>
        
        <Link to="/signup" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Get Started</Link>
      </div>
    </nav>
  );
}


function Home() {
  return (
    <section className="text-center mt-20 px-6">
      <h2 className="text-4xl font-bold mb-4">Your AI Chatbot for WhatsApp and Web</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Let your chatbot handle customer queries when you’re offline — trained on your own business data.
      </p>
      <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
        Get Started Free
      </button>
    </section>
  );
}

function Features() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Features</h2>
      <ul className="space-y-4 text-gray-700">
        <li>🤖 Train your chatbot with your business PDF.</li>
        <li>💬 Answer clients on WhatsApp or a shareable chat link.</li>
        <li>📊 Dashboard to monitor chats and update content anytime.</li>
        <li>🌍 Works 24/7 for your business.</li>
      </ul>
    </div>
  );
}

function Pricing() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-bold mb-2">Free</h3>
          <p className="mb-4">Basic chatbot with limited training data.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Try Now</button>
        </div>
        <div className="border p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <p className="mb-4">WhatsApp + Web Chatbot + 24/7 Support.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Upgrade</button>
        </div>
        <div className="border p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-bold mb-2">Enterprise</h3>
          <p className="mb-4">Full customization + API access.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Contact Us</button>
        </div>
      </div>
    </div>
  );
}


function Signup() {
  return (
    <div className="max-w-md mx-auto mt-20 border p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form className="flex flex-col space-y-4">
        <input className="border px-3 py-2 rounded" placeholder="Name" />
        <input className="border px-3 py-2 rounded" placeholder="Email" />
        <input className="border px-3 py-2 rounded" placeholder="Business Name" />
        <input className="border px-3 py-2 rounded" type="password" placeholder="Password" />
        <button className="bg-blue-500 text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}

export default function App_new() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
