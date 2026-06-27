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
  },
  getTrendingMovies:async()=> {
    const res = await fetch(`${BASE_URL}/tmdb/trending/movie`)
    return res.json()
  },
  getTrendingTV:async() => {
    const res = await fetch(`${BASE_URL}/tmdb/trending/tv`)
    return res.json()
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
export async function addActivity(data:{
  tmdbId: number;
  mediaType:"movie"|"tv";
  status:string;
}) 
{
  const res = await fetch(`${BASE_URL}/activity`,{
    method:"POST",
    headers:{
      "Content-type":"application/json",
    },
    body:JSON.stringify(data),
  })
  return res.json()
}
export async function GetWatchlist()
{
  const res = await fetch(`${BASE_URL}/activity/watchlist`);
  return res.json();
}
export async function GetWatched()
{
  const res = await fetch(`${BASE_URL}/activity/watched`);
  return res.json();
}
export async function GetWatching()
{
  const res = await fetch(`${BASE_URL}/activity/watching`)
  return res.json();
}
export async function GetDropped()
{
  const res = await fetch(`${BASE_URL}/activity/dropped`)
  return res.json();
}
export async function removeActivity(id: string) {
  const res = await fetch(`${BASE_URL}/activity/${id}`, {
    method: "DELETE",
  });

  return res.json();
} 
export async function GetActivity(
  id: string,
  mediaType: "movie" | "tv"
) {
  const res = await fetch(
    `${BASE_URL}/activity/${mediaType}/${id}`
  );

  return res.json();
}
export async function signup(data: {
  password: string;
  email:string;
  username:string;
})
{
  const res = await fetch(`${BASE_URL}/auth/signup`,{
    method:"POST",
    headers : {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data),

  })
  return res.json()
}

export async function signin(data: {
  password: string;
  email:string;
  
})
{
  const res = await fetch(`${BASE_URL}/auth/signin`,{
    method:"POST",
    headers : {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data),

  })
  return res.json()
}
export async function saveReview(data: {
  tmdbId: number;
  mediaType: "movie" | "tv";
  rating: number;
  review: string;
}) {
  const res = await fetch(
    `${BASE_URL}/activity/review`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}
