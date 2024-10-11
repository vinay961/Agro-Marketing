import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: 'Not Paid' },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order',orderSchema);