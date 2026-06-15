import express,{Router} from "express"
import {ActivityModel} from "@repo/db"
const router:Router = express.Router()
router.post("/",async(req,res)=>{
 const activity = await ActivityModel.create(req.body)
 res.json(activity)
})
router.get("/watchlist", async(req,res)=>{

    const data = await ActivityModel.find({status:"watchlist"})
    res.json(data)
})
router.get("/watching", async(req,res)=>{
    const data = await ActivityModel.find({status:"watching"})
    res.json(data)
})
router.get("/watched", async(req,res)=>{
    const data = await ActivityModel.find({status:"watched"})
    res.json(data)
})
router.get("/dropped", async(req,res)=>{
    const data = await ActivityModel.find({status:"dropped"})
    res.json(data   )
})
router.delete("/:id", async (req,res)=>{
   

    try {
        await ActivityModel.findByIdAndDelete(req.params.id);

        res.json({
            message:"Activity deleted"
        });
    }
    catch(e)
    {
        res.status(500).json({
            message:"Something went wrong"
        });
    }
})
export default router