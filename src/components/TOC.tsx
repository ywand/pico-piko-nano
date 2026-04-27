import React from "react";

interface TOCProps {
  children: React.ReactNode;
}

export const TOC: React.FC<TOCProps> = ({ children }) => {
  return (
    // 'not-prose' クラスを追加することで、外部の prose スタイル干渉を遮断できます
    <nav className="toc-container not-prose">
      <div className="toc-title">Contents</div>
      {children}
    </nav>
  );
};
