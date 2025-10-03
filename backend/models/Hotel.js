import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    mealType: {  // ← MUST come before category
      type: String,
      enum: ["breakfast", "lunch", "dinner"],
      required: true,
    },
    category: {
      type: String,
      required: false,  // Make it optional for now to avoid validation issues
      default: "",
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
    thaliOptions: {
      type: Object,
      default: null,
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

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
export default Hotel;