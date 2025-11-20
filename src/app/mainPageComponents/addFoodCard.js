"use client";
import { useState } from "react";
import { useEffect } from "react";
import { MinusIcon } from "lucide-react";
import { SetFalseDeliveryState } from "../icons/setFalseDeliveryState-icon";
import { PlusSignIcon } from "../icons/plusSignIcon";

export const AddFoodCard = ({ exit, data }) => {
  const [countFood, setCountFood] = useState(0);
  const [foodCard, setFoodCard] = useState([]);

  const getDataSafe = () => {
    try {
      const exitingFoodCard = JSON.parse(localStorage.getItem("addedCard"));
      return Array.isArray(exitingFoodCard) ? exitingFoodCard : [];
    } catch (error) {
      [];
    }
  };

  const countFoodMinus = () => {
    if (countFood === 0) {
      setCountFood(countFood);
    }
    if (countFood > 0) {
      setCountFood(countFood - 1);
    }
  };

  useEffect(() => {
    setFoodCard(getDataSafe());
  }, []);

  const checkOrder = () => {
    if (countFood === 0) return;
    const currenCard = Array.isArray(foodCard) ? [...foodCard] : [];
    const orderItems = {
      id: data._id,
      addedToFoodCardData: data,
      quantity: countFood,
      totalPrice: data.price * countFood,
    };

    const alreadyHas = currenCard.findIndex((item) => item.id === data._id);

    if (alreadyHas !== -1) {
      currenCard[alreadyHas].quantity += countFood;
      currenCard[alreadyHas].totalPrice =
        currenCard[alreadyHas].quantity * data.price;
    } else {
      currenCard.push(orderItems);
    }
    localStorage.setItem("addedCard", JSON.stringify(currenCard));
    exit();
  };

  return (
    <div className="fixed z-50 flex justify-center items-center w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)]">
      <div className="w-[826px] h-[412px] bg-white rounded-xl flex flex-row p-6 justify-between">
        <img
          className="object-cover w-[377px] h-[364px] rounded-xl"
          src={data.image}
        />
        <div className="w-[377px] h-[364px] flex justify-between flex-col">
          <div>
            <div className="w-[377px] flex justify-end">
              <button
                className="w-9 h-9 border border-zinc-200 rounded-full cursor-pointer flex items-center justify-center"
                onClick={exit}
              >
                <SetFalseDeliveryState />
              </button>
            </div>
            <div>
              <p className="text-[30px] font-semibold text-red-500">
                {data.foodName}
              </p>
              <p className="text-[16px] text-black font-normal">
                {data.ingredients}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-[377px] h-14 flex justify-between">
              <div>
                <p className="text-[16px] font-normal text-black">
                  Total price
                </p>
                <p className="text-[24px] text-black font-semibold">
                  ${data.price * countFood}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="w-11 h-11 border border-zinc-200 rounded-full cursor-pointer flex items-center justify-center"
                  onClick={countFoodMinus}
                >
                  <MinusIcon />
                </button>
                <p className="text-[18px] text-black font-semibold">
                  {countFood}
                </p>
                <button
                  className="w-11 h-11 border border-zinc-200 rounded-full cursor-pointer flex items-center justify-center"
                  onClick={() => setCountFood(countFood + 1)}
                >
                  <PlusSignIcon />
                </button>
              </div>
            </div>
            <button
              className="text-white text-[14px] font-medium w-[377px] h-11 bg-black rounded-xl flex justify-center items-center cursor-pointer"
              onClick={checkOrder}
            >
              Add to card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
