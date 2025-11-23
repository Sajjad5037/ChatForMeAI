export default function Pricing() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-12">
          Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Free Plan */}
          <div className="border p-8 rounded-xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-gray-600 mb-6">
              Get started with your chatbot — first 150 messages are completely free.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Try Now
            </button>
          </div>

          {/* Pro Plan */}
          <div className="border p-8 rounded-xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-gray-600 mb-6">
              Continue chatting with your clients for just $20/month after the first 150 messages. WhatsApp + Web Chatbot + 24/7 support included.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Upgrade
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="border p-8 rounded-xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-6">
              Full customization, API access, and dedicated support for large teams.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
