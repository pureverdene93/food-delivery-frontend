"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Addfood } from "./addFood";
import { FoodCard } from "./foodCard";

export const CategorySection = (props) => {
  const { category } = props;

  const option = {
    method: "GET",
  };
  const [foodData, setFoodData] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);

  const foodApiLink = `http://localhost:8000/food`;
  const getFoodById = `http://localhost:8000/food/category-id/${category._id}`;

  const getFoodData = async () => {
    const foodData = await fetch(foodApiLink, option);
    const jsonData = await foodData.json();
    setFoodData(jsonData);
    // console.log("this is food data", jsonData);
    const filteredFoodData = await fetch(getFoodById, option);
    const filteredJsonData = await filteredFoodData.json();
    setFilteredFoodData(filteredJsonData);
  };

  // console.log("this is filtered food data", filteredFoodData);

  useEffect(() => {
    getFoodData();
  }, []);

  return (
    <div
      className="bg-white flex w-[1171px] min-h-[325px]
      shrink-0 rounded-2xl flex-col gap-4 p-5"
      id={`category-${category._id}`}
    >
      <p className="text-5 font-semibold text-black">{category.categoryName}</p>
      <div className="flex flex-wrap gap-4">
        <Addfood
          foodName={category.categoryName}
          getFoodData={getFoodData}
          category={category}
        />
        {filteredFoodData.map((food) => {
          return (
            <div key={food._id}>
              <FoodCard
                foodId={food._id}
                foodName={food.foodName}
                foodIngredients={food.ingredients}
                foodPrice={food.price}
                getFoodData={getFoodData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
