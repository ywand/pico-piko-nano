export type LinkItem = {
  category: "main" | "doc" | "game" | "tool" | "ref" | "other";
  label: string;
  url: string;
  target?: "_self" | "_blank" | "_inline";
}

export const categorys = {
  main: "サイトメニュー",
  doc: "読み物",
  game: "Games(自作ゲーム達)",
  tool: "Tools(自作ツール達)",
  ref: "参考リンク",
  other: "その他",
}

export const links: LinkItem[] = [
  {
    category: "main",
    label: "Home",
    url: "/",
    target: "_self",
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
    url: "/G0001_kaboom_jump.html",
    target: "_self",
  },
  {
    category: "game",
    label: "ブロック崩し",
    url: "/G0002_blockBreaking.html",
    target: "_self",
  },
  {
    category: "game",
    label: "ランダムお絵かき",
    url: "/G0003_randomDraw.html",
    target: "_self",
  },
  {
    category: "tool",
    label: "メモ帳",
    url: "/T0001_memo.html",
    target: "_self",
  },
  {
    category: "tool",
    label: "文章読み上げ",
    url: "/T0002_Speech.html",
    target: "_self",
  },
  {
    category: "ref",
    label: "React",
    url: "https://react.dev",
    target: "_blank",
  },
  {
    category: "ref",
    label: "netlify",
    url: "https://www.netlify.com/",
    target: "_blank",
  },
  {
    category: "ref",
    label: "github",
    url: "https://github.com/",
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