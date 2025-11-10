import { FoodCard } from "../mainPageComponents/food-card";

export const FoodsByCategorySection = () => {
  return (
    <div className="flex flex-col gap-[54px] w-[1264px]">
      <p className="text-[30px] font-semibold text-white">Appetizers</p>
      <div className="flex flex-wrap w-[1264px] gap-9">
        <FoodCard />
      </div>
    </div>
  );
};
