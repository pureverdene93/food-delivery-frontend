import { Button } from "@/components/ui/button";
import { Prev } from "../icons/prev-icon";

export default function Home() {
  return (
    <div
      className="bg-white w-screen h-screen flex flex-row justify-center
      items-center gap-12"
    >
      <div className="w-[416px] h-[376px] flex flex-col justify-between">
        <button
          className="w-9 h-9 rounded-xl flex justify-center items-center
          border border-zinc-300 cursor-pointer"
        >
          <Prev />
        </button>
        <div className="flex flex-col">
          <p className="text-[24px] font-semibold text-black">Log in</p>
          <p className="font-normal text-zinc-300 text-[16px]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-baseline">
          <input
            className="w-[416px] h-9 rounded-xl border border-zinc-300
            pl-2 text-[14px] font-normal text-black"
            placeholder="Enter your email adress"
          />
          <input
            className="w-[416px] h-9 rounded-xl border border-zinc-300
            pl-2 text-[14px] font-normal text-black"
            placeholder="Password"
          />
          <button
            className={`text-[14px] font-normal text-black cursor-pointer hover:underline`}
          >
            Forgot password ?
          </button>
        </div>
        <button
          className={`w-[416px] h-9 rounded-xl border border-zinc-300
          text-[14px] font-medium text-white bg-zinc-300 cursor-pointer`}
        >
          Let's Go
        </button>
        <span className="text-zinc-300 font-normal text-4 flex justify-center gap-3">
          {`Don’t have an account?`}
          <button className="text-blue-600 text-4 font-normal cursor-pointer hover:underline">
            Sign up
          </button>
        </span>
      </div>
      <img
        src="/loginImage.png"
        className="object-cover w-[856px] h-[904px] rounded-xl"
      />
    </div>
  );
}
