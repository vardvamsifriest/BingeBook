import express , {Router} from "express"
import {ActivityModel} from "@repo/db" 
import {authMiddleware} from "../middleware"
const router:Router = express.Router()
router.post("/",authMiddleware ,async(req,res)=>{
    const {UserId , tmdbId , mediaType ,status,rating , review} = req.body
    const existing = await ActivityModel.findOne({
        tmdbId,
        mediaType,
        status
    })
    if(existing)
    {
        return res.json({
            message:"Already exists"
        })
    }
    try{
        const activity = await ActivityModel.create({
            tmdbId , mediaType ,status,rating , review
        })
        res.json({message:"Activity logged",activity})
    }
    catch(e)
    {
        res.status(500).json({message:"Something went wrong"})
    }
})
router.get("/",authMiddleware ,async(req,res)=>{
    try{
        const activities = await ActivityModel.find({UserId:req.params.userId})
        res.json(activities)
    }
    catch(e)
    {
        res.status(500).json({message:"Something went wrong"})
    }
   
})
router.put("/:id",authMiddleware,async(req,res)=>{
    try{
        const updated = await ActivityModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({message:"Activity update",activity:updated})
    }
   catch(e)
   {
    res.status(500).json({message:"Something went wrong"})
   }
})
router.delete("/:id",authMiddleware,async(req,res)=>{
  
    try{ 
        await ActivityModel.findByIdAndDelete(req.params.id)
        res.json({message:"Activity deleted"})
    }
   catch(e)
   {
    res.status(500).json({message:"Something went wrong"})
   }
})

export default router