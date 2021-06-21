import express from "express";
import dotenv from "dotenv";
import  mongoose  from "mongoose";
import config from "./config.js"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import data from "./data/data.js"
import bodyParser from "body-parser"

dotenv.config()

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(error=> console.log(error.reason));



const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/api/users/", userRoute);
app.use("/api/products/", productRoute);


// app.get("/api/products", (req, res)=>{
//         res.send(data.products)
// })

// app.get("/api/products/:id", (req, res)=>{
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id === Number(productId))
//     res.send(product);
// })

app.listen(5000, ()=>{
    console.log("Brower is listening at port 5000")
})