// react-router-dom
import { Link } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";

// components
import { Product } from "../components/index.js";
import { useCollection } from "../hooks/useCollection.js";

function RecipeList() {
  const { data } = useCollection("foods", ["createdAt"]);

  return (
    <div className="container max-w-[1280px] mx-auto p-4 pb-32">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {data && data.length > 0 ? (
          data.map((recipe) => <Product key={recipe.id} recipe={recipe} />)
        ) : (
          <div className="flex items-center text-pretty text-2xl">
            <p>No foods found :(</p>
          </div>
        )}
        <div className="">
              <Link to="/add-recipe" className="link bg-gray-100 hover:bg-gray-50 transition-all ease-in-out rounded-[25px] w-[336px] h-48 flex flex-col items-center justify-center link-primary">
              <MdAddToPhotos />
                Add recipe
              </Link>
            </div>
      </div>
    </div>
  );
}

export default RecipeList;
