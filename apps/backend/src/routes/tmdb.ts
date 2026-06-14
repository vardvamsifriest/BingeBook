import {getMovie , getTrending , searchMedia , getSimilar,getTv,getTVSimilar} from "../tmdb"
import express,{Router} from "express"
const router:Router = express.Router()
router.get("/trending", async(req,res)=>{
    const data = await getTrending()
    res.json(data)
})
router.get("/movie/:id",async(req,res)=>{
    const data = await getMovie(Number(req.params.id))
    res.json(data)
})
router.get("/search",async(req,res)=>{
    const query = req.query.q as string
    if(!query) 
    return res.status(400).json({message:"Query required"})
    const data = await searchMedia(query)
    res.json(data)
})
router.get("/movie/:id/similar", async(req,res)=>{
    const data = await getSimilar(Number(req.params.id))
    res.json(data)
})
router.get("/tv/:id",async(req,res)=>{
    const data = await getTv(Number(req.params.id));
    res.json(data)
})
router.get("/tv/:id/similar",async(req,res)=>{
    const data = await getTVSimilar(Number(req.params.id));
    res.json(data)
})
export default router