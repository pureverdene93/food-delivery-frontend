"use client";
import { DownIcon } from "@/app/icons/downIcon";
import { useState } from "react";
import { OrderedFood } from "./orderFood";
import { UpAndDown } from "@/app/icons/upAndDown";

export const Orders = (props) => {
  const [state, setState] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [orderFoodState, setOrderedFoodState] = useState(false);
  const { countDeliveryState, index, orderData } = props;

  const handleDelivered = () => {
    setStatus("Delivered");
    setState(false);
  };

  const handleCancelled = () => {
    setStatus("Cancelled");
    setState(false);
  };

  const handlePending = () => {
    setStatus("Pending");
    setState(false);
  };

  const statusBtn = () => {
    setState(!state);
  };
  const changeOrderedFoodState = () => {
    setOrderedFoodState(!orderFoodState);
    setState(false);
  };
  console.log("this is state", state);
  console.log(orderData, "this is order data");

  return (
    <div className="h-14 flex flex-row border-b">
      <div className="w-12 h-14 flex justify-center items-center">
        <input
          type="checkbox"
          className="cursor-pointer"
          onChange={countDeliveryState(index)}
        />
      </div>
      <div className="w-14 h-14 flex justify-center items-center">
        <span className="text-[14px] font-normal">{index}</span>
      </div>
      <div className="w-[213px] h-14 flex items-center justify-start ">
        <span className="text-[14px] font-medium text-gray-500 pl-4">
          {orderData.user.email}
        </span>
      </div>
      <div className="w-40 h-14 flex justify-start items-center relative">
        <span
          className="text-[14px] w-[130px] font-medium text-gray-500 pl-4
        flex items-center justify-between"
        >
          2 foods
          <button className="cursor-pointer" onClick={changeOrderedFoodState}>
            <DownIcon />
          </button>
        </span>
        {orderFoodState === true ? (
          <div
            className="absolute min-w-[264px] min-h-12 bg-white z-10
            rounded-xl border border-zinc-300 p-3 flex flex-col gap-3 mt-[110px]"
          >
            <OrderedFood />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="w-40 h-14 flex justify-start items-center">
        <span className="text-[14px] font-medium text-gray-500 pl-4">
          2024/12/20
        </span>
      </div>
      <div className="w-40 h-14 flex justify-start items-center">
        <span className="text-[14px] font-medium text-gray-500 pl-4">
          ${orderData.totalPrice}
        </span>
      </div>
      <div className="w-[213px] h-14 flex items-center justify-start">
        <span className="text-[12px] text-gray-500 font-medium w-[181px] h-8 pl-4">
          {orderData.user.adress}
        </span>
      </div>
      <div className="w-40 h-14 flex items-center justify-start">
        <button
          className={`min-w-[94px] h-8 border cursor-pointer rounded-[80px] text-[12px] 
        font-semibold ml-4 flex items-center justify-evenly ${
          status === "Pending" ? "border-red-500" : ""
        } ${status === "Delivered" ? "border-green-500" : ""}`}
          onClick={statusBtn}
        >
          {status} <UpAndDown />
        </button>
        {state === true ? (
          <div
            className="w-36 h-[116px] bg-white absolute mt-[147px] shadow-2xl
            rounded-2xl flex flex-col items-baseline justify-evenly pl-2.5"
          >
            <button
              className="cursor-pointer w-[75px] h-6 bg-zinc-100
            rounded-2xl text-[12px] font-medium text-black"
              onClick={handleDelivered}
            >
              Delivered
            </button>
            <button
              className={`cursor-pointer w-[67px] h-6 bg-zinc-100
            rounded-2xl text-[12px] font-medium text-black`}
              onClick={handlePending}
            >
              Pending
            </button>
            <button
              className="cursor-pointer w-[78px] h-6 bg-zinc-100
            rounded-2xl text-[12px] font-medium text-black"
              onClick={handleCancelled}
            >
              Cancelled
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
