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
  const [categoryId, setCategoryId] = useState("1");
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
  console.log(categoryId, "this is category id");

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
