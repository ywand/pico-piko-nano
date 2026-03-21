"use client";
import QrGenerator from "@/components/QrGenerator";
import { useState, useEffect } from "react";

export function QrToolClient() {
  const [text, setText] = useState("");

  return (
    <div>
      <div>
        <label className="block mb-1">QR化テキスト：</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="テキストを入力してください"
          className="w-full border bg-gray-50 text-black text-md"
          maxLength={4296} //QRコード化英数字の最大文字数
          rows={2}
        />
      </div>
      <div className="m-2">
        <QrGenerator text={text} />
      </div>
    </div>
  );
}
