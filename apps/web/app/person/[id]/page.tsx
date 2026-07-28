import {tmdb,imageUrl} from "@/lib/api"
export default async function PersonPage({ params }: { params: Promise<{ id: string }> })
{
    const {id} = await params 
    const person = await tmdb.getPerson(id)
    const credits = await tmdb.getPersonCredits(id);
    return (
        <div className="bg-background h-screen w-full">

        </div>
    )
}