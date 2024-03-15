"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(FIREBASE_AUTH, provider);
        router.push("/");
    }

    const signOutUser = async () => {
        await signOut(FIREBASE_AUTH);
    } 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            setCurrentUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ 
            currentUser,
            signInWithGoogle,
            signOutUser,
            email,
            setEmail,
            password,
            setPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
}
