import express  from "express";
import Product from "../models/productModel.js";
import {isAdmin, getToken, IsAuth} from "../util.js";


const router = express.Router();


router.get("/", async (req, res)=>{
    const products = await Product.find({})
    res.send(products)
})


router.get("/:id", async (req, res)=>{
    try {
        const product = await Product.findOne({_id:req.params.id})
        if(product){
            res.send(product)
        }else{
            res.status(404).send({msg: "Product does not exist"})
        }
    } catch (error) {
        res.send({message: error.message})
    }
})

router.post("/", isAdmin, IsAuth, async(req, res)=>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        countInStock:req.body.countInStock,
        weight: req.body.weight,
        dimension: req.body.dimension,
        material: req.body.material,
        brand:req.body.brand,
        reviews: req.body.reviews,
        New: req.body.New,
        image2:req.body.image2,
        hoverImage1:req.body.hoverImage1,
        hoverImage2:req.body.hoverImage2,
        hoverImage3:req.body.hoverImage3,
        hoverImage4:req.body.hoverImage4,
        description:req.body.description,
        para:req.body.para
    })
    const newProduct = await product.save()
    if(newProduct){
        return res.status(201).send({msg: "New Product Created", data: newProduct})
    }
    return res.status(500).send({message: "Error in creating product"})
})

router.put("/:id", isAdmin, IsAuth, async(req, res)=>{
    const productId = req.params.id;
    const product  = await Product.findById({_id:productId})
    if(product){
        product.name= req.body.name;
        product.image= req.body.image;
        product.price= req.body.price;
        product.countInStock=req.body.countInStock;
        product.weight= req.body.weight;
        product.dimension= req.body.dimension;
        product.material= req.body.material;
        product.brand=req.body.brand;
        product.reviews= req.body.reviews;
        product.New= req.body.New;
        product.image2=req.body.image2;
        product.hoverImage1=req.body.hoverImage1;
        product.hoverImage2=req.body.hoverImage2;
        product.hoverImage3=req.body.hoverImage3;
        product.hoverImage4=req.body.hoverImage4;
        product.description=req.body.description;
        product.para=req.body.para;
        const updatedProduct = await product.save();
            if(updatedProduct){
                return res.status(200).send({message: "Product Updated", data: updatedProduct})
            }
    }
    return res.status(500).send({message: "Error in updating product"})

})

router.delete("/:id",  isAdmin, IsAuth, async(req, res)=>{
    const deletedProduct = await Product.findById(req.params.id)
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "Product Deleted"})
    }else{
        res.send({message: "Error in Deleting Product"})
    }
})






export default router;
