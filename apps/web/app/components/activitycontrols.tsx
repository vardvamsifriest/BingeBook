"use client"
import {ActivityButton} from "../components/activitybutton"
import {updateStatus} from "@/lib/api"
import {useRouter} from "next/navigation"
interface activityprops {
    tmdbId: number;
    mediaType: "movie" | "tv"
    currentStatus?: "watched" | "watchlist" | "watching" | "dropped",
    onStatusChange?:(status: Status) => void;
    
}
type Status  ="watchlist" | "watching" | "watched" | "dropped";
export function ActivityControl(props:activityprops)
{
    const router = useRouter()
   
    async function handleUpdate(status: Status) {
      const res = await updateStatus(
        props.tmdbId,
        props.mediaType,
        status
      );
    
      props.onStatusChange?.(status);
    }
    return (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ActivityButton
            tmdbId={props.tmdbId}
            mediaType={props.mediaType}
            status="watched"
            text="Watched"
            onClick={() => handleUpdate("watched")}
            variant = {props.currentStatus === "watched" ? "tertiary" : "secondary"}
          />
      
          <ActivityButton
            tmdbId={props.tmdbId}
            mediaType={props.mediaType}
            status="watchlist"
            text="Watchlist"
            onClick={() => handleUpdate("watchlist")}
            variant = {props.currentStatus === "watchlist" ? "tertiary" : "secondary"}
          />
      
          <ActivityButton
            tmdbId={props.tmdbId}
            mediaType={props.mediaType}
            status="watching"
            text="Watching"
            onClick={() => handleUpdate("watching")}
            variant = {props.currentStatus === "watching" ? "tertiary" : "secondary"}
          />
      
          <ActivityButton
            tmdbId={props.tmdbId}
            mediaType={props.mediaType}
            status="dropped"
            text="Dropped"
            onClick={() => handleUpdate("dropped")
            }
            variant = {props.currentStatus === "dropped" ? "tertiary" : "secondary"}
          />
        </div>
      );
}

