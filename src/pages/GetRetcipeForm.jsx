import { useEffect, useRef, useState } from "react";
import { FormInput } from "../components";
import { Form, useActionData } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let cookingTime = formData.get("cookingTime");
  let ingeridiens = formData.get("ingeridiens");
  let category = formData.get("category");
  let method = formData.get("method");
  let image = formData.get("image");

  return { title, cookingTime, ingeridiens, image, method, category };
};

function GetRetcipeForm() {
  const dataRecipe = useActionData();
  const formRef = useRef(null);

  // preview useState
  const [perTitle, setPerTitle] = useState("");
  const [perCookingTime, setPerCookingTime] = useState(0);
  const [perIngridients, setPerIngridients] = useState("");
  const [perImage, setPerImage] = useState("");
  const [perMethod, setPerMethod] = useState("");
  const [perCategory, setPerCategory] = useState("burgers");

  useEffect(() => {
    if (dataRecipe && !dataRecipe.error) {
      const newRecipe = {
        ...dataRecipe,
        createdAt: serverTimestamp(),
      };

      addDoc(collection(db, "foods"), newRecipe)
        .then(() => {
          toast.success("New Recipe Added");
          formRef.current.reset();
          // Reset the form
        })
        .catch((error) => {
          toast.error("Failed to add new Recipe: " + error.message);
        });
    } else if (dataRecipe && dataRecipe.error) {
      toast.error(dataRecipe.error);
    }
  }, [dataRecipe]);

  return (
    <div className="flex w-full justify-center">
      <Form method="post" className="flex pt-[90px] gap-5" ref={formRef}>
        <div className="flex w-[450px] flex-col">
          <FormInput
            className="mt-0 pt-0"
            name="title"
            label="Title"
            type="text"
            onChange={(e) => setPerTitle(e.target.value)}
          />
          <FormInput
            className="mt-0 pt-0"
            name="cookingTime"
            label="Cooking Time ( in minutes )"
            type="number"
            onChange={(e) => setPerCookingTime(e.target.value)}
          />
          <FormInput
            className="mt-0 pt-0"
            name="ingeridiens"
            label="Ingeridiens"
            type="text"
            onChange={(e) => setPerIngridients(e.target.value)}
          />
          <FormInput
            className="mt-0 pt-0"
            name="image"
            label="image"
            type="url"
            onChange={(e) => setPerImage(e.target.value)}
          />
        </div>
        <div className="w-[450px] flex flex-col">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text capitalize">Write a method</span>
            </div>
            <textarea
              className="input-bordered w-full border rounded-lg p-4 mb-5 resize-none"
              name="method"
              placeholder="write a method"
              rows="5"
              onChange={(e) => setPerMethod(e.target.value)}
            ></textarea>
          </label>

          <select
            defaultValue={"all"}
            name="category"
            className="select select-bordered w-full mb-4"
            onChange={(e) => {
              setPerCategory(e.target.value);
            }}
          >
            <option value={"burgers"}>Burgers</option>
            <option value={"sushi"}>Sushi</option>
            <option value={"pizza"}>Pizza</option>
            <option value={"wok"}>Wok</option>
            <option value={"breakfast"}>Breakfasts</option>
            <option value={"lunck"}>Lunch</option>
            <option value={"uzbek"}>Uzbek</option>
            <option value={"asia"}>Asia</option>
            <option value={"japan"}>Japan</option>
            <option value={"coffee"}>Coffee</option>
          </select>
          <div className="w-full flex">
            <button type="submit" className="btn w-1/2 mr-2 btn-secondary mt-4">
              ADD RECIPE
            </button>
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              type="button"
              className="btn w-1/2 btn-primary mt-4"
            >
              Preview
            </button>
          </div>
        </div>
      </Form>
      {perTitle &&
        perCookingTime &&
        perIngridients &&
        perImage &&
        perMethod && (
          <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box">
              <div className="bg-white  overflow-hidden w-[336px] mb-10">
                <div className="relative shadow-md rounded-[25px]">
                  <div className="absolute top-0 left-0 m-2 rounded-full z-10 bg-custom-yellow g-opacity-80 text-white text-base px-4 py-2  ">
                    {perCategory}
                  </div>
                  <img
                    src={perImage}
                    alt={perTitle}
                    className="w-full h-48 object-cover hover:opacity-95 z-0 transition-all ease-in-out rounded-[25px] "
                  />
                  <div className="absolute bottom-0 right-0 rounded-br-[25px] rounded-tl-[25px] bg-gray-800 bg-opacity-80 text-white text-base px-4 py-2 ">
                    {perCookingTime} <span>min</span>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold">{perTitle}</h2>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500">&#9733;</span>
                    <span className="ml-1">4.5 Good</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {perIngridients}
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        )}
    </div>
  );
}

export default GetRetcipeForm;
