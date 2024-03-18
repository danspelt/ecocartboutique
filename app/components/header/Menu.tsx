'use client';
import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';
import { FaUserAlt, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const Menu = () => {
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents rendering on server

  const signoutHandler = () => {
    signOut(FIREBASE_AUTH);
    init();
  };


  return (
    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
      <ul className="flex flex-col py-2">
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
          <FaUserAlt className="text-lg" />
          <Link href="/profile">Profile</Link>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
          <FaHistory className="text-lg" />
          <Link href="/order-history">Order History</Link>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100" onClick={signoutHandler}>
          <FaSignOutAlt className="text-lg" />
          <button className='text-nowrap' onClick={signoutHandler}>Sign Out</button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;