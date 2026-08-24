const Merchant = require("../models/Merchant");

const authenticateMerchant = async (req, res, next) => {
    try {
        const apiKey = req.header("X-API-Key");

        // API key not provided
        if (!apiKey) {
            return res.status(401).json({
                success: false,
                message: "API key is required"
            });
        }

        // Find merchant using API key
        const merchant = await Merchant.findOne({
            apiKey: apiKey
        });

        // Invalid API key
        if (!merchant) {
            return res.status(401).json({
                success: false,
                message: "Invalid API key"
            });
        }

        // Check merchant status
        if (merchant.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "Merchant account is not active"
            });
        }

        // Check KYC status
        if (merchant.kycStatus !== "approved") {
            return res.status(403).json({
                success: false,
                message: "Merchant KYC is not approved"
            });
        }

        // Attach merchant to request
        req.merchant = merchant;

        next();

    } catch (error) {
        console.error("Authentication error:", error);

        res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
};

module.exports = authenticateMerchant;