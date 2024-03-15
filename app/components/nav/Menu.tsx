'use client';
import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const signoutHandler = () => {
    signOut(FIREBASE_AUTH);
    // Assume init function resets the cart state
  };
  const { theme, toggleTheme } = useLayoutService();

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <div>
        <ul className="flex flex-col absolute z-50 gap-4">
          <i>
            {mounted && (
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  checked={theme === 'light'}
                  onChange={toggleTheme}
                />
                {theme === 'light' ? <SunIcon /> : <MoonIcon />}
              </label>
            )}
          </i>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/order-history">Order History</Link>
          </li>
          <li>
            <button onClick={signoutHandler}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
