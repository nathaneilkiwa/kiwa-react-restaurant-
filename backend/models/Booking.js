const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    default: ""
  },
  bookingDate: {
    type: String, // or Date if you prefer
    required: true
  },
  bookingTime: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true
  },
  specialRequests: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "confirmed"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);