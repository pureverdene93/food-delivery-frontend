"use client";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { MapIcon } from "../icons/mapIcon";
import { OrderedFoodIcon } from "../icons/orderedFoodIcon";
import { TimerIcon } from "../icons/timerIcon";
import { OrderHistoryDelivered } from "./orderHistoryDelivered";
import { OrderHistoryPending } from "./orderHistoyPending";
import { OrderHistoryCancelled } from "./orderHistoryCancelled";

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
  // console.log(statusDelivered, "status delivered");
  const statusPending = orderByUserId.filter((status) => {
    return status.status === "Pending";
  });
  const statusCancelled = orderByUserId.filter((status) => {
    return status.status === "Cancelled";
  });

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
    <div className="w-[471px] h-[832px] rounded-xl bg-white p-4 flex flex-col gap-5 items-center overflow-y-scroll">
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
      <div className="border-t">
        {statusPending.map((data, index) => {
          return (
            <div key={index}>
              <OrderHistoryPending data={data} />
            </div>
          );
        })}
      </div>
      <div className="border-t">
        {statusCancelled.map((data, index) => {
          return (
            <div key={index}>
              <OrderHistoryCancelled data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
