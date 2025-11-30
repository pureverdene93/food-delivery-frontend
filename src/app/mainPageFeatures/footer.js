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
    <div className="w-[1440px] h-[755px] bg-zinc-900 flex flex-col justify-around items-center">
      <div className="bg-red-500 w-full h-[92px] overflow-hidden relative flex items-center">
        <div className="marquee ">
          <p className="text-[30px] font-semibold text-white ">
            Fresh fast delivered
          </p>
          <p className="text-[30px] font-semibold text-white ">
            Fresh fast delivered
          </p>
          <p className="text-[30px] font-semibold text-white ">
            Fresh fast delivered
          </p>
          <p className="text-[30px] font-semibold text-white ">
            Fresh fast delivered
          </p>
          <p className="text-[30px] font-semibold text-white ">
            Fresh fast delivered
          </p>
          <p className="text-[30px] font-semibold text-white ">
            Fresh fast delivered
          </p>
        </div>
      </div>
      <div className="w-[1264px] h-[228px] flex gap-[220px] justify-start items-start mb-[104px]">
        <div className="w-[88px] h-[93px] flex flex-col justify-start items-center gap-2">
          <LogoIcon />
          <div>
            <p className="text-[18px] font-semibold text-white">
              Nom<span className="text-red-500">Nom</span>
            </p>
            <p className="text-[12px] text-white">Swift delivery</p>
          </div>
        </div>
        <div className="flex gap-[120px] items-baseline">
          <div className="flex flex-col min-w-[122px] h-[148px] gap-4 items-baseline">
            <p className="text-[16px] font-normal text-[#71717A]">NOMNOM</p>
            <button className="text-[16px] font-normal text-white cursor-pointer">
              Home
            </button>
            <button className="text-[16px] font-normal text-white cursor-pointer">
              Contact us
            </button>
            <button className="text-[16px] font-normal text-white cursor-pointer">
              Delivery zone
            </button>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="text-[16px] font-normal text-[#71717A]">MENU</p>
            <div className="flex flex-wrap min-w-[320px] justify-between gap-4 ">
              {foodData.map((food) => {
                return (
                  <p
                    className="text-[16px] text-white font-normal w-[132px]"
                    key={food._id}
                  >
                    {food.foodName}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 min-w-[122px]">
            <p className="text-[16px] font-normal text-[#71717A]">FOLLOW US</p>
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
      <div className="w-[1264px] h-[84px] border-t border-t-[#71717A] flex flex-row gap-12 items-center">
        <p className="font-normal text-[14px] text-[#71717A]">
          Copy right 2024 © Nomnom LLC
        </p>
        <p className="font-normal text-[14px] text-[#71717A]">Privacy policy</p>
        <p className="font-normal text-[14px] text-[#71717A]">
          Terms and conditoin
        </p>
        <p className="font-normal text-[14px] text-[#71717A]">Cookie policy</p>
      </div>
    </div>
  );
};
