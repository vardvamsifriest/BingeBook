"use client"
import {ReactElement} from "react"
interface buttonprops {
  size:"sm"|"md"|"lg",
  variant:"primary"|"secondary",
  text:string,
  onClick?:()=>void,
  starticon?:ReactElement
}
const variantStyles = {
  "primary":"bg-accent text-background rounded font-Ubuntu hover:text-black outline-2 outline-background hover:scale-105 transition-all",
  "secondary":"bg-surface font-Ubuntu text-accent rounded-lg hover:bg-accent hover:text-black w-full"
}
const sizeStyles = {
  "sm":"p-2 py-1 text-sm",
  "md":"p-4 py-2 text-md",
  "lg":"px-6 py-3 text-lg"
}
export function Button(props:buttonprops)
{

  return (
    <button onClick={props.onClick} className={`flex items-center justify-center gap-2 ${variantStyles[props.variant]} ${sizeStyles[props.size]}`}>
    <div className="scale-80">{props.starticon}</div>
   <div>{props.text}</div>
  </button>
  )
}