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
mongoose.connect("mongodb+srv://vardhanvamsi587_db_user:VA44**msi@cluster0.yrkholx.mongodb.net/kinora")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

app.use("/tmdb",authMiddleware, tmdbRouter)
app.use("/auth",authMiddleware, authRouter)
app.use("/activity",authMiddleware,activityRouter)
app.listen(3001, () => console.log("Server running on port 3000"))