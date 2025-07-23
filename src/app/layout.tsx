// src/app/layout.tsx
//  전체 앱 레이아웃 (모든 페이지에 공통으로 적용)

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//  폰트 설정 (구글 폰트)
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // 폰트 로딩 최적화
});

// SEO 메타데이터 설정
export const metadata: Metadata = {
  title: "토스 인터랙티브 결제 데모",
  description: "토스 스타일의 인터랙티브 결제 시스템",
  keywords: ["토스", "결제", "인터랙티브", "React", "Next.js"],
  authors: [{ name: "Interactive Developer" }],
  // 📱 모바일 최적화
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.className}>
      <head>
        {/* PWA 관련 메타태그 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="토스 결제" />

        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" />

        {/* ⚡ 성능 최적화 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body
        className={`
          ${inter.className}
          antialiased
          bg-white
          text-gray-900
          overflow-x-hidden
        `}
        // 기본 커서 숨기기 (커스텀 커서 사용)
        // style={{ cursor: "none" }}
      >
        {/* 실제 앱 콘텐츠 */}
        {children}

        {/* 개발 환경에서만 보이는 정보 */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed top-4 left-4 bg-black text-white text-xs px-2 py-1 rounded opacity-50 pointer-events-none z-50">
            dev.hayoung
          </div>
        )}
      </body>
    </html>
  );
}
