const express=require("express")
const router=express.Router()

const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
const {updateStock}=require("../controllers/product")
const {getUserById,userPurchaseList}=require("../controllers/user")
const {getOrderById,createOrder,getAllOrders, updateStatus, getOrderStatus}=require("../controllers/order")

//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//actual routes
router.post("/order/create/:userId",isSignedIn,isAuthenticated,userPurchaseList,updateStock,createOrder)

router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)

//update status
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)

router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
module.exports=router