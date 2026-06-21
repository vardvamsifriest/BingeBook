const BASE_URL = "https://api.themoviedb.org/3"
const TOKEN = process.env.TMDB_ACCESS_TOKEN
const headers = {
    Authorization : `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
}

export async function getMovie(id:number){
    const res = await fetch(`${BASE_URL}/movie/${id}?append_to_response=credits,videos`,{headers})
    return res.json();

}
export async function getTrendingMovies() {
    const res = await fetch(
        `${BASE_URL}/trending/movie/day`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    )

    const data = await res.json()

    return data.results
}
export async function getTrendingTV() {
    const res = await fetch(
        `${BASE_URL}/trending/tv/day`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    )

    const data = await res.json()

    return data.results
}
export async function searchMedia(query:string)
{
    const res = await fetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,{headers})
    return res.json();
}
export async function getSimilar(id:number)
{
    const res = await fetch(`${BASE_URL}/movie/${id}/similar`,{headers})
    return res.json();
} 
export async function getTv(id:number)
{
    const res = await fetch(`${BASE_URL}/tv/${id}?append_to_response=credits,videos`,{headers})
    return res.json();
}
export async function getTVSimilar(id:number)
{
    const res = await fetch(`${BASE_URL}/tv/${id}/similar`,{headers})
    return res.json();
}
