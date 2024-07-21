// custom hooks
import { useCollection } from "../hooks/useCollection.js";

// react-router-dom
import { Form, useActionData, Link } from "react-router-dom";

// components
import { Product } from "../components/index.js";

//react
import { useEffect } from "react";

// firebase
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import toast from "react-hot-toast";
import { useGlobalContext } from "../hooks/useGlobalContext.js";

function RecipeList() {
  const { user } = useGlobalContext();
  const { data } = useCollection("foods", ["createdAt", "desc"]);
  const dataTodo = useActionData();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "foods", id));
      toast.success("Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dataTodo && !dataTodo.error) {
      const newTodo = {
        ...dataTodo,
        createdAt: serverTimestamp(),
        uid: user.uid, // Adding user.uid to associate todo with the user
      };

      addDoc(collection(db, "foods"), newTodo)
        .then(() => {
          toast.success("New Retcipe Added");
        })
        .catch((error) => {
          toast.error("Failed to add new Todo: " + error.message);
        });
    } else if (dataTodo && dataTodo.error) {
      toast.error(dataTodo.error);
    }
  }, [dataTodo, user.uid]);

  return (
    <div className="container max-w-[1280px] mx-auto p-4">
      <div className="flex justify-between col-span-3 flex-wrap ">
        {data && data.length > 0 ? (
          data.map((todo) => <Product key={todo.id} todo={todo} />)
        ) : (
          <p>No foods found.</p>
        )}
      </div>
      <div>
        <Link to="/add-recipe" className="link link-primary">
          Add recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeList;
