import QrGenerator from "@/components/ui/QrGenerator";
import MainLayout from "../../components/layout/MainLayout";
import { useState } from "react";

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};


function T0006_QrTool({ isDark, onToggleTheme }: Props) {
  const currentUrl = window.location.href
  const [text, setText] = useState(currentUrl);

  return (
    <MainLayout
      title="QR Generator"
      isDark={isDark}
      onToggleTheme={onToggleTheme}
    >
      <div style={{ padding: 8 }}>
        QR化テキスト：
        <input type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="テキストを入力してください"
          style={{
            fontSize: "16px",   // ← 文字サイズ
            padding: "0px",
            width: "100%",
          }}
        />
      </div>
      <QrGenerator text={text} />
    </MainLayout >
  )
}

export default T0006_QrTool;