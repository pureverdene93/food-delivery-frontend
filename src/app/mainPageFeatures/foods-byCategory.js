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
  // console.log(foodData, "food data");
  // console.log(data, "category data");

  const filteredFoodData = foodData.filter((food) => {
    const filter = food.category?._id === data?._id;
    return filter;
  });

  return (
    <div className="flex flex-col gap-[54px] w-[1264px]">
      <p className="text-[30px] font-semibold text-white">
        {data.categoryName}
      </p>
      <div className="flex flex-wrap w-[1264px] gap-9">
        {filteredFoodData.map((food) => {
          return (
            <div key={food._id}>
              <FoodCard data={food} foodId={food._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
