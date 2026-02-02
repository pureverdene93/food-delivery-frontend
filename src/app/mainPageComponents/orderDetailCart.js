"use client";
import { useState } from "react";
import { useEffect } from "react";
import { FoodCardFromOrderInfo } from "./foodCardFromOrderInfo";
import { BiggerIcon } from "../icons/biggerIcon";
import { jwtDecode } from "jwt-decode";
import { createPortal } from "react-dom";
import { OrderSucces } from "../icons/orderSuccesIcon";

const backend_url = process.env.BACKEND_URL;

export const OrderDetailCart = ({ animationEnd }) => {
  const [foodCardData, setFoodCardData] = useState([]);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState(null);
  const [orderSucces, setOrderSucces] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const getDataSafe = () => {
    try {
      const data = JSON.parse(localStorage.getItem("addedCard"));
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  };
  const totalPrice = foodCardData.reduce(
    (sum, items) => sum + (items.totalPrice || 0),
    0,
  );

  const backToHome = () => {
    setOrderSucces(false);
  };

  const fetchOrderHistory = async (userId) => {
    try {
      const res = await fetch(`${backend_url}/order/${userId}`);
      const data = await res.json();
      setOrderHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setOrderHistory([]);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${backend_url}/order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrderHistory((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (err) {}
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-500 border-green-500";
      case "Pending":
        return "text-yellow-500 border-yellow-500";
      case "Cancelled":
        return "text-gray-400 border-gray-400";
      default:
        return "text-gray-500 border-gray-500";
    }
  };

  const fetchUserAddress = async (userId) => {
    try {
      const res = await fetch(`${backend_url}/user/${userId}`);
      const data = await res.json();
      if (data?.adress) {
        setDeliveryLocation(data.adress);
      }
    } catch (err) {}
  };

  const saveAddress = async (newAddress) => {
    if (!userData || !newAddress) return;
    try {
      await fetch(`${backend_url}/user/${userData}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adress: newAddress }),
      });
      window.dispatchEvent(
        new CustomEvent("addressUpdated", { detail: newAddress }),
      );
    } catch (err) {}
  };

  const createOrder = async () => {
    try {
      const goToBackEndCard = foodCardData.map((data) => ({
        food: data.id,
        quantity: Number(data.quantity),
      }));

      await fetch(`${backend_url}/order`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          user: userData,
          totalPrice: totalPrice + 0.99,
          foodOrderItem: goToBackEndCard,
        }),
      });
      localStorage.removeItem("addedCard");
      setFoodCardData([]);
      setOrderSucces(true);
      fetchOrderHistory(userData);
    } catch (err) {}
  };

  const removeItem = (id) => {
    const selectAndRemove = foodCardData.filter((data) => {
      return data.id !== id;
    });
    localStorage.setItem("addedCard", JSON.stringify(selectAndRemove));
    setFoodCardData(selectAndRemove);
  };

  useEffect(() => {
    setFoodCardData(getDataSafe());
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
      const decodedToken = jwtDecode(userToken);
      const stringifyId = decodedToken.id;
      setUserData(stringifyId);
      fetchOrderHistory(stringifyId);
      fetchUserAddress(stringifyId);
    }

    const handleAddressUpdate = (e) => {
      setDeliveryLocation(e.detail);
    };
    window.addEventListener("addressUpdated", handleAddressUpdate);
    return () =>
      window.removeEventListener("addressUpdated", handleAddressUpdate);
  }, []);

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
                {foodCardData.map((items, index) => {
                  return (
                    <div key={index}>
                      <FoodCardFromOrderInfo
                        items={items}
                        removeItem={removeItem}
                      />
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
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                onBlur={(e) => saveAddress(e.target.value)}
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
      <div className="w-[471px] bg-white rounded-xl p-4 flex flex-col gap-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowHistory(!showHistory)}
        >
          <p className="text-[20px] font-semibold text-[#71717A]">
            Order History
          </p>
          <span className="text-[14px] text-gray-500">
            {showHistory ? "▲" : "▼"}
          </span>
        </div>
        {showHistory && (
          <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
            {orderHistory.length === 0 ? (
              <p className="text-[14px] text-gray-400 text-center py-4">
                No orders yet
              </p>
            ) : (
              orderHistory.map((order) => (
                <div
                  key={order._id}
                  className="border border-zinc-200 rounded-lg p-3 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-[14px] font-medium text-black">
                      ${order.totalPrice}
                    </p>
                    <span
                      className={`text-[12px] font-semibold px-3 py-1 rounded-full border ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[12px] text-gray-500">
                      {order.foodOrderItem?.length || 0} items
                    </p>
                    {order.status === "Pending" && (
                      <button
                        className="text-[12px] text-red-500 font-medium cursor-pointer hover:underline"
                        onClick={() =>
                          updateOrderStatus(order._id, "Cancelled")
                        }
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {orderSucces &&
        createPortal(
          <div className="fixed inset-0 z-50 w-full h-full top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white w-[664px] h-[439px] rounded-xl flex flex-col items-center justify-evenly">
              <h3 className="text-black font-semibold text-[24px]">
                Your order has been successfully placed !
              </h3>
              <OrderSucces />
              <button
                className="bg-[#F4F4F5] w-[188px] h-11 justify-center flex items-center rounded-xl cursor-pointer text-black text-[14px] font-medium"
                onClick={backToHome}
              >
                Back to home
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
