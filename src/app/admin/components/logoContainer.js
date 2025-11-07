import { LogoIcon } from "@/app/icons/logo-icon";

export const LogoContainer = () => {
  return (
    <div className="w-[165px] h-11 flex justify-start items-center gap-2">
      <LogoIcon />
      <div>
        <p className="text-[18px] font-semibold text-black">NomNom</p>
        <p className="text-[12px] text-zinc-500">Swift delivery</p>
      </div>
    </div>
  );
};
