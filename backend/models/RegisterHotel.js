import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thaliEligible: { type: Boolean, default: false },
    type: { type: String, enum: ["single", "thali"], default: "single" },
    items: { type: [String], default: [] }, // For thali items
},{ _id: false });

const HotelScheama=new mongoose.Schema({
    HotelName:{
        type:String,
        required:true,
        unique:true,
    },
    place:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    options:{
        type:[{ type:String, enum:["veg","nonveg"] }],
        required:true,
        validate: {
            validator: function(v) { return Array.isArray(v) && v.length > 0; },
            message: "At least one option is required"
        }
    },
    photo:{
        type:String,
        required:true
    },
    menu: {
        type: [MenuItemSchema],
        default: [],
    }
},
{ timestamps: true }
);

const Hotel=mongoose.model("Hotel",HotelScheama);

export default Hotel;
