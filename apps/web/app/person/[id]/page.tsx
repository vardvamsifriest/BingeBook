import { tmdb, imageUrl } from "@/lib/api";
import Link from "next/link";

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const person = await tmdb.getPerson(id);
  const credits = await tmdb.getPersonCredits(id);

  const knownFor = credits.cast
    ?.sort((a: any, b: any) => b.popularity - a.popularity)
    .filter(
      (item: any, index: number, self: any[]) =>
        index ===
        self.findIndex(
          (x) => x.id === item.id && x.media_type === item.media_type
        )
    )
    .slice(0, 8);

  const filmography = credits.cast?.sort((a: any, b: any) => {
    const da = new Date(
      a.release_date || a.first_air_date || "1900"
    ).getTime();

    const db = new Date(
      b.release_date || b.first_air_date || "1900"
    ).getTime();

    return db - da;
  });

  return (
    <div className="bg-background min-h-screen text-text-primary pb-16">
      
      <div className="h-32 md:h-44 bg-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          
          <div className="w-full md:w-64 shrink-0 flex flex-col items-center md:items-start">
            <div>
            <img
              src={imageUrl(person.profile_path, "avatar")}
              alt={person.name}
              className="w-56 md:w-full rounded-2xl shadow-2xl border-4 border-background object-cover"
            />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 w-full">
              <div className="bg-surface rounded-lg p-3 text-center">
                <p className="text-text-primary font-bold text-base">
                  {credits.cast?.length || 0}
                </p>
                <p className="text-xs text-text-muted">Credits</p>
              </div>

              <div className="bg-surface rounded-lg p-3 text-center">
                <p className="text-text-primary font-bold text-base">
                  {person.popularity ? person.popularity.toFixed(1) : "N/A"}
                </p>
                <p className="text-xs text-text-muted">Popularity</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 w-full text-sm">
              <p className="font-Ubuntu text-text-muted">
                <span className="text-text-primary font-semibold block">Born</span>
                {person.birthday || "Unknown"}
              </p>

              <p className="font-Ubuntu text-text-muted">
                <span className="text-text-primary font-semibold block">Place</span>
                {person.place_of_birth || "Unknown"}
              </p>

              <p className="font-Ubuntu text-text-muted">
                <span className="text-text-primary font-semibold block">Department</span>
                {person.known_for_department || "Unknown"}
              </p>
            </div>
          </div>

          
          <div className="flex-1 min-w-0 pt-2">
            <h1 className="text-4xl md:text-5xl font-Ubuntu font-bold text-background">
              {person.name}
            </h1>

            <p className="text-lg text-text-muted mt-10 font-Ubuntu">
              {person.known_for_department}
            </p>

          
            <div className="mt-8">
              <h2 className="text-2xl font-Ubuntu font-semibold text-text-primary">
                Biography
              </h2>

              <p className="mt-3 text-text-muted leading-relaxed whitespace-pre-line text-sm md:text-base">
                {person.biography || "No biography available."}
              </p>
            </div>
          </div>
        </div>

        <hr className="my-10 border-surface" />

      
        <div>
          <h2 className="text-2xl font-Ubuntu font-semibold text-text-primary mb-4">
            Known For
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {knownFor?.map((item: any) => (
              <Link
                key={`${item.media_type}-${item.id}`}
                href={`/${item.media_type}/${item.id}`}
                className="w-28 sm:w-32 shrink-0 group"
              >
                <img
                  src={imageUrl(item.poster_path)}
                  alt={item.title || item.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg group-hover:scale-105 transition duration-200"
                />
                <p className="mt-2 text-center text-xs sm:text-sm text-text-primary font-Ubuntu truncate">
                  {item.title || item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        
        <div className="mt-12">
          <h2 className="text-2xl font-Ubuntu font-semibold text-text-primary mb-6">
            Filmography
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {filmography?.slice(0, 12).map((item: any) => (
              <Link
                key={`${item.media_type}-${item.id}-${item.character ?? ""}`}
                href={`/${item.media_type}/${item.id}`}
                className="group flex flex-col items-center text-center"
              >
                <img
                  src={imageUrl(item.poster_path)}
                  alt={item.title || item.name}
                  className="w-full h-48 sm:h-52 object-cover rounded-lg group-hover:brightness-75 transition duration-200"
                />

                <p className="mt-2 font-Ubuntu text-text-primary text-xs sm:text-sm font-medium line-clamp-1 w-full">
                  {item.title || item.name}
                </p>

                {item.character && (
                  <p className="text-[11px] text-text-muted line-clamp-1 w-full">
                    {item.character}
                  </p>
                )}

                <p className="text-[11px] text-text-muted">
                  {(item.release_date || item.first_air_date)?.split("-")[0] || "N/A"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}