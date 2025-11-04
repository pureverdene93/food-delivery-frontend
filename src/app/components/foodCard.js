"use client";
import { useState } from "react";
import { FoodEditIcon } from "../icons/editFood-Icon";
import { EditAndAddNewFood } from "./editAndAddNewFood";

export const FoodCard = (props) => {
  const { foodImg, foodName, foodIngredients, foodPrice } = props;
  const [editFoodState, setEditFoodState] = useState(false);

  return (
    <div className="w-[270px] h-[241px] border border-zinc-300 rounded-[20px] flex flex-col items-center justify-evenly">
      <div className="relative w-[238px] h-[129px]">
        <img
          src="/tsuivan3.png"
          className="object-cover w-full h-full rounded-2xl"
        />
        <button
          className="w-11 h-11 bg-white rounded-full flex 
        absolute bottom-5 right-5 justify-center items-center cursor-pointer"
          onClick={() => setEditFoodState(true)}
        >
          <FoodEditIcon />
        </button>
        {editFoodState === true ? (
          <EditAndAddNewFood
            exit={() => setEditFoodState(false)}
            title={"Edit food info"}
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center w-[238px] justify-between ">
          <p className="text-[14px] font-medium text-red-500">{foodName}</p>
          <p className="text-black text-[12px] font-[350]">{foodPrice}$</p>
        </div>
        <p className="w-[238px] text-[12px] font-normal ">{foodIngredients}</p>
      </div>
    </div>
  );
};
