const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        maxlength:2000,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
    },
    category:{
        type:ObjectId,
        reference:"Category",
        required:true
    },
    stock:{
        type:Number
    },
    solid:{
       type:Number,
       defualt:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema)