"use client";
import { useState } from "react";
import { useEffect } from "react";
import { SetFalseDeliveryState } from "@/app/icons/setFalseDeliveryState-icon";

export const AddCategoryCard = (props) => {
  const { exit, categoryData, getDataTest } = props;

  const [saveCategory, setSaveCategory] = useState("");
  const [token, setToken] = useState(null);
  // console.log(saveCategory);

  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    // console.log(adminToken);

    if (adminToken) {
      setToken(adminToken);
    }
  }, []);

  const addNewCategory = async () => {
    try {
      await fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryName: saveCategory,
        }),
      });
      await getDataTest();
      exit();
    } catch (err) {
      console.log(err);
    }
  };
  //   console.log(addCategory, "this is new array");
  console.log(categoryData, "this is category data");

  return (
    <div
      className="fixed z-50 bg-[rgba(0,0,0,0.5)] w-full h-full
            top-0 left-0 flex justify-center items-center"
    >
      <div className="w-[460px] h-[272px] bg-white rounded-xl flex flex-col items-center justify-around">
        <div className="flex items-center justify-between w-[412px]">
          <p className="text-black text-[18px] font-semibold">
            Add new category
          </p>
          <button
            className="w-9 h-9 bg-zinc-300 rounded-full flex items-center
                            justify-center cursor-pointer"
            onClick={exit}
          >
            <SetFalseDeliveryState />
          </button>
        </div>
        <div className="flex flex-col w-[412px] gap-2">
          <p className="text-[14px] text-black font-medium">Category name</p>
          <input
            className="w-[412px] h-[38px] rounded-xl border border-zinc-300 pl-3"
            placeholder="Type category name..."
            onChange={(e) => setSaveCategory(e.target.value)}
          />
        </div>
        <div className="w-[412px] flex justify-end">
          <button
            className="w-[123px] h-10 rounded-xl bg-black text-white flex
                        justify-center items-center text-[14px] cursor-pointer"
            onClick={() => addNewCategory()}
          >
            Add category
          </button>
        </div>
      </div>
    </div>
  );
};
