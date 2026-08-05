import express, { Router } from "express"
import jwt from "jsonwebtoken"
import { UserModel,ActivityModel} from "@repo/db"
import {authMiddleware} from "../middleware"
import {CreateUserSchema , SigninSchema} from "@repo/common"
const router: Router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET!

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  const result = CreateUserSchema.safeParse({
    email,
    password,
    username,
  });

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues[0].message,
    });
  }

  try {
    const response = await UserModel.create({
      email,
      password,
      username,
    });

    res.json({
      message: "You are signed up.",
      user: response,
    });

  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "Email already exists.",
      });
    } else {
      res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const result = SigninSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues[0].message,
    });
  }

  try {
    const user = await UserModel.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(403).json({
        message: "Incorrect credentials.",
      });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      JWT_SECRET
    );

    res.json({
      token,
      message: "You are signed in.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});
router.get("/profile", authMiddleware, async (req, res) => {
  const user = await UserModel.findById(req.userId).select(
    "-password"
  );

  const watched = await ActivityModel.countDocuments({
    userId: req.userId,
    status: "watched",
  });

  const watching = await ActivityModel.countDocuments({
    userId: req.userId,
    status: "watching",
  });

  const watchlist = await ActivityModel.countDocuments({
    userId: req.userId,
    status: "watchlist",
  });

  const dropped = await ActivityModel.countDocuments({
    userId: req.userId,
    status: "dropped",
  });

  const reviews = await ActivityModel.countDocuments({
    userId: req.userId,
    review: { $exists: true, $ne: "" },
  });

  res.json({
    user,
    stats: {
      watched,
      watching,
      watchlist,
      dropped,
      reviews,
    },
  });
});
export default router