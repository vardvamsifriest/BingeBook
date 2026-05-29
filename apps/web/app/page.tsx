import {Logo} from "./components/logo"
import {Card} from "@repo/ui"
import { Button } from "@repo/ui"
export default function Landing()
{
  return (
    <div className = "bg-background h-screen w-full">
      <div className="bg-accent h-24 w-full">
        <img src="./logo.png" className="h-50 w-50"/> 
      </div>
      <div className="flex justify-center items-center pt-35">
       <div >
        <Card size="lg" text="Signup"/>
       </div>
      
      </div>
      </div>

  )
}