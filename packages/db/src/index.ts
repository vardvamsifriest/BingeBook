import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const User = new Schema({
    username:String,
    password:String,
    email:{type:String,unique:true},
    avatar:String,
    createdAt:Date
})
const Activity = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    tmdbId:Number,
    mediaType:{type:String,enum:["movie","tv"]},
    status:{type:String,enum:["watched","watchlist","watching","dropped"]},
    rating:Number,
    review:String,
    createdAt:Date,
    updatedAt:Date,
    title:String,
    posterPath:String
})
export const UserModel = mongoose.model("users",User);
export const ActivityModel = mongoose.model("Activity",Activity)

