const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");



const { notFound, errorHandler } = require("./middleware/errorMiddleware");


dotenv.config();
const app = express();

// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("Kiwa Restaurant API is running 🚀");
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your Vite frontend
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add this after your middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/ping", (req, res) => res.json({ ok: true, time: new Date() }));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));