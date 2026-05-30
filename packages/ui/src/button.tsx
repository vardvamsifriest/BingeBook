"use client"
interface buttonprops {
  size:"sm"|"md"|"lg",
  variant:"primary"|"secondary",
  text:string
}
const variantStyles = {
  "primary":"bg-accent text-background rounded font-Ubuntu hover:text-black  ",
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
    <div>
      <button className={`${variantStyles[props.variant]} ${sizeStyles[props.size]}`}>{props.text}</button>
    </div>
  )
}