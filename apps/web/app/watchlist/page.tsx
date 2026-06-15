import { GetWatchlist, tmdb, imageUrl } from "@/lib/api";
import { Button } from "@repo/ui";
import Link from "next/link";
import { DeleteButton } from "../components/deletebutton";

export default async function Watchlist() {
  const watchlist = await GetWatchlist();

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
      <div className="flex justify-center">
        <p className="font-Ubuntu text-4xl text-text-primary">
          Watchlist
        </p>
      </div>

      <div className="flex justify-center gap-8 pt-10">
        <Link href="/watched">
          <Button variant="secondary" text="Watched" size="lg" />
        </Link>

        <Link href="/watching">
          <Button variant="secondary" text="Continue Watching" size="lg" />
        </Link>

        <Link href="/dropped">
          <Button variant="secondary" text="Dropped" size="lg" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pt-10">
        {items.map((item: any) => (
          <Link
            key={item.id}
            href={`/${item.title ? "movie" : "tv"}/${item.id}`}
          >
            <div className="relative">
              <img
                src={imageUrl(item.poster_path, "poster")}
                className="w-full rounded-lg"
              />

              <DeleteButton id={item.activityId} />

              <div className="flex justify-center">
                <p className="font-Ubuntu text-text-primary mt-2 text-center">
                  {item.title || item.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}