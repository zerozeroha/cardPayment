"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const MouseCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 디바이스 여부 확인
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    if (mobileCheck) return; // 모바일이면 커서 비활성화

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isMobile) return null; // 모바일이면 아무것도 렌더링하지 않음

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0 w-5 h-5 z-[9999]
        bg-[#00B8F0] rounded-full
        pointer-events-none opacity-80
        mix-blend-difference
      "
    />
  );
};
