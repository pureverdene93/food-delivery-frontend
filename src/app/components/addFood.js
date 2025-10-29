import { AddFoodIcon } from "../icons/addFoodIcon";

export const Addfood = () => {
  return (
    <div
      className="w-[270px] h-[241px] border rounded-2xl flex flex-col
      border-dashed border-red-500 justify-center items-center gap-[15px]"
    >
      <button
        className="flex justify-center items-center bg-red-500
         rounded-full cursor-pointer w-11 h-11"
      >
        <AddFoodIcon />
      </button>
      <p className="text-[14px] font-medium text-black w-[150px] text-center">
        Add new Dish to Appetizers
      </p>
    </div>
  );
};
