"use client";
import { useState } from "react";
import { useEffect } from "react";
import { CategoryButton } from "../components/categoryButton";
import { AddFoodIcon } from "@/app/icons/addFoodIcon";
import { CategorySection } from "../components/categorySection";
import { AddCategoryCard } from "../components/addCategoryCard";

const backend_url = process.env.BACKEND_URL;

export const FoodMenu = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryState, setCategoryState] = useState(false);
  const [categoryId, setCategoryId] = useState("1");
  const [foodData, setFoodData] = useState([]);

  const getOptionTest = {
    method: "GET",
  };
  const apiLinkTest = `${backend_url}/category`;
  const foodApiLink = `${backend_url}/food`;

  const getDataTest = async () => {
    const data = await fetch(apiLinkTest, getOptionTest);
    const jsonData = await data.json();
    setCategoryData(jsonData);
    const foodData = await fetch(foodApiLink, getOptionTest);
    const jsonFoodData = await foodData.json();
    setFoodData(jsonFoodData);
  };

  const foodCountById = (categoryId) => {
    return foodData.filter((foodId) => foodId.category?._id === categoryId)
      .length;
  };

  const scrollIntoView = (id) => {
    const container = document.querySelector(".overflow-y-scroll");
    const sectionById = document.getElementById(`category-${id}`);
    if (!sectionById || !container) return;
    const containerTop = container.getBoundingClientRect().top;
    const sectionTop = sectionById.getBoundingClientRect().top;
    container.scrollBy({
      top: sectionTop - containerTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getDataTest();
  }, []);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-7xl">
      <div className="flex justify-end">
        <img
          src="/me.jpg"
          className="object-cover w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer"
        />
      </div>
      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
        <p className="text-base sm:text-lg lg:text-xl text-black font-semibold">Dishes category</p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <CategoryButton
            categoryName={"All dishes"}
            categoryId={"1"}
            showedByCategory={() => {
              const container = document.querySelector(".overflow-y-scroll");
              if (container) container.scrollTo({ top: 0, behavior: "smooth" });
            }}
            foodCount={foodData.length}
            current={categoryId}
          />
          {categoryData.map((category) => {
            return (
              <div key={category._id}>
                <CategoryButton
                  categoryName={category.categoryName}
                  foodCount={foodCountById(category._id)}
                  categoryId={category._id}
                  showedByCategory={() => {
                    setCategoryId(category._id);
                    scrollIntoView(category._id);
                  }}
                  current={categoryId}
                />
              </div>
            );
          })}

          <button
            className="flex justify-center items-center bg-red-500 rounded-full cursor-pointer w-8 h-8 sm:w-9 sm:h-9"
            onClick={() => setCategoryState(true)}
          >
            <AddFoodIcon />
          </button>
          {categoryState === true ? (
            <AddCategoryCard
              exit={() => {
                setCategoryState(false);
              }}
              categoryData={categoryData}
              getDataTest={getDataTest}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-6 overflow-y-auto max-h-[60vh] sm:max-h-[70vh]">
        {categoryData.map((category) => {
          return (
            <div key={category._id}>
              <CategorySection category={category} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
