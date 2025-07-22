// src/components/PaymentStep3.tsx
// ✅ 3단계: 결제 완료 화면 (토스 스타일 성공 애니메이션)

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useMutation } from "@tanstack/react-query";
import { usePayment } from "@/hooks/usePayment";
import { processPayment } from "@/lib/api";
import { Button } from "@/components/ui/button";

export const PaymentStep3 = () => {
  const {
    selectedCard,
    amount,
    isLoading,
    setLoading,
    completePayment,
    reset,
  } = usePayment();
  const [countedAmount, setCountedAmount] = useState(0); // 카운터 애니메이션용

  // 📍 애니메이션 요소들 참조
  const checkmarkRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // 💸 실제 결제 처리 (React Query mutation)
  const paymentMutation = useMutation({
    mutationFn: () => processPayment(selectedCard!.id, amount),
    onSuccess: () => {
      console.log("✅ 결제 성공!");
      completePayment(); // 결제 완료 상태로 변경
      startSuccessAnimations(); // 성공 애니메이션 시작
    },
    onError: (error) => {
      console.error("❌ 결제 실패:", error);
      setLoading(false);
    },
  });

  // 🎬 성공 애니메이션들을 시작하는 함수
  const startSuccessAnimations = () => {
    // ✅ 체크마크 애니메이션
    if (checkmarkRef.current) {
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)", // 통통 튀는 효과
        }
      );
    }

    // 🔢 숫자 카운터 애니메이션 (0에서 실제 금액까지)
    gsap.fromTo(
      counterRef.current,
      { textContent: 0 },
      {
        textContent: amount,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 }, // 정수로 스냅
        onUpdate: function () {
          const currentValue = parseInt(this.targets()[0].textContent);
          setCountedAmount(currentValue);
        },
      }
    );

    // 🎉 화면 전체에 축하 효과 (간단한 색상 변화)
    gsap.to(document.body, {
      backgroundColor: "#f0f9ff", // 연한 파란색으로 변경
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    });
  };

  // 🏁 컴포넌트가 로드되면 결제 시작
  useEffect(() => {
    if (selectedCard && amount > 0) {
      paymentMutation.mutate(); // 결제 API 호출
    }
  }, []);

  // ⏳ 로딩 중일 때 보여줄 화면
  if (isLoading || paymentMutation.isPending) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            {/* 외부 링 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-blue-100 rounded-full"
            />
            {/* 내부 링 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
            />
            {/* 중앙 점 */}
            <motion.div
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-6 bg-blue-500 rounded-full"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            결제 처리 중...
          </h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </motion.div>

        {/* 결제 정보 표시 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-sm text-gray-600 mb-1">결제 카드</div>
          <div className="font-semibold text-gray-900 mb-3">
            {selectedCard?.name}
          </div>

          <div className="text-sm text-gray-600 mb-1">결제 금액</div>
          <div className="text-2xl font-bold text-blue-600">
            ₩{amount.toLocaleString()}
          </div>
        </div>
      </div>
    );
  }

  // ✅ 결제 완료 화면
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ✅ 체크마크 */}
        <div
          ref={checkmarkRef}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <motion.path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.svg>
        </div>

        {/* 🎉 성공 메시지 */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          결제 완료!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 mb-8"
        >
          결제가 성공적으로 완료되었습니다
        </motion.p>

        {/* 💰 결제 금액 (카운터 애니메이션) */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-blue-50 rounded-xl p-6 mb-8"
        >
          <div className="text-sm text-blue-600 mb-2">결제 완료 금액</div>
          <div ref={counterRef} className="text-4xl font-bold text-blue-600">
            ₩{countedAmount.toLocaleString()}
          </div>
        </motion.div>

        {/* 📋 결제 정보 요약 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-4 mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">결제 카드</span>
            <span className="font-semibold">{selectedCard?.name}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">카드 번호</span>
            <span className="font-mono text-sm">{selectedCard?.number}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">결제 시간</span>
            <span className="text-sm">
              {new Date().toLocaleString("ko-KR")}
            </span>
          </div>
        </motion.div>

        {/* 🔄 다시 결제하기 버튼 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button
            onClick={reset} // 처음부터 다시 시작
            className="w-full py-6 text-lg font-semibold rounded-xl bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            새로운 결제하기
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
