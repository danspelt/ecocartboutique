"use client";
import { useAuth } from "@/context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const GoogleSignInButton = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <div className="form-control">
      <button
        className="btn btn-outline flex justify-center items-center gap-2"
        aria-label="Sign in with Google"
        onClick={signInWithGoogle}
      >
        <FaGoogle /> {/* Google Icon */}
        Sign In with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;
