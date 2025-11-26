const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post("/", protect, admin, (req, res) => {
  // Placeholder for file upload logic
  // You can integrate with multer or cloudinary here
  res.json({ message: "Upload endpoint - implement with multer/cloudinary" });
});

module.exports = router;