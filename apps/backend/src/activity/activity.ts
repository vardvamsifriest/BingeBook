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

export default router;