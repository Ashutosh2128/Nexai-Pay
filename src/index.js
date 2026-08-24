const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const connectDB = require("./config/database");

const merchantRoutes = require("./routes/merchantRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/merchants", merchantRoutes);
app.use("/api/v1/transactions", transactionRoutes);

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Nexai-Pay API is running"
    });
});

connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Nexai-Pay server running on port ${PORT}`);
});