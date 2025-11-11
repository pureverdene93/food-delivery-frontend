"use client";
import { useState } from "react";
import { StepOne } from "./features/stepOne";
import { StepTwo } from "./features/stepTwo";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <StepOne step={() => setStep(step + 1)} />}
      {step === 2 && <StepTwo />}
    </>
  );
}
