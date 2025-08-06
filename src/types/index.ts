// 카드 정보 타입
export interface Card {
  id: number; // 카드 고유 번호 (1, 2, 3...)
  name: string; // 카드 이름 ("토스뱅크 카드")
  number: string; // 카드 번호 ("**** **** **** 1234")
  color: string; // 카드 색깔 
  balance: number; // 잔액 (1000000 = 100만원)
}

// 결제 현재 상태 타입
export interface PaymentState {
  step: number; // 현재 단계 (1: 카드선택, 2: 금액입력, 3: 완료)
  selectedCard: Card | null; // 선택된 카드 (없으면 null)
  amount: number; // 입력한 금액 (10000 = 1만원)
  isLoading: boolean; // 로딩 중인지 (true/false)
  isComplete: boolean; // 결제 완료됐는지 (true/false)
}

// 마우스 위치 타입
export interface MousePosition {
  x: number; // 마우스 X 좌표
  y: number; // 마우스 Y 좌표
}
