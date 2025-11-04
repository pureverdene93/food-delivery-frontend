"use client";
import { useState } from "react";
import { useEffect } from "react";
import { CategoryButton } from "../components/categoryButton";
import { AddFoodIcon } from "../icons/addFoodIcon";
import { CategorySection } from "./categorySection";
import { SetFalseDeliveryState } from "../icons/setFalseDeliveryState-icon";

export const FoodMenu = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryState, setCategoryState] = useState(false);
  const [foodData, setFoodData] = useState([]);

  const getOptionTest = {
    method: "GET",
  };
  const apiLinkTest = `http://localhost:8000/category`;
  const foodApiLink = `http://localhost:8000/food`;

  const getDataTest = async () => {
    const data = await fetch(apiLinkTest, getOptionTest);
    const jsonData = await data.json();
    console.log("this is category data", jsonData);
    setCategoryData(jsonData);
    const foodData = await fetch(foodApiLink, getOptionTest);
    const jsonFoodData = await foodData.json();
    setFoodData("this is food data", jsonFoodData);
  };
  useEffect(() => {
    getDataTest();
  }, []);

  return (
    <div className="flex flex-col gap-6  h-screen overflow-y-scroll">
      <div className="flex justify-end">
        <img
          src="/me.jpg"
          className="object-cover w-9 h-9 rounded-full cursor-pointer"
        />
      </div>
      <div className="w-[1171px] min-h-44 bg-white rounded-[20px] p-6 flex flex-col gap-4">
        <p className="text-[20px] text-black font-semibold">Dishes category</p>
        <div className="flex flex-wrap gap-3">
          <CategoryButton categoryName={"All dishes"} />
          {categoryData.map((category) => {
            return (
              <div key={category._id}>
                <CategoryButton categoryName={category.categoryName} />
              </div>
            );
          })}

          <button
            className="flex justify-center items-center bg-red-500
          rounded-full cursor-pointer w-9 h-9"
            onClick={() => setCategoryState(true)}
          >
            <AddFoodIcon />
          </button>
          {categoryState === true ? (
            <div
              className="fixed z-50 bg-[rgba(0,0,0,0.5)] w-full h-full
              top-0 left-0 flex justify-center items-center"
            >
              <div
                className="w-[460px] h-[272px] bg-white rounded-xl flex flex-col
                items-center justify-around"
              >
                <div className="flex items-center justify-between w-[412px]">
                  <p className="text-black text-[18px] font-semibold">
                    Add new category
                  </p>
                  <button
                    className="w-9 h-9 bg-zinc-300 rounded-full flex items-center
                    justify-center cursor-pointer"
                    onClick={() => setCategoryState(false)}
                  >
                    <SetFalseDeliveryState />
                  </button>
                </div>
                <div className="flex flex-col w-[412px] gap-2">
                  <p className="text-[14px] text-black font-medium">
                    Category name
                  </p>
                  <input
                    className="w-[412px] h-[38px] rounded-xl border border-zinc-300 pl-3"
                    placeholder="Type category name..."
                  />
                </div>
                <div className="w-[412px] flex justify-end">
                  <button
                    className="w-[123px] h-10 rounded-xl bg-black text-white flex
                justify-center items-center text-[14px] cursor-pointer"
                  >
                    Add category
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {categoryData.map((category) => {
        return (
          <div key={category._id}>
            <CategorySection category={category} />
          </div>
        );
      })}
    </div>
  );
};
