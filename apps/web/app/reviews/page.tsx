"use client"
import {useEffect , useState} from "react"
import {clientTmdb , GetWatched , deleteReview} from "@/lib/api"
import {SearchBar} from "../components/searchbar"
import {UserIcon} from "../components/icons/usericon"
import {DeleteIcon} from "../components/icons/deleteicon"
import {useToast} from "../components/toastprovider"
import Link from "next/link"

export default function ReviewPage()
{
    const [review , setReview] = useState<any>([])
    const {showToast} = useToast()
    useEffect(()=>{
        async function load()
        {
            const watched = await GetWatched()
            const reviewed = await Promise.all(
                watched
                  .filter((item: any) => item.review).sort((a:any , b:any)=>
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
            load();
        })
        
       
    return (
        <div className="bg-background h-screen w-full">
            <div className="flex justify-center pt-5 items-center">
            <p className="font-Ubuntu text-accent text-4xl">
                Reviews
            </p>
            <div className="absolute right-24 top-6">
                <SearchBar />
            </div>
            <Link href="/profile">
            <div className="absolute right-6">
                <UserIcon variant="primary" />
            </div>
            </Link>
           
            </div>
            
            {review.length == 0 && (
          <div className="flex h-[60vh] items-center justify-center">
             <p className="font-Ubuntu text-accent text-2xl">
             Nothing has been dropped.
            </p>
          </div> 
      )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-20 pl-8 pr-8">
                    {review.map((review: any) => (
            <Link key={review._id} href={`/${review.mediaType}/${review.tmdbId}`}>
            <div className="rounded-xl bg-surface p-5 hover:bg-surface/80 transition h-full">

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
          <div>
                <DeleteIcon  onClick={async (e) => {
                  
                  e.preventDefault()
                  e.stopPropagation()
                  await deleteReview(review._id);

              setReview((prev:any[]) =>
      prev.filter((r: any) => r._id !== review._id)
    );
      showToast({
      type: "success",
      message: "Review deleted.",
    });
  }} />
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
    )
}