import { CurrencyCodes } from "validator/lib/isISO4217.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

// placing user order from frontend

// var instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET_KEY,
//   });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async (req,res) =>{

    const frontend_url = "http://localhost:5174"
try {
    const newOrder = new orderModel({
        userId:req.body.userId, // getting this from auth 
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.adress
    })
     
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    const line_items = req.body.items.map((item) =>({
        price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100
        },
        quantity:1
    })

    const session = await  stripe.checkout.sessions.create({
        line_items:line_items,
        mode:"payment",
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,


    });
  
    // const options = {
    //     amount :req.body.amount*100,
    //     Currency:"INR",
    //     receipt:'receipt_order_1',
    // };

    // instance.orders.create(options ,
    //     (err,order) =>{
    //         if(!err){
    //             res.status(200).send({
    //             success:true,
    //             message:'Order Created',
    //             amount:amount,
    //             key_id:RAZORPAY_KEY_ID,

    //             })

    //         }
    //         else{

    //         }
        
    // })
  
    res.json({success:true,session_url:session.url})

    
} catch (error) {
    console.log(error);
    res.json({success:false ,message:"error"})
}
}

const verifyOrder = async (req,res) =>{
    const {orderID ,success } = req.body;
    try{
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderID ,{payment:true});
            res.json({success:true ,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderID);
            res.json({success:false ,message:"Not paid"})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"});
    }
}

// user orders for frontend

const userOrders = async(req , res) =>{
try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true , data:orders})
} catch (error) {
    console.log(error);
    res.json({success:false , message:"error"})
}
}
// listing orders for admin panel

const listOrders = async (req,res) =>{
try {
    const orders = await orderModel.find({});
    res.json({succes:true ,data:orders})
} catch (error) {
    console.log(error);
    res.json({succes:false ,message:"error"})
}
} 

// api for updating order status

const updateStatus = async (req,res) =>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderID,{status:req.body.status})
    res.json({succes:true,message:"status updates"})
} catch (error) {
    console.log(error);
    res.json({success:false ,message:"error"})
}
}
export {placeOrder ,verifyOrder , userOrders , listOrders ,updateStatus}