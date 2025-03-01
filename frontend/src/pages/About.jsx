import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl">
        {/* About Us */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🚀 About Us
        </h2>
        <img
          src="https://plus.unsplash.com/premium_photo-1683288295814-84a199da83d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="E-commerce"
          className="w-full rounded-lg mb-6"
        />
        <p className="text-gray-600 text-lg text-center mb-6">
          Welcome to <span className="font-semibold text-blue-600">Our E-Commerce Store</span>, 
          your go-to destination for high-quality products at unbeatable prices. 🛒✨ 
          We are committed to delivering a seamless shopping experience, ensuring customer satisfaction with every purchase.
        </p>

        {/* Our Vision */}
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          🌍 Our Vision
        </h3>
        <img
          src="https://plus.unsplash.com/premium_photo-1681487933632-c9eda34fcaf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,success"
          alt="Vision"
          className="w-full rounded-lg mb-4"
        />
        <p className="text-gray-600 text-lg">
          Our vision is to become a leading global e-commerce platform that redefines online shopping with innovation, 
          reliability, and excellence. 🏆 We aim to provide a user-friendly and secure shopping experience while 
          constantly evolving to meet the needs of our customers. 🔥
        </p>

        {/* Our Mission */}
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          🎯 Our Mission
        </h3>
        <img
          src="https://images.unsplash.com/photo-1567266230512-eabb325d4b62?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mission"
          className="w-full rounded-lg mb-4"
        />
        <p className="text-gray-600 text-lg">
          Our mission is to bridge the gap between quality products and affordability. We are dedicated to:
        </p>
        <ul className="list-disc text-gray-600 text-lg ml-6 mt-3 space-y-2">
          <li>🛍️ Offering a diverse range of high-quality products.</li>
          <li>🚚 Ensuring fast and secure delivery services.</li>
          <li>💬 Providing excellent customer support and service.</li>
          <li>🚀 Continuously improving and innovating our platform.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
