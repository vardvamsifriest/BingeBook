"use client"
import {useState} from "react"
import {Button} from "@repo/ui"
export function RatingModal()
{
   
    const[showModal , setShowModal] = useState(false)
    return (
        <div className="flex justify-center">
            <div className="pt-10 flex justify-center">
          <Button size="md" variant="primary" text="Rate" onClick={()=>setShowModal(true)} />
          </div>
        {showModal && <div className="bg-accent fixed inset-0 h-100 w-100 rounded-xl outline-2 outline-background">
            <div className="flex justify-center items-center">
            <div className="">
                <p className="font-Ubuntu text-gray-900 text-2xl pt-2">
                    Your Rating
                </p>    
            </div>
            <div className="flex items-end">
                <img src="/close.png" className="h-7 w-7" />
            </div>
            </div>
            <div className="p-5 field-sizing-content ">
                < textarea placeholder = "Review" className="font-Ubuntu  text-xl outline-2 outline-black rounded-lg"/>
            </div>
            <div className="flex  p-5 pt-30 gap-4">
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            <img className="h-15 w-15" src="/star.png" />
            </div>
            <div className="flex justify-center ">
                <Button size="md" text="Submit" variant="primary" onClick={()=>setShowModal(false)} />
            </div>

        </div>}
        </div>
    )
}