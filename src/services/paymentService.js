const Transaction = require("../models/Transaction");

const processPayment = async (transactionId, merchantId) => {
    // Find transaction belonging to this merchant
    const transaction = await Transaction.findOne({
        transactionId,
        merchant: merchantId
    });

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    // Transaction can only be processed if it is pending
    if (transaction.status !== "pending") {
        throw new Error(
            `Transaction cannot be processed because its status is ${transaction.status}`
        );
    }

    // Step 1: mark as processing
    transaction.status = "processing";
    await transaction.save();

    // Simulate payment gateway delay
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });

    // For now, simulate successful payment
    transaction.status = "success";
    await transaction.save();

    return transaction;
};

module.exports = {
    processPayment
};