"use client";
import { MapIcon } from "../icons/mapIcon";
import { OrderedFoodIcon } from "../icons/orderedFoodIcon";
import { TimerIcon } from "../icons/timerIcon";

export const OrderHistoryDelivered = ({ data }) => {
  console.log(data, "user data");

  return (
    <div className="flex flex-col gap-2.5">
      <div className="w-[415px] h-7 flex items-center justify-between">
        <div className="flex">
          <p className="font-bold text-[16px] text-black">${data.totalPrice}</p>
          <p className="font-bold text-[16px] text-black">{`(#2015)`}</p>
        </div>
        <div
          className={`min-w-[68px] pl-2.5 pr-2.5 h-7 border border-green-500 rounded-xl flex justify-center items-center text-[12px] text-black font-semibold`}
        >
          {data.status}
        </div>
      </div>
      <div className="flex  flex-col gap-2.5">
        <div className="flex w-[415px] justify-between items-center">
          {data.foodOrderItem.map((name, index) => {
            return (
              <span
                className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2"
                key={index}
              >
                <OrderedFoodIcon /> {name.food.foodName}
              </span>
            );
          })}
          {data.foodOrderItem.map((name, index) => {
            return (
              <p className="text-[12px] text-black font-normal" key={index}>
                x {name.quantity}
              </p>
            );
          })}
        </div>
        <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
          <TimerIcon /> {data.updatedAt?.slice(0, 10).replace(/-g/, "/")}
        </span>
        <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
          <MapIcon /> 2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          emn
        </span>
      </div>
    </div>
  );
};
