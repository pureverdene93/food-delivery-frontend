"use client";
import { useEffect } from "react";
import { useState } from "react";
import { PlusSignIcon } from "../icons/plusSignIcon";
import { AddFoodCard } from "./addFoodCard";

const getOption = { method: "GET" };

export const FoodCard = ({ data, foodId }) => {
  const foodApiLink = `http://localhost:8000/food/${foodId}`;
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
    <div className="w-[397px] h-[342px] p-4 bg-white rounded-xl flex flex-col justify-center gap-5">
      <div className="relative z-0 flex items-end justify-end w-[365px] h-[210px] ">
        <img
          src={data.image}
          className="w-full h-full object-cover rounded-xl absolute z-[-1]"
        />
        <button
          className="mb-5 mr-5 w-11 h-11 rounded-full flex justify-center items-center bg-white cursor-pointer"
          onClick={() => setFoodCardState(true)}
        >
          <PlusSignIcon />
        </button>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          <p className="text-red-500 text-[24px] font-semibold">
            {data.foodName}
          </p>
          <p className="font-semibold text-[18px] text-black">{data.price}</p>
        </div>
        <div>
          <p className="font-normal text-[14px] text-black">
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
