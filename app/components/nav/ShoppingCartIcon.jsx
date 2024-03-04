'use client';
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

// Client component for shopping cart icon
export default function ShoppingCartIcon() {
  return (
    <Link href="/cart">
      <MdOutlineShoppingCart className="text-2xl" />
    </Link>
  );
}