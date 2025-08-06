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

  // 숫자 또는 백스페이스 키를 눌렀을 때 처리하는 함수
  const handleKeyPress = (key: string) => {
    // 금액이 너무 길어지는 것을 방지
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
    setAmount(parseInt(newAmount, 10) || 0);

    // 금액이 변경될 때마다 미세한 애니메이션 효과
    if (amountRef.current) {
      gsap.fromTo(
        amountRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  };

  // 추천 금액 버튼을 눌렀을 때 처리하는 함수
  const handleQuickAmount = (quickAmount: number) => {
    setDisplayAmount(String(quickAmount));
    setAmount(quickAmount);
    if (amountRef.current) {
      gsap.fromTo(
        amountRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  };

  // 숫자 버튼 UI 컴포넌트
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
    // [수정됨] 화면 높이를 채우고 상/중/하단을 유연하게 배치하도록 flex 구조 변경
    <div className="p-4 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
      {/* 상단: 뒤로가기 버튼 */}
      <div>
        <button
          onClick={prevStep}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* 중앙: 제목 및 금액 표시 (남는 공간을 모두 차지) */}
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-toss-gray-900">
          얼마를 보낼까요?
        </h1>
        <p className="text-toss-gray-600 mt-2">{selectedCard?.name}</p>
        <div
          ref={amountRef}
          className="text-4xl sm:text-5xl font-bold text-toss-blue my-6 sm:my-8"
        >
          {parseInt(displayAmount).toLocaleString()}원
        </div>
      </div>

      {/* 하단: 키패드 및 결제 버튼 */}
      <div>
        {/* 빠른 금액 선택 버튼 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[10000, 50000, 100000, 500000].map((quickAmount) => (
            <motion.button
              key={quickAmount}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAmount(quickAmount)}
              className="py-2 px-1 text-sm bg-gray-100 hover:bg-gray-200 text-toss-gray-800 font-medium rounded-lg transition-colors"
            >
              {quickAmount.toLocaleString()}원
            </motion.button>
          ))}
        </div>

        {/* 숫자 키패드 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <NumberButton
              key={num}
              number={String(num)}
              onClick={() => handleKeyPress(String(num))}
            />
          ))}
          <div /> {/* 0 옆 빈 공간 */}
          <NumberButton
            number={<Delete size={28} />}
            onClick={() => handleKeyPress("backspace")}
          />
        </div>

        {/* 결제하기 버튼 */}
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
