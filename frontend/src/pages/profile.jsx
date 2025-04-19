import { signInWithPopup, signOut, deleteUser, reauthenticateWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase/firebase";
import { clearUser, setUser } from "../redux/features/authSlice";
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

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
        createdAt: new Date().toISOString(),
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-lime-50 to-yellow-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        {!user ? (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Welcome, Chef! 👨‍🍳</h1>
            <p className="text-gray-600 mb-6">Sign in to save your favorite recipes and manage your kitchen journey.</p>
            <button
              onClick={login}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition duration-300"
            >
              Sign In with Google
            </button>
          </>
        ) : (
          <>
            <img
              src={user.photo}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 shadow-md"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-500 mb-6">{user.email}</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-full transition duration-300"
              >
                Logout
              </button>
              <button
                onClick={deleteAccount}
                className="bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-full transition duration-300"
              >
                Delete My Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
