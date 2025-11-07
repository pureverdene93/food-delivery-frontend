"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FoodMenuLogoWhite } from "@/app/icons/foodMenuWhite-logo";
import { LogoContainer } from "../components/logoContainer";
import { OrderBlackLogo } from "@/app/icons/orderBlack-logo";
import { FoodMenuLogoBlack } from "@/app/icons/foodMenuBlack-logo";
import { OrderWhiteLogo } from "@/app/icons/orderWhite-Logo";

export const AdminNavigation = () => {
  const router = useRouter();
  const [state, setState] = useState("Food menu");

  const clickOrder = () => {
    router.push(`/admin/order`);
    setState("Order");
  };
  const clickFoodMenu = () => {
    router.push(`/admin`);
    setState("Food menu");
  };

  return (
    <div className="w-[205px] h-screen bg-white flex flex-col items-center gap-10 pt-9">
      <LogoContainer />
      <div>
        <button
          className={`w-[165px] h-10 flex rounded-[70px] cursor-pointer
          justify-start pl-6 items-center gap-2.5 text-[14px] font-medium
          ${state === "Food menu" ? "text-white bg-black" : "text-black"}`}
          onClick={clickFoodMenu}
        >
          {state === "Food menu" ? (
            <FoodMenuLogoWhite />
          ) : (
            <FoodMenuLogoBlack />
          )}
          Food menu
        </button>
        <button
          className={`w-[165px] h-10 flex rounded-[70px] cursor-pointer
            justify-start pl-6 items-center gap-2.5 text-[14px] font-medium 
          ${state === "Order" ? "text-white bg-black" : "text-black "}`}
          onClick={clickOrder}
        >
          {state === "Order" ? <OrderWhiteLogo /> : <OrderBlackLogo />}
          Order
        </button>
      </div>
    </div>
  );
};
