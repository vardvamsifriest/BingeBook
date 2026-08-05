"use client"
import { Logo } from "../components/logo"
import { Card } from "@repo/ui"
import {useState} from "react"
import {signin} from "@/lib/api"
import {useRouter} from "next/navigation"
import {useToast} from "../components/toastprovider"

export default function Signin() {
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("")
  const router = useRouter()
  const {showToast} = useToast()
  async function handleSignin() {
    try {
      const data = await signin({
        email,
        password,
      });
  
      showToast({
        type: "success",
        message: data.message,
      });
  
      router.push("/watched");
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
          <Logo variant="secondary" />
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
  )}
