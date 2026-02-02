"use client";
import { useState } from "react";
import { useEffect } from "react";
import { FoodsByCategorySection } from "./mainPageFeatures/foods-byCategory";
import { useRouter } from "next/navigation";
import { Footer } from "./mainPageFeatures/footer";
import { Header } from "./mainPageFeatures/header";

const backend_url = process.env.BACKEND_URL;
const optionGet = { method: "GET" };
const categoryApiLinkGet = `${backend_url}/category`;

export default function Home() {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState([]);
  const getAndFetchData = async () => {
    const categoryData = await fetch(categoryApiLinkGet, optionGet);
    const jsonCategoryData = await categoryData.json();
    setCategoryData(jsonCategoryData);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    getAndFetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-700 flex justify-center items-center flex-col gap-12 sm:gap-16 lg:gap-20">
      {/* Header & Hero */}
      <div className="flex justify-center flex-col items-center w-full">
        <Header />
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <img
            src="BG.png"
            className="w-full h-auto object-contain rounded-lg sm:rounded-xl lg:rounded-2xl"
          />
        </div>
      </div>

      {/* Food Categories */}
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14 w-full px-4 sm:px-6 lg:px-8">
        {categoryData.map((category) => {
          return (
            <div key={category._id}>
              <FoodsByCategorySection data={category} />
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
