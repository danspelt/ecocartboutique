import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import {AuthContextProvider} from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "My Next.js Site",
  description: "This is a Next.js site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback="Loading...">
        <AuthContextProvider>
        <NavBar />
        {children}
        </AuthContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
