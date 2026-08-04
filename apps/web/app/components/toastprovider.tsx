"use client";

import { createContext, useContext, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (toast: Toast) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<Toast | null>(null);

  function showToast(toast: Toast) {
    setToast(toast);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
  
      {toast && (
  <div
    className=
     "fixed bottom-10 right-6 p-5 w-96 rounded-xl shadow-2xl bg-accent font-Ubuntu text-background">
    <p className="text-base leading-6 break-words">
      {toast.message}
    </p>

    {toast.type === "error" && (
      <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-b-xl bg-red-600" />
    )}
  </div>
)}
      
    </ToastContext.Provider>
  );}
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}