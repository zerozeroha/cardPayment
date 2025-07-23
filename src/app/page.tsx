// src/app/page.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { useState } from "react";
import { usePayment } from "@/hooks/usePayment";
import { PaymentStep1 } from "@/components/PaymentStep1";
import { PaymentStep2 } from "@/components/PaymentStep2";
import { PaymentStep3 } from "@/components/PaymentStep3";
import { AnimatePresence, motion } from "framer-motion";
import { MouseCursor } from "@/components/MouseCursor";

const PaymentFlow = () => {
  const { step } = usePayment();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PaymentStep1 />;
      case 2:
        return <PaymentStep2 />;
      case 3:
        return <PaymentStep3 />;
      default:
        return <PaymentStep1 />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <MouseCursor />
      <div className="relative w-full max-w-md mx-auto">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="max-w-md mx-auto p-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <motion.div
                className="bg-toss-blue h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        <main className="pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <PaymentFlow />
      </JotaiProvider>
    </QueryClientProvider>
  );
}
