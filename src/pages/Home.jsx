import React from "react";
import {Navigation} from "../components";
import RecipeList from "./RecipeList";

function Home() {
  return (
    <div className="mx-auto max-w-[1420px] pt-[70px] md:pt-[90px] lg:pt-[90px] xl:pt-[90px] 2xl:pt-[90px]">
      <Navigation />
      <RecipeList />
    </div>
  );
}

export default Home;
