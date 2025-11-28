"use client";
import { useEffect } from "react";
import { DownIcon } from "@/app/icons/downIcon";
import { useState } from "react";
import { OrderedFood } from "./orderFood";
import { UpAndDown } from "@/app/icons/upAndDown";
import { jwtDecode } from "jwt-decode";

const getOption = { method: "GET" };

export const Orders = (props) => {
  const { countDeliveryState, index, orderData, getData } = props;
  const [state, setState] = useState(false);
  const [orderFoodState, setOrderedFoodState] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(orderData.status);
  const [foodOrderByUsedrId, setFoodOrderByUserId] = useState([]);

  const orderApiLink = `http://localhost:8000/order/${userId}`;

  // console.log(orderData, "jdfgiuergliuyegr");

  const getFoodOrderByUsedrId = async () => {
    try {
      const orderData = await fetch(orderApiLink, getOption);
      const orderJsonData = await orderData.json();
      setFoodOrderByUserId(orderJsonData);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(foodOrderByUsedrId, "food orders by user id");

  useEffect(() => {
    getFoodOrderByUsedrId();
    const adminToken = localStorage.getItem("token");
    if (adminToken) {
      setToken(adminToken);
      const decoded = jwtDecode(adminToken);
      setUserId(decoded.id);
    }
  }, []);

  const changeStatus = async (status) => {
    try {
      await fetch(`http://localhost:8000/order/${orderData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      });
      setStatus(status);
      await getData();
    } catch (err) {
      console.log("error from client side", err);
    }
  };

  const statusBtn = () => {
    setState(!state);
    // console.log("changed");
  };
  const changeOrderedFoodState = () => {
    setOrderedFoodState(!orderFoodState);
    setState(false);
  };
  // console.log("this is state", state);
  // console.log(orderData, "this is order data");

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
        <span className="text-[14px] font-normal">{index + 1}</span>
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
            {foodOrderByUsedrId.map((order) => {
              return (
                <div key={order._id}>
                  <OrderedFood orderData={order} />
                </div>
              );
            })}
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
        } ${status === "Cancelled" ? "border-zinc-300" : ""} ${
            status === "Delivered" ? "border-green-500" : ""
          }`}
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
              onClick={() => {
                changeStatus("Delivered");
                setState(false);
              }}
            >
              Delivered
            </button>
            <button
              className={`cursor-pointer w-[67px] h-6 bg-zinc-100
            rounded-2xl text-[12px] font-medium text-black`}
              onClick={() => {
                changeStatus("Pending");
                setState(false);
              }}
            >
              Pending
            </button>
            <button
              className="cursor-pointer w-[78px] h-6 bg-zinc-100
            rounded-2xl text-[12px] font-medium text-black"
              onClick={() => {
                changeStatus("Cancelled");
                setState(false);
              }}
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
