const express = require("express");
const {
  getAllBookings,
  createBooking,
  getBooking
  // Only import functions that actually exist
} = require("../controllers/bookingController");

const router = express.Router();

// Public routes - NO AUTH REQUIRED
router.get("/", getAllBookings); // Get all bookings
router.post("/", createBooking); // Create new booking
router.get("/:id", getBooking);  // Get single booking

module.exports = router;