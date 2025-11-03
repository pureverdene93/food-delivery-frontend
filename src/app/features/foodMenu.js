"use client";
import { useState } from "react";
import { useEffect } from "react";
import { CategoryButton } from "../components/categoryButton";
import { AddFoodIcon } from "../icons/addFoodIcon";
import { CategorySection } from "./categorySection";

export const FoodMenu = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryState, setCategoryState] = useState(false);

  const getOptionTest = {
    method: "GET",
  };
  const apiLinkTest = `http://localhost:8000/category`;

  const getDataTest = async () => {
    const data = await fetch(apiLinkTest, getOptionTest);
    const jsonData = await data.json();
    setCategoryData(jsonData);
    console.log(jsonData);
  };
  useEffect(() => {
    getDataTest();
  }, []);

  return (
    <div className="flex flex-col gap-6 mb-[100px]">
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
                {/* <CategoryButton categoryName={"All dishes"} /> */}
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
            <div className="w-[460px] h-[272]px bg-white rounded-xl absolute"></div>
          ) : (
            ""
          )}
        </div>
      </div>
      <CategorySection />
    </div>
  );
};
