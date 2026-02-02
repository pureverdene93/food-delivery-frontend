"use client";
import { SetFalseDeliveryState } from "@/app/icons/setFalseDeliveryState-icon";
import { useState } from "react";

const backend_url = process.env.BACKEND_URL;

export const ChangeAllDeliveryState = (props) => {
  const { handleSetDeliveryStateFalse, selectedOrderIds, onSuccess } = props;

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePending = () => {
    setStatus("Pending");
  };
  const handleDelivered = () => {
    setStatus("Delivered");
  };
  const handleCancelled = () => {
    setStatus("Cancelled");
  };

  const saveStatus = async () => {
    if (!status || selectedOrderIds.length === 0) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await Promise.all(
        selectedOrderIds.map((orderId) =>
          fetch(`${backend_url}/order/${orderId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          })
        )
      );
      onSuccess(status);
    } catch (err) {
      console.error("Failed to update orders:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="absolute w-[364px] h-[200px] bg-white
      rounded-2xl flex flex-col items-center justify-evenly"
    >
      <div className="flex items-center w-[316px] justify-between">
        <p className="font-medium text-[14px] text-black">
          Change delivery state
        </p>
        <button
          className="cursor-pointer w-9 h-9 bg-zinc-200 rounded-full flex
          justify-center items-center"
          onClick={handleSetDeliveryStateFalse}
        >
          <SetFalseDeliveryState />
        </button>
      </div>
      <div className="flex items-center justify-between w-[316px]">
        <button
          className={`w-[94px] h-8 font-medium text-[12px] rounded-2xl
          cursor-pointer ${
            status === "Delivered"
              ? "bg-red-200 border border-red-500 text-red-500"
              : "bg-zinc-200"
          }`}
          onClick={handleDelivered}
        >
          Delivered
        </button>
        <button
          className={`w-[94px] h-8 font-medium text-[12px] rounded-2xl
          cursor-pointer ${
            status === "Pending"
              ? "bg-red-200 border border-red-500 text-red-500"
              : "bg-zinc-200"
          }`}
          onClick={handlePending}
        >
          Pending
        </button>
        <button
          className={`w-[94px] h-8 font-medium text-[12px] rounded-2xl
          cursor-pointer ${
            status === "Cancelled"
              ? "bg-red-200 border border-red-500 text-red-500"
              : "bg-zinc-200"
          }`}
          onClick={handleCancelled}
        >
          Cancelled
        </button>
      </div>
      <button
        className={`w-[316px] h-9 text-white rounded-2xl flex
        items-center justify-center font-medium text-[14px] cursor-pointer ${
          status && !loading ? "bg-black" : "bg-zinc-400"
        }`}
        onClick={saveStatus}
        disabled={!status || loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};
