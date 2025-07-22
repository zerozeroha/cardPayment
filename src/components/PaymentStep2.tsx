// src/components/PaymentStep2.tsx
// 💰 2단계: 금액 입력 화면 (토스 스타일 숫자 키패드)

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { usePayment } from "@/hooks/usePayment";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const PaymentStep2 = () => {
  const { selectedCard, amount, setAmount, nextStep, prevStep, setLoading } =
    usePayment();
  const [displayAmount, setDisplayAmount] = useState("0");

  // 💰 금액 표시 요소 참조 (GSAP 애니메이션용)
  const amountRef = useRef<HTMLDivElement>(null);

  // 🔢 숫자 버튼 클릭 시 실행되는 함수
  const handleNumberClick = (num: string) => {
    let newAmount = displayAmount;

    if (displayAmount === "0") {
      newAmount = num; // 0이면 새 숫자로 교체
    } else {
      newAmount = displayAmount + num; // 기존 숫자에 추가
    }

    setDisplayAmount(newAmount); // 화면에 보이는 금액 업데이트
    setAmount(parseInt(newAmount)); // 실제 상태 업데이트

    // ✨ GSAP으로 숫자가 변할 때 살짝 커지는 효과
    if (amountRef.current) {
      gsap.fromTo(
        amountRef.current,
        { scale: 1 },
        { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 }
      );
    }
  };

  // ⌫ 백스페이스 버튼 클릭 시 실행되는 함수
  const handleBackspace = () => {
    const newAmount = displayAmount.slice(0, -1) || "0"; // 마지막 글자 제거
    setDisplayAmount(newAmount);
    setAmount(parseInt(newAmount) || 0);
  };

  // 💸 결제 진행 함수
  const handlePayment = () => {
    console.log("💸 결제 시작!");
    setLoading(true); // 로딩 시작
    nextStep(); // 다음 단계로 이동
  };

  // 💰 금액을 천 단위로 포맷하는 함수 (1000 → 1,000)
  const formatAmount = (amount: string) => {
    return parseInt(amount).toLocaleString("ko-KR");
  };

  // 🔢 숫자 버튼 컴포넌트
  const NumberButton = ({
    number,
    onClick,
  }: {
    number: string;
    onClick: () => void;
  }) => (
    <motion.button
      whileHover={{ scale: 1.05 }} // 마우스 올리면 커지기
      whileTap={{ scale: 0.95 }} // 클릭하면 작아지기
      onClick={onClick}
      className="
        w-full aspect-square
        bg-white hover:bg-gray-50
        border border-gray-200 rounded-xl
        text-2xl font-semibold text-gray-800
        shadow-sm hover:shadow-md
        transition-all duration-200
      "
    >
      {number}
    </motion.button>
  );

  return (
    <div className="max-w-md mx-auto p-6">
      {/* 🔙 뒤로가기 버튼 */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          onClick={prevStep}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* 📋 제목 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          결제 금액을 입력하세요
        </h1>
        <p className="text-gray-600">{selectedCard?.name}로 결제합니다</p>
      </motion.div>

      {/* 💰 금액 표시 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div ref={amountRef} className="text-5xl font-bold text-gray-900 mb-2">
          ₩{displayAmount !== "0" ? formatAmount(displayAmount) : "0"}
        </div>
        <div className="text-gray-500">원</div>
      </motion.div>

      {/* 🔢 숫자 키패드 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {/* 숫자 1~9 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <NumberButton
            key={num}
            number={num.toString()}
            onClick={() => handleNumberClick(num.toString())}
          />
        ))}

        {/* 빈 칸 */}
        <div></div>

        {/* 숫자 0 */}
        <NumberButton number="0" onClick={() => handleNumberClick("0")} />

        {/* ⌫ 백스페이스 버튼 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackspace}
          className="
            w-full aspect-square
            bg-gray-100 hover:bg-gray-200
            border border-gray-200 rounded-xl
            text-2xl text-gray-600
            shadow-sm hover:shadow-md
            transition-all duration-200
            flex items-center justify-center
          "
        >
          ⌫
        </motion.button>
      </motion.div>

      {/* 💸 빠른 금액 선택 버튼들 */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {[10000, 50000, 100000, 500000].map((quickAmount) => (
          <motion.button
            key={quickAmount}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setDisplayAmount(quickAmount.toString());
              setAmount(quickAmount);
            }}
            className="
              py-3 px-4
              bg-blue-50 hover:bg-blue-100
              text-blue-600 font-medium
              rounded-xl transition-all duration-200
            "
          >
            {quickAmount.toLocaleString()}원
          </motion.button>
        ))}
      </motion.div>

      {/* ✅ 결제하기 버튼 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button
          onClick={handlePayment}
          disabled={amount === 0} // 금액이 0이면 비활성화
          className={`
            w-full py-6 text-lg font-semibold rounded-xl transition-all duration-200
            ${
              amount > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          {amount > 0
            ? `${formatAmount(amount.toString())}원 결제하기`
            : "금액을 입력해주세요"}
        </Button>
      </motion.div>
    </div>
  );
};
