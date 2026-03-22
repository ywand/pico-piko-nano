import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...props }) => {
      // 内部リンク判定
      const isInternal = href.startsWith("/") || href.startsWith("#");

      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      // 外部リンク
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
