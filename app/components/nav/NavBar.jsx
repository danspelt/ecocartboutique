import Link from "next/link";
import Image from "next/image";
import SearchBox from "./SearchBox";
import SignInButton from "./SignInButton"; // Client component
import SignUpButton from "./SignUpButton"; // Client component
import ProfileButton from "./ProfileButton";
import ShoppingCartIcon from "./ShoppingCartIcon"; // Client component

// Server component for NavBar
export default function NavBar() {
  return (
    <div className="navbar bg-base-100 border-b-2 px-4 md:px-8 lg:px-16">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <Image
            src="/images/shop-icon.webp"
            alt="EcoCart Boutique Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          EcoCart Boutique
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <SearchBox />
      </div>
      <div className="navbar-end space-x-4">
        <SignInButton />
        <SignUpButton />

        <ProfileButton />
        <ShoppingCartIcon />
      </div>
    </div>
  );
}
