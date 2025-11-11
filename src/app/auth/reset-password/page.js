"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlreadyAccount } from "../authComponents/alreadyHaveAccount";
import { LetsGo } from "../authComponents/letsGo";
import { PreStepBtn } from "../authComponents/preStep";
import { Titles } from "../authComponents/titles";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  console.log(email);

  return (
    <div className="bg-white w-screen h-screen flex flex-row justify-center items-center gap-12">
      <div className="w-[416px] h-72 flex flex-col justify-between">
        <PreStepBtn />
        <Titles
          big={"Reset your password "}
          small={"Enter your email to receive a password reset link."}
        />
        <input
          className="w-[416px] h-9 rounded-xl border border-zinc-300 pl-2 text-[14px] font-normal text-black"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <LetsGo title={"Send link"} />
        <AlreadyAccount
          title={"Don’t have an account?"}
          link={"Sign up "}
          onClick={() => router.push(`/auth/signUp`)}
        />
      </div>
      <img
        src="/loginImage.png"
        className="object-cover w-[856px] h-[904px] rounded-xl"
      />
    </div>
  );
}
