"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Prev } from "../../icons/prev-icon";
import { jwtDecode } from "jwt-decode";
import { PreStepBtn } from "../authComponents/preStep";
import { LetsGo } from "../authComponents/letsGo";
import { Titles } from "../authComponents/titles";
import { AlreadyAccount } from "../authComponents/alreadyHaveAccount";

export default function Home() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [errState, setErrState] = useState({});
  const saveEmailInput = (e) => {
    setEmailInput(e.target.value);
  };
  console.log(emailInput, "this is email");
  const savePassInput = (e) => {
    setPassInput(e.target.value);
  };
  const pushSignUp = () => {
    router.push(`/auth/signUp`);
  };
  const checkEmail = (mail) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[A-Za-z]{2,}$/.test(
      mail
    );
  };
  const checkPass = (pass) => {
    return /^(?=\S{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S+$/.test(
      pass
    );
  };
  const checkMailAndPass = () => {
    const errors = {};
    if (!checkEmail(emailInput)) {
      errors.email = "Invalid email. Use a format like example@email.com.";
    }
    if (!checkPass(passInput)) {
      errors.pass = "Incorrect password. Please try again.";
    }
    return errors;
  };

  const nextButton = async () => {
    const err = checkMailAndPass();
    if (Object.keys(err).length === 0) {
      try {
        const res = await fetch("http://localhost:8000/user/signIn", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            email: emailInput,
            password: passInput,
          }),
        });
        const { token } = await res.json();
        localStorage.setItem("token", token);
        const decode = jwtDecode(token);
        if (decode.role === "admin") {
          router.push(`/admin`);
        }
        if (decode.role === "user") {
          router.push(`/`);
        }
      } catch (err) {
        console.log(err);
      }
      setErrState({});
    } else {
      setErrState(err);
    }
  };

  console.log(passInput, "this is pass");

  return (
    <div className="bg-white w-screen h-screen flex flex-row justify-center items-center gap-12">
      <div className="w-[416px] min-h-[376px] flex flex-col justify-center gap-6">
        <PreStepBtn />
        <Titles
          big={"Log in "}
          small={"Log in to enjoy your favorite dishes."}
        />
        <div className="flex flex-col gap-4 items-baseline">
          <div className="flex flex-col gap-2">
            <input
              className={`w-[416px] h-9 rounded-xl border border-zinc-300 pl-2 text-[14px] font-normal text-black`}
              placeholder="Enter your email adress"
              onChange={saveEmailInput}
            />
            {errState.email && (
              <p className="text-red-500 text-[14px] font-normal">
                {errState.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="w-[416px] h-9 rounded-xl border border-zinc-300 pl-2 text-[14px] font-normal text-black"
              placeholder="Password"
              onChange={savePassInput}
            />
            {errState.pass && (
              <p className="text-red-500 text-[14px] font-normal">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          <button
            className={`text-[14px] font-normal text-black cursor-pointer hover:underline`}
            onClick={() => router.push(`/auth/reset-password`)}
          >
            Forgot password ?
          </button>
        </div>
        <LetsGo nextStep={nextButton} title={"Let's Go"} />
        {/* <span className="text-zinc-300 font-normal text-4 flex justify-center gap-3">
          {`Don’t have an account?`}
          <button
            className="text-blue-600 text-4 font-normal cursor-pointer hover:underline"
            onClick={pushSignUp}
          >
            Sign up
          </button>
        </span> */}
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
