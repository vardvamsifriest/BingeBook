"use client";
import { removeActivity } from "@/lib/api";
import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault(); 
    await removeActivity(id);

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="absolute top-2 right-2 bg-black/70 rounded-full w-7 h-7 text-white"
    >
      ✕
    </button>
  );
}