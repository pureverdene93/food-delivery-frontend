"use client";
import { useState } from "react";
import { SetFalseDeliveryState } from "../icons/setFalseDeliveryState-icon";

export const EditAndAddNewFood = (props) => {
  const { exit, title } = props;

  const [image, setImage] = useState(null);
  const imageUpload = (event) => {
    const imageDisplay = event.target.files[0];
    if (imageDisplay) {
      setImage(URL.createObjectURL(imageDisplay));
    }
  };

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
    </div>
  );
};
