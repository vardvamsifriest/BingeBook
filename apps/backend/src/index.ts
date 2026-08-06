import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import tmdbRouter from "./routes/tmdb"
import authRouter from "./routes/auth"
import activityRouter from "./activity/activity"
import cors from "cors";
import {authMiddleware} from "./middleware"
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URL!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

app.use("/tmdb", tmdbRouter)
app.use("/auth", authRouter)
app.use("/activity",authMiddleware,activityRouter)
app.use(authMiddleware)
app.listen(3001, () => console.log("Server running on port 3000"))