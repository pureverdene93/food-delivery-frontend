"use client";
import { useState } from "react";
import { useEffect } from "react";
import { CategoryButton } from "../components/categoryButton";
import { AddFoodIcon } from "@/app/icons/addFoodIcon";
import { CategorySection } from "../components/categorySection";
import { AddCategoryCard } from "../components/addCategoryCard";

export const FoodMenu = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryState, setCategoryState] = useState(false);
  const [categoryName, setCategoryName] = useState("All dishes");
  const [foodData, setFoodData] = useState([]);

  const getOptionTest = {
    method: "GET",
  };
  const apiLinkTest = `http://localhost:8000/category`;
  const foodApiLink = `http://localhost:8000/food`;

  const getDataTest = async () => {
    const data = await fetch(apiLinkTest, getOptionTest);
    const jsonData = await data.json();
    setCategoryData(jsonData);
    const foodData = await fetch(foodApiLink, getOptionTest);
    const jsonFoodData = await foodData.json();
    setFoodData(jsonFoodData);
  };

  const showCategoryByName = () => {
    setCategoryName(categoryData.categoryName);
  };

  const foodCountById = (categoryId) => {
    return foodData.filter((foodId) => foodId.category?._id === categoryId)
      .length;
  };

  useEffect(() => {
    getDataTest();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <img
          src="/me.jpg"
          className="object-cover w-9 h-9 rounded-full cursor-pointer"
        />
      </div>
      <div className="w-[1171px] min-h-44 bg-white rounded-[20px] p-6 flex flex-col gap-4">
        <p className="text-[20px] text-black font-semibold">Dishes category</p>
        <div className="flex flex-wrap gap-3">
          <CategoryButton
            categoryName={"All dishes"}
            showedByCategory={() => setCategoryName("All dishes")}
            category={categoryName}
            foodCount={foodData.length}
          />
          {categoryData.map((category) => {
            return (
              <div key={category._id}>
                <CategoryButton
                  categoryName={category.categoryName}
                  showedByCategory={showCategoryByName}
                  foodCount={foodCountById(category._id)}
                />
              </div>
            );
          })}

          <button
            className="flex justify-center items-center bg-red-500 rounded-full cursor-pointer w-9 h-9"
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
      <div className="flex flex-col gap-6 overflow-y-scroll">
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
// const nextBtn = () => {
//   const err = checkMailAndPass();
//   if (Object.keys(err).length === 0) {
//     setErrState({});
//     router.push(`/admin`);
//   } else {
//     setErrState(err);
//   }
// };

// router.push(`/admin`);
// "Addpass11!"
// "email": "newuser@gmail.com",
//   "password": "Userpass11!",
//   "role": "user"
