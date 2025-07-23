// src/components/PaymentStep1.tsx
"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card as CardType } from "@/types";
import { fetchUserCards } from "@/lib/api";
import { usePayment } from "@/hooks/usePayment";

// 스켈레톤 UI (로딩 중 표시)
const CardSkeleton = () => (
  <div className="custom-card p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div
          className="h-5 w-32 bg-gray-200 rounded animate-shimmer bg-gradient-shimmer bg-no-repeat"
          style={{ backgroundSize: "1000px 100%" }}
        />
        <div
          className="h-4 w-40 bg-gray-200 rounded animate-shimmer bg-gradient-shimmer bg-no-repeat"
          style={{ backgroundSize: "1000px 100%" }}
        />
      </div>
      <div
        className="w-16 h-10 rounded-lg bg-gray-200 animate-shimmer bg-gradient-shimmer bg-no-repeat"
        style={{ backgroundSize: "1000px 100%" }}
      />
    </div>
  </div>
);

export const PaymentStep1 = () => {
  const { selectedCard, selectCard, nextStep } = usePayment();

  const { data: cards, isLoading } = useQuery({
    queryKey: ["userCards"],
    queryFn: fetchUserCards,
  });

  // [수정됨] 카드 색상을 Tailwind CSS 클래스에 매핑
  const cardColor: { [key: string]: string } = {
    blue: "bg-blue-500",
    black: "bg-gray-800",
    purple: "bg-purple-500",
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-toss-gray-900">
          결제할 카드 선택
        </h1>
        <p className="text-toss-gray-600 mt-2">사용할 카드를 선택해주세요.</p>
      </motion.div>

      <div className="space-y-4 mb-8">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : cards?.map((card: CardType, index: number) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectCard(card)}
                className="cursor-pointer"
              >
                <div
                  className={`custom-card p-6 ${
                    selectedCard?.id === card.id ? "ring-2 ring-toss-blue" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-toss-gray-800">
                        {card.name}
                      </h3>
                      <p className="text-toss-gray-600 font-mono text-sm mt-1">
                        {card.number}
                      </p>
                    </div>
                    {/* [수정됨] 매핑된 색상 클래스 사용 */}
                    <div
                      className={`w-16 h-10 rounded-lg ${
                        cardColor[card.color]
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={nextStep}
          disabled={!selectedCard}
          className="custom-button bg-toss-blue text-white"
        >
          {selectedCard ? "다음" : "카드를 선택하세요"}
        </button>
      </motion.div>
    </div>
  );
};
