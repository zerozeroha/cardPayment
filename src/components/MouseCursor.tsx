// src/components/MouseCursor.tsx
// 🖱️ 토스 홈페이지처럼 마우스를 따라다니는 동그라미 커서

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const MouseCursor = () => {
  // 📍 커서 요소를 참조할 ref
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return; // 커서 요소가 없으면 종료

    // 🖱️ 마우스가 움직일 때마다 실행되는 함수
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e; // 마우스 좌표 가져오기

      // GSAP으로 부드럽게 커서 이동시키기
      gsap.to(cursor, {
        x: clientX - 10, // 마우스 X 좌표 - 10px (가운데 맞추기)
        y: clientY - 10, // 마우스 Y 좌표 - 10px (가운데 맞추기)
        duration: 0.1, // 0.1초 동안 부드럽게 이동
        ease: "power2.out", // 부드러운 애니메이션 효과
      });
    };

    // 🖱️ 클릭할 때 커서가 작아지는 효과
    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8, // 80% 크기로 작아짐
        duration: 0.1,
      });
    };

    // 🖱️ 클릭을 놓을 때 커서가 원래 크기로 돌아옴
    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: 1, // 100% 크기로 돌아옴
        duration: 0.2,
      });
    };

    // 📱 마우스 이벤트 리스너 등록
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // 🧹 컴포넌트가 사라질 때 이벤트 리스너 제거 (메모리 절약)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0
        w-5 h-5
        bg-blue-500
        rounded-full
        pointer-events-none
        z-50
        mix-blend-difference
        opacity-80
      "
      style={{
        // 📱 모바일에서는 숨기기 (터치 디바이스에는 마우스 없으니까)
        display: "none",
      }}
    />
  );
};
