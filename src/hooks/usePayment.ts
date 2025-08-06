// usePayment.ts

import { atom, useAtom } from "jotai";
import { Card, PaymentState } from "@/types";

const paymentStateAtom = atom<PaymentState>({
  step: 1,
  selectedCard: null,
  amount: 0,
  isLoading: false,
  isComplete: false,
});

export const usePayment = () => {
  const [state, setState] = useAtom(paymentStateAtom);

  const selectCard = (card: Card) => {
    setState((prev) => ({ ...prev, selectedCard: card }));
  };

  // [수정됨] 함수형 업데이트를 안정적으로 처리하여 연속 클릭 문제를 해결합니다.
  const setAmount = (update: number | ((prevAmount: number) => number)) => {
    setState((prevState) => {
      const currentAmount = prevState.amount;
      const newAmount = typeof update === "function" ? update(currentAmount) : update;
      // 금액이 너무 커지는 것을 방지 (최대 10자리)
      const finalAmount = Math.min(newAmount, 9999999999);
      return { ...prevState, amount: finalAmount };
    });
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  const completePayment = () => {
    setState((prev) => ({
      ...prev,
      isComplete: true,
      isLoading: false,
      step: 3,
    }));
  };

  const reset = () => {
    setState({
      step: 1,
      selectedCard: null,
      amount: 0,
      isLoading: false,
      isComplete: false,
    });
  };

  return {
    step: state.step,
    selectedCard: state.selectedCard,
    amount: state.amount,
    isLoading: state.isLoading,
    isComplete: state.isComplete,
    selectCard,
    setAmount,
    nextStep,
    prevStep,
    completePayment,
    reset,
  };
};
