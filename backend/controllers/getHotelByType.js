import Hotel from "../models/RegisterHotel.js";

export const getHotelByType=async(req,res)=>{
    const {type} = req.query;

    try {
        let hotels;

        if(!type || type=="all")
        {
            hotels=await Hotel.find();
        }
        else if(type==="veg" || type=="nonveg")
        {
            hotels=await Hotel.find({options:type});
        }else{
            return res.status(400).json({message: "Invalid type. Use 'veg', 'nonveg', or 'all'"})
        }
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({message:"server error",error});
    }
};

