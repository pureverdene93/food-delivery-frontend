"use client";
import { useEffect, useState } from "react";
import { DownIcon } from "@/app/icons/downIcon";
import { UpAndDown } from "@/app/icons/upAndDown";
import { OrderedFood } from "./orderFood";
import { jwtDecode } from "jwt-decode";

const getOption = { method: "GET" };
const backend_url = process.env.BACKEND_URL;

export const Orders = ({
  countDeliveryState,
  index,
  orderData,
  getData,
  checked,
}) => {
  const [state, setState] = useState(false);
  const [orderFoodState, setOrderedFoodState] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(orderData.status);
  // const [foodOrderByUserId, setFoodOrderByUserId] = useState([]);

  useEffect(() => {
    setStatus(orderData.status);
  }, [orderData.status]);

  const orderApiLink = `${backend_url}/order/${userId}`;

  // const getFoodOrderByUserId = async () => {
  //   try {
  //     const orderData = await fetch(orderApiLink, getOption);
  //     const orderJsonData = await orderData.json();
  //     setFoodOrderByUserId(orderJsonData);
  //   } catch (err) {}
  // };

  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    if (adminToken) {
      setToken(adminToken);
      const decoded = jwtDecode(adminToken);
      setUserId(decoded.id);
      // getFoodOrderByUserId();
    }
  }, []);

  const changeStatus = async (status) => {
    try {
      await fetch(`${backend_url}/order/${orderData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      setStatus(status);
      await getData();
    } catch (err) {}
  };

  const statusBtn = () => setState(!state);
  const changeOrderedFoodState = () => {
    setOrderedFoodState(!orderFoodState);
    setState(false);
  };

  const date = orderData.createdAt.slice(0, 10);

  console.log("ORDER DATA:", orderData);

  return (
    <div className="h-12 sm:h-14 flex flex-row hover:bg-gray-50">
      <div className="w-12 flex justify-center items-center">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={checked}
          onChange={countDeliveryState(index)}
        />
      </div>
      <div className="w-12 flex justify-center items-center">
        <span className="text-xs sm:text-sm font-normal">{index + 1}</span>
      </div>
      <div className="flex-1 min-w-[180px] flex items-center justify-start">
        <span className="text-xs sm:text-sm font-medium text-gray-500 pl-4 truncate">
          {orderData.user?.email}
        </span>
      </div>
      <div className="w-24 flex justify-start items-center relative">
        <span className="text-xs sm:text-sm font-medium text-gray-500 pl-4 flex items-center gap-2">
          {orderData?.foodOrderItem?.length || 0} foods
          <button className="cursor-pointer" onClick={changeOrderedFoodState}>
            <DownIcon />
          </button>
        </span>
        {orderFoodState && (
          <div className="absolute left-0 top-full min-w-[200px] sm:min-w-[264px] bg-white z-10 rounded-xl border border-zinc-300 p-3 flex flex-col gap-3 shadow-lg">
            {orderData?.foodOrderItem?.map((order) => (
              <OrderedFood key={order._id} orderData={order} />
            ))}
          </div>
        )}
      </div>
      <div className="w-28 flex justify-start items-center">
        <span className="text-xs sm:text-sm font-medium text-gray-500 pl-4">
          {date}
        </span>
      </div>
      <div className="w-24 flex justify-start items-center">
        <span className="text-xs sm:text-sm font-medium text-gray-500 pl-4">
          ${orderData.totalPrice}
        </span>
      </div>
      <div className="flex-1 min-w-[160px] flex items-center justify-start">
        <span className="text-xs text-gray-500 font-medium pl-4 truncate max-w-[150px]">
          {orderData.user?.adress}
        </span>
      </div>
      <div className="w-32 flex items-center justify-start relative">
        <button
          className={`min-w-[80px] h-7 sm:h-8 border cursor-pointer rounded-full text-xs font-semibold ml-2 sm:ml-4 flex items-center justify-center gap-1 px-2 ${
            status === "Pending" ? "border-yellow-500 text-yellow-600" : ""
          } ${status === "Cancelled" ? "border-zinc-300 text-gray-500" : ""} ${
            status === "Delivered" ? "border-green-500 text-green-600" : ""
          }`}
          onClick={statusBtn}
        >
          {status} <UpAndDown />
        </button>
        {state && (
          <div className="w-28 sm:w-32 bg-white absolute top-full right-0 mt-1 shadow-xl rounded-xl flex flex-col items-stretch justify-evenly p-2 z-20 border">
            <button
              className="cursor-pointer h-7 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-xs font-medium text-black mb-1"
              onClick={() => {
                changeStatus("Delivered");
                setState(false);
              }}
            >
              Delivered
            </button>
            <button
              className="cursor-pointer h-7 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-xs font-medium text-black mb-1"
              onClick={() => {
                changeStatus("Pending");
                setState(false);
              }}
            >
              Pending
            </button>
            <button
              className="cursor-pointer h-7 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-xs font-medium text-black"
              onClick={() => {
                changeStatus("Cancelled");
                setState(false);
              }}
            >
              Cancelled
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
