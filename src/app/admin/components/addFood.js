"use client";
import { AddFoodIcon } from "@/app/icons/addFoodIcon";
import { useState } from "react";
import { EditAndAddNewFood } from "./editAndAddNewFood";

export const Addfood = (props) => {
  const { foodName } = props;
  const [state, setState] = useState(false);

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
        <EditAndAddNewFood
          title={`Add new Dish to ${foodName}`}
          exit={() => setState(false)}
        />
      ) : (
        ""
      )}

      <p className="text-[14px] font-medium text-black w-[150px] text-center">
        Add new Dish to {foodName}
      </p>
    </div>
  );
};
