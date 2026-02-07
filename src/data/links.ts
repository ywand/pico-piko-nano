export type LinkItem = {
  category: "main" | "doc" | "game" | "tool" | "dev" | "lib" | "ref" | "other";
  label: string;
  url: string;
  target?: "_self" | "_blank" | "_inline";
  tags?: string;
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
    tags: "index,home,ホーム,トップページ"
  },
  {
    category: "main",
    label: "検索",
    url: "https://www.google.com/search?q=site:pico-piko-nano.netlify.app",
    target: "_blank",
  },
  {
    category: "game",
    label: "豆ジャンプ",
    url: "/game/G0001_kaboom_jump.html",
    target: "_self",
    tags: "game,ゲーム,kaboom,ジャンプアクション",
  },
  {
    category: "game",
    label: "ブロック崩し",
    url: "/game/G0002_blockBreaking.html",
    target: "_self",
    tags: "game,ゲーム,ブロック崩し,p5.js",
  },
  {
    category: "game",
    label: "ランダムお絵かき",
    url: "/game/G0003_randomDraw.html",
    target: "_self",
    tags: "お絵かき,ドロー,ランダム,p5.js",
  },
  {
    category: "tool",
    label: "メモ帳",
    url: "/tool/T0001_memo.html",
    target: "_self",
  },
  {
    category: "tool",
    label: "文章読み上げ",
    url: "/tool/T0002_Speech.html",
    target: "_self",
  },
  {
    category: "tool",
    label: "MarkDownEditor",
    url: "/tool/T0003_MarkDownEditor.html",
    target: "_self",
    tags: "マークダウン,md,MarkDown,エディタ",
  },
  {
    category: "dev",
    label: "React",
    url: "https://react.dev",
    target: "_blank",
  },
  {
    category: "dev",
    label: "netlify",
    url: "https://www.netlify.com/",
    target: "_blank",
  },
  {
    category: "dev",
    label: "GitHub",
    url: "https://github.com/",
    target: "_blank",
  },
  {
    category: "dev",
    label: "Visual Studio Code",
    url: "https://code.visualstudio.com/",
    target: "_blank",
  },
  {
    category: "ref",
    label: "Qiita",
    url: "https://qiita.com/",
    target: "_blank",
  },
  {
    category: "ref",
    label: "ChatGPT",
    url: "https://chatgpt.com/",
    target: "_blank",
  },
  {
    category: "ref",
    label: "Gemini",
    url: "https://gemini.google.com/",
    target: "_blank",
  },
];