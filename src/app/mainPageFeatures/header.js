"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { LogoIcon } from "../icons/logo-icon";
import { ShoppingIcon } from "../icons/shopping-icon";
import { UserIconWhite } from "../icons/user-icon";
import { LocationIcon } from "../icons/LocationIcon";
import { AddLocIcon } from "../icons/addLocIcon";
import { AddAdress } from "../mainPageComponents/addAdress";
import { UserSection } from "../mainPageComponents/userSection";
import { OrderInfo } from "../mainPageComponents/order-info";

const backend_url = process.env.BACKEND_URL;

export const Header = () => {
  const router = useRouter();
  const [locationState, setLocationState] = useState(false);
  const [userState, setUserState] = useState(false);
  const [orderState, setOrderState] = useState(false);
  const [token, setToken] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  const fetchUserAddress = async (userId) => {
    try {
      const res = await fetch(`${backend_url}/user/${userId}`);
      const data = await res.json();
      if (data?.adress) {
        setUserAddress(data.adress);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    setToken(tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      try {
        const decoded = jwtDecode(tokenFromLocalStorage);
        fetchUserAddress(decoded.id);
      } catch (err) {}
    }

    const handleAddressUpdate = (e) => {
      setUserAddress(e.detail);
    };
    window.addEventListener("addressUpdated", handleAddressUpdate);
    return () =>
      window.removeEventListener("addressUpdated", handleAddressUpdate);
  }, []);

  return (
    <div className="bg-zinc-900 h-[68px] w-full flex items-center justify-center">
      <div className="flex w-[1440px] justify-between pl-[88px] pr-[88px]">
        <div className="w-[165px] h-11 flex justify-start items-center gap-2">
          <LogoIcon />
          <div>
            <p className="text-[18px] font-semibold text-white">
              Nom<span className="text-red-500">Nom</span>
            </p>
            <p className="text-[12px] text-white">Swift delivery</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          {token && (
            <>
              <div className="bg-white rounded-2xl min-w-[251px] h-9 flex items-center gap-1 justify-center px-3">
                <p className="text-red-500 font-normal text-[12px] flex items-center gap-1 whitespace-nowrap">
                  <LocationIcon /> Delivery address:
                </p>
                <button
                  className="text-[12px] text-[#71717A] font-normal flex items-center cursor-pointer max-w-[150px] truncate"
                  onClick={() => setLocationState(true)}
                >
                  {userAddress || "Add Location"}{" "}
                  {!userAddress && <AddLocIcon />}
                </button>
              </div>
              <button
                className="w-9 h-9 bg-white cursor-pointer flex justify-center items-center rounded-full"
                onClick={() => setOrderState(true)}
              >
                <ShoppingIcon />
              </button>
              <button
                className="w-9 h-9 bg-red-500 cursor-pointer flex justify-center items-center rounded-full"
                onClick={() => setUserState(!userState)}
              >
                <UserIconWhite />
              </button>
            </>
          )}
          {!token && (
            <>
              <button
                className="cursor-pointer w-[75px] h-9 bg-white text-black flex justify-center items-center font-medium text-[14px] rounded-3xl"
                onClick={() => router.push(`/auth/signUp`)}
              >
                Sign up
              </button>
              <button
                className="cursor-pointer w-[65px] h-9 bg-red-500 text-white flex justify-center items-center font-medium text-[14px] rounded-3xl"
                onClick={() => router.push(`/auth/login`)}
              >
                Log in
              </button>
            </>
          )}
          {locationState && (
            <AddAdress
              exit={() => setLocationState(false)}
              onSave={(newAddress) => {
                setUserAddress(newAddress);
                window.dispatchEvent(
                  new CustomEvent("addressUpdated", { detail: newAddress }),
                );
              }}
              currentAddress={userAddress}
            />
          )}
          {userState && <UserSection exit={() => setUserState(false)} />}
          {orderState && <OrderInfo exit={() => setOrderState(false)} />}
        </div>
      </div>
    </div>
  );
};
