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
    <div className="fixed z-50 flex justify-center items-center w-full h-full top-0 left-0 bg-black/50 p-4">
      <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-white rounded-xl flex flex-col md:flex-row p-4 sm:p-6 gap-4 sm:gap-6">
        <img
          className="object-cover w-full md:w-1/2 h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl"
          src={data.image}
        />
        <div className="w-full md:w-1/2 flex justify-between flex-col gap-4">
          <div>
            <div className="w-full flex justify-end">
              <button
                className="w-8 h-8 sm:w-9 sm:h-9 border border-zinc-200 rounded-full cursor-pointer flex items-center justify-center"
                onClick={exit}
              >
                <SetFalseDeliveryState />
              </button>
            </div>
            <div className="mt-2">
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-red-500">
                {data.foodName}
              </p>
              <p className="text-sm sm:text-base text-black font-normal mt-2">
                {data.ingredients}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="text-sm sm:text-base font-normal text-black">
                  Total price
                </p>
                <p className="text-xl sm:text-2xl text-black font-semibold">
                  ${data.price * countFood}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  className="w-9 h-9 sm:w-11 sm:h-11 border border-zinc-200 rounded-full cursor-pointer flex items-center justify-center"
                  onClick={countFoodMinus}
                >
                  <MinusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <p className="text-base sm:text-lg text-black font-semibold min-w-[24px] text-center">
                  {countFood}
                </p>
                <button
                  className="w-9 h-9 sm:w-11 sm:h-11 border border-zinc-200 rounded-full cursor-pointer flex items-center justify-center"
                  onClick={() => setCountFood(countFood + 1)}
                >
                  <PlusSignIcon />
                </button>
              </div>
            </div>
            <button
              className="text-white text-sm font-medium w-full h-10 sm:h-11 bg-black rounded-xl flex justify-center items-center cursor-pointer"
              onClick={checkOrder}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
