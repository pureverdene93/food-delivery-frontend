"use client";
import { useState } from "react";
import { useEffect } from "react";
import { FacebookIcon } from "../icons/facebook-icon";
import { IgIcon } from "../icons/ig-icon";
import { LogoIcon } from "../icons/logo-icon";

const getOption = { method: "GET" };
const backend_url = process.env.BACKEND_URL;
const foodApiLink = `${backend_url}/food`;

export const Footer = () => {
  const [foodData, setFoodData] = useState([]);
  const getData = async () => {
    const fetchData = await fetch(foodApiLink, getOption);
    const jsonData = await fetchData.json();
    setFoodData(jsonData);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full bg-zinc-900 flex flex-col justify-around items-center py-8 sm:py-12">
      {/* Marquee Banner */}
      <div className="bg-red-500 w-full h-16 sm:h-20 lg:h-[92px] overflow-hidden relative flex items-center">
        <div className="marquee">
          <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-white">
            Fresh fast delivered
          </p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-white">
            Fresh fast delivered
          </p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-white">
            Fresh fast delivered
          </p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-white">
            Fresh fast delivered
          </p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-white">
            Fresh fast delivered
          </p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-white">
            Fresh fast delivered
          </p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-32">
          {/* Logo Section */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <LogoIcon />
            <div className="text-center lg:text-left">
              <p className="text-lg font-semibold text-white">
                Nom<span className="text-red-500">Nom</span>
              </p>
              <p className="text-xs text-white">Swift delivery</p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16 xl:gap-24 flex-1">
            {/* NOMNOM Links */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-sm sm:text-base font-normal text-[#71717A]">NOMNOM</p>
              <button className="text-sm sm:text-base font-normal text-white cursor-pointer text-left">
                Home
              </button>
              <button className="text-sm sm:text-base font-normal text-white cursor-pointer text-left">
                Contact us
              </button>
              <button className="text-sm sm:text-base font-normal text-white cursor-pointer text-left">
                Delivery zone
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-3 sm:gap-4 col-span-2 sm:col-span-1">
              <p className="text-sm sm:text-base font-normal text-[#71717A]">MENU</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {foodData.slice(0, 8).map((food) => (
                  <p
                    className="text-sm sm:text-base text-white font-normal truncate"
                    key={food._id}
                  >
                    {food.foodName}
                  </p>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-sm sm:text-base font-normal text-[#71717A]">FOLLOW US</p>
              <div className="flex flex-row gap-4">
                <button className="cursor-pointer">
                  <FacebookIcon />
                </button>
                <button className="cursor-pointer">
                  <IgIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-t-[#71717A]">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 lg:gap-12 items-center justify-center sm:justify-start">
          <p className="font-normal text-xs sm:text-sm text-[#71717A]">
            Copy right 2024 © Nomnom LLC
          </p>
          <p className="font-normal text-xs sm:text-sm text-[#71717A]">Privacy policy</p>
          <p className="font-normal text-xs sm:text-sm text-[#71717A]">
            Terms and condition
          </p>
          <p className="font-normal text-xs sm:text-sm text-[#71717A]">Cookie policy</p>
        </div>
      </div>
    </div>
  );
};
