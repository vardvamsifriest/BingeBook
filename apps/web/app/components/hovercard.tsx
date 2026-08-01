"use client"
import { tmdb, GetActivity, updateStatus } from "@/lib/api";
import { StarIcon } from "./icons/staricon";
import { ActivityControl } from "../components/activitycontrols";
import { DeleteButton } from "../components/deletebutton";
import {useState , useEffect} from "react"
import {Loading} from  "../components/loading"

interface HoverCardProps {
  id: string;
  mediaType: "movie" | "tv";
  onStatusChange?: (status: "watchlist" | "watching" | "watched" | "dropped") => void;
}

export function HoverCard(props: HoverCardProps) {
  const [media, setMedia] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const mediaData =
        props.mediaType === "movie"
          ? await tmdb.getMovie(props.id)
          : await tmdb.getTv(props.id);

      const activityData = await GetActivity(
        props.id,
        props.mediaType
      );

      setMedia(mediaData);
      setActivity(activityData);
    }

    load();
  }, [props.id, props.mediaType]);

  if (!media) {

    <Loading />
  }


  return (
    <div className="w-72 rounded-xl bg-accent p-5 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl">

      <h2 className=" flex items-center text-center font-Ubuntu text-2xl font-medium text-background line-clamp-2">
        {media?.title || media?.name}
      </h2>
      <div className="mt-2 flex justify-between text-sm font-Ubuntu text-background/80">
        <p>
          {props.mediaType === "movie"
            ? media?.release_date
            : media?.first_air_date}
        </p>
        <p>🌐 {media?.original_language.toUpperCase()}</p>
      </div>

      <hr className="my-4 border-background/20" />

      <p className="line-clamp-2 text-center italic font-Ubuntu text-background/90">
        {media?.tagline || "No tagline available"}
      </p>

      <p className="mt-2 line-clamp-3 font-Ubuntu text-background/90">
        {media?.overview}
      </p>

      <hr className="my-4 border-background/20" />

      <div className="flex items-center gap-2">
        <p className="font-Ubuntu text-background">Your Rating:</p>

        <div className="scale-75">
          <StarIcon fillstate="filled" />
        </div>

        <p className="font-Ubuntu text-background">
          {activity?.rating ?? "-"}
        </p>
      </div>

      <hr className="my-4 border-background/20" />

      <div>
        <p className="mb-2 font-Ubuntu font-medium text-background">
          Your Review
        </p>

        <p className="line-clamp-3 font-Ubuntu text-background/90">
          {activity?.review || "No review yet."}
        </p>
      </div>

      <hr className="my-4 border-background/20" />

      <div>
        <ActivityControl tmdbId={Number(props.id)} 
        mediaType={props.mediaType} 
        currentStatus={activity?.status} 
        onStatusChange={(status) => {
          setActivity((prev: any) => ({
            ...prev,
            status,
          }));
      
          props.onStatusChange?.(status);
          alert(`Moved to ${status}`)
        }}
      />
      </div>
        <div className="pt-2">
            <DeleteButton id={activity?._id?.toString()} />
        </div>
      </div>
    
  );
}
