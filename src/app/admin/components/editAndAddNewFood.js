"use client";
import { useEffect } from "react";
import { SetFalseDeliveryState } from "@/app/icons/setFalseDeliveryState-icon";
import { useState } from "react";
import { AddImage } from "./addImage";

export const EditAndAddNewFood = (props) => {
  const { exit, title, getFoodData, category } = props;
  const [token, setToken] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  // console.log("food name", foodName);
  // console.log("food price", foodPrice);
  // console.log("food ingredients", foodIngredients);

  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    if (adminToken) {
      setToken(adminToken);
    }
  }, []);

  const addNewDish = async () => {
    try {
      await fetch("http://localhost:8000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodName: foodName,
          price: Number(foodPrice),
          image: foodImage,
          ingredients: foodIngredients,
          category: category._id,
        }),
      });
      await getFoodData();
      exit();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(getFoodData, "this is getFoodData");

  return (
    <div
      className="fixed z-50 bg-[rgba(0,0,0,0.5)] w-full h-full
      top-0 left-0 flex justify-center items-center"
    >
      <div
        className="w-[460px] h-[592px] bg-white z-1 flex flex-col
        items-center justify-evenly m-[900px] absolute rounded-xl"
      >
        <div className="flex h-9 w-[412px] items-center justify-between">
          <p className="text-black font-semibold text-[18px]">{title}</p>
          <button
            className="w-9 h-9 bg-zinc-300 rounded-full flex
            justify-center items-center cursor-pointer"
            onClick={exit}
          >
            <SetFalseDeliveryState />
          </button>
        </div>
        <div className="h-[60px] w-[412px] flex flex-row items-center justify-between">
          <div className="flex flex-col items-baseline gap-2">
            <p className="text-[14px] text-black font-medium">Food name</p>
            <input
              className="w-[194px] h-[38px] border border-zinc-300 rounded-[10px] pl-3"
              placeholder="Type food name"
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-baseline gap-2">
            <p className="text-[14px] text-black font-medium ">Food price</p>
            <input
              className="w-[194px] h-[38px] border border-zinc-300 rounded-xl pl-3"
              placeholder="Enter price"
              onChange={(e) => setFoodPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="w-[412px] flex flex-col items-baseline gap-2">
          <p>Ingredients</p>
          <input
            className="w-[412px] h-[90px] border border-zinc-200 rounded-xl pb-[50px] pl-3"
            placeholder="List ingredients..."
            onChange={(e) => setFoodIngredients(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[412px] items-baseline gap-2">
          <p>Food image</p>
          <AddImage wh={`w-[412px] h-[138px]`} />
        </div>

        <div className="w-[412px] flex justify-end">
          <button
            className="bg-black w-[93px] h-10 rounded-xl text-white flex
            justify-center items-center font-medium text-[14px] cursor-pointer"
            onClick={addNewDish}
          >
            Add dish
          </button>
        </div>
      </div>
    </div>
  );
};
