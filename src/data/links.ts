export type LinkItem = {
  category:
    | "main"
    | "doc"
    | "game"
    | "guide"
    | "tool"
    | "antenna"
    | "dev"
    | "framework"
    | "lib"
    | "ref"
    | "other";
  label: string;
  url: string;
  target?: "_self" | "_blank" | "_inline";
  tags?: string;
  description?: string;
};

export const categorys = {
  main: "サイトメニュー",
  doc: "読み物",
  game: "Games(自作ゲーム集)",
  tool: "Tools(自作ツール集)",
  guide: "ゲーム攻略情報",
  antenna: "アンテナページ（RSS自動取得）",
  dev: "ＷＥＢ開発環境",
  lib: "ＷＥＢゲームライブラリ",
  framework: "ＷＥＢフレームワーク",
  ref: "参考サイト",
  other: "その他",
};

export const links: LinkItem[] = [
  {
    category: "main",
    label: "Home",
    url: "/",
    target: "_self",
    tags: "index,home,ホーム,トップページ",
    description: "トップページ",
  },
  {
    category: "main",
    label: "検索",
    url: "https://www.google.com/search?q=site:pico-piko-nano.com",
    target: "_blank",
    description: "Googleでのサイト内検索",
  },
  {
    category: "game",
    label: "豆ジャンプ",
    url: "/games/G0001_kaboom_jump.html",
    target: "_self",
    tags: "game,ゲーム,kaboom,ジャンプアクション",
    description: "kaboom.jsを使用した2Dジャンプアクション",
  },
  {
    category: "game",
    label: "ブロック崩し",
    url: "/games/G0002_blockBreaking.html",
    target: "_self",
    tags: "game,ゲーム,ブロック崩し,p5.js",
    description: "p5.jsを使用したブロック崩し",
  },
  {
    category: "game",
    label: "ランダムお絵かき",
    url: "/games/G0003_randomDraw.html",
    target: "_self",
    tags: "お絵かき,ドロー,ランダム,p5.js",
    description: "p5.jsを使用したランダム描画",
  },
  {
    category: "game",
    label: "3Dボールテスト",
    url: "/games/G0004_3DBallsGame",
    target: "_self",
    tags: "3D,ボール,Babylon.js",
    description: "Babylon.jsを使用した3Dボールゲーム",
  },
  {
    category: "tool",
    label: "メモ帳",
    url: "/tools/T0001_memo.html",
    target: "_self",
    description: "localStorageを使用したメモ帳",
  },
  {
    category: "tool",
    label: "文章読み上げ",
    url: "/tools/T0002_Speech.html",
    target: "_self",
    description: "WebSpeechAPIを使用した文章読み上げ",
  },
  {
    category: "tool",
    label: "Mark Down Editor",
    url: "/tools/T0003_MarkDownEditor.html",
    target: "_self",
    tags: "マークダウン,md,MarkDown,エディタ",
    description: "marked.jsを使用したマークダウンエディタ",
  },
  {
    category: "tool",
    label: "時計",
    url: "/tools/T0004_Timer",
    target: "_self",
    tags: "時計,タイマー",
    description: "現在時刻の表示",
  },
  {
    category: "tool",
    label: "カレンダー",
    url: "/tools/T0005_CalendarPage",
    target: "_self",
    tags: "カレンダー",
    description: "カレンダー（祝日表示あり）",
  },
  {
    category: "tool",
    label: "QRコードツール",
    url: "/tools/T0006_QrTool",
    target: "_self",
    tags: "QRコード,ジェネレータ,リーダ",
    description: "カメラで読み取り、またはテキストをQRコードに変換するツール",
  },
  {
    category: "guide",
    label: "FF14攻略情報",
    url: "/guide/FF14",
    target: "_self",
    tags: "ゲーム攻略,情報,リンク,FF14",
    description: "ファイナルファンタジーXIV（FF14）に関する情報まとめ",
  },
  {
    category: "guide",
    label: "Gジェネエターナル攻略情報",
    url: "/guide/GGeneEternal",
    target: "_self",
    tags: "ゲーム攻略,情報,リンク,Gジェネ,Gジェネエターナル",
    description: "ファイナルファンタジーXIV（FF14）に関する情報まとめ",
  },
  {
    category: "guide",
    label: "ポケモンチャンピオンズ攻略情報",
    url: "/guide/PokemonChampions",
    target: "_self",
    tags: "ゲーム攻略,情報,リンク,ポケモン,チャンピオンズ",
    description: "ポケモンチャンピオンズに関する情報まとめ",
  },
  {
    category: "antenna",
    label: "FF14アンテナ",
    url: "/antenna/AntennaFF14",
    target: "_self",
    tags: "アンテナ,FF14,ニュース,攻略",
    description: "FF14に関するページの更新情報まとめ",
  },
  {
    category: "antenna",
    label: "ゲームニュースアンテナ",
    url: "/antenna/AntennaGameNews",
    target: "_self",
    tags: "アンテナ,ゲーム,ニュース,攻略",
    description: "ゲームニュースに関するページの更新情報まとめ",
  },
  {
    category: "dev",
    label: "Node.js",
    url: "https://nodejs.org/ja",
    target: "_blank",
    description: "外部サイト：JavaScript実行環境",
  },
  {
    category: "dev",
    label: "netlify",
    url: "https://www.netlify.com/",
    target: "_blank",
    description: "外部サイト：クラウドホスティングサービス",
  },
  {
    category: "dev",
    label: "GitHub",
    url: "https://github.com/",
    target: "_blank",
    description: "外部サイト：ソースコード管理",
  },
  {
    category: "dev",
    label: "Visual Studio Code",
    url: "https://code.visualstudio.com/",
    target: "_blank",
    description: "外部サイト：コードエディタ",
  },
  {
    category: "framework",
    label: "React",
    url: "https://react.dev",
    target: "_blank",
    description: "外部サイト：UIライブラリ",
  },
  {
    category: "framework",
    label: "Next.js",
    url: "https://nextjs.org/",
    target: "_blank",
    description: "外部サイト：ReactによるWebフレームワーク",
  },
  {
    category: "framework",
    label: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    target: "_blank",
    description: "外部サイト：CSSフレームワーク",
  },
  {
    category: "lib",
    label: "Kaboom.js",
    url: "https://kaboomjs.com/",
    target: "_blank",
    description: "外部サイト：Javascript用2Dゲームライブラリ",
  },
  {
    category: "lib",
    label: "p5.js",
    url: "https://p5js.org/",
    target: "_blank",
    description: "外部サイト：Javascript用ビジュアルアートライブラリ",
  },
  {
    category: "lib",
    label: "Babylon.js",
    url: "https://www.babylonjs.com/",
    target: "_blank",
    description: "外部サイト：3Dゲームライブラリ",
  },
  {
    category: "ref",
    label: "Qiita",
    url: "https://qiita.com/",
    target: "_blank",
    description: "外部サイト：技術情報共有サイト",
  },
  {
    category: "ref",
    label: "ChatGPT",
    url: "https://chatgpt.com/",
    target: "_blank",
    description: "外部サイト：対話型AI",
  },
  {
    category: "ref",
    label: "Gemini",
    url: "https://gemini.google.com/",
    target: "_blank",
    description: "外部サイト：対話型AI",
  },
];
