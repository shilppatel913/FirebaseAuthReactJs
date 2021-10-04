import React,{useContext,useState,useEffect} from 'react';
import {auth} from '../firebase'

const AuthContext=React.createContext()

export function useAuth(){
        return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState();
    const [loading,setLoading]=useState(true);
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
        return auth.signOut();
    }
    function resetpassword(email){
        return auth.sendPasswordResetEmail(email)
    }
    function updateEmail(email){
            return currentUser.updateEmail(email)
    }
    function updatePassword(password){
            return currentUser.updatePassword(password)
    }
    //listening auth.onAuthStateChanged when a user is created and adding it to the user
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        //whenever we unmount we want to unsubscribe
        return unsubscribe
    },[])
   
    const value={
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        updateEmail,
        updatePassword,
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}