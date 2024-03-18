"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Client component for sign-in button
export default function SignInButton() {
  const { currentUser } = useAuth();
  
  if (currentUser) return null;  // Hide button if user is logged in
  return (
    <Link href="/signin" className="btn btn-primary">
      SignIn 
    </Link>
  );
}

// The SignInButton component is a client component that is used in the NavBar component. It is a simple component that renders a link to the /login page with the text "Login". The SignInButton component is a client component because it does not require server-side rendering and can be safely loaded on the client side. This allows the component to be loaded faster and reduces the server load.
