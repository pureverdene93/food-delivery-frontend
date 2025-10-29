import { CategoryButton } from "../components/categoryButton";
import { AddFoodIcon } from "../icons/addFoodIcon";
import { CategorySection } from "./categorySection";

export const FoodMenu = () => {
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
          <button
            className="flex justify-center items-center bg-red-500
          rounded-full cursor-pointer w-9 h-9"
          >
            <AddFoodIcon />
          </button>
        </div>
      </div>
      <CategorySection />
      
    </div>
  );
};
