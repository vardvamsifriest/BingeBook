import {tmdb,imageUrl} from "@/lib/api"
export default async function MoviePage({ params }: { params: Promise<{ id: string }> })
{
    const { id } = await params
    const movie = await tmdb.getMovie(id)
    const similar = await tmdb.getSimilar(id)
    return (
        <div className="bg-background min-h-screen">
        {/* Navbar */}
        <div className="bg-accent h-24 w-full" />
      
        {/* Content */}
        <div className="grid grid-cols-4 gap-8 p-8 mt-8">
          
          {/* Poster */}
          <div className="col-span-1">
            <img src={imageUrl(movie.poster_path)} className="w-full rounded-lg" />
          </div>
      
        {/* Info */}
<div className="col-span-2 flex flex-col gap-4">
  <h1 className="font-Ubuntu text-text-primary text-4xl font-bold">{movie.title}</h1>
  <p className="font-Ubuntu text-text-muted text-lg">
    {movie.release_date?.split("-")[0]} · {movie.runtime} min
  </p>
  <p className="font-Ubuntu text-text-primary text-base leading-relaxed">{movie.overview}</p>

  {/* Cast here */}
  <h2 className="font-Ubuntu text-text-primary text-2xl mt-4">Cast</h2>
  <div className="flex gap-4 overflow-x-auto pb-4">
    {movie.credits?.cast?.slice(0, 10).map((actor: any) => (
      <div key={actor.id} className="flex flex-col items-center shrink-0 w-24">
        {actor.profile_path && (
          <img src={imageUrl(actor.profile_path)} className="w-20 h-20 rounded-full object-cover" />
        )}
        <p className="font-Ubuntu text-text-primary text-xs text-center mt-2">{actor.name}</p>
        <p className="font-Ubuntu text-text-muted text-xs text-center">{actor.character}</p>
      </div>
    ))}
  </div>
  <h2 className="font-Ubuntu text-text-primary text-2xl mt-4">Crew</h2>
  <div className="flex gap-4 overflow-x-auto pb-4">
    {movie.credits?.crew?.slice(0, 10).map((crew: any) => (
      <div key={crew.id} className="flex flex-col items-center shrink-0 w-24">
        {crew.profile_path && (
          <img src={imageUrl(crew.profile_path)} className="w-20 h-20 rounded-full object-cover" />
        )}
        <p className="font-Ubuntu text-text-primary text-xs text-center mt-2">{crew.name}</p>
        <p className="font-Ubuntu text-text-muted text-xs text-center">{crew.job}</p>
      </div>
    ))}
  </div>
</div>
          {/* Right column - suggestions */}
          <div className="col-span-1 pl-40">
          <p className="font-Ubuntu text-text-primary text-2xl">
            Similar Movies
          </p>
          {similar.results?.slice(0, 8).map((m: any) => (
          <div key={m.id} className="shrink-0 w-36">
          <img src={imageUrl(m.poster_path)} className="w-full rounded-lg pt-8" />
          <p className="font-Ubuntu text-text-primary text-xs mt-2">{m.title}</p>
        </div>
      ))}
      </div>
        </div>
      </div>
    )
}


