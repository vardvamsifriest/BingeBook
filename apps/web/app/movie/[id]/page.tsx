import {tmdb,imageUrl} from "@/lib/api"
import {Button} from "@repo/ui"
import {RatingModal} from "../../components/ratingbutton"
export default async function MoviePage({ params }: { params: Promise<{ id: string }> })
{
    const { id } = await params
    const movie = await tmdb.getMovie(id)
    const similar = await tmdb.getSimilar(id)

    return (
        <div className="bg-background min-h-screen">
        <div className="bg-accent h-24 w-full" />
        <div className="grid grid-cols-4 gap-8 p-8 mt-8">
          <div className="col-span-1">
            <img src={imageUrl(movie.poster_path,"poster")} className="w-full rounded-lg" />
              <div className="flex flex-col gap-3 pt-4">
                <p className="font-Ubuntu text-text-muted italic text-lg">
                  {movie.tagline}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                  {movie.genres?.map((g: any) => (
                  <span key={g.id} className="bg-surface text-text-primary text-xs px-3 py-1 rounded-full">{g.name}</span>
                  ))}
             </div>
             <div className="pt-4"> 
             <p className="font-Ubuntu text-text-muted text-sm">🌐 {movie.original_language?.toUpperCase()}</p>
             </div>
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <h1 className="font-Ubuntu text-text-primary text-4xl font-bold">{movie.title}</h1>
            <p className="font-Ubuntu text-text-muted text-lg">
              {movie.release_date?.split("-")[0]} · {movie.runtime} min
            </p>
            <p className="font-Ubuntu text-text-primary text-base leading-relaxed">{movie.overview}</p>
            <h2 className="font-Ubuntu text-text-primary text-2xl mt-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto scroll-custom pb-4">
              {movie.credits?.cast?.slice(0, 10).map((actor: any) => (
                <div key={actor.id} className="flex flex-col items-center shrink-0 w-24">
                  <img src={imageUrl(actor.profile_path,"avatar")} className="w-20 h-20 rounded-full object-cover" />
                  <p className="font-Ubuntu text-text-primary text-s text-center mt-2">{actor.name}</p>
                  <p className="font-Ubuntu text-text-muted text-xs text-center">{actor.character}</p>
                </div>
              ))}
            </div>
            <h2 className="font-Ubuntu text-text-primary text-2xl mt-4">Crew</h2>
            <div className="flex gap-4 overflow-x-auto scroll-custom pb-4">
              {movie.credits?.crew?.slice(0, 10).map((crew: any) => (
                <div key={crew.id} className="flex flex-col items-center shrink-0 w-24">
                  <img src={imageUrl(crew.profile_path,"avatar")} className="w-20 h-20 rounded-full object-cover" />
                  <p className="font-Ubuntu text-text-primary text-s text-center mt-2">{crew.name}</p>
                  <p className="font-Ubuntu text-text-muted text-xs text-center">{crew.job}</p>
                </div>
              ))}
            </div>
          </div>
            <div className="col-span-1">
              <p className="font-Ubuntu text-2xl text-text-primary px-20">
                Your Library
              </p>
              <div className="pt-15 px-4">
              <Button size="lg" variant="secondary" text="Watchlist" />
              </div>
              <div className="pt-8 px-4">
              <Button size="lg" variant="secondary" text="Continue Watching" />
              </div>
              <div className="pt-8 px-4">
              <Button size="lg" variant="secondary" text="Watched" />
              </div>
              <div className="pt-8 px-4">
              <Button size="lg" variant="secondary" text="Dropped" />
              </div>
              <div className="pt-20 px-4">
              <p className="font-Ubuntu text-2xl text-text-primary">
                Tell us how did you like this?
              </p>
              </div>
              <div className="fixed inset-0 flex justify-center items-center">
                  <RatingModal />
              </div>
            </div>
        </div>

        <div className="px-8 pb-8">
          <p className="font-Ubuntu text-text-primary text-2xl mb-4">Similar Movies</p>
          <div className="flex gap-4 overflow-x-auto scroll-custom pb-4">
            {similar.results?.slice(0, 10).map((m: any) => (
              <div key={m.id} className="shrink-0 w-36">
                <img src={imageUrl(m.poster_path,"poster")} className="w-full rounded-lg" />
                <p className="font-Ubuntu text-text-primary text-s mt-2">{m.title}</p>
              </div>
            ))}
          </div>
        </div>

      </div> 
    )
}