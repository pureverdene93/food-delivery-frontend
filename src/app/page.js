"use client";
import { useState } from "react";
import { AdminNavigation } from "./features/admin-navigation";
import { FoodMenu } from "./features/foodMenu";
import { FoodOrder } from "./features/foodOrder";

export default function Home() {
  const [state, setState] = useState("Order");

  const clickFoodMenu = () => {
    setState("Food menu");
  };

  const clickOrder = () => {
    setState("Order");
  };
  return (
    <div className="bg-zinc-100 flex h-full w-full flex-row items-baseline">
      <AdminNavigation
        state={state}
        clickFoodMenu={clickFoodMenu}
        clickOrder={clickOrder}
      />
      <div className="w-full flex justify-center">
        {state === "Food menu" && <FoodMenu />}
        {state === "Order" && <FoodOrder />}
      </div>
    </div>
  );
}
