import {useToast} from "../app/components/toastprovider"
const BASE_URL = "http://localhost:3001";
const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";


function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
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
  },
getPerson: async (id: string) => {
  const url = `${BASE_URL}/tmdb/person/${id}`;
  const res = await fetch(url, {
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Fetch failed (${res.status}):`, errorBody);
    throw new Error(`Failed to fetch person data (Status ${res.status})`);
  }

  return res.json();
},
  getPersonCredits: async (id: string) => {
    const res = await fetch(`${BASE_URL}/tmdb/person/${id}/credits`);
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
export async function addActivity(data:{
  tmdbId: number;
  mediaType:"movie"|"tv";
  status:string;
}) 
{
  const res = await fetch(`${BASE_URL}/activity`,{
    method:"POST",
    headers:authHeaders(),
    body:JSON.stringify(data),
  })
  return res.json()
}
export async function GetWatchlist()
{
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/activity/watchlist`, {
    headers: authHeaders(),
  });

  return res.json();
}

export async function GetWatched()
{
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/activity/watched`, {
    headers: authHeaders(),
  });
  return res.json()
}
export async function GetWatching()
{
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/activity/watching`, {
    headers: authHeaders(),
  });
  return res.json()
}
export async function GetDropped()
{
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/activity/dropped`, {
    headers: authHeaders(),
  });
  return res.json()
}
export async function removeActivity(id: string) {
  const res = await fetch(`${BASE_URL}/activity/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return res.json();
} 
export async function GetActivity(
  id: string,
  mediaType: "movie" | "tv"
) {
  const res = await fetch(
    `${BASE_URL}/activity/${mediaType}/${id}`,
  {
    headers: authHeaders(),
  });

  return res.json();
}
export async function deleteReview(id: string) {
  const res = await fetch(`${BASE_URL}/activity/review/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return res.json();
}
export async function updateStatus(

  id: number,
  mediaType: "movie" | "tv",
  status: "watched" | "watching" | "watchlist" | "dropped"
) {
  console.log("Sending update:", { id, mediaType, status });
  const res = await fetch(`${BASE_URL}/activity/status`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({
      id,
      mediaType,
      status,
    }),
  });

  return res.json();
}
export async function signup(data: {
  password: string;
  email: string;
  username: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
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
      headers: authHeaders(),
      body: JSON.stringify(data),
    }
  );

  return res.json();
}
export async function getProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}