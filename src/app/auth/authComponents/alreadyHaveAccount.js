"use client";
import { useRouter } from "next/navigation";
export const AlreadyAccount = ({ title, link, onClick }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center w-[416px]">
      <span className="font-normal text-[16px] text-zinc-300 flex gap-3">
        {title}
        <button
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={onClick}
        >
          {link}
        </button>
      </span>
    </div>
  );
};
