import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import { assets } from "../assets/products";
import NewsletterBox from "../components/NewsLetterBox";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const formData = new FormData(formRef.current);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        formRef.current.reset();
      } else {
        setStatus({ type: "error", message: " Failed to send message. Try again." });
      }
    } catch (err) {
      setStatus({ type: "error", message: " Error submitting the form." });
    }
    setLoading(false);
  };

  return (
    <main className="pt-10 border-t px-4 sm:px-10">
      <div className="text-2xl text-center mb-6">
        <Title text1="CONTACT" text2="US" />
      </div>

      {status?.type === "success" ? (
        <div className="text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="Success"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-green-700">Message Sent Successfully!</h2>
          <p className="text-gray-600 mt-2 mb-6">
            Thank you for contacting us. We’ll respond shortly.
          </p>
          <button
            onClick={() => setStatus(null)}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          {/* Contact Info Section */}
          <div className="my-10 flex flex-col md:flex-row items-start gap-10 mb-20">
            <img
              className="w-full max-w-full md:max-w-[480px] rounded"
              src={assets.contact_img}
              alt="contact"
            />
            <div className="flex flex-col justify-between gap-6 text-gray-600 text-sm w-full max-w-xl">
              <p><b>Customer Support:</b> Reach out to us with any product queries, orders, or suggestions.</p>
              <p><b>Business Inquiries:</b> Interested in collaboration? Let's talk!</p>
              <Link
                to="/careers"
                className="w-max border border-black px-6 py-2 rounded text-sm font-medium hover:bg-black hover:text-white transition"
              >
                Explore Jobs
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto space-y-4 border p-6 rounded-lg shadow-sm"
          >
            <input type="hidden" name="access_key" value="6631f4d9-66f3-47e8-a406-5cac0ee7a28b" />
            <input type="hidden" name="subject" value="Customer Inquiry from ShopEase" />

            <h2 className="text-xl font-semibold text-gray-700 mb-2">Send Us a Message</h2>

            <input name="name" type="text" placeholder="Your Name" required className="w-full border px-4 py-2 rounded" />
            <input name="email" type="email" placeholder="Your Email" required className="w-full border px-4 py-2 rounded" />
            <input name="phone" type="text" placeholder="Phone Number (optional)" className="w-full border px-4 py-2 rounded" />
            <input name="subject" type="text" placeholder="Subject" className="w-full border px-4 py-2 rounded" />
            <textarea name="message" rows="4" placeholder="Your Message" required className="w-full border px-4 py-2 rounded"></textarea>

            <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status?.type === "error" && (
              <p className="text-red-600 text-sm mt-2">{status.message}</p>
            )}
          </form>

          {/* Newsletter */}
          <div className="my-20">
            <NewsletterBox />
          </div>
        </>
      )}
    </main>
  );
};

export default Contact;
