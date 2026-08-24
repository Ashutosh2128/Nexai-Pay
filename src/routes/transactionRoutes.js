const express = require("express");

const {
    createTransaction,
    getTransaction,
    processTransaction
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

// Process transaction
router.post(
    "/:transactionId/process",
    authenticateMerchant,
    processTransaction
);

module.exports = router;