// Fayl: useGlobalContext.js

import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Something went wrong!");
  }

  return context;
};