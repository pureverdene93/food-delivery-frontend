import { LogoIcon } from "../icons/logo-icon";

export const Header = () => {
  return (
    <div className="bg-zinc-900 h-[68px] w-full flex items-center justify-center">
      <div className="flex w-[1440px] justify-between pl-[88px] pr-[88px]">
        <div className="w-[165px] h-11 flex justify-start items-center gap-2">
          <LogoIcon />
          <div>
            <p className="text-[18px] font-semibold text-white">
              Nom<span className="text-red-500">Nom</span>
            </p>
            <p className="text-[12px] text-white">Swift delivery</p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <button className="cursor-pointer w-[75px] h-9 bg-white text-black flex justify-center items-center font-medium text-[14px] rounded-3xl">
            Sign up
          </button>
          <button className="cursor-pointer w-[65px] h-9 bg-red-500 text-white flex justify-center items-center font-medium text-[14px] rounded-3xl">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
