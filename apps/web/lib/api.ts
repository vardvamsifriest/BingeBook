const BASE_URL = "http://localhost:3001";
const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";

export const tmdb = {
  getMovie: async (id: string) => {
    const res = await fetch(`${BASE_URL}/tmdb/movie/${id}`);
    return res.json();
  },

  getSimilar: async (id: string) => {
    const res = await fetch(`${BASE_URL}/tmdb/movie/${id}/similar`);
    return res.json();
  },
  getTv:async (id: string)=> {
    const res = await fetch(`${BASE_URL}/tmdb/tv/${id}`)
    return res.json();
  },
  getTVSimilar:async (id:string)=> {
    const res = await fetch(`${BASE_URL}/tmdb/tv/${id}/similar`)
    return res.json();
  }
};

export async function searchMedia(query: string) {
  const res = await fetch(
    `${BASE_URL}/tmdb/search?q=${encodeURIComponent(query)}`
  );
  return res.json();
}

export const imageUrl = (
  path: string | null | undefined,
  type: "poster" | "avatar" = "poster"
) => {
  if (!path) {
    return type === "poster"
      ? "/poster.png"
      : "/placeholder.png";
  }

  return `${TMDB_IMAGE}${path}`;
};