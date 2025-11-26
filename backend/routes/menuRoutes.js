const express = require("express");
const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
// Remove the auth middleware import since we're removing authentication

const router = express.Router();

// Public routes - NO AUTH REQUIRED
router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);

// Remove or comment out admin routes for now
// router.post("/", createMenuItem);
// router.put("/:id", updateMenuItem);
// router.delete("/:id", deleteMenuItem);

module.exports = router;