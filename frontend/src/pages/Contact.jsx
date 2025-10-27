import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
          We’d love to hear from you. Whether it’s a question, feedback, or
          support — our team is here to help.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Information
            </h2>
            <p className="text-gray-600">
              Reach out to us through any method below or send us a message
              directly.
            </p>
            <div className="space-y-4">
              {[
                { title: "Email", value: "support@shopease.com" },
                { title: "Phone", value: "+880 123 456 789" },
                {
                  title: "Address",
                  value: "123 Shopping Street, Dhaka, Bangladesh",
                },
              ].map((info, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-purple-600">
                    {info.title}
                  </h3>
                  <p className="text-gray-700">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
              Send a Message ✉️
            </h2>
            <form className="space-y-5">
              {[
                { label: "Full Name", type: "text", placeholder: "John Doe" },
                {
                  label: "Email Address",
                  type: "email",
                  placeholder: "you@example.com",
                },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 active:scale-95 transition transform"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map / Location */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Us on the Map 📍
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg border">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9025060056845!2d90.39124651498236!3d23.750885384588217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf59c6c8afed%3A0x3d8d8df0d5f62f9f!2sDhaka!5e0!3m2!1sen!2sbd!4v1671963245041!5m2!1sen!2sbd"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
