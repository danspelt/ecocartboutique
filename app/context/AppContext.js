"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}
export const AppContextProvider = ({ children }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

    
    
    return (
        <AppContext.Provider value={{ 
            isProfileMenuOpen,
            toggleProfileMenu
        }}>
            {children}
        </AppContext.Provider>
    );
}