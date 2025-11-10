"use client";
import { DropDown } from "@/app/icons/dropdown-icon";
import { SetFalseDeliveryState } from "@/app/icons/setFalseDeliveryState-icon";
import { useEffect, useState } from "react";
import { AddImage } from "./addImage";
import { DeleteIconSVG } from "@/app/icons/deleteIcon";

const option = {
  method: "GET",
};

export const EditFoodInfo = (props) => {
  const { exit, foodId, getFoodData } = props;

  const categoryApiLink = `http://localhost:8000/category`;

  const [categoryData, setCategoryData] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [changeCategory, setChangeCategory] = useState("Change category");
  const [token, setToken] = useState(null);
  const [editFoodName, setEditFoodName] = useState("");
  const [editIngredients, setEditIgredients] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState(null);
  const getData = async () => {
    const categoryData = await fetch(categoryApiLink, option);
    const jsonCategoryData = await categoryData.json();
    setCategoryData(jsonCategoryData);
  };

  console.log(changeCategory, "changeCategory");

  const clickAndChangeCategory = (newCategory) => {
    setChangeCategory(newCategory);
    setDropDown(false);
  };
  const findCategoryId = categoryData.find((category) => {
    return category.categoryName === changeCategory;
  });
  console.log(findCategoryId, "ene yg yu butsagad baigaanbee");

  const editAndSaveFoodInfo = async () => {
    try {
      await fetch(`http://localhost:8000/food/${foodId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodName: editFoodName,
          price: Number(editPrice),
          image: editImage,
          ingredients: editIngredients,
          category: findCategoryId._id,
        }),
      });
      await getFoodData();
      exit();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    if (adminToken) {
      setToken(adminToken);
    }
    getData();
  }, [editAndSaveFoodInfo, getFoodData()]);

  return (
    <div
      className="fixed z-50 bg-[rgba(0,0,0,0.5)] w-full h-full
      top-0 left-0 flex justify-center items-center"
    >
      <div className="w-[472px] h-[596px] bg-white rounded-xl flex justify-center">
        <div className="w-[424px] flex flex-col justify-around">
          <div className="flex items-center w-[424px] justify-between">
            <p className="text-black font-semibold text-[18px]">Dishes info</p>
            <button
              className="w-9 h-9 bg-zinc-300 rounded-full flex justify-center
            cursor-pointer items-center"
              onClick={exit}
            >
              <SetFalseDeliveryState />
            </button>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] text-gray-500 font-normal">Dish name</p>
            <input
              className="border w-[288px] h-9 border-zinc-300 rounded-xl
              pl-3 text-[14px] text-black font-normal"
              placeholder="Change dish name..."
              onChange={(e) => setEditFoodName(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] text-gray-500 font-normal">
              Dish category
            </p>
            <div
              className="w-[288px] h-9 bg-white rounded-xl flex flex-row justify-between
            border border-zinc-300 items-center pl-2 pr-2"
            >
              <button
                className="h-5 min-w-[116px] flex justify-start bg-zinc-100 text-black
              rounded-xl text-[12px] font-semibold items-center pl-2"
              >
                {changeCategory}
              </button>
              <button
                onClick={() => setDropDown(true)}
                className="cursor-pointer"
              >
                <DropDown />
              </button>
            </div>
            {dropDown === true ? (
              <div
                className="absolute min-w-[140px] min-h-9 bg-white rounded-xl flex flex-col p-2
              gap-2 items-center ml-34 mt-9 border"
              >
                {categoryData.map((category) => {
                  return (
                    <button
                      key={category._id}
                      onClick={() =>
                        clickAndChangeCategory(category.categoryName)
                      }
                      className="h-5 min-w-[116px] justify-start flex items-center bg-zinc-100 text-black
                      rounded-xl text-[12px] font-semibold pl-2 cursor-pointer"
                    >
                      {category.categoryName}
                    </button>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] text-gray-500 font-normal">Ingredients</p>
            <input
              className="border border-zinc-300 rounded-xl w-[280px] h-20 pt-2 pl-3 pr-3 pb-2
              text-black font-normal text-[14px]"
              placeholder="Change ingredients..."
              type="text"
              onChange={(e) => setEditIgredients(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] text-gray-500 font-normal">Price</p>
            <input
              className="border w-[288px] h-9 border-zinc-300 rounded-xl
              pl-3 text-[14px] text-black font-normal"
              placeholder="Change dish price..."
              onChange={(e) => setEditPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] text-gray-500 font-normal">Image</p>
            <AddImage wh={`w-[288px] h-[116px]`} />
          </div>
          <div className="flex justify-between">
            <button
              className="cursor-pointer w-12 h-10 border border-red-500 rounded-xl
            flex justify-center items-center"
            >
              <DeleteIconSVG />
            </button>
            <button
              className="w-[126px] h-10 bg-black rounded-xl text-white flex
                justify-center items-center font-medium text-[14px] cursor-pointer"
              onClick={editAndSaveFoodInfo}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
