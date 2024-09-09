import mongoose from "mongoose"

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Paras:Paras@cluster0.66xzjiw.mongodb.net/NSS').then(()=> console.log("DB Connected"));
}