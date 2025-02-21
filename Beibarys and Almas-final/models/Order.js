const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: "365d" } } 
});


OrderSchema.index({ userId: 1, createdAt: -1 });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;