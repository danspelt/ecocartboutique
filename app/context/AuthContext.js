"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(FIREBASE_AUTH, provider);
    }

    const signOutUser = async () => {
        await signOut(FIREBASE_AUTH);
    } 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ 
            user,
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
