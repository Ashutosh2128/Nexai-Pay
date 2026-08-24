const express = require("express");

const {
    createTransaction,
    getTransaction
} = require("../controllers/transactionController");

const authenticateMerchant = require("../middlewares/auth");

const router = express.Router();

// Create transaction
router.post(
    "/",
    authenticateMerchant,
    createTransaction
);

// Get transaction
router.get(
    "/:transactionId",
    authenticateMerchant,
    getTransaction
);

module.exports = router;