"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card as CardType } from "@/types";
import { fetchUserCards } from "@/lib/api";
import { usePayment } from "@/hooks/usePayment";
import CardSkeleton from "@/components/ui/skeleton";

export const PaymentStep1 = () => {
  const { selectedCard, selectCard, nextStep } = usePayment();

  const { data: cards, isLoading } = useQuery({
    queryKey: ["userCards"],
    queryFn: fetchUserCards,
  });

  // [수정됨] 그라데이션, 로고 색상 등을 포함하도록 객체 확장
  const cardStyles: { [key: string]: { gradient: string; logo: string } } = {
    blue: {
      gradient: "from-blue-500 to-blue-700",
      logo: "text-white",
    },
    black: {
      gradient: "from-gray-800 to-black",
      logo: "text-gray-400",
    },
    purple: {
      gradient: "from-purple-500 to-purple-700",
      logo: "text-white",
    },
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
                    <div
                      className={`relative w-16 h-10 rounded-lg flex flex-col justify-between p-1.5 shadow-md bg-gradient-to-br ${
                        cardStyles[card.color]?.gradient || "from-gray-500 to-gray-700"
                      }`}
                    >
                      <div className="w-2 h-1.5 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-sm"></div>

                      <div className={`w-6 h-4 self-end flex ${cardStyles[card.color]?.logo || "text-white"}`}>
                        <div className="w-4 h-4 rounded-full bg-current opacity-50"></div>
                        <div className="w-4 h-4 rounded-full bg-current opacity-50 -ml-2"></div>
                      </div>
                    </div>
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
