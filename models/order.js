const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema

const productcartSchema=new mongoose.Schema({
   product:{
    type:ObjectId,
    ref:"Product"
   },
   name:String,
   count:Number,
   price:Number

})


const ProductCart=mongoose.model("ProductCart",productcartSchema)


const orderSchema=new mongoose.Schema({
    products:[productcartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled","Delievered","Shipped","Processing","Received"],
        },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User",
    }
},
    {timestamps:true},
)

const Order=mongoose.model("Order",orderSchema)

module.exports={Order,ProductCart}

