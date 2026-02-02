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
  const pathname = usePathname();

  return (
    <div className="w-[205px] h-screen bg-white flex flex-col items-center gap-10 pt-9">
      <LogoContainer />
      <div>
        <button
          className={`w-[165px] h-10 flex rounded-[70px] cursor-pointer
          justify-start pl-6 items-center gap-2.5 text-[14px] font-medium
          ${pathname === "/admin" ? "text-white bg-black" : "text-black"}`}
          onClick={() => router.push("/admin")}
        >
          {pathname === "/admin" ? (
            <FoodMenuLogoWhite />
          ) : (
            <FoodMenuLogoBlack />
          )}
          Food menu
        </button>
        <button
          className={`w-[165px] h-10 flex rounded-[70px] cursor-pointer
            justify-start pl-6 items-center gap-2.5 text-[14px] font-medium 
          ${pathname === "/admin/order" ? "text-white bg-black" : "text-black "}`}
          onClick={() => router.push("/admin/order")}
        >
          {pathname === "/admin/order" ? (
            <OrderWhiteLogo />
          ) : (
            <OrderBlackLogo />
          )}
          Order
        </button>
      </div>
    </div>
  );
};
