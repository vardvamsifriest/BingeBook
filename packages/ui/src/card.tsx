"use client"
import {Button} from "./button"
import {InputBox} from "./inputbox"
interface cardprops {
  size:"sm"|"md"|"lg",
  text:string
}
const SizeStyles = {
  "sm":"h-74",
  "md":"h-84",
  "lg":"h-96"
}
export function Card(props:cardprops)
{
  
  return (
    <div className={`${SizeStyles[props.size]} bg-accent w-72 rounded-md outline-2 outline-olive-700`} >
      <div className="flex justify-center pt-2">
        <p className="font-Ubuntu text-4xl text-grey-800">
          {props.text}
        </p>
      </div>
      <div className="pl-6 pt-10">
      <InputBox placeholder="email" id="Email:" />
      </div>
      <div className="p-2 pl-6 ">
      <InputBox  placeholder="password" id="Password:" />
      </div>
      <div className="p-2 pl-6">
      <InputBox  placeholder="username" id="Username:" />
      </div>
      <div className=" pt-10 flex justify-center">
      <Button variant= "primary" size = "md" text="Start" />
      </div>
    </div>
  )
}