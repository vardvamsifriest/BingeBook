"use client";
import { removeActivity } from "@/lib/api";
import { useRouter } from "next/navigation";
import {Button} from "@repo/ui"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    await removeActivity(id);
    router.refresh();
  }

  return (
    <Button size="md" variant="secondary" text="Remove from Library" onClick={handleDelete} />
  );
}