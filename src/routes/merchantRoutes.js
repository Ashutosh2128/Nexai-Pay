const express = require("express");

const {
    createMerchant,
    getMyMerchant
} = require("../controllers/merchantController");

const authenticateMerchant = require("../middlewares/auth");

const router = express.Router();

// Public route
router.post("/", createMerchant);

// Protected route
router.get("/me", authenticateMerchant, getMyMerchant);

module.exports = router;