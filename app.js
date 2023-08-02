require("dotenv").config();

const mongoose=require("mongoose")
const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const cookieparser=require("cookie-parser")
const cors=require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes=require("./routes/auth.js")
const userRoutes=require("./routes/user.js")
const categoryRoutes=require("./routes/category.js")
const productRoutes=require("./routes/product.js")
const orderRoutes=require("./routes/order.js")
const paymentBRoutes=require("./routes/paymentBRoutes")


mongoose.connect(process.env.DATABASE,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log("DB CONNECTED");})


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",paymentBRoutes)

const port=process.env.PORT ||8000;
app.listen(port,()=>{
    console.log(`app is ruuning at ${port} port`)
 })
