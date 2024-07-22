import { useEffect } from "react";
import { FormInput } from "../components";
import { Form, useActionData } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";
// import { collection } from "@firebase/firestore";

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

  useEffect(() => {
    if (dataRecipe && !dataRecipe.error) {
      const newRecipe = {
        ...dataRecipe,
        createdAt: serverTimestamp(),
      };

      addDoc(collection(db, "foods"), newRecipe)
        .then(() => {
          toast.success("New Retcipe Added");
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
      <Form method="post" className="flex pt-[90px] gap-5">
        <div className="flex w-[450px] flex-col">
          <FormInput
            className="mt-0 pt-0"
            name="title"
            label="Title"
            type="text"
          />
          <FormInput
            className="mt-0 pt-0"
            name="cookingTime"
            label="Cooking Time ( in minutes )"
            type="number"
          />
          <FormInput
            className="mt-0 pt-0"
            name="ingeridiens"
            label="Ingeridiens"
            type="text"
          />
          <FormInput
            className="mt-0 pt-0"
            name="image"
            label="image"
            type="url"
          />
        </div>
        <div className="w-[450px] flex flex-col">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text capitalize">Write a mrthod</span>
            </div>
            <textarea
              className="input-bordered w-full border rounded-lg p-4 mb-5 resize-none"
              name=""
              id=""
              placeholder="write a method"
              rows="5"
            ></textarea>
          </label>

          <select
            defaultValue={"all"}
            className="select select-bordered w-full mb-4"
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
          <button type="submit" className="btn btn-secondary mt-4">
            ADD RECIPE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default GetRetcipeForm;
