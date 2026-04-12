// mdx.d.ts
declare module "*.mdx" {
  import type { ComponentType, JSX } from "react";

  // MDXファイルはデフォルトエクスポートとしてReactコンポーネントを返します
  const Component: ComponentType<any>;
  export default Component;
}
