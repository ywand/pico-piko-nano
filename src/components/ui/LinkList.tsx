import { links, categorys } from "@/data/links";
import type { LinkItem } from "@/data/links";


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
          <h2>{categorys[category as keyof typeof categorys]}</h2>

          <ul>
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <a
                  href={item.url}
                  target={item.target ?? "_self"}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  title={item.description}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}