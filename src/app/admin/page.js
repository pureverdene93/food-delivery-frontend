"use client";
import { useEffect } from "react";
import { AdminNavigation } from "./features/admin-navigation";
import { FoodMenu } from "./features/foodMenu";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === undefined) return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
  });
  return (
    <div className="bg-zinc-100 flex h-screen w-full flex-row">
      <AdminNavigation />
      <div className="w-full flex justify-center h-screen pt-9">
        <FoodMenu />
      </div>
    </div>
  );
}
