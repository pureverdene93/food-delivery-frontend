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
    <div className="bg-zinc-900 min-h-[60px] sm:min-h-[68px] w-full flex items-center justify-center px-4 sm:px-6 lg:px-0">
      <div className="flex w-full max-w-7xl justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <LogoIcon />
          <div className="hidden sm:block">
            <p className="text-base sm:text-lg font-semibold text-white">
              Nom<span className="text-red-500">Nom</span>
            </p>
            <p className="text-xs text-white">Swift delivery</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-row gap-2 sm:gap-3 items-center">
          {token && (
            <>
              {/* Address - hidden on mobile */}
              <div className="hidden md:flex bg-white rounded-2xl h-9 items-center gap-1 justify-center px-3">
                <p className="text-red-500 font-normal text-xs flex items-center gap-1 whitespace-nowrap">
                  <LocationIcon /> Delivery address:
                </p>
                <button
                  className="text-xs text-[#71717A] font-normal flex items-center cursor-pointer max-w-[150px] truncate"
                  onClick={() => setLocationState(true)}
                >
                  {userAddress || "Add Location"}{" "}
                  {!userAddress && <AddLocIcon />}
                </button>
              </div>
              {/* Mobile address button */}
              <button
                className="md:hidden w-9 h-9 bg-white cursor-pointer flex justify-center items-center rounded-full"
                onClick={() => setLocationState(true)}
              >
                <LocationIcon />
              </button>
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
                className="cursor-pointer px-3 sm:px-4 h-8 sm:h-9 bg-white text-black flex justify-center items-center font-medium text-xs sm:text-sm rounded-3xl"
                onClick={() => router.push(`/auth/signUp`)}
              >
                Sign up
              </button>
              <button
                className="cursor-pointer px-3 sm:px-4 h-8 sm:h-9 bg-red-500 text-white flex justify-center items-center font-medium text-xs sm:text-sm rounded-3xl"
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
