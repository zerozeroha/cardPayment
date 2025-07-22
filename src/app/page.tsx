// src/app/page.tsx
// 🏠 메인 페이지 - 모든 컴포넌트들을 조합하는 곳

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { useState } from "react";
import { usePayment } from "@/hooks/usePayment";
import { MouseCursor } from "@/components/MouseCursor";
import { PaymentStep1 } from "@/components/PaymentStep1";
import { PaymentStep2 } from "@/components/PaymentStep2";
import { PaymentStep3 } from "@/components/PaymentStep3";

// 🎯 실제 결제 플로우 컴포넌트
const PaymentFlow = () => {
  const { step } = usePayment(); // 현재 단계 가져오기

  // 📱 단계별로 다른 화면 보여주기
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PaymentStep1 />; // 카드 선택
      case 2:
        return <PaymentStep2 />; // 금액 입력
      case 3:
        return <PaymentStep3 />; // 결제 완료
      default:
        return <PaymentStep1 />; // 기본값은 카드 선택
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* 🖱️ 마우스 커서 효과 (토스 홈페이지 스타일) */}
      <MouseCursor />

      {/* 📊 진행률 표시 */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              단계 {step}/3
            </span>
            <span className="text-sm text-gray-500">
              {step === 1
                ? "카드 선택"
                : step === 2
                ? "금액 입력"
                : "결제 완료"}
            </span>
          </div>

          {/* 진행률 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }} // 단계에 따라 길이 변화
            />
          </div>
        </div>
      </div>

      {/* 🎬 메인 콘텐츠 영역 */}
      <div className="pt-20 pb-8">{renderStep()}</div>

      {/* 🎨 배경 장식 (토스 스타일) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
};

// 🏠 메인 앱 컴포넌트
export default function HomePage() {
  // ⚡ React Query 클라이언트 생성 (한 번만 생성하기 위해 useState 사용)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분 동안 데이터를 신선하다고 간주
            gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
          },
        },
      })
  );

  return (
    // 🔌 React Query 제공자
    <QueryClientProvider client={queryClient}>
      {/* 🏪 Jotai 상태 관리 제공자 */}
      <JotaiProvider>
        <main className="relative">
          {/* 🎯 실제 앱 */}
          <PaymentFlow />

          {/* 🎭 토스 로고 (오른쪽 하단) */}
          <div className="fixed bottom-6 right-6 text-xs text-gray-400 pointer-events-none">
            Powered by Toss Interactive
          </div>
        </main>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
