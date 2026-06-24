"use client"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {Button} from "@repo/ui"
export function SearchBar()
{
    const[query,setQuery] = useState("")
    const router = useRouter();
    function handleSearch()
    {
        if(!query.trim())
            return;
        console.log(query)
        router.push(`/search?q=${encodeURIComponent(query)}`)
    }
    return (
        <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, shows, people..."
          className="w-75 p-3 rounded-lg bg-accent"
        />

        <div className="px-4 py-2 rounded-lg bg-accent text-white">
            <Button size="sm" variant="primary" text="Search" onClick={handleSearch}/>
        </div>
         
       
      </div>
    )
}