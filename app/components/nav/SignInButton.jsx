"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

// Client component for sign-in button
export default function SignInButton() {
  const { user, signInWithGoogle } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  if (user) return null; // Don't render anything if user is logged in
  
  return (
    <Link href="/login" className="btn btn-ghost" onClick={handleSignIn}>
      Login
    </Link>
  );
}

// The SignInButton component is a client component that is used in the NavBar component. It is a simple component that renders a link to the /login page with the text "Login". The SignInButton component is a client component because it does not require server-side rendering and can be safely loaded on the client side. This allows the component to be loaded faster and reduces the server load.
