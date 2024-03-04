'use client';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';

export default function ProfileButton() {
  const { user } = useContext(AuthContext);

  if (!user) return null; // Don't render anything if user is not logged in

  const isGoogleUser = user.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );

  return (
    <button className="btn btn-ghost">
      {isGoogleUser ? (
        <Image
          src={user.photoURL}
          alt="Profile"
          width="40"
          height="40"
          className="rounded-full"
        />
      ) : (
        <FaUserCircle className="text-3xl" />
      )}
    </button>
  );
}