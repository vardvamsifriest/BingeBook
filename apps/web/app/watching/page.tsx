import { GetWatching, tmdb, imageUrl } from "@/lib/api";
import { Button } from "@repo/ui";
import {SearchBar} from "../components/searchbar" 
import Link from "next/link";
import {HoverCard} from "../components/hovercard"


export default async function Watching() {
  const watchlist = await GetWatching();

  const items = await Promise.all(
    watchlist.map(async (item: any) => {
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

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="flex justify-center relative">
        <p className="font-Ubuntu text-4xl text-text-primary">
          Watching
        </p>
        <div className="absolute right-0 -top-1/2 pt-5">
          <SearchBar/>
        </div>
      </div>

      <div className="flex justify-center gap-8 pt-10">
        <Link href="/watched">
          <Button variant="secondary" text="Watched" size="lg" />
        </Link>

        <Link href="/watchlist">
          <Button variant="secondary" text="Watchlist" size="lg" />
        </Link>

        <Link href="/dropped">
          <Button variant="secondary" text="Dropped" size="lg" />
        </Link>
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