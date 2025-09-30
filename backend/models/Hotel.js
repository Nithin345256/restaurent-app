import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    foodType: {
      type: String,
      enum: ["veg", "nonveg"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    thaliEligible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["single", "thali"],
      default: "single",
    },
    items: {
      type: [String],
      default: [],
    },
    photo: {
      type: String,
      default: null,
    },
    photoApproved: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true, timestamps: true }
);

const HotelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 100,
    },
    place: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    options: {
      type: [{ type: String, enum: ["veg", "nonveg"] }],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one option (veg or nonveg) is required",
      },
    },
    photo: {
      type: String,
      required: true,
    },
    menu: {
      type: [MenuItemSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Static method to calculate total price
HotelSchema.statics.calculateTotal = async function (selectedItems) {
  try {
    let total = 0;
    for (const item of selectedItems) {
      const hotel = await this.findOne({ "menu._id": item.menuItemId });
      if (hotel) {
        const menuItem = hotel.menu.id(item.menuItemId);
        if (menuItem) {
          total += menuItem.price * (item.quantity || 1);
        }
      }
    }
    return total;
  } catch (error) {
    throw new Error(`Failed to calculate total: ${error.message}`);
  }
};

HotelSchema.index({ name: 1 }, { unique: true });
HotelSchema.index({ userId: 1 });

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
export default Hotel;