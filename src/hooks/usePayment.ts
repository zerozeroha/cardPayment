// src/hooks/usePayment.ts
// 🏪 결제 관련 상태를 관리하는 곳 (Jotai 사용)

import { atom, useAtom } from "jotai";
import { Card, PaymentState } from "@/types";

// 🎯 결제 상태를 저장하는 atom (Jotai의 상태 저장소)
const paymentStateAtom = atom<PaymentState>({
  step: 1, // 처음에는 1단계 (카드 선택)
  selectedCard: null, // 처음에는 선택된 카드 없음
  amount: 0, // 처음에는 금액 0원
  isLoading: false, // 처음에는 로딩 안함
  isComplete: false, // 처음에는 완료 안됨
});

// 🪝 결제 상태를 사용하는 훅 (컴포넌트에서 쉽게 쓸 수 있게)
export const usePayment = () => {
  const [state, setState] = useAtom(paymentStateAtom);

  // 📝 카드 선택하는 함수
  const selectCard = (card: Card) => {
    console.log(`🎯 카드 선택됨:`, card.name);
    setState((prev) => ({
      ...prev, // 기존 상태 그대로 유지하고
      selectedCard: card, // 선택된 카드만 변경
    }));
  };

  // 💰 금액 설정하는 함수
  const setAmount = (amount: number) => {
    console.log(`💰 금액 설정됨:`, amount);
    setState((prev) => ({
      ...prev, // 기존 상태 그대로 유지하고
      amount, // 금액만 변경
    }));
  };

  // ➡️ 다음 단계로 가는 함수
  const nextStep = () => {
    console.log(`➡️ 다음 단계로: ${state.step} → ${state.step + 1}`);
    setState((prev) => ({
      ...prev,
      step: prev.step + 1, // 단계를 1 증가
    }));
  };

  // ⬅️ 이전 단계로 가는 함수
  const prevStep = () => {
    console.log(`⬅️ 이전 단계로: ${state.step} → ${state.step - 1}`);
    setState((prev) => ({
      ...prev,
      step: prev.step - 1, // 단계를 1 감소
    }));
  };

  // ⏳ 로딩 상태 설정하는 함수
  const setLoading = (loading: boolean) => {
    console.log(`⏳ 로딩 상태:`, loading ? "시작" : "끝");
    setState((prev) => ({
      ...prev,
      isLoading: loading,
    }));
  };

  // ✅ 결제 완료 처리하는 함수
  const completePayment = () => {
    console.log(`✅ 결제 완료!`);
    setState((prev) => ({
      ...prev,
      isComplete: true,
      isLoading: false,
      step: 3, // 완료 단계로 이동
    }));
  };

  // 🔄 처음부터 다시 시작하는 함수
  const reset = () => {
    console.log(`🔄 처음부터 다시 시작`);
    setState({
      step: 1,
      selectedCard: null,
      amount: 0,
      isLoading: false,
      isComplete: false,
    });
  };

  // 컴포넌트에서 사용할 수 있도록 상태와 함수들을 반환
  return {
    // 현재 상태들
    step: state.step,
    selectedCard: state.selectedCard,
    amount: state.amount,
    isLoading: state.isLoading,
    isComplete: state.isComplete,

    // 상태를 변경하는 함수들
    selectCard,
    setAmount,
    nextStep,
    prevStep,
    setLoading,
    completePayment,
    reset,
  };
};
