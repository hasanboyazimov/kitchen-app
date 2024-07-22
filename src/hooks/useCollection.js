import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  // where,
} from "firebase/firestore";

export const useCollection = (collectionName, orderName) => {
  const [data, setData] = useState();

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy(...orderName));

    onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot);
      const recipes = [];
      querySnapshot.docs.forEach((item) => {
        recipes.push({ id: item.id, ...item.data() });
      });
      setData(recipes);
    });
  }, [collectionName]);

  return { data };
};
