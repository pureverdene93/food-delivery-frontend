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
    <div className="bg-white w-full min-h-screen flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md flex flex-col justify-center gap-4 sm:gap-6 order-2 lg:order-1">
        <PreStepBtn />
        <div className="flex flex-col">
          <p className="text-xl sm:text-2xl text-black font-semibold">
            Create your account
          </p>
          <p className="font-normal text-sm sm:text-base text-[#71717A]">
            Sign up to explore your favorite dishes.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <input
            className="w-full h-9 sm:h-10 rounded-xl border border-zinc-300 pl-3 text-sm font-normal text-black focus:outline-none"
            placeholder="Enter your email adress"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errState.email && (
            <p className="text-red-500 text-xs sm:text-sm font-normal">
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
      <img src="/loginImage.png" className="hidden lg:block w-full max-w-xl xl:max-w-2xl h-64 sm:h-80 lg:h-[600px] xl:h-[700px] rounded-xl object-cover order-1 lg:order-2" />
    </div>
  );
};
