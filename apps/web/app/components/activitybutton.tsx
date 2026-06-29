"use client"
import {Button} from "@repo/ui"
import {addActivity} from "@/lib/api"
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
  
    alert(data.message);
  }
    return (
        <div>
            <Button size="md" variant={props.variant ?? "secondary"} text={props.text} onClick={handleClick}  />
        </div>
    )
}