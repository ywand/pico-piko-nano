export type LinkItem = {
  category: "main" | "doc" | "game" | "tool" | "dev" | "lib" | "ref" | "other";
  label: string;
  url: string;
  target?: "_self" | "_blank" | "_inline";
  tags?: string;
  description?: string;
}

export const categorys = {
  main: "サイトメニュー",
  doc: "読み物",
  game: "Games(自作ゲーム達)",
  tool: "Tools(自作ツール達)",
  dev: "開発環境",
  lib: "使用ライブラリ",
  ref: "参考サイト",
  other: "その他",
}

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
    url: "https://www.google.com/search?q=site:pico-piko-nano.netlify.app",
    target: "_blank",
    description: "Googleでのサイト内検索",
  },
  {
    category: "game",
    label: "豆ジャンプ",
    url: "/game/G0001_kaboom_jump.html",
    target: "_self",
    tags: "game,ゲーム,kaboom,ジャンプアクション",
    description: "kaboom.jsを使用した2Dジャンプアクション",
  },
  {
    category: "game",
    label: "ブロック崩し",
    url: "/game/G0002_blockBreaking.html",
    target: "_self",
    tags: "game,ゲーム,ブロック崩し,p5.js",
    description: "p5.jsを使用したブロック崩し",
  },
  {
    category: "game",
    label: "ランダムお絵かき",
    url: "/game/G0003_randomDraw.html",
    target: "_self",
    tags: "お絵かき,ドロー,ランダム,p5.js",
    description: "p5.jsを使用したランダム描画",
  },
  {
    category: "tool",
    label: "メモ帳",
    url: "/tool/T0001_memo.html",
    target: "_self",
    description: "localStorageを使用したメモ帳",
  },
  {
    category: "tool",
    label: "文章読み上げ",
    url: "/tool/T0002_Speech.html",
    target: "_self",
    description: "WebSpeechAPIを使用した文章読み上げ",
  },
  {
    category: "tool",
    label: "MarkDownEditor",
    url: "/tool/T0003_MarkDownEditor.html",
    target: "_self",
    tags: "マークダウン,md,MarkDown,エディタ",
    description: "marked.jsを使用したマークダウンエディタ",
  },
  {
    category: "tool",
    label: "時計",
    url: "/Timer",
    target: "_self",
    tags: "時計,タイマー",
    description: "現在時刻の表示",
  },
  {
    category: "tool",
    label: "カレンダー",
    url: "/Calender",
    target: "_self",
    tags: "カレンダー",
    description: "カレンダー（祝日表示あり）",
  },
  {
    category: "dev",
    label: "React",
    url: "https://react.dev",
    target: "_blank",
    description: "外部サイト：UIライブラリ",
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
    label: "VisualStudioCode",
    url: "https://code.visualstudio.com/",
    target: "_blank",
    description: "外部サイト：コードエディタ",
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