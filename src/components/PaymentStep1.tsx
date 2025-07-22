// src/components/PaymentStep1.tsx
// 💳 1단계: 카드 선택 화면 (토스 스타일 인터랙티브 효과)

"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card as CardType } from "@/types";
import { fetchUserCards } from "@/lib/api";
import { usePayment } from "@/hooks/usePayment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const PaymentStep1 = () => {
  const { selectedCard, selectCard, nextStep } = usePayment();

  // 🔌 React Query로 카드 목록 가져오기
  const { data: cards, isLoading } = useQuery({
    queryKey: ["userCards"], // 캐시 키
    queryFn: fetchUserCards, // 실제 데이터 가져오는 함수
  });

  // ⏳ 로딩 중일 때 보여줄 화면
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }} // 360도 회전
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <span className="ml-3 text-lg">카드 목록을 가져오는 중...</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      {/* 📋 제목 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }} // 위에서 아래로 나타나기
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          결제할 카드를 선택하세요
        </h1>
        <p className="text-gray-600">카드를 클릭하면 선택됩니다</p>
      </motion.div>

      {/* 💳 카드 목록 */}
      <div className="space-y-4 mb-8">
        {cards?.map((card: CardType, index: number) => (
          <motion.div
            key={card.id}
            initial={{ x: -50, opacity: 0 }} // 왼쪽에서 오른쪽으로 나타나기
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }} // 순서대로 나타나기
            whileHover={{
              y: -8, // 마우스 올리면 위로 8px 올라가기
              scale: 1.02, // 살짝 커지기
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)", // 그림자 생기기
            }}
            whileTap={{ scale: 0.98 }} // 클릭할 때 살짝 작아지기
            onClick={() => selectCard(card)} // 카드 클릭 시 선택
            className="cursor-pointer"
          >
            <Card
              className={`
              p-6 transition-all duration-200
              ${
                selectedCard?.id === card.id
                  ? "ring-2 ring-blue-500 bg-blue-50" // 선택된 카드 스타일
                  : "hover:shadow-lg" // 일반 카드 스타일
              }
            `}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  {/* 카드 정보 */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {card.name}
                    </h3>
                    <p className="text-gray-600 font-mono text-sm">
                      {card.number}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      잔액: {card.balance.toLocaleString()}원
                    </p>
                  </div>

                  {/* 카드 색깔 표시 */}
                  <div
                    className={`
                    w-16 h-10 rounded-lg
                    ${
                      card.color === "blue"
                        ? "bg-blue-500"
                        : card.color === "black"
                        ? "bg-gray-800"
                        : "bg-purple-500"
                    }
                  `}
                  />
                </div>

                {/* 선택됨 표시 */}
                {selectedCard?.id === card.id && (
                  <motion.div
                    initial={{ scale: 0 }} // 작은 크기에서 시작
                    animate={{ scale: 1 }} // 원래 크기로 커지기
                    className="mt-3 flex items-center text-blue-600"
                  >
                    <span className="text-sm font-medium">✓ 선택됨</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ➡️ 다음 버튼 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }} // 아래에서 위로 나타나기
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={nextStep}
          disabled={!selectedCard} // 카드가 선택되지 않으면 비활성화
          className={`
            w-full py-6 text-lg font-semibold rounded-xl transition-all duration-200
            ${
              selectedCard
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          {selectedCard ? "다음 단계로" : "카드를 선택해주세요"}
        </Button>
      </motion.div>
    </div>
  );
};
