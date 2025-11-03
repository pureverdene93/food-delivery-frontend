"use client";
import { useState } from "react";
import { useEffect } from "react";
import { AddFoodIcon } from "../icons/addFoodIcon";
import { SetFalseDeliveryState } from "../icons/setFalseDeliveryState-icon";

export const Addfood = () => {
  const [state, setState] = useState(false);
  const [image, setImage] = useState(null);

  const imageUpload = (event) => {
    const imageDisplay = event.target.files[0];
    if (imageDisplay) {
      setImage(URL.createObjectURL(imageDisplay));
    }
  };

  return (
    <div
      className="w-[270px] h-[241px] border rounded-2xl flex flex-col
      border-dashed border-red-500 justify-center items-center gap-[15px]"
    >
      <button
        className="flex justify-center items-center bg-red-500
          rounded-full cursor-pointer w-11 h-11"
        onClick={() => setState(true)}
      >
        <AddFoodIcon />
      </button>
      {state === true ? (
        <div
          className="w-[460px] h-[592px] bg-white z-1 flex flex-col
            items-center justify-evenly m-[900px] absolute"
        >
          <div className="flex h-9 w-[412px] items-center justify-between">
            <p className="text-black font-semibold text-[18px]">
              Add new Dish to Appetizers
            </p>
            <button
              className="w-9 h-9 bg-zinc-300 rounded-full flex
                justify-center items-center cursor-pointer"
              onClick={() => setState(false)}
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
              />
            </div>
            <div className="flex flex-col items-baseline gap-2">
              <p className="text-[14px] text-black font-medium ">Food price</p>
              <input
                className="w-[194px] h-[38px] border border-zinc-300 rounded-xl pl-3"
                placeholder="Enter price"
              />
            </div>
          </div>
          <div className="w-[412px] flex flex-col items-baseline gap-2">
            <p>Ingredients</p>
            <input
              className="w-[412px] h-[90px] border border-zinc-200 rounded-xl pb-[50px] pl-3"
              placeholder="List ingredients..."
            />
          </div>
          <div className="flex flex-col w-[412px] items-baseline gap-2">
            <p>Food image</p>
            <label htmlFor="image-upload" className="w-[412px] h-[138px]">
              {!image && (
                <div>
                  <input
                    className="w-[412px] h-[138px] border-dashed border bg-blue-50
              border-blue-300 rounded-xl"
                    type="file"
                    id="image-upload"
                    onChange={imageUpload}
                  />
                </div>
              )}
              {image && (
                <div className="w-[412px] h-[138px] relative flex justify-end items-start">
                  <img
                    src={image}
                    className="w-full h-full object-cove z-[-1] absolute rounded-xl"
                  />
                  <button
                    className="w-9 h-9 bg-zinc-200 rounded-full flex justify-center
                    items-center cursor-pointer mr-[5px] mt-[5px]"
                    onClick={() => setImage(null)}
                  >
                    <SetFalseDeliveryState />
                  </button>
                </div>
              )}
            </label>
          </div>

          <div className="w-[412px] flex justify-end">
            <button
              className="bg-black w-[93px] h-10 rounded-xl text-white flex
              justify-center items-center font-medium text-[14px] cursor-pointer"
            >
              Add dish
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <p className="text-[14px] font-medium text-black w-[150px] text-center">
        Add new Dish to Appetizers
      </p>
    </div>
  );
};
