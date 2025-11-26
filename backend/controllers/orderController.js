const Order = require("../models/Order");

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
const getAllOrders = async (req, res) => {
  try {
    console.log('Fetching all orders');
    
    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    console.log(`Found ${orders.length} orders`);
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: "Failed to fetch orders",
      error: error.message 
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    console.log('🎯 Order request received:', req.body);
    
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      items, 
      totalAmount, 
      orderType,
      deliveryAddress 
    } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !items || !totalAmount) {
      return res.status(400).json({ 
        message: "Please provide all required fields: name, email, items, and total amount" 
      });
    }

    console.log('💾 Creating order in database...');
    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone: customerPhone || "",
      items,
      totalAmount: parseFloat(totalAmount),
      orderType: orderType || "delivery",
      deliveryAddress: deliveryAddress || "",
      status: "pending"
    });

    console.log('✅ Order created successfully. ID:', order._id);
    
    res.status(201).json({
      _id: order._id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalAmount: order.totalAmount,
      status: order.status,
      message: "Order created successfully"
    });
  } catch (error) {
    console.error('💥 Order creation error:', error);
    res.status(500).json({ 
      message: "Failed to create order",
      error: error.message 
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      message: "Failed to fetch order",
      error: error.message 
    });
  }
};

// Export only the functions that exist
module.exports = {
  getAllOrders,
  createOrder,
  getOrder
};