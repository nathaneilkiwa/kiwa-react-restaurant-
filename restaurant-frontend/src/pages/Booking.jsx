import React, { useState } from 'react';
import { bookingAPI } from '../utils/api';

const Booking = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    bookingTime: '',
    numberOfGuests: 2,
    specialRequests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  // Available time slots
  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', 
    '19:00', '19:30', '20:00', '20:30'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (message.text) {
      setMessage({ text: '', type: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      // Basic frontend validation
      if (!formData.customerName.trim() || !formData.customerEmail.trim() || 
          !formData.bookingDate || !formData.bookingTime) {
        setMessage({ 
          text: 'Please fill in all required fields', 
          type: 'error' 
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.customerEmail)) {
        setMessage({ 
          text: 'Please enter a valid email address', 
          type: 'error' 
        });
        return;
      }

      const response = await bookingAPI.createBooking(formData);
      console.log('✅ Booking created:', response.data);
      
      setMessage({ 
        text: `Booking confirmed! We've sent a confirmation to ${formData.customerEmail}`,
        type: 'success' 
      });
      setShowSuccess(true);

      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        bookingDate: '',
        bookingTime: '',
        numberOfGuests: 2,
        specialRequests: ''
      });

      setTimeout(() => {
        setShowSuccess(false);
        setMessage({ text: '', type: '' });
      }, 5000);

    } catch (error) {
      console.error('❌ Booking error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to create booking. Please try again.';
      
      setMessage({ 
        text: errorMessage, 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Book Your Table
          </h1>
          <p className="text-xl text-gray-600">
            Reserve your spot for an unforgettable dining experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition duration-200 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="customerPhone"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition duration-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition duration-200 outline-none"
                    />
                  </div>
                </div>

                {/* Booking Details */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
                    Booking Details
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="bookingDate"
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                        required
                        min={getTodayDate()}
                        max={getMaxDate()}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition duration-200 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="bookingTime"
                        name="bookingTime"
                        value={formData.bookingTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition duration-200 outline-none bg-white"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-2">
                        Guests <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="numberOfGuests"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition duration-200 outline-none bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'person' : 'people'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
                    Special Requests
                  </h3>
                  
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us how we can make your experience special
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Any dietary restrictions, allergies, or special celebrations? We'd love to know!"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition duration-200 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-[1.02] flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🍽️</span>
                      Book Table Now
                    </>
                  )}
                </button>
              </form>

              {/* Messages */}
              {message.text && (
                <div className={`mt-6 p-4 rounded-lg flex items-start ${
                  message.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <span className="text-xl mr-3">
                    {message.type === 'success' ? '✓' : '⚠'}
                  </span>
                  <span>{message.text}</span>
                </div>
              )}
            </div>
          </div>

          {/* Restaurant Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Main Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-2">ℹ️</span>
                  Restaurant Info
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600 text-sm">123 Pizza Street, Food City, FC 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600 text-sm">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🕒</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Opening Hours</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Mon-Thu: 11:00 AM - 10:00 PM</p>
                        <p>Fri-Sat: 11:00 AM - 11:00 PM</p>
                        <p>Sunday: 12:00 PM - 9:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Occasions Card */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-red-100">
                <div className="flex items-start">
                  <span className="text-3xl mr-3">🎉</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Special Occasions?</p>
                    <p className="text-sm text-gray-700">
                      Celebrating a birthday, anniversary, or special event? Let us know in your special requests and we'll make it memorable!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Tips Card */}
              <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-xl mr-2">💡</span>
                  Quick Tips
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Book at least 2 hours in advance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Large groups? Call us for better arrangements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Check your email for confirmation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-scaleIn">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              We're looking forward to serving you. A confirmation has been sent to your email.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition duration-300 shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Booking;