// src/components/PaymentStep2.tsx
"use client";

import { useState, useRef, JSX } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { usePayment } from "@/hooks/usePayment";
import { ArrowLeft, Delete } from "lucide-react";

export const PaymentStep2 = () => {
  const { selectedCard, amount, setAmount, nextStep, prevStep } = usePayment();
  const [displayAmount, setDisplayAmount] = useState("0");
  const amountRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (key: string) => {
    if (displayAmount.length >= 10 && key !== "backspace") return;

    let newAmount = displayAmount;
    if (key === "backspace") {
      newAmount = displayAmount.slice(0, -1) || "0";
    } else if (displayAmount === "0") {
      newAmount = key;
    } else {
      newAmount = displayAmount + key;
    }

    setDisplayAmount(newAmount);
    setAmount(parseInt(newAmount, 10));

    if (amountRef.current) {
      gsap.fromTo(
        amountRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  };

  const NumberButton = ({
    number,
    onClick,
  }: {
    number: string | JSX.Element;
    onClick: () => void;
  }) => (
    <motion.button
      whileTap={{ scale: 0.95, backgroundColor: "#F2F4F6" }}
      onClick={onClick}
      className="flex items-center justify-center aspect-square text-3xl font-medium text-toss-gray-800 rounded-2xl"
    >
      {number}
    </motion.button>
  );

  return (
    <div className="p-4 flex flex-col h-[80vh] max-h-[700px]">
      <div className="flex-shrink-0">
        <button
          onClick={prevStep}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-toss-gray-900">
          얼마를 보낼까요?
        </h1>
        <p className="text-toss-gray-600 mt-2">{selectedCard?.name}</p>
        <div ref={amountRef} className="text-5xl font-bold text-toss-blue my-8">
          {parseInt(displayAmount).toLocaleString()}원
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <NumberButton
              key={num}
              number={String(num)}
              onClick={() => handleKeyPress(String(num))}
            />
          ))}
          <div />
          <NumberButton
            number={<Delete size={28} />}
            onClick={() => handleKeyPress("backspace")}
          />
        </div>
        <button
          onClick={nextStep}
          disabled={amount === 0}
          className="custom-button bg-toss-blue text-white"
        >
          {amount > 0
            ? `${amount.toLocaleString()}원 결제하기`
            : "금액을 입력하세요"}
        </button>
      </div>
    </div>
  );
};
