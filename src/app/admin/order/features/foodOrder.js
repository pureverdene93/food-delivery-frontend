"use client";
import { useEffect, useState } from "react";
import { UpAndDown } from "@/app/icons/upAndDown";
import { Orders } from "../components/orders";
import { ChangeAllDeliveryState } from "../components/chageAllDeliveryState";

const backend_url = process.env.BACKEND_URL;
const getOption = { method: "GET" };
const orderApiLink = `${backend_url}/order`;

export const FoodOrder = () => {
  const [state, setState] = useState(false);
  const [deliveryState, setDeliveryState] = useState(false);
  const [orderData, setOrderData] = useState([]);

  console.log(backend_url, "this is backendurl");

  const getData = async () => {
    const orderDataFetch = await fetch(orderApiLink, getOption);
    const orderJsonData = await orderDataFetch.json();
    setOrderData(orderJsonData);
  };
  useEffect(() => {
    getData();
  }, []);

  const countDeliveryState = Object.values(state).reduce(
    (prev, cur) => (cur === true ? prev + 1 : prev),
    0
  );

  const checkOrder = (index) => () => {
    if (state[index] === true) {
      setState({ ...state, [index]: false });
    } else {
      setState({ ...state, [index]: true });
    }
  };
  console.log(state, countDeliveryState);

  const handleDeliveryStateTrue = () => {
    if (countDeliveryState > 0) {
      setDeliveryState(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <button className="w-full flex justify-end">
        <img src="/me.jpg" className="object-cover w-9 h-9 rounded-full" />
      </button>
      <div className="w-[1171px] min-h-32 bg-white border border-zinc-300 rounded-2xl">
        <div className="w-[1171px] h-[76px] flex flex-row justify-between items-center pl-4 pr-4 border-b">
          <div>
            <p className="text-[20px] text-black font-bold">Orders</p>
            <p className="text-[12px] font-medium text-zinc-300">32 items</p>
          </div>
          <div className="flex gap-3">
            <input type="date" />
            <button
              className={`flex items-center pl-4 pr-4 min-w-[179px] h-9
              rounded-[80px] cursor-pointer text-[14px] gap-2
              font-medium text-white content-center ${
                countDeliveryState > 0 ? "bg-black" : "bg-zinc-200"
              }`}
              onClick={handleDeliveryStateTrue}
            >
              Change delivery state
              {countDeliveryState > 0 && (
                <div
                  className="text-[12px] flex text-black bg-white
                font-semibold justify-center items-center rounded-2xl w-[26px] h-5"
                >
                  {countDeliveryState}
                </div>
              )}
            </button>
            {deliveryState === true && countDeliveryState > 0 && (
              <div
                className="fixed z-50 bg-[rgba(0,0,0,0.5)] w-full h-full
                top-0 left-0 flex justify-center items-center"
              >
                <ChangeAllDeliveryState
                  handleSetDeliveryStateFalse={() => setDeliveryState(false)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center h-[52px] border-b">
          <div className="w-12 h-[52px] flex justify-center items-center">
            <input type="checkbox" className="cursor-pointer" />
          </div>
          <div className="w-14 h-[52px] flex items-center justify-center">
            <span className="text-[14px]">№</span>
          </div>
          <div className="w-[213px] h-[52px] flex justify-start items-center">
            <span className="text-gray-500 text-[14px] font-medium pl-4">
              Customer
            </span>
          </div>
          <div className="w-40 h-[52px] flex items-center justify-start">
            <span className="text-[14px] text-gray-500 font-medium pl-4">
              Food
            </span>
          </div>
          <div className="w-40 h-[52px] flex items-center justify-start">
            <div className="text-gray-500 text-[14px] font-medium pl-4 flex items-center justify-between w-[140px]">
              Date
              <button className="cursor-pointer">
                <UpAndDown />
              </button>
            </div>
          </div>
          <div className="w-40 h-[52px] flex items-center justify-start">
            <span className="text-gray-500 text-[14px] font-medium pl-4">
              Total
            </span>
          </div>
          <div className="w-[213px] h-[52px] flex items-center justify-start">
            <span className="text-gray-500 text-[14px] font-medium pl-4">
              Delivery Adress
            </span>
          </div>
          <div className="w-40 h-[52px] flex items-center justify-start">
            <span className="text-gray-500 text-[14px] font-medium pl-4flex items-center justify-between w-[140px]">
              Delivery State
              <button className="cursor-pointer">
                <UpAndDown />
              </button>
            </span>
          </div>
        </div>
        <div className="divide-y">
          {orderData.map((order, index) => {
            return (
              <div key={order._id}>
                <Orders
                  countDeliveryState={checkOrder}
                  index={index}
                  orderData={order}
                  getData={getData}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
