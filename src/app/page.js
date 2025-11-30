"use client";
import { useState } from "react";
import { useEffect } from "react";
import { FoodsByCategorySection } from "./mainPageFeatures/foods-byCategory";
import { Footer } from "./mainPageFeatures/footer";
import { Header } from "./mainPageFeatures/header";

const backend_url = process.env.BACKEND_URL;
const optionGet = { method: "GET" };
const categoryApiLinkGet = `${backend_url}/category`;

export default function Home() {
  const [categoryData, setCategoryData] = useState([]);
  const getAndFetchData = async () => {
    const categoryData = await fetch(categoryApiLinkGet, optionGet);
    const jsonCategoryData = await categoryData.json();
    setCategoryData(jsonCategoryData);
  };

  useEffect(() => {
    getAndFetchData();
    // if (typeof window !== "undefined") {
    //   const token = localStorage.getItem("token");
    //   if (!token) router.push("/auth/login");
    // }
  }, []);

  return (
    <div className="w-full h-full bg-neutral-700 flex justify-center items-center flex-col gap-[88px]">
      <div className="flex justify-center flex-col items-center">
        <Header />
        <img src="BG.png" className="object-cover w-[1440px] h-[570px]" />
      </div>
      <div className="flex flex-col gap-[54px]">
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
