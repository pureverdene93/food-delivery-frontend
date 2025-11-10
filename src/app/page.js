"use client";

import { FoodsByCategorySection } from "./mainPageFeatures/foods-byCategory";
import { Footer } from "./mainPageFeatures/footer";
import { Header } from "./mainPageFeatures/header";

export default function Home() {
  return (
    <div className="w-full h-full bg-neutral-700 flex justify-center items-center flex-col gap-[88px]">
      <div className="flex justify-center flex-col items-center">
        <Header />
        <img src="BG.png" className="object-cover w-[1440px] h-[570px]" />
      </div>
      <div className="flex flex-col gap-[54px]">
        <FoodsByCategorySection />
        <FoodsByCategorySection />
        <FoodsByCategorySection />
      </div>
      <Footer />
    </div>
  );
}
