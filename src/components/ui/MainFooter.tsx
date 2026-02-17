import { space, fontSize } from "@/styles/global.css";


function MainFooter() {

  return (
    <footer
      style={{
        fontSize: fontSize.xs,
        borderTop: "1px solid #ccc",
      }}>
      本サイトは、個人の自主学習・検証目的で開発中のプロジェクトです。
      未完成のため、不具合や仕様変更が頻繁に発生する可能性があります。
    </footer >
  );
}

export default MainFooter;