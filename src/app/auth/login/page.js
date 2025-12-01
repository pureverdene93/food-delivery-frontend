"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Prev } from "../../icons/prev-icon";
import { jwtDecode } from "jwt-decode";
import { PreStepBtn } from "../authComponents/preStep";
import { LetsGo } from "../authComponents/letsGo";
import { Titles } from "../authComponents/titles";
import { AlreadyAccount } from "../authComponents/alreadyHaveAccount";
import { FaEye } from "react-icons/fa";

const backend_url = process.env.BACKEND_URL;

export default function Home() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [errState, setErrState] = useState({});
  const [passState, setPassState] = useState(false);

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
        const res = await fetch(`${backend_url}/user/signIn`, {
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
        const { token } = await res.js
        on();
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
              className={`w-[416px] h-9 rounded-xl border border-zinc-300 pl-2 text-[14px] font-normal text-black focus:outline-none`}
              placeholder="Enter your email adress"
              onChange={(e) => setEmailInput(e.target.value)}
            />
            {errState.email && (
              <p className="text-red-500 text-[14px] font-normal">
                {errState.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-[416px] rounded-xl h-9 border border-zinc-300 flex">
              <input
                className="w-[390px] h-9 rounded-xl pl-2 text-[14px] font-normal text-black focus:outline-none"
                placeholder="Password"
                type={passState === true ? "text" : "password"}
                onChange={(e) => setPassInput(e.target.value)}
              />
              <button
                className="cursor-pointer"
                onClick={() => setPassState(!passState)}
              >
                <FaEye />
              </button>
            </div>
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
