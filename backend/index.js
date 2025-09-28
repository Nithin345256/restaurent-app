import express from "express"
import connectDB from "./utils/db.js"
import router from "./routes/user.js"
import filerouter from "./routes/filteroutes.js"
import hotelroutes from "./routes/hotelRoutes.js"
import MenuRoutes from "./routes/Menu.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app=express()
const port=process.env.PORT || 8000

app.use(cors())
app.use(express.json());

connectDB()

app.use("/api/auth",router);
app.use("/api/filter",filerouter);
app.use("/api/hotel",hotelroutes);
app.use("/api/hotel",MenuRoutes);


app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})