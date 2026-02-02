"use client";
import { useEffect } from "react";
import { useState } from "react";
import { PlusSignIcon } from "../icons/plusSignIcon";
import { AddFoodCard } from "./addFoodCard";

const getOption = { method: "GET" };
const backend_url = process.env.BACKEND_URL;

export const FoodCard = ({ data, foodId }) => {
  const foodApiLink = `${backend_url}/food/${foodId}`;
  const [foodCardState, setFoodCardState] = useState(false);
  const [foodData, setFoodData] = useState([]);

  const getData = async () => {
    const data = await fetch(foodApiLink, getOption);
    const jsonData = await data.json();
    setFoodData(jsonData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-auto p-3 sm:p-4 bg-white rounded-xl flex flex-col justify-center gap-4 sm:gap-5">
      <div className="relative z-0 flex items-end justify-end w-full h-40 sm:h-48 lg:h-52">
        <img
          src={data.image}
          className="w-full h-full object-cover rounded-xl absolute z-[-1]"
        />
        <button
          className="mb-3 mr-3 sm:mb-5 sm:mr-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex justify-center items-center bg-white cursor-pointer shadow-md"
          onClick={() => setFoodCardState(true)}
        >
          <PlusSignIcon />
        </button>
      </div>
      <div className="flex flex-col justify-between gap-1">
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-red-500 text-lg sm:text-xl lg:text-2xl font-semibold truncate">
            {data.foodName}
          </p>
          <p className="font-semibold text-base sm:text-lg text-black whitespace-nowrap">{data.price}</p>
        </div>
        <div>
          <p className="font-normal text-xs sm:text-sm text-black line-clamp-2">
            {data.ingredients}
          </p>
        </div>
      </div>
      {foodCardState && (
        <AddFoodCard exit={() => setFoodCardState(false)} data={foodData} />
      )}
    </div>
  );
};
