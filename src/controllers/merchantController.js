const crypto = require("crypto");
const Merchant = require("../models/Merchant");

const createMerchant = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        // Check if merchant already exists
        const existingMerchant = await Merchant.findOne({ email });

        if (existingMerchant) {
            return res.status(409).json({
                success: false,
                message: "Merchant already exists"
            });
        }

        // Generate API key
        const apiKey = `np_test_${crypto.randomBytes(24).toString("hex")}`;

        const merchant = await Merchant.create({
            name,
            email,
            apiKey,
            status: "active",
            kycStatus: "approved"
        });

        res.status(201).json({
            success: true,
            message: "Merchant created successfully",
            data: {
                merchantId: merchant._id,
                name: merchant.name,
                email: merchant.email,
                apiKey: merchant.apiKey,
                status: merchant.status,
                kycStatus: merchant.kycStatus
            }
        });

    } catch (error) {
        console.error("Create merchant error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getMyMerchant = async (req, res) => {
    try {
        const merchant = req.merchant;

        res.status(200).json({
            success: true,
            data: {
                merchantId: merchant._id,
                name: merchant.name,
                email: merchant.email,
                status: merchant.status,
                kycStatus: merchant.kycStatus
            }
        });

    } catch (error) {
        console.error("Get merchant error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createMerchant,
    getMyMerchant
};