import React, { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import toast from "react-hot-toast";
import { useMyContext } from "../hooks/useMyContext";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let time = formData.get("time");
  let method = formData.get("method");
  return { title, time, method };
};

function CreateResipe() {
  const { user } = useMyContext();
  const dataTodo = useActionData();
  const [ingredients, setIngredients] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState("");

  useEffect(() => {
    if (dataTodo) {
      const newTodo = {
        ...dataTodo,
        ingredients,
        photo,
        createdAt: serverTimestamp(),
        uid: user.uid,
      };
      addDoc(collection(db, "todos"), newTodo)
        .then(() => {
          toast.success("You added a new recipe");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  }, [dataTodo, ingredients, photo, user.uid]);

  const addIngredient = () => {
    if (currentIngredient) {
      setIngredients([...ingredients, currentIngredient]);
      setCurrentIngredient("");
    }
  };

  const addPhoto = () => {
    if (currentPhoto) {
      setPhoto([...photo, currentPhoto]);
      setCurrentPhoto("");
    }
  };

  return (
    <div className="backgroundResipe">
      <div className="container py-8">
        <Form
          method="post"
          className="w-[90%] lg:w-[50%] mx-auto border p-1 lg:p-6 bg-black bg-opacity-50 backdrop-blur-md lg:rounded-[10%] rounded-20px overflow-hidden"
        >
          <h1 className="text-secondaryColor text-[25px] text-center">
            Add new Recipe
          </h1>
          <FormInput
            name="title"
            label="Title"
            type="text"
            placeholder="Food name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormInput
            onChange={(e) => setTimer(e.target.value)}
            name="time"
            label="Cooking time"
            type="text"
            placeholder="Cooking time"
          />
          <div className="mt-2 flex flex-col">
            <div className="flex items-center w-full rounded-full">
              <FormInput
                style="w-full"
                name="ingredients"
                label="Ingredients"
                type="text"
                placeholder="Ingredient"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
              />
              <button
                type="button"
                onClick={addIngredient}
                className="btn w-[15%]"
              >
                +
              </button>
            </div>
            <span className="text-white text-[13px] flex items-center gap-1">
              Ingredients:
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="text-white bg-secondaryColor px-3 rounded-full text-[12px]"
                >
                  {ingredient}
                </span>
              ))}
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="flex items-center w-full rounded-full">
              <FormInput
                style="w-full"
                name="photo"
                label="Photo URL"
                type="text"
                placeholder="Photo URL"
                value={currentPhoto}
                onChange={(e) => setCurrentPhoto(e.target.value)}
              />
              <button type="button" onClick={addPhoto} className="btn w-[15%]">
                +
              </button>
            </div>
          </div>
          <textarea
            name="method"
            placeholder="Method"
            className="mt-2 w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryColor"
          ></textarea>
          <div className="flex flex-col gap-2 lg:flex-row">
            <button
              className="bg-secondaryColor btn text-white font-semibold w-full lg:w-1/2"
              type="submit"
            >
              Apply
            </button>
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              type="button"
              className="btn border border-secondaryColor bg-white text-secondaryColor w-full lg:w-1/2"
            >
              Preview
            </button>
          </div>
        </Form>

        {title && timer && ingredients.length && photo && (
          <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box">
              <img src={currentPhoto} className="w-[100px]" alt="" />
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="py-4 flex items-center gap-1">
                {ingredients.map((item, index) => {
                  return (
                    <span key={index} className="border px-2 rounded-md">
                      {item}
                    </span>
                  );
                })}
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}

export default CreateResipe;
