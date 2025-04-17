import React from 'react';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Saved from './pages/saved';
import Home from './pages/home'; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; 
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/features/authSlice";
import { useEffect } from "react";
import { doc,  getDoc } from "firebase/firestore";
import { db } from './firebase/firebase';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        try{
          const userDoc = doc(db,'users' , user.uid);
          const userDocSnap = await getDoc(userDoc)

          if(userDocSnap.exists()) {
            dispatch(setUser(userDocSnap.data()))
          } else {
            dispatch(setUser({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              uid: user.uid,
            }));
          }
        } catch(error) {
          console.log("Error in getting data:" , error);
        }
       
      } else {
        dispatch(clearUser());
      }
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
