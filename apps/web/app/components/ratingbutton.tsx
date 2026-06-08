"use client"
import {useState} from "react"
import {Button} from "@repo/ui"
export function RatingModal()
{
   
    const[showModal , setShowModal] = useState(false)
    return (
        <div className="">
            <div className="pt-10">
          <Button size="md" variant="primary" text="Rate" onClick={()=>setShowModal(true)} />
          </div>
        {showModal && <div className="bg-accent h-100 w-100 rounded-xl outline-2 outline-background">
           
            <div className="p-5">
                < textarea placeholder = "Review" className="font-Ubuntu  text-xl outline-2 outline-black rounded-lg"/>
            </div>
            <div className="flex  p-5 pt-30 gap-4">
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            </div>
            <div className="flex justify-center pt-5">
                <Button size="md" text="Submit" variant="primary" />
            </div>

        </div>}
        </div>
    )
}