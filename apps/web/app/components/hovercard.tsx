import {tmdb} from "@/lib/api"
interface HoverCardProps {
    id:string;
}
export async function HoverCard({id}:HoverCardProps)
{
    const movie = await tmdb.getMovie(id)
    return (
        <div className="h-75 w-75 bg-accent">
            <div>
                <p>
                    {movie.title}
                </p>
            </div>
            <div>
                <p>
                {movie.overview}
                </p>
            </div>
        </div>
    )
}