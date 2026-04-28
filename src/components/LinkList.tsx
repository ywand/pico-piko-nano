import { links, categorys } from "@/data/links";
import type { LinkItem } from "@/data/links";
import Link from "next/link";
import Script from "next/script";

export function LinkList() {
  const grouped = links.reduce<Record<string, LinkItem[]>>((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
  }, {});

  const speculationRules = {
    prerender: [
      {
        source: "document",
        where: {
          and: [
            { href_matches: "/*" }, // 同一ドメイン内の全パスを対象
            { not: { selector_matches: ".no-prerender" } }, // 特定のリンクを除外したい場合用
          ],
        },
        eagerness: "moderate", // ホバー時などに投機的実行を開始
      },
    ],
  };

  return (
    <div>
      {/* Speculation Rules API の注入 */}
      <Script
        id="speculation-rules"
        type="speculationrules"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speculationRules) }}
      />

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="mb-8">
          <h2 className="text-lg font-bold mt-4 mb-2 border-b pb-1">
            {categorys[category as keyof typeof categorys]}
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-2 ">
            {items.map((item, index) => {
              const isExternal = item.url.startsWith("http");

              return (
                <li
                  key={`${item.label}-${index}`}
                  className="before:content-['・'] before:text-md before:mr-1 ml-4"
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
