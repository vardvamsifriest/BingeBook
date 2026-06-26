"use client"
import {ReviewCard} from "../components/reviewcard"
import {useState} from "react"
import {Button} from "@repo/ui"
import {StarIcon} from "../components/icons/staricon"
interface Actions {
    tmdbId: number;
    mediaType: "movie"|"tv"
}
export function MovieActions(props:Actions) {
  const [showReviewCard, setShowReviewCard] = useState(false);
  
  return (
    <>
      <Button
        text="Rate and Review"
        onClick={() => setShowReviewCard(true)}
        size="lg"
        variant = "primary"
        starticon= {<StarIcon fillstate="filled"/>}
      />

      {showReviewCard && (
        <div className= "fixed inset-0 grid place-content-center backdrop-blur-sm">      
            <ReviewCard
          tmdbId={props.tmdbId}
          mediaType={props.mediaType}
          onClick={()=>setShowReviewCard(false)}
          onClose={()=>setShowReviewCard(false)}
        />
        </div>  
      )}
    </>
  );
}