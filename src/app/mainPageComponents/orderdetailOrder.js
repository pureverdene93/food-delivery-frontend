import { MapIcon } from "../icons/mapIcon";
import { OrderedFoodIcon } from "../icons/orderedFoodIcon";
import { TimerIcon } from "../icons/timerIcon";

export const OrderDetailOrder = () => {
  return (
    <div className="w-[471px] h-[832px] rounded-xl bg-white p-4 flex flex-col gap-5 items-center">
      <p className="text-[20px] font-semibold text-black self-start">
        Order history
      </p>
      <div className="w-[415px] h-7 flex items-center justify-between">
        <div className="flex">
          <p className="font-bold text-[16px] text-black">$26.97</p>
          <p className="font-bold text-[16px] text-black">{`(#2015)`}</p>
        </div>
        <div
          className={`w-[68px] h-7 border border-red-500 rounded-xl flex justify-center items-center text-[12px] text-black font-semibold`}
        >
          Pending
        </div>
      </div>
      <div className="flex  flex-col gap-2.5">
        <div className="flex w-[415px] justify-between items-center">
          <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
            <OrderedFoodIcon /> Sunshine Stackers
          </span>
          <p className="text-[12px] text-black font-normal">x 1</p>
        </div>
        <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
          <TimerIcon /> 2024/12/20
        </span>
        <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
          <MapIcon /> 2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          emn
        </span>
      </div>
      <div className="flex  flex-col gap-2.5 border-t">
        <div className="w-[415px] h-7 flex items-center justify-between mt-5">
          <div className="flex">
            <p className="font-bold text-[16px] text-black">$26.97</p>
            <p className="font-bold text-[16px] text-black">{`(#2015)`}</p>
          </div>
          <div
            className={`pl-2.5 pr-2.5 min-w-[68px] h-7 border border-green-500 rounded-xl flex justify-center items-center text-[12px] text-black font-semibold`}
          >
            Delivered
          </div>
        </div>
        <div className="flex w-[415px] justify-between items-center">
          <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
            <OrderedFoodIcon /> Sunshine Stackers
          </span>
          <p className="text-[12px] text-black font-normal">x 1</p>
        </div>
        <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
          <TimerIcon /> 2024/12/20
        </span>
        <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
          <MapIcon /> 2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          emn
        </span>
      </div>
    </div>
  );
};
