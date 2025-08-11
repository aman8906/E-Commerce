import React, { useState } from "react";

const NewsletterBox = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    setSubmitted(true);         // ✅ Show message
    setEmail("");               // ✅ Clear input
    // 🔒 Optional: Send to backend or API endpoint
  };

  return (
    <div className="text-center px-4 py-10 bg-gray-50 rounded-md mt-20">
      <p className="text-2xl font-semibold text-gray-800">
        Subscribe & Get 20% OFF!
      </p>

      <p className="text-gray-500 mt-2 max-w-xl mx-auto">
        Join the Trendora tribe and enjoy 20% off your first purchase. Get access to exclusive deals, fresh drops, and style inspiration.
      </p>

      <form
        onSubmit={handleNewsletter}
        className="w-full sm:w-3/4 lg:w-1/2 flex items-center gap-3 mt-6 border border-gray-300 rounded px-3 py-2 mx-auto"
      >
        <input
          required
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 outline-none text-sm px-2 py-2"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs font-semibold px-6 py-3 rounded hover:bg-gray-800 transition-all"
        >
          SUBSCRIBE
        </button>
      </form>

      {submitted && (
        <p className="text-green-600 text-sm mt-4">
          Thank you for subscribing to Trendora!
        </p>
      )}
    </div>
  );
};

export default NewsletterBox;
