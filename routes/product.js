const express=require("express")
const router=express.Router()

const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,updateStock,getAllUniqueCategories}=require("../controllers/product")
const {getUserById}=require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")

router.param("userId",getUserById)
router.param("productId",getProductById)

//create
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

//read
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//delete
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)

//update
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

//listing all products
router.get("/products",getAllProducts)


router.get("/products/categories",getAllUniqueCategories)
module.exports=router