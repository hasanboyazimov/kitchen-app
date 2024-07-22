// react-router-dom
import { Link } from "react-router-dom";

// components
import { Product } from "../components/index.js";
import { useCollection } from "../hooks/useCollection.js";

function RecipeList() {
  const { data } = useCollection("foods", ["createdAt"]);

  return (
    <div className="container max-w-[1280px] mx-auto p-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {data && data.length > 0 ? (
          data.map((recipe) => <Product key={recipe.id} recipe={recipe} />)
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
