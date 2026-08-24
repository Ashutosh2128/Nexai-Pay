const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        merchant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Merchant",
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 1
        },

        currency: {
            type: String,
            required: true,
            default: "INR",
            uppercase: true
        },

        customerName: {
            type: String,
            required: true,
            trim: true
        },

        customerEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "success",
                "failed"
            ],
            default: "pending"
        },

        paymentMethod: {
            type: String,
            enum: [
                "card",
                "upi",
                "netbanking"
            ],
            required: true
        },

        transactionId: {
            type: String,
            unique: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model(
    "Transaction",
    transactionSchema
);

module.exports = Transaction;