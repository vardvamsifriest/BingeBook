import express, { Router } from "express";
import { ActivityModel } from "@repo/db";
import {authMiddleware} from "../middleware"
const router: Router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { tmdbId, mediaType, status } = req.body;

    const existing = await ActivityModel.findOne({
      userId: req.userId,
      tmdbId,
      mediaType,
    });
    
    if (existing) {
      return res.status(409).json({
        message: `Already in ${existing.status}`,
      });
    }
    
    const activity = await ActivityModel.create({
      ...req.body,
      userId: req.userId,
    });
    
    res.json({
      message: `Added to ${status}`,
      activity,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.get("/" ,authMiddleware,async(req,res)=>{
  try{
      const activities = await ActivityModel.find({userId:req.userId})
      res.json(activities)
  }
  catch(e)
  {
      res.status(500).json({message:"Something went wrong"})
  }
 
})
router.get("/watchlist", authMiddleware,async (req, res) => {
  try {
    const data = await ActivityModel.find({
      userId: req.userId,
      status: "watchlist",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/watching",authMiddleware, async (req, res) => {
  try {
    const data = await ActivityModel.find({
      userId: req.userId,
      status: "watching",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/watched", authMiddleware, async (req, res) => {
  try {
    const data = await ActivityModel.find({
      userId: req.userId,
      status: "watched",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/dropped",authMiddleware, async (req, res) => {
  try {
    const data = await ActivityModel.find({
      userId: req.userId,
      status: "dropped",
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.put("/review", authMiddleware, async (req, res) => {
  try {
    const { tmdbId, mediaType, rating, review } = req.body;

    const activity = await ActivityModel.findOneAndUpdate(
      {
        userId: req.userId,
        tmdbId,
        mediaType,
        status: "watched",
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

    return res.json({
      message: "Review saved successfully",
      activity,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});
router.get("/:mediaType/:id",authMiddleware, async (req, res) => {
  try {
    const  mediaType  = req.params.mediaType as "movie" | "tv";
    const tmdbId = Number(req.params.id);
    const activity = await ActivityModel.findOne({
      userId: req.userId,
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
router.put("/status", authMiddleware, async (req, res) => {

 

  try {
    const { id, mediaType, status } = req.body;

    const updated = await ActivityModel.findOneAndUpdate(
      {
        userId: req.userId,
        tmdbId: id,
        mediaType,
      },
      {
        $set: { status },
      },
      {
        returnDocument: "after",
      }
    );
    
    res.json({
      message: `Moved to ${status} `,
      activity: updated,
    });
   
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: e instanceof Error ? e.message : "Something went wrong",
    });
  }
  
});
router.delete("/review/:id", authMiddleware, async (req, res) => {
  try {
    const activity = await ActivityModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        $unset: {
          review: "",
          rating: "",
        },
      },
      {
        new: true,
      }
    );
    if (!activity) {
      return res.status(404).json({
        message: "Review not found",
      });
    }
    res.json({
      message: "Review deleted",
      activity,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
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


router.delete("/:id", authMiddleware, async (req, res) => {
  

  try {
    const deleted = await ActivityModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    

    

    res.json({
      message: "Activity deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});



export default router;