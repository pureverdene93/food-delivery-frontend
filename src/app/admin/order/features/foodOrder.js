"use client";
import { useEffect, useState } from "react";
import { UpAndDown } from "@/app/icons/upAndDown";
import { Orders } from "../components/orders";
import { ChangeAllDeliveryState } from "../components/chageAllDeliveryState";

const backend_url = process.env.BACKEND_URL;
const getOption = { method: "GET" };
const orderApiLink = `${backend_url}/order`;

export const FoodOrder = () => {
  const [state, setState] = useState({});
  const [deliveryState, setDeliveryState] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const getData = async () => {
    const orderDataFetch = await fetch(orderApiLink, getOption);
    const orderJsonData = await orderDataFetch.json();
    setOrderData(orderJsonData);
  };

  useEffect(() => {
    getData();
  }, []);

  const countDeliveryState = Object.values(state).filter(Boolean).length;

  const getSelectedOrderIds = () => {
    return Object.entries(state)
      .filter(([_, isChecked]) => isChecked)
      .map(([index]) => orderData[index]?._id)
      .filter(Boolean);
  };

  const updateSelectedOrdersStatus = (newStatus) => {
    const selectedIds = getSelectedOrderIds();
    setOrderData((prev) =>
      prev.map((order) =>
        selectedIds.includes(order._id)
          ? { ...order, status: newStatus }
          : order,
      ),
    );
  };

  const checkOrder = (index) => () => {
    setState((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const checkAllOrders = (e) => {
    const isChecked = e.target.checked;
    const newState = {};
    orderData.forEach((_, index) => (newState[index] = isChecked));
    setState(newState);
  };

  const handleDeliveryStateTrue = () => {
    if (countDeliveryState > 0) setDeliveryState(true);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-7xl">
      <button className="w-full flex justify-end">
        <img
          src="/me.jpg"
          className="object-cover w-8 h-8 sm:w-9 sm:h-9 rounded-full"
        />
      </button>
      <div className="w-full min-h-32 bg-white border border-zinc-300 rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b gap-3">
          <div>
            <p className="text-base sm:text-lg lg:text-xl text-black font-bold">
              Orders
            </p>
            <p className="text-xs font-medium text-zinc-300">
              {orderData.length} items
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              className={`flex items-center px-3 sm:px-4 h-8 sm:h-9
                rounded-full cursor-pointer text-xs sm:text-sm gap-2
                font-medium text-white ${
                  countDeliveryState > 0 ? "bg-black" : "bg-zinc-200"
                }`}
              onClick={handleDeliveryStateTrue}
            >
              <span className="hidden sm:inline">Change delivery state</span>
              <span className="sm:hidden">Change state</span>
              {countDeliveryState > 0 && (
                <div className="text-xs flex text-black bg-white font-semibold justify-center items-center rounded-2xl w-6 h-5">
                  {countDeliveryState}
                </div>
              )}
            </button>
            {deliveryState && countDeliveryState > 0 && (
              <div className="fixed z-50 bg-black/50 w-full h-full top-0 left-0 flex justify-center items-center p-4">
                <ChangeAllDeliveryState
                  handleSetDeliveryStateFalse={() => setDeliveryState(false)}
                  selectedOrderIds={getSelectedOrderIds()}
                  onSuccess={(newStatus) => {
                    updateSelectedOrdersStatus(newStatus);
                    setDeliveryState(false);
                    setState({});
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="flex items-center h-12 border-b bg-gray-50">
              <div className="w-12 flex justify-center items-center">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={checkAllOrders}
                  checked={
                    orderData.length > 0 &&
                    countDeliveryState === orderData.length
                  }
                />
              </div>
              <div className="w-12 flex items-center justify-center">
                <span className="text-xs sm:text-sm text-gray-500">№</span>
              </div>
              <div className="flex-1 min-w-[180px] flex justify-start items-center">
                <span className="text-gray-500 text-xs sm:text-sm font-medium pl-4">
                  Customer
                </span>
              </div>
              <div className="w-24 flex items-center justify-start">
                <span className="text-xs sm:text-sm text-gray-500 font-medium pl-4">
                  Food
                </span>
              </div>
              <div className="w-28 flex items-center justify-start">
                <div className="text-gray-500 text-xs sm:text-sm font-medium pl-4 flex items-center gap-2">
                  Date
                </div>
              </div>
              <div className="w-24 flex items-center justify-start">
                <span className="text-gray-500 text-xs sm:text-sm font-medium pl-4">
                  Total
                </span>
              </div>
              <div className="flex-1 min-w-[160px] flex items-center justify-start">
                <span className="text-gray-500 text-xs sm:text-sm font-medium pl-4">
                  Delivery Address
                </span>
              </div>
              <div className="w-32 flex items-center justify-start">
                <span className="text-gray-500 text-xs sm:text-sm font-medium pl-4 flex items-center gap-2">
                  Status
                </span>
              </div>
            </div>
            <div className="divide-y">
              {orderData.map((order, index) => (
                <Orders
                  key={order._id}
                  countDeliveryState={checkOrder}
                  index={index}
                  orderData={order}
                  getData={getData}
                  checked={!!state[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
