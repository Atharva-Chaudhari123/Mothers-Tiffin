const mongoose = require("mongoose");

const motherSchema = new mongoose.Schema({
    
    name: { type: String, required: true},
    kname :{type : String, required : true}, 
    password: { type: String, required: true },
    email  : {type : String , required : true} ,
    phone : {type :  Number, required : true} ,  
    menu: [{ type: String }], // Array of food items
    subscribedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
    revenue: { type: Number, default: 0 } // Auto-calculated
});

// // Middleware to update revenue before saving
// motherSchema.pre("save", function (next) {
//     const subscriptionFees = 500; // Example fee per user
//     this.revenue = this.subscribedUsers.length * subscriptionFees;
//     next();
// });

const Mother = mongoose.model("Mother", motherSchema);
module.exports = Mother;
