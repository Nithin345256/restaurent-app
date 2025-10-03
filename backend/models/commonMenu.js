import mongoose from "mongoose";

const CommonMenuItemSchema = new mongoose.Schema(
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
      default: null, // Hotel sets price when adding to their menu
    },
    thaliEligible: {
      type: Boolean,
      default: false,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner"],
      required: true,
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
      // Example: { starters: [String], riceItems: [String], juices: [String], others: [String] }
    },
    photo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const CommonMenuItem = mongoose.models.CommonMenuItem || mongoose.model("CommonMenuItem", CommonMenuItemSchema);
export default CommonMenuItem;