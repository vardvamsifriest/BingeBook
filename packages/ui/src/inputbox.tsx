import {ReactElement} from "react"
interface inputprops {
    placeholder:string,
    id:string,
    icon:ReactElement,
    eyeIcon?:ReactElement,
    type?:string,
    value?:string,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function InputBox(props:inputprops)
{
 
    return (
        <div
        className="
          flex
          items-center
          gap-3
          bg-[#F5F1E8]
          rounded-xl
          px-4
          py-3
          border
          border-[#A4B07A]
          focus-within:ring-2
          focus-within:ring-[#A4B07A]
        "
      >
        {props.icon}
      
        <input
          id={props.id}
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          onChange = {props.onChange}
          className="
            flex-1
            bg-transparent
            outline-none
            text-[#5E6A3C]
            placeholder:text-background
          "
        />
        {props.eyeIcon}
      </div>
    )
}