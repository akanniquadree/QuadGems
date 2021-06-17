import express from "express";
import data from "./data/data.js"

const app = express()

app.get("/api/products", (req, res)=>{
        res.send(data.products)
})

app.get("/api/products/:id", (req, res)=>{
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === Number(productId))
    res.send(product);
})

app.listen(5000, ()=>{
    console.log("Brower is listening at port 5000")
})