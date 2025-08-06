// PaymentStep2.tsx

"use client";

import { useRef, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { usePayment } from "@/hooks/usePayment";
import { ArrowLeft, Delete } from "lucide-react";

export const PaymentStep2 = () => {
  const { selectedCard, amount, setAmount, nextStep, prevStep } = usePayment();
  const amountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (amountRef.current) {
      gsap.fromTo(
        amountRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [amount]);

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      const amountStr = amount.toString();
      const newAmountStr = amountStr.slice(0, -1) || "0";
      setAmount(parseInt(newAmountStr, 10));
    } else {
      const currentAmountStr = amount.toString();
      if (currentAmountStr.length >= 10) return;

      const newAmountStr = currentAmountStr === "0" ? key : currentAmountStr + key;
      setAmount(parseInt(newAmountStr, 10));
    }
  };

  // [수정됨] 빠른 금액 추가
  const handleQuickAmount = (quickAmount: number) => {
    const newTotal = amount + quickAmount;
    setAmount(Math.min(newTotal, 9999999999));
  };

  const NumberButton = ({ number, onClick }: { number: string | JSX.Element; onClick: () => void; }) => (
    <motion.button
      whileTap={{ scale: 0.95, backgroundColor: "#F2F4F6" }}
      onClick={onClick}
      className="flex items-center justify-center aspect-square text-3xl font-medium text-toss-gray-800 rounded-2xl"
    >
      {number}
    </motion.button>
  );

  return (
    <div className="p-4 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
      <div>
        <button onClick={prevStep} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-toss-gray-900">얼마를 보낼까요?</h1>
        <p className="text-toss-gray-600 mt-2">{selectedCard?.name}</p>
        <div ref={amountRef} className="text-4xl sm:text-5xl font-bold text-toss-blue my-6 sm:my-8">
          {amount.toLocaleString()}원
        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[10000, 50000, 100000, 500000].map((quickAmount) => (
            <motion.button
              key={quickAmount}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAmount(quickAmount)}
              className="py-2 px-1 text-sm bg-gray-100 hover:bg-gray-200 text-toss-gray-800 font-medium rounded-lg transition-colors"
            >
              +{quickAmount.toLocaleString()}원
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {"123456789".split("").map((num) => (
            <NumberButton key={num} number={num} onClick={() => handleKeyPress(num)} />
          ))}
          <div />
          <NumberButton number="0" onClick={() => handleKeyPress("0")} />
          <NumberButton number={<Delete size={28} />} onClick={() => handleKeyPress("backspace")} />
        </div>
        <button onClick={nextStep} disabled={amount === 0} className="custom-button bg-toss-blue text-white">
          {amount > 0 ? `${amount.toLocaleString()}원 결제하기` : "금액을 입력하세요"}
        </button>
      </div>
    </div>
  );
};
