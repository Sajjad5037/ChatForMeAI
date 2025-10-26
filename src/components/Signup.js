export default function Signup() {
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
