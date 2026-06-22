"use client"
import {Button} from "./button"
import {Mail} from "../../../apps/web/app/components/icons/mailicon"
import {UserIcon} from "../../../apps/web/app/components/icons/usericon"
import {LockIcon} from "../../../apps/web/app/components/icons/lockicon"
import {EyeIcon} from "../../../apps/web/app/components/icons/eyeicon"
import {InputBox} from "./inputbox"
import {useState} from "react"

interface cardprops {
  size:"sm"|"md"|"lg",
  text:string,
  needusername?:boolean
}
const SizeStyles = {
  "sm":"h-74",
  "md":"h-84",
  "lg":"h-96"
}
export function Card(props:cardprops)
{
  const[showPassword , setShowPassword] = useState(false)
  return (
    <div className={`${SizeStyles[props.size]} bg-accent w-84 rounded-md outline-2 outline-olive-700`} >
      <div className="flex justify-center pt-2">
        <p className="font-Ubuntu text-4xl text-background">
          {props.text}
        </p>
      </div>
      <div className="pl-4 pr-4 pt-10">
      <InputBox placeholder="email" id="Email:" icon={<Mail/>} />
      </div>
      <div className="pl-4 pr-4 pt-5">
      <InputBox  placeholder="password" id="Password:" icon={<LockIcon/>} eyeIcon={<EyeIcon onClick={()=>setShowPassword(!showPassword)}/>} type={showPassword ? "text":"password"} />
      </div>
      {props.needusername && ( <div className="pl-4 pr-4  pt-5">
      <InputBox  placeholder="username" id="Username:" icon={<UserIcon/>} />
      </div>)}
      <div className=" pt-10 flex justify-center">
      <Button variant= "primary" size = "md" text="Start" />
      </div>
    </div>
  )
}