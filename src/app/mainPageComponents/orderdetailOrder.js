"use client";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { MapIcon } from "../icons/mapIcon";
import { OrderedFoodIcon } from "../icons/orderedFoodIcon";
import { TimerIcon } from "../icons/timerIcon";
import { OrderHistoryDelivered } from "./orderHistoryDelivered";

const backend_url = process.env.BACKEND_URL;
const getOption = { method: "GET" };

export const OrderDetailOrder = () => {
  const [orderByUserId, setOrderByUserId] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const orderApiLink = `${backend_url}/order/${userId}`;
  // console.log(userId, "it is user id");

  const getData = async () => {
    if (!userId) return;
    const orderData = await fetch(orderApiLink, getOption);
    const jsonOrderData = await orderData.json();
    setOrderByUserId(jsonOrderData);
  };

  // console.log(orderByUserId, "orders by user id");
  const statusDelivered = orderByUserId.filter((status) => {
    return status.status === "Delivered";
  });
  console.log(statusDelivered, "status delivered");

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    setToken(myToken);
    const decodedToken = jwtDecode(myToken);
    setUserId(decodedToken.id);
    getData();
    // console.log(decodedToken, "decoded token from order");
  }, [userId]);
  // console.log(userId, "it is token");

  return (
    <div className="w-[471px] h-[832px] rounded-xl bg-white p-4 flex flex-col gap-5 items-center">
      <p className="text-[20px] font-semibold text-black self-start">
        Order history
      </p>
      {statusDelivered.map((data, index) => {
        return (
          <div key={index}>
            <OrderHistoryDelivered data={data} />
          </div>
        );
      })}

      <div className="flex  flex-col gap-2.5 border-t">
        <div className="w-[415px] h-7 flex items-center justify-between mt-5">
          <div className="flex">
            <p className="font-bold text-[16px] text-black">$26.90</p>
            <p className="font-bold text-[16px] text-black">{`(#2016)`}</p>
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
          <TimerIcon /> 2024/12/22
        </span>
        <span className="text-[12px] font-normal text-[#71717A] flex items-center h-4 gap-2">
          <MapIcon /> 2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
          emn
        </span>
      </div>
    </div>
  );
};
