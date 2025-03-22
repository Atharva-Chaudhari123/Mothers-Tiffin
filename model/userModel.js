const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type : String , required : true} ,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribedMess: { type: Boolean, default: false }, // Subscription status
    subscriptionDetails: {
        kitchenName: { type: String, default: null },
        duration: { type: Number, default: 1 }, // Duration in months
        expiryDate: { type: Date, default: null },
        cost: { type: Number, default: 0 },
    },
    orders: [
        {
            orderId: { type: mongoose.Schema.Types.ObjectId },
            items: [{ type: String }], // List of ordered items
            totalAmount: { type: Number },
            orderDate: { type: Date, default: Date.now },
        }
    ]
});

// // Middleware to set expiry date when subscribing
// userSchema.methods.subscribeToMess = function (kitchenName, cost) {
//     const now = new Date();
//     this.subscribedMess = true;
//     this.subscriptionDetails = {
//         kitchenName,
//         duration: 1, // Default to 1 month
//         expiryDate: new Date(now.setMonth(now.getMonth() + 1)), // Expiry after 1 month
//         cost,
//     };
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
