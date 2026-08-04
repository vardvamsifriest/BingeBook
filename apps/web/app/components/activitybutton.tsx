"use client"
import {Button} from "@repo/ui"
import {addActivity} from "@/lib/api"
import {useToast} from "../components/toastprovider"
interface activityprops {
    tmdbId:number,
    mediaType:"movie"|"tv"
    status:"watchlist"|"watching"|"watched"|"dropped",
    text:string,
    onClick?:()=>void,
    variant?: "primary"|"secondary"|"tertiary"
}
export function ActivityButton(props:activityprops)
{
  const {showToast} = useToast()
  async function handleClick() {
    if (props.onClick) {
      props.onClick();
      return;
    }
  
    const data = await addActivity({
      tmdbId: props.tmdbId,
      mediaType: props.mediaType,
      status: props.status,
    });
  
    showToast({
      type:"success",
      message:`${data.message}`
    })
  }
    return (
        <div>
            <Button size="md" variant={props.variant ?? "secondary"} text={props.text} onClick={handleClick}  />
        </div>
    )
}