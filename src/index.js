const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// -------------------------
// Global Middlewares
// -------------------------

app.use(helmet());
app.use(cors());
app.use(express.json());

// -------------------------
// Health Check
// -------------------------

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Nexai-Pay API is running"
    });
});

// -------------------------
// Start Server
// -------------------------

app.listen(PORT, () => {
    console.log(`Nexai-Pay server running on port ${PORT}`);
});