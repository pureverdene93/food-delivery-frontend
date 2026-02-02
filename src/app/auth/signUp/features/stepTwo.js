"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlreadyAccount } from "../../authComponents/alreadyHaveAccount";
import { LetsGo } from "../../authComponents/letsGo";
import { PreStepBtn } from "../../authComponents/preStep";
import { Titles } from "../../authComponents/titles";

const checkPass = (pass) => {
  return /^(?=\S{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S+$/.test(
    pass
  );
};

export const StepTwo = () => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errState, setErrState] = useState({});
  const [showPassState, setShowPassState] = useState(false);

  const showPass = () => {
    setShowPassState(!showPassState);
  };

  const router = useRouter();

  const handleCheckPass = () => {
    const errors = {};
    if (!checkPass(pass)) {
      errors.pass =
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (pass !== confirmPass) {
      errors.confirm = "Those password did’t match, Try again";
    }
    return errors;
  };

  const AddNewUser = async () => {
    const err = handleCheckPass();
    if (Object.keys(err).length === 0) {
      try {
        await fetch(`http://localhost:8000/user/signUp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            password: pass,
          }),
        });
      } catch (err) {}
      localStorage.clear();
      router.push(`/auth/login`);
      setErrState({});
    } else {
      setErrState(err);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md flex flex-col justify-center gap-4 sm:gap-6 order-2 lg:order-1">
        <PreStepBtn />
        <Titles
          big={"Create a strong password"}
          small={"Create a strong password with letters, numbers."}
        />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <input
              className="w-full h-9 sm:h-10 rounded-xl border border-zinc-300 pl-3 text-sm font-normal text-black focus:outline-none"
              placeholder="Password"
              type={showPassState === true ? "text" : "password"}
              onChange={(e) => setPass(e.target.value)}
            />
            {errState.pass && (
              <p className="text-red-500 text-xs sm:text-sm font-normal">
                {errState.pass}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="w-full h-9 sm:h-10 rounded-xl border border-zinc-300 pl-3 text-sm font-normal text-black focus:outline-none"
              placeholder="Confirm"
              type={showPassState === true ? "text" : "password"}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {errState.confirm && (
              <p className="text-red-500 text-xs sm:text-sm font-normal">
                {errState.confirm}
              </p>
            )}
          </div>
          <div className="flex flex-row gap-1.5 items-center">
            <input
              type="checkbox"
              className="cursor-pointer border-zinc-300"
              onClick={showPass}
            />
            <p className="text-sm text-zinc-400 font-normal">
              Show password
            </p>
          </div>
        </div>
        <LetsGo nextStep={AddNewUser} title={"Let's Go"} />
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
