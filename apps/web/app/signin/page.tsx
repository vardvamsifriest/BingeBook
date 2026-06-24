"use client"
import { Logo } from "../components/logo"
import { Card } from "@repo/ui"
import {useState} from "react"
import {signin} from "@/lib/api"
import {useRouter} from "next/navigation"

export default function Signup() {
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("")
  const router = useRouter()
  async function handleSignin()
  {
    const data = await signin({
      password,
      email
    })
    if(data.token)
    {
      localStorage.setItem("token", data.token);
      router.push("/watched")
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
            <Card size="md" text="Signin" onClick={handleSignin} 
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword} />
          </div>
        </div>
      </div>

    </div>
  )
}