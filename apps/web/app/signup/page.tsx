"use client"
import { Logo } from "../components/logo"
import { Card } from "@repo/ui"
import {useState} from "react"
import {signup} from "@/lib/api"
import {useRouter} from "next/navigation"
import {useToast} from "../components/toastprovider"

export default function Signup() {
  const[username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const router = useRouter()
  const {showToast} = useToast()
  async function handleSignup()
  {
    try {
      const data = await signup({
        username,
        email,
        password,
      });
  
      showToast({
        type: "success",
        message: data.message,
      });
  
      router.push("/signin");
    } catch (e: any) {
      showToast({
        type: "error",
        message: e.message,
      });
    }
  }
  return (
    <div className="bg-background h-screen w-full">
      
      <div className="bg-accent w-screen h-30">
        <div className="flex justify-center -translate-y-38">
          <Logo variant="primary" />
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