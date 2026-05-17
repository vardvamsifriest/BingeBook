const BASE_URL = "https://api.themoviedb.org/3"
const TOKEN = process.env.TMDB_ACCESS_TOKEN
const headers = {
    Authorization : `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
}

export async function getMovie(id:number){
    const res = await fetch(`${BASE_URL}/movie/${id}?append_to_respone=credits,videos`,{headers})
    return res.json()

}
export async function getTrending()
{
    const res = await fetch(`${BASE_URL}/trending/movie/week`,{headers})
    return res.json()
}
export async function searchMedia(query:string)
{
    const res = await fetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,{headers})
    return res.json()
}