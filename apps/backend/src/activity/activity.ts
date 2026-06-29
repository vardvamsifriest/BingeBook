import express, { Router } from "express";
import { ActivityModel } from "@repo/db";

const router: Router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { tmdbId, mediaType, status } = req.body;

    const existing = await ActivityModel.findOne({
      tmdbId,
      mediaType,
      status,
    });

    if (existing) {
      return res.status(409).json({
        message: `Already in ${status}`,
      });
    }

    const activity = await ActivityModel.create(req.body);

    res.json({
      message: `Added to ${status}`,
      activity,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.get("/" ,async(req,res)=>{
  try{
      const activities = await ActivityModel.find()
      res.json(activities)
  }
  catch(e)
  {
      res.status(500).json({message:"Something went wrong"})
  }
 
})
router.get("/watchlist", async (req, res) => {
  try {
    const data = await ActivityModel.find({
      status: "watchlist",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/watching", async (req, res) => {
  try {
    const data = await ActivityModel.find({
      status: "watching",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/watched", async (req, res) => {
  try {
    const data = await ActivityModel.find({
      status: "watched",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/dropped", async (req, res) => {
  try {
    const data = await ActivityModel.find({
      status: "dropped",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.put("/review", async (req, res) => {
  const { tmdbId, mediaType, rating, review } = req.body;
  console.log(req.body)
  const activity = await ActivityModel.findOneAndUpdate(
    {
      tmdbId,
      mediaType,
      status:"watched"
    },
    {
      rating,
      review,
      updatedAt: new Date(),
    },
    {
      new: true,
      upsert: true,
    }
  );
  console.log(activity)
  res.json(activity);
});
router.get("/:mediaType/:id", async (req, res) => {
  try {
    const  mediaType  = req.params.mediaType as "movie" | "tv";
    const tmdbId = Number(req.params.id);
    const activity = await ActivityModel.findOne({
      tmdbId,
      mediaType,
    });

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.json(activity);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.put("/:id",async(req,res)=>{
  try{
      const updated = await ActivityModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.json({message:"Activity update",activity:updated})
  }
 catch(e)
 {
  res.status(500).json({message:"Something went wrong"})
 }
})
console.log("FIRST ROUTER LOADED");
router.delete("/:id", async (req, res) => {
  try {
    await ActivityModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Activity deleted",
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.put("/status",async(req,res)=> {
  try{
    const { id , mediaType , status} = req.body
    const updated = await ActivityModel.findOneAndUpdate({
      mediaId: id, mediaType },
      { $set: { status } },
      { new: true }
      
    )
    res.json({message:"Status Updated Successfully"})
  }
  catch (e)
{
  console.log(e)
  res.status(500).json({
    message: "Something went wrong",
  });
}})

export default router;