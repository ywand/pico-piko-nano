import { links, categorys } from "@/data/links";
import type { LinkItem } from "@/data/links";
import Link from "next/link";

export function LinkList() {
  // categoryごとにまとめる
  const grouped = links.reduce<Record<string, LinkItem[]>>((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2 className="text-lg">
            {categorys[category as keyof typeof categorys]}
          </h2>
          <ul className="mb-2">
            {items.map((item, index) => {
              const isExternal = item.url.startsWith("http");

              return (
                <li
                  key={`${item.label}-${index}`}
                  className="before:content-['▣']  before:text-xs before:mr-1 ml-4"
                >
                  {isExternal ? (
                    <a
                      href={item.url}
                      target={item.target ?? "_self"}
                      rel={
                        item.target === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      title={item.description}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.url}
                      prefetch={true}
                      title={item.description}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
