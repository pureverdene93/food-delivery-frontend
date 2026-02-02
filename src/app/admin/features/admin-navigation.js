"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FoodMenuLogoWhite } from "@/app/icons/foodMenuWhite-logo";
import { LogoContainer } from "../components/logoContainer";
import { OrderBlackLogo } from "@/app/icons/orderBlack-logo";
import { FoodMenuLogoBlack } from "@/app/icons/foodMenuBlack-logo";
import { OrderWhiteLogo } from "@/app/icons/orderWhite-Logo";

export const AdminNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden w-full bg-white flex items-center justify-between p-4 sticky top-0 z-40 shadow-sm">
        <LogoContainer />
        <button
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-[70vw] max-w-70 min-w-50 bg-white z-50 transform transition-transform duration-300 shadow-xl ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-3 sm:p-4 border-b flex items-center justify-between">
          <LogoContainer />
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-xl font-light">×</span>
          </button>
        </div>
        <div className="flex flex-col gap-2 p-3 sm:p-4">
          <button
            className={`w-full h-10 sm:h-12 flex rounded-full cursor-pointer pl-4 sm:pl-6 items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium ${pathname === "/admin" ? "text-white bg-black" : "text-black hover:bg-gray-100"}`}
            onClick={() => {
              router.push("/admin");
              setMobileMenuOpen(false);
            }}
          >
            {pathname === "/admin" ? <FoodMenuLogoWhite /> : <FoodMenuLogoBlack />}
            Food menu
          </button>
          <button
            className={`w-full h-10 sm:h-12 flex rounded-full cursor-pointer pl-4 sm:pl-6 items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium ${pathname === "/admin/order" ? "text-white bg-black" : "text-black hover:bg-gray-100"}`}
            onClick={() => {
              router.push("/admin/order");
              setMobileMenuOpen(false);
            }}
          >
            {pathname === "/admin/order" ? <OrderWhiteLogo /> : <OrderBlackLogo />}
            Orders
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-48 lg:w-52 min-h-screen bg-white flex-col items-center gap-10 pt-9">
        <LogoContainer />
        <div className="flex flex-col gap-2">
          <button
            className={`w-40 lg:w-44 h-10 flex rounded-full cursor-pointer pl-6 items-center gap-2 text-sm font-medium ${pathname === "/admin" ? "text-white bg-black" : "text-black hover:bg-gray-100"}`}
            onClick={() => router.push("/admin")}
          >
            {pathname === "/admin" ? <FoodMenuLogoWhite /> : <FoodMenuLogoBlack />}
            Food menu
          </button>
          <button
            className={`w-40 lg:w-44 h-10 flex rounded-full cursor-pointer pl-6 items-center gap-2 text-sm font-medium ${pathname === "/admin/order" ? "text-white bg-black" : "text-black hover:bg-gray-100"}`}
            onClick={() => router.push("/admin/order")}
          >
            {pathname === "/admin/order" ? <OrderWhiteLogo /> : <OrderBlackLogo />}
            Orders
          </button>
        </div>
      </div>
    </>
  );
};
