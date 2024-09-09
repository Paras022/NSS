import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// API endpoints
app.use("/api/food" ,foodRouter)
app.use("/images" ,express.static('uploads')) // mounted the folder uploads on endpoint /images 
                                            //  we can acess the files of uploads now as /images/file_name
app.use("/api/user" ,userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/orders" ,orderRouter)



app.get("/",(req,res)=>{
    res.send("API Working")
})

// run the server 
app.listen(port ,() =>{
    console.log(`server started on http://localhost:${port}`)
})

// mongodb+srv://Paras:Paras@cluster0.srpjjxx.mongodb.net/?