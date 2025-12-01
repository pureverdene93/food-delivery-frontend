"use client";
import { MapIcon } from "../icons/mapIcon";
import { OrderedFoodIcon } from "../icons/orderedFoodIcon";
import { TimerIcon } from "../icons/timerIcon";

export const OrderHistoryPending = ({ data }) => {
//   console.log(data, "user data pending");

  return (
    <div className="flex  flex-col gap-2.5">
      <div className="w-[415px] h-7 flex items-center justify-between mt-5">
        <div className="flex">
          <p className="font-bold text-[16px] text-black">${data.totalPrice}</p>
          <p className="font-bold text-[16px] text-black">{`(#2016)`}</p>
        </div>
        <div
          className={`w-[68px] h-7 border border-red-500 rounded-xl flex justify-center items-center text-[12px] text-black font-semibold`}
        >
          {data.status}
        </div>
      </div>

      <div className="flex gap-2.5 flex-col w-[415px] justify-between items-center">
        {data.foodOrderItem.map((name, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center w-[415px]"
            >
              <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
                <OrderedFoodIcon /> {name.food?.foodName}
              </span>
              <p className="text-[12px] text-black font-normal" key={index}>
                x {name.quantity}
              </p>
            </div>
          );
        })}
      </div>
      <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
        <TimerIcon /> {data.updatedAt.slice(0, 10).replace(/-g/, "/")}
      </span>

      <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
        <MapIcon /> {data.user.adress}
      </span>
    </div>
  );
};
