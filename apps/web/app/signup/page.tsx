"use client"
import { Logo } from "../components/logo"
import { Card } from "@repo/ui"
import {useState} from "react"
import {signup} from "@/lib/api"
import {useRouter} from "next/navigation"

export default function Signup() {
  const[username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const router = useRouter()
  async function handleSignup()
  {
  const data: any = await signup({
    username,
    password,
    email,
  });
  
  if (data.message === "You are signed up.") {
    router.push("/signin");
  }
}
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
            <Card size="lg" text="Signup" needusername onClick={handleSignup} email={email}
              setEmail={setEmail}
              username={username}
              setUsername={setUsername}
                password={password}
              setPassword={setPassword}/>
          </div>
        </div>
      </div>

    </div>
  )
}