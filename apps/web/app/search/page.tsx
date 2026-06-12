import { searchMedia, imageUrl } from "@/lib/api";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const results = q ? await searchMedia(q) : { results: [] };

  return (
    <div className="bg-background min-h-screen p-8">
      <h1 className="font-Ubuntu text-text-primary text-3xl mb-6">
        Search Results for "{q}"
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {results.results?.map((item: any) => (
          <Link
            key={`${item.media_type}-${item.id}`}
            href={`/${item.media_type}/${item.id}`}
          >
            <div className="cursor-pointer">
              <img
                src={imageUrl(
                  item.poster_path || item.profile_path,
                  "poster"
                )}
                className="w-full rounded-lg"
              />

              <p className="font-Ubuntu text-text-primary mt-2">
                {item.title || item.name}
              </p>

              <p className="font-Ubuntu text-text-muted text-sm">
                {item.media_type.toUpperCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
     
    </div>
  );
}