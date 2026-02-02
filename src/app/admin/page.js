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
    <div className="bg-zinc-100 flex min-h-screen w-full flex-col md:flex-row">
      <AdminNavigation />
      <div className="flex-1 w-full flex justify-center min-h-screen p-4 sm:p-6 lg:pt-9 pt-4">
        <FoodMenu />
      </div>
    </div>
  );
}
