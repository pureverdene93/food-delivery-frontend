"use client";
import { useState } from "react";
import { useEffect } from "react";
import { OrderWhiteIcon } from "../icons/orderWhite-icon";
import { ExitWhite } from "../icons/exitWhite";
import { OrderDetailCart } from "./orderDetailCart";
import { OrderDetailOrder } from "./orderdetailOrder";
import { jwtDecode } from "jwt-decode";

// const backend_url = process.env.BACKEND_URL;
// const getOption = { method: "GET" };

export const OrderInfo = ({ exit }) => {
  const [sideBarAnimation, setSideBarAnimation] = useState("animate-slideIn");
  const [orderDetail, setOrderDetail] = useState("Cart");
  // const [orderByUserId, setOrderByUserId] = useState([]);
  // const [token, setToken] = useState(null);
  // const [userId, setUserId] = useState(null);

  // const orderApiLink = `${backend_url}/order/${userId}`;

  // const getData = async () => {
  //   const orderData = await fetch(orderApiLink, getOption);
  //   const jsonOrderData = await orderData.json();
  //   setOrderByUserId(jsonOrderData);
  // };

  // useEffect(() => {
  //   const myToken = localStorage.getItem("token");
  //   setToken(myToken);
  //   const decodedToken = jwtDecode(myToken);
  //   setUserId(decodedToken.id);
  //   getData();
  //   // console.log(decodedToken, "decoded token from order");
  // }, []);
  // // console.log(userId, "it is token");

  const close = () => {
    setSideBarAnimation("animate-slideOut");
  };
  const animationEnd = () => {
    if (sideBarAnimation === "animate-slideOut") {
      exit();
    }
  };
  return (
    <div
      className="fixed w-full h-full z-50 top-0 left-0 flex justify-end duration-300"
      onClick={close}
    >
      <div
        className={`p-8 w-[535px] h-full bg-[#404040] ${sideBarAnimation} transform translate-x-0 flex items-center gap-6 flex-col`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={animationEnd}
      >
        <div className="flex w-[471px] justify-between items-center">
          <p className=" text-white font-semibold flex text-[20px] items-center gap-3">
            <OrderWhiteIcon /> Order detail
          </p>
          <button
            className="w-9 h-9 rounded-full border border-white flex justify-center items-center cursor-pointer"
            onClick={close}
          >
            <ExitWhite />
          </button>
        </div>
        <div className="w-[471px] h-11 bg-white rounded-3xl p-1 flex items-center">
          <button
            className={`w-[227px] h-9 rounded-3xl text-[18px] font-normal cursor-pointer flex items-center justify-center ${
              orderDetail === "Cart" ? "bg-red-500 text-white" : "text-black"
            }`}
            onClick={() => setOrderDetail("Cart")}
          >
            Cart
          </button>
          <button
            className={`w-[227px] h-9 rounded-3xl text-[18px] font-normal cursor-pointer flex items-center justify-center ${
              orderDetail === "Order" ? "bg-red-500 text-white" : "text-black"
            }`}
            onClick={() => setOrderDetail("Order")}
          >
            Order
          </button>
        </div>
        {orderDetail === "Cart" ? (
          <OrderDetailCart animationEnd={animationEnd} />
        ) : (
          <OrderDetailOrder />
        )}
      </div>
    </div>
  );
};
