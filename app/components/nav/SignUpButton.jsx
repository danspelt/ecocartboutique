"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// Client component for sign-up button
export default function SignUpButton() {
  const { user } = useAuth();
  if (user) return null; // Don't render anything if user is logged in
  return (
    <Link href="/signup" className="btn btn-primary">
      Sign Up
    </Link>
  );
}
// The SignUpButton component is a client component that is used in the NavBar component. It is a simple component that renders a link to the /signup page with the text "Sign Up". The SignUpButton component is a client component because it does not require server-side rendering and can be safely loaded on the client side. This allows the component to be loaded faster and reduces the server load.
