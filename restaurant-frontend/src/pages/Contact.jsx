import React, { useState, useEffect, useRef } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState("");
  
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    // Add fade-in animation on component mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Trigger success animation
      if (successRef.current) {
        successRef.current.classList.add('animate-success-pop');
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 flex items-center justify-center px-4">
        <div 
          ref={successRef}
          className="max-w-md w-full text-center animate-on-scroll"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            {/* Animated Checkmark */}
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Message Sent!</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Thank you for contacting us! We'll get back to you within 24 hours.
            </p>
            
            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-amber-500 to-pink-600 text-white px-12 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transform transition-all duration-300 shadow-lg w-full"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-pink-300/20 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-100/10 to-pink-200/10 rounded-full -translate-x-40 translate-y-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-block bg-gradient-to-r from-amber-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Start a <span className="bg-gradient-to-r from-amber-500 to-pink-600 bg-clip-text text-transparent">Conversation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're here to make your experience extraordinary. Reach out for reservations, questions, or just to say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="animate-on-scroll" style={{animationDelay: '0.2s'}}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group">
                  <label className="block text-gray-700 text-sm font-semibold mb-3">
                    Your Name
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'name' ? 'scale-105' : ''}`}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-300 font-medium"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label className="block text-gray-700 text-sm font-semibold mb-3">
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'email' ? 'scale-105' : ''}`}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-300 font-medium"
                      placeholder="your.email@example.com"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative group">
                  <label className="block text-gray-700 text-sm font-semibold mb-3">
                    Subject
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'subject' ? 'scale-105' : ''}`}>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={handleBlur}
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-300 font-medium appearance-none"
                    >
                      <option value="">What can we help you with?</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="catering">Catering Inquiry</option>
                      <option value="event">Private Events</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <label className="block text-gray-700 text-sm font-semibold mb-3">
                    Your Message
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'message' ? 'scale-105' : ''}`}>
                    <textarea
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      required
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-300 font-medium resize-none"
                      placeholder="Tell us more about how we can help you..."
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-amber-500 to-pink-600 text-white py-5 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-3 ${
                    isSubmitting ? 'opacity-90 cursor-not-allowed' : 'hover:from-amber-600 hover:to-pink-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Your Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-on-scroll" style={{animationDelay: '0.4s'}}>
            {/* Interactive Map */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className="relative h-80">
                <iframe
                  title="restaurant-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194935093833!2d-122.4009376846806!3d37.7858342797577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d7e05a6df%3A0x7e82f4a5b4d55b9f!2s500%20Terry%20Francine%20St%2C%20San%20Francisco%2C%20CA%2094158!5e0!3m2!1sen!2sus!4v1690123456789!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Visit Us",
                  content: "500 Terry Francine Street\nSan Francisco, CA 94158",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: "Call Us",
                  content: "(123) 456-7890",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Email Us",
                  content: "contact@melina.com",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Opening Hours",
                  content: "Mon-Fri: 11am-10pm\nSat-Sun: 11am-12am",
                  color: "from-amber-500 to-orange-500"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 text-center">
              <h3 className="text-white text-xl font-semibold mb-6">Follow Our Journey</h3>
              <div className="flex justify-center space-x-4">
                {[
                  { name: "Instagram", icon: "📸", color: "hover:bg-pink-500" },
                  { name: "Facebook", icon: "📘", color: "hover:bg-blue-500" },
                  { name: "Twitter", icon: "🐦", color: "hover:bg-sky-400" },
                  { name: "TikTok", icon: "🎵", color: "hover:bg-gray-800" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white text-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-success-pop {
          animation: successPop 0.6s ease-out;
        }

        @keyframes successPop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Contact;