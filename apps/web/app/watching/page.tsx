"use client"
import { GetWatching, tmdb, imageUrl } from "@/lib/api";
import { Button } from "@repo/ui";
import {SearchBar} from "../components/searchbar" 
import Link from "next/link";
import {HoverCard} from "../components/hovercard"
import {UserIcon} from "../components/icons/usericon"
import {useEffect , useState} from "react"
import {Loading} from "../components/loading"

export default function Watching() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const watching = await GetWatching();

      if (!Array.isArray(watching)) {
        console.log(watching);
        setLoading(false);
        return;
      }

      const data = await Promise.all(
        watching.map(async (item: any) => {
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
          Watching
        </p>
        <div>
          <Link href={`/profile`}>
          <div className="absolute right-0">
            <UserIcon variant="primary" />
          </div>
          </Link>
        </div>
        
      </div>

      

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-10 relative">
        <Link href="/watched">
          <Button variant="secondary" text="Watched" size="lg" />
        </Link>

        <Link href="/watchlist">
          <Button variant="secondary" text="Watchlist" size="lg" />
        </Link>

        <Link href="/dropped">
          <Button variant="secondary" text="Dropped" size="lg" />
        </Link>
        
        <div className="w-full flex justify-center mt-4 md:w-auto md:mt-0 md:absolute md:right-6">
          <SearchBar />
        </div>
      </div>
      
      {items.length == 0 && (
          <div className="flex h-[60vh] items-center justify-center">
      <p className="font-Ubuntu text-accent text-2xl">
      You're not watching anything right now.
      </p>
    </div> 
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pt-20 pb-20">
        
      {items.map((item: any) => (
  <div key={item.id} className="relative group w-fit">
  <Link href={`/${item.title ? "movie" : "tv"}/${item.id}`}>
    <img
      src={imageUrl(item.poster_path, "poster")}
      className="w-full rounded-lg transition duration-300 group-hover:brightness-40"
    />
  </Link>

  

  <div className="absolute inset-0 hidden group-hover:flex items-center justify-center z-10">
    <HoverCard
      id={item.id.toString()}
      mediaType={item.title ? "movie" : "tv"}
      onDelete={() =>
        setItems(prev => prev.filter(x => x.id !== item.id))
    }
      onStatusChange={(status) => {
        if (status !== "watching") {
          setItems(prev => prev.filter(x => x.id !== item.id));
      }}}
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