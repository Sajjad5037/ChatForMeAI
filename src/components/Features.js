export default function Features() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Side - Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Features
          </h2>
          <ul className="text-lg text-gray-600 space-y-4 max-w-lg mx-auto md:mx-0">
            <li>🤖 Train your chatbot with your business PDF.</li>
            <li>💬 Handle client questions on your behalf using a shareable chat link.</li>
            <li>🌍 Works 24/7 for your business.</li>
          </ul>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="https://media.istockphoto.com/id/1454952504/vector/chatbot-customer-service-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=47QqdLeONvMAwWOsCXnO7ACKZN5v_iE1PXx9fumLY9Y=" // replace with a suitable features image
            alt="Features illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
