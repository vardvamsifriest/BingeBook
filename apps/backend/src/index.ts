import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import tmdbRouter from "./routes/tmdb"
import authRouter from "./routes/auth"
import activityRouter from "./routes/activity"
const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://vardhanvamsi587_db_user:VA44**msi@cluster0.yrkholx.mongodb.net/kinora")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

app.use("/tmdb", tmdbRouter)
app.use("/auth", authRouter)
app.use("/activity",activityRouter)
app.listen(3001, () => console.log("Server running on port 3000"))