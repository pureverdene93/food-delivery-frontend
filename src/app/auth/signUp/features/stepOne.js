"use client";
import { useState } from "react";
import { PreStepBtn } from "../../authComponents/preStep";
import { LetsGo } from "../../authComponents/letsGo";
import { AlreadyAccount } from "../../authComponents/alreadyHaveAccount";
import { useRouter } from "next/navigation";

const checkEmail = (mail) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[A-Za-z]{2,}$/.test(
    mail
  );
};

export const StepOne = ({ step }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errState, setErrState] = useState({});

  const handleCheckEmail = () => {
    const errors = {};
    if (!checkEmail(email)) {
      errors.email = "Invalid email. Use a format like example@email.com.";
    }
    return errors;
  };

  const saveEmailAndNextstep = () => {
    const err = handleCheckEmail();
    if (Object.keys(err).length === 0) {
      setErrState({});
      localStorage.setItem("email", email);
      step();
    } else {
      setErrState(err);
    }
  };

  return (
    <div className="bg-white w-screen h-screen flex flex-row justify-center items-center gap-12">
      <div className="w-[416px] min-h-72 flex flex-col justify-center gap-6">
        <PreStepBtn />
        <div className="flex flex-col">
          <p className="text-[24px] text-black font-semibold">
            Create your account
          </p>
          <p className="font-normal text-[16px] text-[#71717A]">
            Sign up to explore your favorite dishes.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <input
            className="w-[416px] h-9 rounded-xl border border-zinc-300 pl-3 text-[14px] font-normal text-black"
            placeholder="Enter your email adress"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errState.email && (
            <p className="text-red-500 text-[14px] font-normal">
              {errState.email}
            </p>
          )}
        </div>
        <LetsGo nextStep={saveEmailAndNextstep} title={"Let's Go"} />
        <AlreadyAccount
          title={"Already have an account?"}
          link={"Log in"}
          onClick={() => router.push(`/auth/login`)}
        />
      </div>
      <img src="/loginImage.png" className="w-[856px] h-[904px] rounded-xl" />
    </div>
  );
};
