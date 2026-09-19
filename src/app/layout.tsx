import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusFeed - Curation Dashboard",
  description: "RSS Reader & Curation Dashboard untuk agregasi konten Gaming dan Budaya Internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen antialiased selection:bg-indigo-100 selection:text-indigo-900 flex overflow-hidden`}
      >
        {children}
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#1E293B', color: '#fff' } }} />
      </body>
    </html>
  );
}
