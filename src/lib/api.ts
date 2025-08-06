import { Card } from "@/types";

// 사용자의 카드 목록을 가져오는 함수 (가짜)
export const fetchUserCards = async (): Promise<Card[]> => {
  // 실제로는 서버에서 가져오지만, 지금은 가짜 데이터로 테스트해요

  // 2초 기다린 후 카드 목록 반환 (로딩 효과 보려고)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const cards: Card[] = [
    {
      id: 1,
      name: "토스뱅크 카드",
      number: "**** **** **** 1234",
      color: "blue",
      balance: 1500000, // 150만원
    },
    {
      id: 2,
      name: "토스 체크카드",
      number: "**** **** **** 5678",
      color: "black",
      balance: 800000, // 80만원
    },
    {
      id: 3,
      name: "토스 프리미엄",
      number: "**** **** **** 9999",
      color: "purple",
      balance: 2500000, // 250만원
    },
  ];

  return cards;
};

// 결제를 처리하는 함수 (가짜)
export const processPayment = async (
  cardId: number,
  amount: number
): Promise<boolean> => {
  // 실제로는 서버로 결제 요청을 보내지만, 지금은 가짜로 성공 처리

  console.log(`💳 카드 ${cardId}번으로 ${amount}원 결제 시작!`);

  // 3초 기다린 후 성공 반환 (결제 처리 시간 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log(`✅ 결제 성공!`);
  return true; // 항상 성공한다고 가정
};
