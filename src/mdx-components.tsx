import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import FixedTable from '@/components/FixedTable'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    FixedTable,
    ...components,

    // リンク (aタグ) の挙動をカスタマイズ
    a: ({ href = "", children, ...props }) => {
      // 内部リンク (スラッシュ開始) または アンカーリンク (ハッシュ開始) の判定
      const isInternal = href.startsWith("/") || href.startsWith("#");

      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      // 外部リンクは別タブで開く設定
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
  };
}
