//firebase imports
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//react imports
import { useState } from "react";

//contex
import { useGlobalContext } from "./useGlobalContext";
//toast
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();

  //register with google
  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPending(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      console.log(error.message);
      setIsPending(false);
    }
  };

  //register with password and
  const registerEmailAndPassword = async (
    email,
    password,
    displayName,
    photoURL
  ) => {
    try {
      const register = createUserWithEmailAndPassword(auth, email, password);
      setIsPending(true);
      const user = (await register).user;
      await updateProfile(auth.currentUser, {
        photoURL,
        displayName,
      });

      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welocome ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPending(false);
    }
  };

  return { registerWithGoogle, isPending, registerEmailAndPassword };
};
