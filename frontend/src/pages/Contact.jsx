import React from "react";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          📞 Contact Us
        </h2>
        <p className="text-gray-600 text-lg text-center mb-6">
          We'd ❤️ to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
        </p>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              🧑 Your Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              📧 Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              ✉️ Your Message
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            🚀 Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-6 text-center text-gray-700">
          <p>📍 Address: 123 Street,Lucknow, India</p>
          <p>📞 Phone: +123 456 7890</p>
          <p>✉️ Email: abc@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
