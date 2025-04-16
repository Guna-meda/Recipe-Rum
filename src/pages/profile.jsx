import { signInWithPopup, signOut , deleteUser, reauthenticateWithPopup} from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase/firebase";
import { clearUser, setUser } from "../redux/features/authSlice";
import { setDoc } from "firebase/firestore";
import { doc,  getDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDoc);

    if (!userDocSnap.exists()) {
      await setDoc(userDoc, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date(),
      });
    }

    dispatch(
      setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const logout = () => {
    signOut(auth);
    dispatch(clearUser());
  };

  const deleteAccount = async () => {
    const currentUser = auth.currentUser;

    try {
      await reauthenticateWithPopup(currentUser, provider);
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(currentUser);
      dispatch(clearUser());

    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Could not delete account. Please try again.");
    }
  };

  return (
    <div className="p-4">
      {!user ? (
        <button
          onClick={login}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Sign In with Google
        </button>
      ) : (
        <div>
          <img src={user.photo} className="w-12 h-12 rounded-full" />
          <p>{user.name}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          <button onClick={deleteAccount} className="bg-red-800 text-white px-4 py-2 rounded">
            Delete My Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
