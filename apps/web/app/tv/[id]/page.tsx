  
import {tmdb,imageUrl} from "@/lib/api"
import Link from "next/link"
import {ActivityButton} from "../../components/activitybutton"
import {Button} from "@repo/ui"
import {SearchBar} from "../../components/searchbar"
import {StarIcon} from "../../components/icons/staricon"
import {MovieActions} from "../../components/movieaction"

export  default async function TvPage({ params }: { params: Promise<{ id: string }> })
{
  
    const { id } = await params
    const tv = await tmdb.getTv(id)
    const similar = await tmdb.getTVSimilar(id)
  
    
    return (
        <div className="bg-background min-h-screen">
        <div className="bg-accent h-24 w-full" />
        <div className="grid grid-cols-4 gap-8 p-8 mt-8">
          <div className="col-span-1">
            <img src={imageUrl(tv.poster_path,"poster")} className="w-full rounded-lg" />
              <div className="flex flex-col gap-3 pt-4">
                <p className="font-Ubuntu text-text-muted italic text-lg">
                  {tv.tagline}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                  {tv.genres?.map((g: any) => (
                  <span key={g.id} className="bg-surface text-text-primary text-xs px-3 py-1 rounded-full">{g.name}</span>
                  ))}
             </div>
             <div className="pt-4"> 
             <p className="font-Ubuntu text-text-muted text-sm">🌐 {tv.original_language?.toUpperCase()}</p>
             </div>
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <h1 className="font-Ubuntu text-text-primary text-4xl font-bold">{tv.name}</h1>
            <p className="font-Ubuntu text-text-muted text-lg">
                {tv.first_air_date?.split("-")[0]} ·
                {" "}{tv.number_of_seasons} Seasons ·
                {" "}{tv.number_of_episodes} Episodes
            </p>
            <p className="font-Ubuntu text-text-muted text-sm">
                {tv.status}
            </p>
            <p className="font-Ubuntu text-text-primary text-base leading-relaxed">{tv.overview}</p>
            <h2 className="font-Ubuntu text-text-primary text-2xl mt-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto scroll-custom pb-4">
              {tv.credits?.cast?.slice(0, 10).map((actor: any) => (
                <div key={actor.id} className="flex flex-col items-center shrink-0 w-24">
                  <img src={imageUrl(actor.profile_path,"avatar")} className="w-20 h-20 rounded-full object-cover" />
                  <p className="font-Ubuntu text-text-primary text-s text-center mt-2">{actor.name}</p>
                  <p className="font-Ubuntu text-text-muted text-xs text-center">{actor.character}</p>
                </div>
              ))}
            </div>
            <h2 className="font-Ubuntu text-text-primary text-2xl mt-4">Crew</h2>
            <div className="flex gap-4 overflow-x-auto scroll-custom pb-4">
              {tv.credits?.crew?.slice(0, 10).map((crew: any) => (
                <div key={`${crew.id}-${crew.job}`} className="flex flex-col items-center shrink-0 w-24">
                  <img src={imageUrl(crew.profile_path,"avatar")} className="w-20 h-20 rounded-full object-cover" />
                  <p className="font-Ubuntu text-text-primary text-s text-center mt-2">{crew.name}</p>
                  <p className="font-Ubuntu text-text-muted text-xs text-center">{crew.job}</p>
                </div>
              ))}
            </div>
          </div>
            <div className="col-span-1">
              <div>
                <SearchBar />
              </div>
              <p className="font-Ubuntu text-2xl text-text-primary px-20 pt-10">
                Your Library
              </p>
              <div className="pt-10 px-4">
              <ActivityButton tmdbId={tv.id} mediaType="tv" text="Watchlist" status="watchlist" />
              </div>
              <div className="pt-8 px-4">
              <ActivityButton tmdbId={tv.id} mediaType="tv" text="Continue Watching" status="watching" />
              </div>
              <div className="pt-8 px-4">
              <ActivityButton tmdbId={tv.id} mediaType="tv" text="Watched" status="watched" />
              </div>
              <div className="pt-8 px-4">
              <ActivityButton tmdbId={tv.id} mediaType="tv" text="Dropped" status="dropped" />
              </div>
              <div className="pt-20 px-4">
              <p className="font-Ubuntu text-2xl text-text-primary">
                Tell us how did you like this?
              </p>
              </div>
              <div className="flex justify-center items-center pt-8">
              <MovieActions tmdbId={tv.id} mediaType="tv"/>
              </div>
            </div>
        </div>

        <div className="px-8 pb-8">
          <p className="font-Ubuntu text-text-primary text-2xl mb-4">Similar Shows</p>
          <div className="flex gap-4 overflow-x-auto scroll-custom pb-4">
            {similar.results?.slice(0, 10).map((m: any) => (
              <Link key={m.id} href={`/tv/${m.id}`}>
              <div key={m.id} className="shrink-0 w-36">
                <img src={imageUrl(m.poster_path,"poster")} className="w-full rounded-lg" />
                <p className="font-Ubuntu text-text-primary text-s mt-2">{m.title}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>

      </div> 
    )
  }
