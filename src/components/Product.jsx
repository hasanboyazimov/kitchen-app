import React from "react";
// name, imageUrl, priceRange, rating = "4.5", cookingTime
function Product({ recipe }) {
  console.log(recipe);
  return (
    <div className="bg-white  overflow-hidden w-[336px] mb-10">
      <div className="relative shadow-md rounded-[25px]">
      <div className="absolute top-0 left-0 m-2 rounded-full z-10 bg-custom-yellow g-opacity-80 text-white text-base px-4 py-2  ">
          {recipe.category}
        </div>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover hover:opacity-95 z-0 transition-all ease-in-out rounded-[25px] "
        />
        <div className="absolute bottom-0 right-0 rounded-br-[25px] rounded-tl-[25px] bg-gray-800 bg-opacity-80 text-white text-base px-4 py-2 ">
          {recipe.cookingTime} <span>min</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold">{recipe.title}</h2>
        <div className="flex items-center mt-2">
          <span className="text-green-500">&#9733;</span>
          <span className="ml-1">{(recipe.rating = "4.5")} Good</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">{recipe.ingeridiens}</div>
      </div>
    </div>
  );
}

export default Product;
