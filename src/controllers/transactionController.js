const crypto = require("crypto");

const Transaction = require("../models/Transaction");

const { processPayment } = require("../services/paymentService");

const createTransaction = async (req, res) => {
    try {
        const {
            amount,
            currency,
            customerName,
            customerEmail,
            paymentMethod
        } = req.body;

        // Validate required fields
        if (
            !amount ||
            !currency ||
            !customerName ||
            !customerEmail ||
            !paymentMethod
        ) {
            return res.status(400).json({
                success: false,
                message: "All transaction fields are required"
            });
        }

        // Generate transaction ID
        const transactionId = `txn_${crypto
            .randomBytes(12)
            .toString("hex")}`;

        // Create transaction
        const transaction = await Transaction.create({
            merchant: req.merchant._id,
            amount,
            currency,
            customerName,
            customerEmail,
            paymentMethod,
            transactionId,
            status: "pending"
        });

        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: {
                transactionId: transaction.transactionId,
                merchantId: transaction.merchant,
                amount: transaction.amount,
                currency: transaction.currency,
                customerName: transaction.customerName,
                customerEmail: transaction.customerEmail,
                paymentMethod: transaction.paymentMethod,
                status: transaction.status,
                createdAt: transaction.createdAt
            }
        });

    } catch (error) {
        console.error("Create transaction error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const transaction = await Transaction.findOne({
            transactionId: transactionId,
            merchant: req.merchant._id
        });

        // Transaction not found
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                transactionId: transaction.transactionId,
                merchantId: transaction.merchant,
                amount: transaction.amount,
                currency: transaction.currency,
                customerName: transaction.customerName,
                customerEmail: transaction.customerEmail,
                paymentMethod: transaction.paymentMethod,
                status: transaction.status,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt
            }
        });

    } catch (error) {
        console.error("Get transaction error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const processTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const transaction = await processPayment(
            transactionId,
            req.merchant._id
        );

        res.status(200).json({
            success: true,
            message: "Transaction processed successfully",
            data: {
                transactionId: transaction.transactionId,
                merchantId: transaction.merchant,
                amount: transaction.amount,
                currency: transaction.currency,
                status: transaction.status,
                updatedAt: transaction.updatedAt
            }
        });

    } catch (error) {
        console.error("Process transaction error:", error);

        if (error.message === "Transaction not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (
            error.message.startsWith(
                "Transaction cannot be processed"
            )
        ) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createTransaction,
    getTransaction,
    processTransaction
};