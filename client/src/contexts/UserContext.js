import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function emailSignUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  function emailLogIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  };

  function getUser() {
    return auth.currentUser;
  };
  
  function logOut() {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ emailSignUp, emailLogIn, getUser, currentUser, logOut }}>
      { !loading && children }
    </AuthContext.Provider>
  )
}
