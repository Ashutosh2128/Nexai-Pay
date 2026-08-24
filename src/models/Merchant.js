const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        apiKey: {
            type: String,
            required: true,
            unique: true
        },

        status: {
            type: String,
            enum: ["active", "inactive", "suspended"],
            default: "active"
        },

        kycStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;