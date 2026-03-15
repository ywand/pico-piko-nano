"use client";
import QrGenerator from "@/components/QrGenerator";
import MainLayout from "@/layouts/MainLayout";
import { useState, useEffect } from "react";

function T0006_QrTool() {
  const [text, setText] = useState("");
  useEffect(() => {
    if (typeof window != "undefined") {
      setText(window.location.href);
    }
  }, []);

  return (
    <MainLayout title="QRコードツール">
      <div className="">
        QR化テキスト：
        <br />
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
    </MainLayout>
  );
}

export default T0006_QrTool;
