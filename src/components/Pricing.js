export default function Pricing() {
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
