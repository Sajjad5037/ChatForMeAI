export default function Home() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Side - Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Your AI Chatbot for Web
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-lg">
            Let your chatbot handle customer queries when you’re offline — trained on your own business data. Get started in minutes without coding.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started Free
            </button>
            <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="https://media.istockphoto.com/id/1454952504/vector/chatbot-customer-service-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=47QqdLeONvMAwWOsCXnO7ACKZN5v_iE1PXx9fumLY9Y="
            alt="Chatbot illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
