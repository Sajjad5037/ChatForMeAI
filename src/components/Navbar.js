import { Link } from "react-router-dom";

export default function Navbar() {
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
