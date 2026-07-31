"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";
import {Loading} from "../components/loading"
import Link from "next/link"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
  async function load() {
    const data = await getProfile();
    setProfile(data);
    }

    load();
    }, []);

    if (!profile) {
        return <Loading />;
    }

    const user = profile.user;
    const stats = profile.stats;

  return (
    <div className="bg-background min-h-screen">

      
      <div className="h-48 bg-accent" />

      <div className="max-w-7xl mx-auto px-8 -mt-20">

        
        <div className="flex items-end gap-8">

          <img
            src={user?.avatar || "/placeholder.png"}
            className="w-40 h-40 rounded-full object-cover border-4 border-background shadow-xl"
          />

          <div className="pb-6">
            <h1 className="text-5xl font-bold font-Ubuntu text-background">
              {user?.username}
            </h1>

            <p className="text-text-muted font-Ubuntu mt-2">
              {user?.email}
            </p>

            <p className="text-sm text-text-muted mt-1">
              Joined{" "}
              {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

        </div>

        
        <div className="grid grid-cols-5 gap-4 mt-10">
            
          <Link href="/watched">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary hover:scale-105 transition-all">{stats?.watched}</p>
            <p className="text-text-muted text-sm mt-1">Watched</p>
          </div>
          </Link>

          <Link href="/watching">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.watching}</p>
            <p className="text-text-muted text-sm mt-1">Watching</p>
          </div>
          </Link>

          <Link href="/watchlist">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.watchlist}</p>
            <p className="text-text-muted text-sm mt-1">Watchlist</p>
          </div>
          </Link>

          <Link href="/watched">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.reviews}</p>
            <p className="text-text-muted text-sm mt-1">Reviews</p>
          </div>
          </Link>

          <Link href="/dropped">
          <div className="bg-surface rounded-xl p-5 text-center hover:scale-105 transition-all">
            <p className="text-3xl font-bold text-text-primary">{stats?.dropped}</p>
            <p className="text-text-muted text-sm mt-1">Dropped</p>
          </div>
          </Link>
        </div>

        {/* Continue Watching */}
        <section className="mt-14">
          <h2 className="text-2xl font-Ubuntu font-semibold text-text-primary mb-4">
            Continue Watching
          </h2>

          <div className="flex gap-5 overflow-x-auto scroll-custom pb-4">
            {/* Movie cards go here */}
          </div>
        </section>

        {/* Recent Reviews */}
        <section className="mt-14">
          <h2 className="text-2xl font-Ubuntu font-semibold text-text-primary mb-4">
            Recent Reviews
          </h2>

          <div className="space-y-4">
            {/* Review cards go here */}
          </div>
        </section>

      </div>

    </div>
  );
}