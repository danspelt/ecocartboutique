"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Menu from "./Menu";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavBar = () => {
  const { user, signInWithGoogle, signOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-base-100 border-b-2 px-4 md:px-8 lg:px-16">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <img src="/logo.png" alt="Logo" className="mr-2 h-8" />
          YourBrand
        </Link>
      </div>
      <div className="navbar-center hidden md:flex"></div>
      <div className="navbar-end">
        {user ? (
          <div
            className="dropdown dropdown-end flex gap-4"
            onClick={toggleMenu}
          >
            <h1 className="text-nowrap">Hello, {user.displayName}</h1>
            <Menu user={user} isOpen={isMenuOpen} />

            <span className="indicator">
              <span className="indicator-item badge badge-secondary"></span>
              <Link href="/cart">
                <MdOutlineShoppingCart className="text-2xl" />
              </Link>
            </span>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link href="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
