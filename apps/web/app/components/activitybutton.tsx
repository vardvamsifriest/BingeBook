"use client"
import {Button} from "@repo/ui"
import {addActivity} from "@/lib/api"
interface activityprops {
    tmdbId:number,
    mediaType:"movie"|"tv"
    status:"watchlist"|"watching"|"watched"|"dropped",
    text:string
}
export function ActivityButton(props:activityprops)
{
    async function handleclick() {
        const data = await addActivity({
          tmdbId: props.tmdbId,
          status: props.status,
          mediaType: props.mediaType,
        });
      
        if (data.message?.startsWith("Already")) {
          alert(data.message);
          return;
        }
      
        alert(data.message);
      }
    return (
        <div>
            <Button size="lg" variant="secondary" text={props.text} onClick={handleclick} />
        </div>
    )
}