"use client"
import {useState} from "react"
import {StarIcon} from "../components/icons/staricon"
import {Button} from "@repo/ui"
export function ReviewCard()

{
    const[rating,setRating] = useState(0)
    const[hoveredStar,setHoveredStar] = useState(0)
    const[review,setReview] = useState("")

    return (
        <div className="bg-accent h-140 w-90 rounded-lg">
            <div className="p-2  flex justify-center">
                <p className="font-Ubuntu text-background text-2xl pt-4">
                    Rating
                </p>
            </div>
            <div className="flex p-4 justify-center gap-2">
             {[1,2,3,4,5].map((star) => (
                <StarIcon key={star}
                    fillstate={
                star <= (hoveredStar || rating)
                  ? "filled"
                  : star - 0.5 === (hoveredStar || rating)
                  ? "half"
                  : "empty"
                }
                onClick={() => {
                    setRating(hoveredStar)}}
                onMouseLeave={() => setHoveredStar(0)}
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    if (e.clientX - rect.left < rect.width / 2) {
                    setHoveredStar(star - 0.5);
                } 
                else 
                {
                    setHoveredStar(star);
                }
            }}
        />
        ))}
        
        </div>
        <div className="flex p-4 items-center justify-center ">
            <div>
            <p className = "font-Ubuntu text-xl text-background">
                Your Rating:   {rating}/5
            </p>
            </div>
        </div>
        <div className="p-2 flex justify-center">
            <label className="font-Ubuntu text-background text-xl">
                <div className="flex justify-center">
               <p> What did you think?</p>
               </div>
               <div className="pt-5">
            <textarea onChange={(e)=>setReview(e.target.value)}maxLength={1000}  placeholder="Review" name="Review" rows={5} cols={25} className=" resize-none outline-2 outline-background p-5 "/>
            </div>
            </label>
            
        </div>
        <div className="flex justify-end pr-4">
                <p className = "font-Ubuntu text-background text-md">
                    {review.length}/1000
                </p>
            </div>
            <div className="flex justify-center pt-5">
                <Button size = "md" variant="primary" text="Save review" />
            </div>
            
        </div>
    )
}