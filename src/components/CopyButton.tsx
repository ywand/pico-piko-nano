"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string; // コピーする対象のテキスト
  label?: string; // ボタンに表示するテキスト（任意）
}

export default function CopyButton({
  text,
  label = "コピー",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    // 1. モダンな navigator.clipboard API を試行
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        completeCopy();
        return;
      } catch (err) {
        console.error("Clipboard API failed, falling back...", err);
      }
    }

    // 2. フォールバック: 従来の document.execCommand('copy')
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) completeCopy();
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
  };

  const completeCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center px-3 py-1 text-sm rounded transition-colors ${
        isCopied
          ? "bg-green-500 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-black"
      }`}
    >
      {/* コピー完了時は「完了」、それ以外は指定された label を表示 */}
      {isCopied ? "完了" : label}
    </button>
  );
}
