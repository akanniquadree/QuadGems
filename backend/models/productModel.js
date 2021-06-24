import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    image: {type:String, required: true},
    price: {type:Number, required: true, default:0},
    countInStock:{type:Number, required: true, default: 0},
    weight: {type:String, required: true},
    dimension: {type:String, required: true},
    material: {type:String, required: true},
    brand:{type:String, required: true},
    reviews: {type:String, required: true, default:0},
    New: {type:String, required: true},
    image2:{type:String, required: true},
    hoverImage1:{type:String, required: true},
    hoverImage2:{type:String, required: true},
    hoverImage3:{type:String, required: true},
    hoverImage4:{type:String, required: true},
    description:{type:String, required:true},
    para:{type:String, required: true}

})

const productModel =  mongoose.model("Product", productSchema)

export default productModel;