"use client";
import { ExitRedIcon } from "../icons/exit-red";
import { PlusSignIconBlack } from "../icons/plusSignIconBlack";
import { MinusCard } from "../icons/minus";
import { useEffect, useState } from "react";

export const FoodCardFromOrderInfo = ({ items }) => {
  const [locData, setLocData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("addedCard")) || [];
    setLocData(data);
  }, []);
  const removeItem = (id) => {
    const selectAndRemove = locData.filter((data) => {
      return data.id !== id;
    });
    localStorage.setItem("addedCard", JSON.stringify(selectAndRemove));
    setLocData(selectAndRemove);
  };
  return (
    <div className="w-[439px] h-[140px] flex justify-between">
      <img
        src={items.addedToFoodCardData.image}
        className="w-[124px] h-[120px] object-cover rounded-xl"
      />
      <div className="w-[305px] h-[120px] flex flex-col justify-between">
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-[16px] font-bold text-red-500">
              {items.addedToFoodCardData.foodName}
            </p>
            <p className="text-black text-[12px] font-normal">
              {items.addedToFoodCardData.ingredients}
            </p>
          </div>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border border-red-500 shrink-0"
            onClick={() => removeItem(items.id)}
          >
            <ExitRedIcon />
          </button>
        </div>
        <div className="w-[305px] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button className="cursor-pointer">
              <MinusCard />
            </button>
            <span>{items.quantity}</span>
            <button className="cursor-pointer">
              <PlusSignIconBlack />
            </button>
          </div>
          <p className="text-[16px] font-bold text-black">
            ${items.totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};
