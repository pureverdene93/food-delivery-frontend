"use client";
import { useState } from "react";
import { useEffect } from "react";
import { SetFalseDeliveryState } from "../icons/setFalseDeliveryState-icon";
import { jwtDecode } from "jwt-decode";
const backend_url = process.env.BACKEND_URL;

export const AddAdress = ({ exit, onSave, currentAddress = "" }) => {
  const [addres, setAddres] = useState(currentAddress);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setAddres(currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
      try {
        const decoded = jwtDecode(getToken);
        setUserId(decoded.id);
      } catch (err) {}
    }
  }, []);

  const addAdres = async () => {
    if (!userId || !addres) return;
    try {
      await fetch(`${backend_url}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adress: addres,
        }),
      });
      if (onSave) onSave(addres);
      exit();
    } catch (err) {}
  };

  return (
    <div className="fixed z-50 flex justify-center items-center w-full h-full top-0 left-0 bg-black/50 p-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl flex flex-col items-center justify-around p-4 sm:p-6 gap-4 sm:gap-6">
        <div className="flex w-full items-center justify-between gap-4">
          <p className="text-black font-semibold text-lg sm:text-xl lg:text-2xl">
            Please write your delivery address!
          </p>
          <button
            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-zinc-200 items-center justify-center rounded-full cursor-pointer flex"
            onClick={exit}
          >
            <SetFalseDeliveryState />
          </button>
        </div>
        <input
          className="w-full h-16 sm:h-20 border border-zinc-300 rounded-xl focus:outline-none pl-3 text-sm sm:text-base font-normal text-black"
          placeholder="Please share your complete address"
          value={addres}
          onChange={(e) => setAddres(e.target.value)}
        />
        <div className="w-full flex justify-end items-center gap-3 sm:gap-4">
          <button
            className="px-4 sm:px-6 h-9 sm:h-10 bg-white text-sm font-medium text-black rounded-xl flex justify-center items-center cursor-pointer border border-zinc-300"
            onClick={exit}
          >
            Cancel
          </button>
          <button
            className="px-4 sm:px-6 text-white text-sm font-medium h-9 sm:h-10 bg-black rounded-xl flex justify-center items-center cursor-pointer"
            onClick={addAdres}
          >
            Deliver Here
          </button>
        </div>
      </div>
    </div>
  );
};
