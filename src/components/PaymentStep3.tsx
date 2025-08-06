"use client";

import { useEffect} from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { usePayment } from "@/hooks/usePayment";
import { processPayment } from "@/lib/api";
import { Check } from "lucide-react";

export const PaymentStep3 = () => {
  const { selectedCard, amount, completePayment, reset } = usePayment();

  // useMutation
  // : 서버의 데이터를 생성(Create), 수정(Update), 삭제(Delete)하는 비동기 작업을 관리하는 훅
  // 로딩, 성공, 실패 상태와 함께 해당 작업을 실행하는 mutate 함수를 제공하여 UI 및 부수 효과 처리를 용이하게 함.

  // mutate : 함수 - 이 함수를 호출하면 서버에 데이터 변경을 요청
  // isPending : 상태 - mutate 호출 후, 아직 서버 응답을 기다리는 중인 상태 (로딩 중)
  // isSuccess : 상태 - 요청이 성공했을 때 true가 되는 상태
  // isError : 상태 - 요청이 실패했을 때 true가 되는 상태
  // error : 값 - 요청 실패 시, 에러 객체가 여기에 담김
  // isIdle : 상태 - mutate가 아직 한 번도 호출되지 않은 초기 대기 상태

  const paymentMutation = useMutation({
    mutationFn: () => processPayment(selectedCard!.id, amount),
    onSuccess: completePayment,
    onError: (error) => console.error("결제 실패:", error),
  });

  useEffect(() => {
    if (selectedCard && amount > 0) {
      paymentMutation.mutate();
    }
  }, []);

  if (paymentMutation.isPending) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-toss-blue border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-2xl font-bold text-toss-gray-900">
          결제 처리 중...
        </h2>
        <p className="text-toss-gray-600 mt-2">안전하게 처리하고 있어요</p>
      </div>
    );
  }

  if (paymentMutation.isSuccess) {
    return (
      <div className="p-6 text-center flex flex-col items-center justify-center h-[80vh]">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="w-24 h-24 bg-toss-blue rounded-full flex items-center justify-center mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <Check className="text-white" size={48} strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-toss-gray-900"
        >
          결제 완료!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-toss-gray-900 mt-4"
        >
          {amount.toLocaleString()}원
        </motion.p>
        <p className="text-toss-gray-600 mt-1">{selectedCard?.name}</p>

        <motion.div
          className="w-full mt-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={reset}
            className="custom-button bg-toss-blue text-white"
          >
            확인
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
};
