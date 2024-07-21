import { useState, useEffect } from "react";
import { FormInput } from "../components";
import { Form, useActionData } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let cookingTime = formData.get("cookingTime");
  let [ingeridiens, setIngeridiens] = useState([]);
  let category = useState();

  if (!title) {
    return { error: "Title is required." };
  }
  if (!cookingTime) {
    return { error: "Cooking Time is required." };
  }
  if (!category) {
    return { error: "Category is required." };
  }

  return { title, cookingTime, ingeridiens, category };
};

function GetRetcipeForm() {
  const { data } = useCollection("todos", ["createdAt", "desc"]);
  const dataRecipe = useActionData();

  useEffect(() => {
    if (dataRecipe && !dataRecipe.error) {
      const newTodo = {
        ...dataRecipe,
        createdAt: serverTimestamp(),
      };

      addDoc(collection(db, "todos"), newTodo)
        .then(() => {
          toast.success("New Todo Added");
        })
        .catch((error) => {
          toast.error("Failed to add new Todo: " + error.message);
        });
    } else if (dataRecipe && dataRecipe.error) {
      toast.error(dataRecipe.error);
    }
  }, [dataRecipe, user.uid]);

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
          <select className="select select-bordered w-full mt-8">
            <option className="text-gray-400" disabled selected>
              Choose the category
            </option>
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
        </div>
        <div className="w-[450px] flex flex-col pt-[38px]">
          <textarea
            className="border rounded-lg p-4 mb-5"
            name=""
            id=""
            placeholder="write a method"
            rows="5"
          ></textarea>
          <button type="submit" className="btn btn-secondary mt-[74px]">
            ADD RECIPE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default GetRetcipeForm;
