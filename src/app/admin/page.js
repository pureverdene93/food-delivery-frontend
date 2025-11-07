"use client";
import { AdminNavigation } from "./features/admin-navigation";
import { FoodMenu } from "./features/foodMenu";

export default function Home() {
  return (
    <div className="bg-zinc-100 flex h-screen w-full flex-row">
      <AdminNavigation />
      <div className="w-full flex justify-center h-screen pt-9">
        <FoodMenu />
      </div>
    </div>
  );
}
