import { Addfood } from "../components/addFood";
import { FoodCard } from "../components/foodCard";

export const CategorySection = () => {
  return (
    <div className="bg-white flex w-[1171px] min-h-[325px] rounded-2xl flex-col gap-4 p-5">
      <p className="text-5 font-semibold text-black">{"Appetizers (6)"}</p>
      <div className="flex flex-wrap gap-4">
        <Addfood />
        <FoodCard />
      </div>
    </div>
  );
};
