import React, { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'

import axios from 'axios'
import { app } from '../firebase/firebase.config'
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(true)
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()
  googleProvider.addScope('email')
  const check = () => {
    console.log('checkig auth context')
  }
  //Create a function for sign up account
  const handleSignUp = async (email, password) => {
    setLoading(true)
    return await createUserWithEmailAndPassword(auth, email, password)
  }
  //Create a function for Login account
  const handleLogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  //Forget Password Mail Reset
  const handleForgetPass = async email => {
    return await sendPasswordResetEmail(auth, email)
  }
  //Create a function for Google SignIn
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
  //Create a function for Log Out
  const logOut = () => {
    return signOut(auth)
  }

  //To monitor the currently signed in User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      setLoading(false)
      setReload(false)
      console.log(user)
      const email = user?.providerData[0].email || user?.email
      console.log(email)

      if (user) {
        axios
          .post('http://localhost:5001/jwt', {
            email: email
          })
          .then(response => {
            localStorage.setItem('access-token', response.data.token)
            setLoading(false)
          })
          .catch(error => {
            console.error('JWT Error:', error.response?.data || error.message) // Log the error message
          })
      } else {
        localStorage.removeItem('access-token')
      }
    })
    return () => {
      return unsubscribe()
    }
  }, [setUser])

  const authInfo = {
    user,
    loading,
    setLoading,
    handleSignUp,
    handleLogIn,
    logOut,
    googleSignIn,
    check,
    handleForgetPass,
    reload,
    setReload
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
