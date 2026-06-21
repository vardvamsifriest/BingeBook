import { Logo } from "./components/logo";
import { Button } from "@repo/ui";
import { tmdb, imageUrl } from "@/lib/api";
import {ProgressTracker} from "./components/icons/playicon"
import {StarIcon} from "./components/icons/staricon"
import {Bookmark} from "./components/icons/bookmark"
import {Notebook} from "./components/icons/notebook"
import Link from "next/link";

export default async function Landing() {
  const movies = await tmdb.getTrendingMovies();
  const tvShows = await tmdb.getTrendingTV();

  return (
    <div className="bg-background min-h-screen">
     
      <div className="bg-accent h-24 px-8 flex items-center justify-between">
        <div className="pt-16 pr-4">
           <Logo />
        </div>

        <div className="flex gap-4">
          <Link href="/signin">
            <Button text="Sign In" variant="secondary" size="md" />
          </Link>

          <Link href="/signup">
            <Button text="Sign Up" variant="primary" size="md" />
          </Link>
        </div>
      </div>

    
      <div className="grid place-items-center text-center py-32">
        <p className="text-5xl font-Ubuntu text-text-primary">
          Track Every Movie.
        </p>

        <p className="text-5xl font-Ubuntu text-text-primary mt-2">
          Remember Every Show.
        </p>

        <p className="text-xl font-Ubuntu text-text-secondary mt-10">
          Build watchlists, rate titles,
        </p>

        <p className="text-xl font-Ubuntu text-text-secondary">
          write reviews and discover what to watch.
        </p>

        <div className="mt-10">
          <Link href="/signup">
            <Button
              text="Start Logging"
              variant="primary"
              size="lg"
            />
          </Link>
        </div>
      </div>

   
      <div className="px-10 pb-20">
        <h2 className="text-3xl font-Ubuntu text-text-primary mb-8">
          Trending Movies
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
        {movies.map((m: any) => (
            <Link key={m.id} href={`/movie/${m.id}`}>
            <div className="shrink-0 w-52">
              <img
                src={imageUrl(m.poster_path, "poster")}
                className="w-full rounded-lg"
              />
              <p className="font-Ubuntu text-text-primary text-sm mt-2">
                {m.title}
              </p>
            </div>
          </Link>
          ))}
          
        </div>
      </div>

  
      <div className="px-10 pb-20">
        <h2 className="text-3xl font-Ubuntu text-text-primary mb-8">
          Trending TV Shows
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {tvShows.map((show: any) => (
            <Link key={show.id} href={`/movie/${show.id}`}>
            <div className="shrink-0 w-52">
              <img
                src={imageUrl(show.poster_path, "poster")}
                className="w-full rounded-lg"
              />
              <p className="font-Ubuntu text-text-primary text-sm mt-2">
                {show.title}
              </p>
            </div>
          </Link>
          ))}
        </div>
      </div>

    
      <div className="px-10 py-20">
        <h2 className="text-4xl font-Ubuntu text-text-primary text-center mb-14">
          Everything you need to track your next binge
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-mid rounded-2xl p-8 border border-text-secondary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="text-4xl mb-6 pt-10 place-center "><Bookmark/></div>
            <h3 className="text-xl font-Ubuntu text-text-primary mb-3">
               Watchlists
            </h3>
            <p className="text-text-primary font-Ubuntu">
            Save movies and shows you want to watch later and never lose track.
            </p>
          </div>
          <div className="bg-mid rounded-2xl p-8 border border-text-secondary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-4xl mb-6 pt-10"><ProgressTracker/></div>
            <h3 className="text-xl font-Ubuntu text-text-primary mb-3">
             Track Progress
            </h3>
            <p className="text-text-primary font-Ubuntu">
              Organize titles into Watching, Watched and Dropped categories.
          </p>
        </div>

    <div className="bg-mid rounded-2xl p-8 border border-text-secondary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="text-4xl mb-6 pt-10"><StarIcon/></div>
      <h3 className="text-xl font-Ubuntu text-text-primary mb-3">
        Personal Ratings
      </h3>
      <p className="text-text-primary font-Ubuntu">
        Build your own rankings and discover your all-time favorites.
      </p>
    </div>

    <div className="bg-mid rounded-2xl p-8 border border-text-secondary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="text-4xl mb-6 pt-10"><Notebook/></div>
      <h3 className="text-xl font-Ubuntu text-text-primary mb-3">
        Reviews & Notes
      </h3>
      <p className="text-text-primary font-Ubuntu">
        Capture your thoughts and remember why a title mattered.
      </p>
    </div>
  </div>
</div>
</div>
)}

  
    
  
