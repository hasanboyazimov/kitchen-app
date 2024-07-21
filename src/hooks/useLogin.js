//firebase
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

//global contex
import { useGlobalContext } from "./useGlobalContext";

//toast
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();

  const signIn = async (email, password) => {
    try {
      setIsPending(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast(`Welcome ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error("Email or password is not correct");
      setIsPending(false);
    }
  };

  return { isPending, signIn };
};
