"use client";
export const OrderedFood = ({ orderData }) => {
  // console.log(orderData, "uyrgfuyergfugefuhvefvr");

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img
          className="object-cover w-8 h-[30px] rounded"
          src={orderData.foodOrderItem.food.image}
        />
        <p className="text-black font-normal text-[12px]">jdhyfgvuf</p>
      </div>
      <p className="text-black font-normal text-[12px]">x1</p>
    </div>
  );
};
