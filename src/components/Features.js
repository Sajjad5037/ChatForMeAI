export default function Features() {
  return (
    <div className="p-10 flex flex-col md:flex-row items-center gap-10">
      
      {/* Left Side - Text */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <ul className="space-y-4 text-gray-700">
          <li>🤖 Train your chatbot with your business PDF.</li>
          <li>💬 Handle client questions on your behalf using a shareable chat link.</li>        
          <li>🌍 Works 24/7 for your business.</li>
        </ul>
      </div>

      {/* Right Side - Illustration */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src="https://media.istockphoto.com/id/1454952504/vector/chatbot-customer-service-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=47QqdLeONvMAwWOsCXnO7ACKZN5v_iE1PXx9fumLY9Y="
          alt="Features illustration"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>

    </div>
  );
}
