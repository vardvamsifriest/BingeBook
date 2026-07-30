"use client"
import { GetDropped, tmdb, imageUrl } from "@/lib/api";
import { Button } from "@repo/ui";
import {SearchBar} from "../components/searchbar" 
import Link from "next/link";
import {HoverCard} from "../components/hovercard"
import {UserIcon} from "../components/icons/usericon"
import {useState , useEffect} from "react"
import {Loading} from "../components/loading"

export default function Watching() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const dropped = await GetDropped();

      if (!Array.isArray(dropped)) {
        console.log(dropped);
        setLoading(false);
        return;
      }

      const data = await Promise.all(
        dropped.map(async (item: any) => {
          const details =
            item.mediaType === "movie"
              ? await tmdb.getMovie(item.tmdbId.toString())
              : await tmdb.getTv(item.tmdbId.toString());

          return {
            ...details,
            activityId: item._id,
          };
        })
      );

      setItems(data);
      setLoading(false);
    }

    load();
  }, []);
    if(loading)
    {
      <Loading />
    }
  return (
    <div className="bg-background min-h-screen p-8">
      
      <div className="flex justify-center relative">
        <p className="font-Ubuntu text-4xl text-text-primary">
          Dropped
        </p>
       <Link href={`/profile`}>
        <div className="absolute right-0">
            <UserIcon variant="primary" />
          </div>
          </Link>
      </div>  
      
      <div className="flex justify-center gap-8 pt-10">
        <Link href="/watched">
          <Button variant="secondary" text="Watched" size="lg" />
        </Link>

        <Link href="/watchlist">
          <Button variant="secondary" text="Watchlist" size="lg" />
        </Link>

        <Link href="/watching">
          <Button variant="secondary" text="Watching" size="lg" />
        </Link>

        <div className="absolute right-6">
          <SearchBar/>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pt-10">
        
      {items.map((item: any) => (
  <div key={item.id} className="relative group w-fit">
  <Link href={`/${item.title ? "movie" : "tv"}/${item.id}`}>
    <img
      src={imageUrl(item.poster_path, "poster")}
      className="w-full rounded-lg transition duration-300 group-hover:brightness-40"
    />
  </Link>

  

  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
    <HoverCard
      id={item.id.toString()}
      mediaType={item.title ? "movie" : "tv"}
    />
  </div>

  <div className="flex justify-center">
    <p className="font-Ubuntu text-text-primary mt-2 text-center">
      {item.title || item.name}
    </p>
  </div>
</div>
))}   
      </div>
    </div>
  );
}