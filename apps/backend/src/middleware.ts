import jwt from "jsonwebtoken"
import {Request , Response , NextFunction} from "express"
const JWT_SECRET = process.env.JWT_SECRET!

export function authMiddleware(req:Request , res:Response , next:NextFunction)
{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token)
        return res.status(401).json({message:"Unauthorization"})

    try {
        const decoded = jwt.verify(token,JWT_SECRET) as { id: string}
        req.userId = decoded.id
        next()
    }
    catch{
        res.status(401).json({message:"Invalid Token"})
    }
        
}