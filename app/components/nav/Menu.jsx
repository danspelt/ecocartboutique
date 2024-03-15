'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
//import useCartService from '../../lib/hooks/useCartStore';
import useLayoutService from '../../lib/hooks/useLayout';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';

const Menu = ({ user, isOpen }) => {
 // const { items, init } = useCartService();

  useEffect(() => {
    // This effect ensures any necessary initialization when the component mounts
    // For example, you might want to fetch some data here or set some state
  }, []);

  const signoutHandler = () => {
    init();
    signOut(FIREBASE_AUTH).then(() => {
      // Handle successful sign out
    }).catch((error) => {
      // Handle sign out errors
    });
  };

  const { theme, toggleTheme } = useLayoutService();

  // Apply conditional classes based on isOpen prop
  const menuClasses = isOpen ? "block" : "hidden";

  return (
    <div className={`absolute top-0 left-0 mt-16 ${menuClasses} z-50`}>
      <div className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content shadow-lg">      
        <li className="border-b-2 border-gray">
          <Link href="/profile">
          <Image
            src={user.photoURL}
            alt={user.displayName}
            width={40}
            height={40}
            className="rounded-full"
          />
          Profile          
        </Link>
        </li>
        <li className="border-b-2 border-gray">
          <Link href="/order-history">Order History</Link>
        </li>
        {
          user && (
            <li className="border-b-2 border-gray">
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </li>
        )}        
        <li>
           <button onClick={signoutHandler}>Sign out</button>
        </li>
      </div>
    </div>
  );
};

export default Menu;