"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export const FloatingScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLastStep, setIsLastStep] = useState(false);
  const pathname = usePathname();

  const checkStatus = useCallback(() => {
    const elements = Array.from(document.querySelectorAll("h1, h2, h3"));
    if (elements.length < 2) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // 1. 現在の画面中央より「下」にある見出しを探す
    // 判定基準を「画面の少し下(150px)」に設定
    const nextElement = elements.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top > 150;
    });

    // 2. 物理的に「ほぼ最下部」にいるか判定 (誤差を200pxに広げてFooter込で判定)
    const isAtBottom = scrollTop + windowHeight >= fullHeight - 200;

    // 3. 【解決の鍵】次の見出しがない、または既に一番下にいるなら「上向き」
    if (!nextElement || isAtBottom) {
      setIsLastStep(true);
    } else {
      setIsLastStep(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
    window.addEventListener("scroll", checkStatus, { passive: true });
    window.addEventListener("resize", checkStatus);

    // MDXの描画待機用
    const timer = setTimeout(checkStatus, 500);
    const interval = setInterval(checkStatus, 2000); // 念のための定期チェック

    return () => {
      window.removeEventListener("scroll", checkStatus);
      window.removeEventListener("resize", checkStatus);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [pathname, checkStatus]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const scrollToNext = () => {
    const elements = Array.from(document.querySelectorAll("h1, h2, h3"));
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // 次のジャンプ先を探す
    const next = elements.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top > 150;
    });

    // 「上向き矢印」の状態、または次がない場合はトップへ
    if (isLastStep || !next) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // 保険の0リセット
      setTimeout(() => {
        if (window.scrollY > 100) window.scrollTo({ top: 0 });
      }, 500);
    } else {
      // 次の見出しへ
      const targetY = next.getBoundingClientRect().top + scrollTop - 20;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToNext}
        className="w-14 h-14 bg-blue-600/40 backdrop-blur-md hover:bg-blue-600/80 text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 group border-2 border-white/50 dark:border-gray-900/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform duration-500 ${
            isLastStep ? "rotate-180" : "animate-bounce"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingScrollButton;
