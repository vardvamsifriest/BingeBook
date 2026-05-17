import express, { Router } from "express"
import jwt from "jsonwebtoken"
import { UserModel } from "@repo/db"

const router: Router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET!

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body
  try {
    const response = await UserModel.create({ email, password, username })
    res.json({ message: "You are signed up.", user: response })
  } catch (err: any) {
    if (err.code === 11000) res.status(400).json({ message: "Email already exists." })
    else res.status(500).json({ message: "Something went wrong." })
  }
})

router.post("/signin", async (req, res) => {
  const { email, password } = req.body
  const response = await UserModel.findOne({ email, password })
  if (response) {
    const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET)
    res.json({ token, message: "You are signed in" })
  } else {
    res.status(403).json({ message: "Incorrect credentials" })
  }
})

export default router