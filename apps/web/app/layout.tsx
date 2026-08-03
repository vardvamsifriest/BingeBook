import {ToastProvider} from "../app/components/toastprovider"
import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Kinora",
  description: "Your cinematic vault",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        {children}</ToastProvider></body>
    </html>
  );
}