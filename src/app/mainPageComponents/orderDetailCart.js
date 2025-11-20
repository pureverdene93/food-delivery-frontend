"use client";
import { useState } from "react";
import { useEffect } from "react";
import { FoodCardFromOrderInfo } from "./foodCardFromOrderInfo";
import { BiggerIcon } from "../icons/biggerIcon";
import { jwtDecode } from "jwt-decode";

export const OrderDetailCart = () => {
  const [foodCardData, setFoodCardData] = useState([]);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [userData, setUserData] = useState([]);

  const getDataSafe = () => {
    try {
      const data = JSON.parse(localStorage.getItem("addedCard"));
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  };
  const totalPrice = foodCardData.reduce(
    (sum, items) => sum + items.totalPrice || 0,
    0
  );
  console.log("this is total price", totalPrice);

  const createOrder = async () => {
    try {
      await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          user: userData,
          totalPrice: totalPrice,
          foodOrderItems: foodCardData,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFoodCardData(getDataSafe());
    const user = localStorage.getItem("token");
    const decodedToken = jwtDecode(user);
    const stringifyId = decodedToken._id;
    setUserData(stringifyId);
  }, []);
  console.log(deliveryLocation);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-[471px] h-[532px] bg-white rounded-xl flex items-center justify-between flex-col p-4">
        {foodCardData.length === 0 ? (
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-black">My cart</h4>
            <div className="w-[439px] h-[182px] bg-[#F4F4F5] rounded-xl flex flex-col items-center justify-center gap-1">
              <BiggerIcon />
              <p className="text-[16px] text-black font-bold">
                Your cart is empthy
              </p>
              <p className="text-[#71717A] text-[12px] font-normal w-[343px] text-center">
                Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                your cravings!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              <p className="text-[20px] font-semibold text-[#71717A]">
                My cart
              </p>
              <div className="flex flex-col gap-5 divide-y h-[300px] overflow-y-scroll">
                {foodCardData.map((items) => {
                  return (
                    <div key={items.id}>
                      <FoodCardFromOrderInfo items={items} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[20px] font-semibold text-[#71717A]">
                Delivery location
              </p>
              <input
                className="w-[439px] h-20 rounded-xl border border-zinc-300 text-[14px] text-black font-normal pl-3 pb-2"
                placeholder="Please share your complete address"
                type="text"
                onChange={(e) => setDeliveryLocation(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="w-[471px] h-[276px] bg-white rounded-xl p-4 flex flex-col justify-between">
        {foodCardData.length === 0 ? (
          <>
            <p className="text-[20px] font-semibold text-[#71717A]">
              Payment info
            </p>
            <div className="w-[439px] h-[70px] flex flex-col gap-2 border-b">
              <div className="flex justify-between">
                <p className="font-normal text-[16px] text-[#71717A]">Items</p>
                <p className="text-[16px] text-black font-bold">-</p>
              </div>
              <div className="flex justify-between">
                <p className="font-normal text-[16px] text-[#71717A]">
                  Shipping
                </p>
                <p className="text-[16px] text-black font-bold">-</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-normal text-[16px] text-[#71717A]">Total</p>
              <p className="text-[16px] text-black font-bold">-</p>
            </div>
            <button className="opacity-35 w-[439px] h-11 rounded-3xl bg-red-500 font-medium text-white text-[14px] flex justify-center items-center cursor-pointer">
              Checkout
            </button>
          </>
        ) : (
          <>
            <p className="text-[20px] font-semibold text-[#71717A]">
              Payment info
            </p>
            <div className="w-[439px] h-[70px] flex flex-col gap-2 border-b">
              <div className="flex justify-between">
                <p className="font-normal text-[16px] text-[#71717A]">Items</p>
                <p className="text-[16px] text-black font-bold">
                  ${totalPrice}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-normal text-[16px] text-[#71717A]">
                  Shipping
                </p>
                <p className="text-[16px] text-black font-bold">0.99$</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-normal text-[16px] text-[#71717A]">Total</p>
              <p className="text-[16px] text-black font-bold">
                ${totalPrice + 0.99}
              </p>
            </div>
            <button
              className="w-[439px] h-11 rounded-3xl bg-red-500 font-medium text-white text-[14px] flex justify-center items-center cursor-pointer"
              onClick={createOrder}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
