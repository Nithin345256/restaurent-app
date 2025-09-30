import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  foodType: {
    type: String,
    enum: ["veg", "nonveg"],
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    items: [orderItemSchema],
    itemsTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryLocation: {
      address: String,
      lat: Number,
      long: Number,
    },
    distance: {
      type: Number,
      default: 0,
    },
    deliveryCharges: {
      type: Number,
      default: 0,
    },
    estimatedTime: {
      type: Number,
      default: 0,
    },
    cateringService: {
      type: Boolean,
      default: false,
    },
    cateringCharges: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "on_the_way", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "online", "card"],
      default: "cash",
    },
    notes: {
      type: String,
      maxLength: 500,
    },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ hotel: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;