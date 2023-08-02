const { array } = require("i/lib/util")
const mongoose=require("mongoose")
const crypto=require("crypto")
const uuidv1=require("uuid/v1")
//const { v4: uuidv4 } = require('uuid');
var userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:32
    },
    userinfo:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    encry_password:{
        type:String,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }

},{timestamps:true})

userSchema.virtual("password")
.set(function(password){
   this._password=password,
   this.salt=uuidv1(),
   this.encry_password=this.securePassword(password);
})
.get(function(){
    return this.password
})


userSchema.methods={
    autheticate:function(plainpassword)
    {
      console.log("Hello.")
      console.log(plainpassword)
      return this.securePassword(plainpassword)===this.encry_password;
    },
    securePassword:function(plainpassword){
        if(!plainpassword) return "";
        try{
          return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex");
        }
        catch(err)
        {
          return "";
        }
    }
}
module.exports=mongoose.model("User",userSchema)