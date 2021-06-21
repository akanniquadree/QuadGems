import express from "express"
import User from "../models/userModel.js"
import {getToken} from "../util.js"

const router = express.Router();



router.post("/login", async (req, res)=>{
    try {
        const loginUser = await User.findOne({
            email:req.body.email,
            password: req.body.password
        });
        if(loginUser){
            res.send({
                _id:loginUser._id,
                name:loginUser.name,
                email: loginUser.email,
                isAdmin: loginUser.isAdmin,
                token:getToken(loginUser)
            })
        }
        else{
            res.status(401).send({msg: "Invalid Email and Password"})
        }
    } catch (error) {
        res.send({msg: error.message})
    }
})

router.post("/signup", async (req, res)=>{
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const newUser = await user.save();
        if(newUser){
            res.send({
                _id:newUser.id,
                name:newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }else{
            res.status(401).send({msg: "Invalid User Data"})
        }
    } catch (error) {
        res.send({msg: error.message})
    }
})


router.get("/createadmin", async (req, res)=>{
    try {
        const user = new User ({
            name: "Quadree",
            email: "akanniquadry7@gmail.com",
            password: "1234",
            isAdmin:true
        })
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({msg: error.message})
    }
})

export default router;