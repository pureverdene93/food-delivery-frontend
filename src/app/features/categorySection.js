"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Addfood } from "../components/addFood";
import { FoodCard } from "../components/foodCard";

export const CategorySection = (props) => {
  const { category } = props;

  const option = {
    method: "GET",
  };
  const [foodData, setFoodData] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const foodApiLink = `http://localhost:8000/food`;
  const getFoodById = `http://localhost:8000/food/${categoryId}`;

  const getFoodData = async () => {
    const foodData = await fetch(foodApiLink, option);
    const jsonData = await foodData.json();
    setFoodData(jsonData);
    console.log("this is food data", jsonData);
  };

  console.log("this is food data", foodData);

  useEffect(() => {
    getFoodData();
  }, []);

  return (
    <div
      className="bg-white flex w-[1171px] min-h-[325px]
      shrink-0 rounded-2xl flex-col gap-4 p-5"
    >
      <p className="text-5 font-semibold text-black">{category.categoryName}</p>
      <div className="flex flex-wrap gap-4">
        <Addfood />
        {foodData.map((food) => {
          return (
            <div key={food._id}>
              <FoodCard
                foodName={food.foodName}
                foodIngredients={food.ingredients}
                foodPrice={food.price}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
