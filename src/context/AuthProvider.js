import React, { useEffect } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { useState } from 'react';

export const AuthContext = createContext()
const auth=getAuth(app)
const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);
    const [user,setUser]=useState(null)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser,userInfo)
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth,email)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('user', currentUser);
            setLoading(false)
        })
        return () => unsubscribe();
},[])
    const authInfo = {
        createUser,
        signIn,
        resetPassword,
        googleSignIn,
        updateUser,
        user,
        loading,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;