"use client";
import { useEffect, useState } from "react";
import { AdminNavigation } from "./features/admin-navigation";
import { FoodMenu } from "./features/foodMenu";
import { FoodOrder } from "./features/foodOrder";

export default function Home() {
  const [state, setState] = useState("Food menu");

  const clickFoodMenu = () => {
    setState("Food menu");
  };

  const clickOrder = () => {
    setState("Order");
  };
  return (
    <div className="bg-zinc-100 flex h-screen w-full flex-row items-baseline">
      <AdminNavigation
        state={state}
        clickFoodMenu={clickFoodMenu}
        clickOrder={clickOrder}
      />
      <div className="w-full flex justify-center h-screen overflow-hidden">
        {state === "Food menu" && <FoodMenu />}
        {state === "Order" && <FoodOrder />}
      </div>

      {/* <div className="fixed z-50 bg-[rgba(0,0,0,0.05)] w-screen h-screen"></div> */}
    </div>
  );
}
