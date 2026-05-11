import express from "express"
import {UserModel} from "@repo/db"
import {ActivityModel} from "@repo/db"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
const JWT_SECRET = "vvk045"
const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://vardhanvamsi587_db_user:VA44**msi@cluster0.yrkholx.mongodb.net/kinora")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

app.post("/signup",async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username

    const response =await UserModel.create({
        email: email,
        password: password,
        username: username,

    })
    
    res.json({message:"You are signed up.",user:response})
})
app.post("/signin",async(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const response = await UserModel.findOne({
        email:email,
        password:password
    })
    if(response)
    {   
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET)
        res.json({token:token,message:"You are signed in"})
    }
    else
    {
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})
app.listen(3000)