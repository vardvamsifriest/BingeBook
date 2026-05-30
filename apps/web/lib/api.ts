const BASE_URL = "http://localhost:3001"
const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500"

export const tmdb = {
    getMovie : async(id:String) => {
        const res = await fetch(`${BASE_URL}/tmdb/movie/${id}`)
        return res.json()
    },
    getSimilar: async (id:String) => {
        const res = await fetch(`${BASE_URL}/tmdb/movie/${id}/similar`)
        return res.json()
    }
}
export const imageUrl = (path:string | null |undefined ,type:"poster"|"avatar"="poster") => {
if(!path)
    return type === "poster"?"/poster.png":"/placeholder.png"
    return`${TMDB_IMAGE}${path}`
}