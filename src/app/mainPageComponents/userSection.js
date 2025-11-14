"use client";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const UserSection = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [decodedData, setDecodedData] = useState([]);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    setToken(tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      const decodedToken = jwtDecode(tokenFromLocalStorage);
      setDecodedData(decodedToken);
    }
  }, []);
  const signOut = () => {
    if (token) {
      localStorage.clear();
      router.push(`/auth/login`);
    }
  };
  console.log(decodedData, "diufhgiuehgpiuerh");

  return (
    <div className="absolute min-w-[188px] h-[104px] bg-white rounded-xl flex justify-center items-center flex-col gap-2 mt-10 ml-[200px]">
      <p className="text-black text-[20px] font-semibold ml-4 mr-4">
        {decodedData.email}
      </p>
      <button
        className="cursor-pointer w-20 h-9 bg-zinc-100 rounded-xl flex justify-center items-center cursor-pointerc font-medium text-[14px] text-black"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
};
