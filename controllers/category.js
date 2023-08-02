const Category=require("../models/category")

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            res.status(400).json({
                error:"Category not found in DB"
            })
        }
        req.category=cate
        next()
    })
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body)
    category.save((err,category1)=>{
        if(err) {
            res.status(400).json({
                error:"Not able to save category in DB"
            })
        }
        res.json({category1})
    })
}

exports.getCategory=(req,res)=>{
    return res.json(req.category)
}


exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err) {
            res.status(400).json({
                error:"categories not found"
            })
        }
        return res.json(categories)
    })
}
/*
exports.updateCategory=(req,res)=>{
    console.log(req.body)
    console.log(req.category)
    const category=req.category
    category.name=req.body.name
    category.save((err,updatedCategory)=>{
        if(err){
            res.status(400).json({
                error:"failed to update category"
            })
        }
        return res.json(updatedCategory)
    }
    )
}*/
exports.updateCategory=(req,res)=>{
    console.log(req.body)
    Category.findByIdAndUpdate(
        {_id:req.category._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,categ)=>{
            if(err){
                return res.status(400).json({
                    error:"category not updated"
                })
            }
            res.json(categ)
        }
    )
}
/*
exports.updateCategory=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }})
    }
*/
exports.removeCategory=(req,res)=>{
    const category=req.category
    category.remove((err,category)=>{
        if(err){
            res.status(400).json({
                error:"Failed to delete category"
            })
        }
        res.json({
            message:"Category Deleted successfully"
        })
    })
}

