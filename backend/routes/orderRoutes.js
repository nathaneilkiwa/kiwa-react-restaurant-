const express = require("express");
const {
  getAllOrders,
  createOrder,
  getOrder
} = require("../controllers/orderController");

const router = express.Router();

// Public routes - NO AUTH REQUIRED
router.get("/", getAllOrders);        // GET /api/orders - Get all orders
router.post("/", createOrder);        // POST /api/orders - Create new order
router.get("/:id", getOrder);         // GET /api/orders/:id - Get single order

module.exports = router;