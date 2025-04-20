import {
  signInWithPopup,
  signOut,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { setFavorites } from "../redux/features/favSlice";
import { clearUser, setUser } from "../redux/features/authSlice";
import { auth, provider } from "./firebase";

//! getFav - fetch Favorites

const getFav = async (userId, dispatch) => {
  if (!userId) return;

  const favDoc = doc(db, "users", userId, "favorites", "list");
  const favSnap = await getDoc(favDoc);

  if (!favSnap.exists()) {
    await setDoc(doc(db, "users", userId, "favorites", "list"), {
      favorites: [],
    });
  }

  if (favSnap.exists()) {
    dispatch(setFavorites(favSnap.data().favorites || []));
  }
};

//! Login

const login = async (dispatch) => {
  console.log("Firebase AuthDomain:", firebaseConfig.authDomain);
console.log("Redirecting to:", window.location.origin);

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

  console.log("Logged in as:", user.uid);
  await getFav(user.uid, dispatch);
};

//! Logout

const logout = (dispatch) => {
  signOut(auth);
  dispatch(clearUser());
};

//! Delete acc

const deleteAccount = async (dispatch) => {
  const currentUser = auth.currentUser;
  try {
    await reauthenticateWithPopup(currentUser, provider);
    await deleteDoc(doc(db, "users", currentUser.uid, "favorites", "list"));
    await deleteDoc(doc(db, "users", currentUser.uid));
    await deleteUser(currentUser);
    dispatch(clearUser());
  } catch (error) {
    console.error("Error deleting account:", error);
    alert("Could not delete account. Please try again.");
  }
};

export { getFav, login, logout, deleteAccount };
