"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";
import {Loading} from "../components/loading"
import Link from "next/link"
import {clientTmdb,GetWatching,imageUrl,GetWatched} from "@/lib/api"
import {Button} from "@repo/ui"
import {ExitIcon} from "../components/icons/exiticon"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [watching , setWatching] = useState<any>([]);
  const [review , setReview] = useState<any>([])
  const router = useRouter()
    useEffect(() => {
  async function load() {
    const data = await getProfile();
    const watching = await GetWatching()
    const watched = await GetWatched()
    setProfile(data);
    if (Array.isArray(watching)) {
      const data = await Promise.all(
        watching.map(async (item: any) => {
          const details =
            item.mediaType === "movie"
              ? await clientTmdb.getMovie(item.tmdbId.toString())
              : await clientTmdb.getTv(item.tmdbId.toString());

          return {
            ...details,
            activityId: item._id,
            mediaType: item.mediaType,
          };
        })
      );
      setWatching(data);
      const reviewed = await Promise.all(
        watched
          .filter((item: any) => item.review)
          .slice(0, 6).sort((a:any , b:any)=>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map(async (item: any) => {
            const details =
              item.mediaType === "movie"
                ? await clientTmdb.getMovie(item.tmdbId.toString())
                : await clientTmdb.getTv(item.tmdbId.toString());
      
            return {
              ...item,
              title: details.title || details.name,
            };
          })
      );
      
      setReview(reviewed);
  }
  }
    load();
    }, []);

    if (!profile) {
        return <Loading />;
    }

    const user = profile.user;
    const stats = profile.stats;

  return (
    <div className="bg-background min-h-screen">

      
      <div className="h-48 bg-accent" />
      <div className="max-w-7xl mx-auto px-8 -mt-20">
      
        
        <div className="flex items-end gap-8">
        
          <img
            src={user?.avatar || "/placeholder.png"}
            className="w-40 h-40 rounded-full object-cover border-4 border-background shadow-xl"
          />

          <div className="pb-6">
            <h1 className="text-5xl font-bold font-Ubuntu text-background">
               {user?.username}
            </h1>

            <p className="text-text-muted font-Ubuntu mt-2">
              {user?.email}
            </p>
           
            <p className="text-sm text-text-muted mt-1">
              Joined{" "}
              {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
         
        </div>
        <div className="pt-8">
        <Button variant="primary" text="Log out" size="md" starticon={<ExitIcon />} onClick={()=>{
          router.push("/")
        }}/>
      </div>
        
        <div className="grid grid-cols-5 gap-4 mt-10">
            
          <Link href="/watched">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary hover:scale-105 transition-all">{stats?.watched}</p>
            <p className="text-text-muted text-sm mt-1">Watched</p>
          </div>
          </Link>

          <Link href="/watching">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.watching}</p>
            <p className="text-text-muted text-sm mt-1">Watching</p>
          </div>
          </Link>

          <Link href="/watchlist">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.watchlist}</p>
            <p className="text-text-muted text-sm mt-1">Watchlist</p>
          </div>
          </Link>

          <Link href="/reviews">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.reviews}</p>
            <p className="text-text-muted text-sm mt-1">Reviews</p>
          </div>
          </Link>

          <Link href="/dropped">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.dropped}</p>
            <p className="text-text-muted text-sm mt-1">Dropped</p>
          </div>
          </Link>
        </div>

        
        <section className="mt-14">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-Ubuntu font-semibold text-text-primary">
      Continue Watching
    </h2>

    <Link
      href="/watching"
      className="font-Ubuntu text-accent hover:underline"
    >
      View All →
    </Link>
  </div>
          <div className="flex gap-5 overflow-x-auto scroll-custom pb-4">
              {watching.slice(0,5).map((item:any)=>(
           <div key={item.id} >
           <Link
              
              href={`/${item.title ? "movie" : "tv"}/${item.id}`}>
            <img
              src={imageUrl(item.poster_path,"poster")}
              className="w-42 rounded-lg hover:scale-105 transition"/>
              
      </Link>
      </div>
    ))}
          </div>
        </section>

        
        <div className="mt-12">
  <div className="flex justify-between items-center mb-5 pb-4">
    <h2 className="font-Ubuntu text-2xl text-text-primary">
      Recent Reviews
    </h2>
   
    <Link
      href="/reviews"
      className="font-Ubuntu text-accent hover:underline"
    >
      View All →
    </Link>
    
  </div>
  {review.length == 0 && (
          <div className="flex h-[-20vh] items-center justify-start">
             <p className="font-Ubuntu text-accent text-xl">
             No reviews yet.
            </p>
          </div> 
      )}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8">
  {review.map((review: any) => (
    <Link
      key={review._id}
      href={`/${review.mediaType}/${review.tmdbId}`}
    >
      <div className="rounded-xl bg-surface p-5 hover:bg-surface/80 transition h-full ">

        <div className="flex justify-between items-center">
          <p className="font-Ubuntu text-xl text-text-primary line-clamp-1">
            {review.title}
          </p>

          <div className="flex items-center gap-1">
            ⭐
            <span className="font-Ubuntu text-accent">
              {review.rating}
            </span>
          </div>
        </div>

        <p className="mt-4 font-Ubuntu text-accent italic line-clamp-5">
          "{review.review}"
        </p>

        <div className="mt-5 flex justify-end">
          <p className="font-Ubuntu text-xs text-accent">
            {new Date(review.updatedAt).toLocaleDateString()}
          </p>
        </div>

      </div>
    </Link>
  ))}
</div>
</div>
    </div>
    </div>
 
  );
}