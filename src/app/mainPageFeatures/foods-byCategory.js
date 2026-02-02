"use client";
import { useState } from "react";
import { useEffect } from "react";
import { FoodCard } from "../mainPageComponents/food-card";

const optionGet = { method: "GET" };
const backend_url = process.env.BACKEND_URL;

export const FoodsByCategorySection = ({ data }) => {
  const foodApiLink = `${backend_url}/food`;
  const [foodData, setFoodData] = useState([]);
  const getFoodData = async () => {
    const foodData = await fetch(foodApiLink, optionGet);
    const jsonFoodData = await foodData.json();
    setFoodData(jsonFoodData);
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const filteredFoodData = foodData.filter((food) => {
    const filter = food.category?._id === data?._id;
    return filter;
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-10 lg:gap-14 w-full max-w-7xl mx-auto">
      <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white px-2">
        {data.categoryName}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-9 justify-items-center">
        {filteredFoodData.map((food) => {
          return (
            <div key={food._id} className="w-full max-w-sm">
              <FoodCard data={food} foodId={food._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
