"use client";
import { AdminNavigation } from "../features/admin-navigation";
import { FoodOrder } from "./features/foodOrder";

export default function Home() {
  return (
    <div className="bg-zinc-100 flex min-h-screen w-full flex-col md:flex-row">
      <AdminNavigation />
      <div className="flex-1 w-full flex justify-center min-h-screen p-4 sm:p-6 lg:pt-9 pt-4 overflow-x-auto">
        <FoodOrder />
      </div>
    </div>
  );
}
