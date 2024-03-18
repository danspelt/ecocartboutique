import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/header/NavBar";
import { AuthContextProvider } from "@/context/AuthContext";
import { AppContextProvider } from "@/context/AppContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoCart Boutique",
  description: "The best place to buy eco-friendly products",
  image: "/images/eco-cart-boutique.webp",
  keywords: "eco-friendly, sustainable, shop, boutique",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Suspense fallback="Loading...">
            <AuthContextProvider>
              <NavBar />
              {children}
            </AuthContextProvider>
          </Suspense>
        </AppContextProvider>
      </body>
    </html>
  );
}
