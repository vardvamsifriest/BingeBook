"use client"
import { Logo } from "../components/logo"
import { Card } from "@repo/ui"


export default function Signup() {
  return (
    <div className="bg-background h-screen w-full">
      
      <div className="bg-accent w-screen h-30">
        <div className="flex justify-center -translate-y-38">
          <Logo />
        </div>
      </div>

      <div className="backdrop-blur-sm">
        <div className="flex justify-center items-center pt-35 ">
          <div>
            <Card size="md" text="Signin" />
          </div>
        </div>
      </div>

    </div>
  )
}