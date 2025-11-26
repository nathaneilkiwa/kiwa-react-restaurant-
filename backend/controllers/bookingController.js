const Booking = require("../models/Booking");

// @desc    Get all bookings (for admin dashboard)
// @route   GET /api/bookings
// @access  Public
const getAllBookings = async (req, res) => {
  try {
    console.log('Fetching all bookings');
    
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    
    console.log(`Found ${bookings.length} bookings`);
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      message: "Failed to fetch bookings",
      error: error.message 
    });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    console.log('Booking request received:', req.body);
    
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      bookingDate, 
      bookingTime, 
      numberOfGuests, 
      specialRequests 
    } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !bookingDate || !bookingTime || !numberOfGuests) {
      return res.status(400).json({ 
        message: "Please provide all required fields: name, email, date, time, and number of guests" 
      });
    }

    const booking = await Booking.create({
      customerName,
      customerEmail,
      customerPhone: customerPhone || "",
      bookingDate,
      bookingTime,
      numberOfGuests: parseInt(numberOfGuests),
      specialRequests: specialRequests || "",
      status: "confirmed"
    });

    console.log('Booking created successfully:', booking._id);
    
    res.status(201).json({
      _id: booking._id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
      numberOfGuests: booking.numberOfGuests,
      status: booking.status,
      message: "Booking created successfully"
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ 
      message: "Failed to create booking",
      error: error.message 
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Public
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Only export the functions you actually have and need
module.exports = {
  getAllBookings,
  createBooking,
  getBooking
  // Remove getMyBookings, updateBookingStatus, deleteBooking since they don't exist
};