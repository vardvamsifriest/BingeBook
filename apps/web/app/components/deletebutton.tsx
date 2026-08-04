"use client";
interface DeleteButtonProps {
  id: string;
  onDelete?: () => void;
}

import { removeActivity } from "@/lib/api";
import { useRouter } from "next/navigation";
import {Button} from "@repo/ui"
import {useToast} from "../components/toastprovider"

export function DeleteButton(props:DeleteButtonProps) {
  const router = useRouter();
  const {showToast} = useToast()
  async function handleDelete() {
    await removeActivity(props.id);
    showToast({
      type:"success",
      message:"Deleted from your library."
    })
    props.onDelete?.();
  }
  
  return (
    <Button size="md" variant="secondary" text="Remove from Library" onClick={handleDelete} />
  );
}