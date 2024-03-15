'use client';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import Menu from './Menu'; 

export default function ProfileButton() {
  const { currentUser } = useAuth();
  const { toggleProfileMenu, isProfileMenuOpen } = useAppContext();
  // Don't render anything if the user is not logged in
  if (!currentUser) return null;

  const isGoogleUser = currentUser.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );

  return (
    <div className="relative">
      <button className="btn btn-ghost" onClick={toggleProfileMenu}>
        {isGoogleUser ? (
          <Image
            src={currentUser.photoURL}
            alt="Profile"
            width="40"
            height="40"
            className="rounded-full"
          />
        ) : (
          <FaUserCircle className="text-3xl" />
        )}
      </button>
      {isProfileMenuOpen && <Menu />}
    </div>
  );
}