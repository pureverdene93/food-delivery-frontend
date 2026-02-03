"use client";
export const OrderedFood = ({ orderData }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img
          className="object-cover w-8 h-[30px] rounded"
          src={orderData.food?.image}
        />
        <p className="text-black font-normal text-[12px]">{orderData.food?.foodName}</p>
      </div>
      <p className="text-black font-normal text-[12px]">x{orderData.quantity}</p>
    </div>
  );
};
