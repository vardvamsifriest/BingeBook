"use client"
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {user.username}
    </div>
  );
}