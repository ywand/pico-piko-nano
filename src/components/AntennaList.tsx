import fs from "fs/promises";
import path from "path";

type FeedItem = {
  title: string;
  link: string;
  date: string;
  site: string;
  category: string;
};

type SiteGroup = {
  [site: string]: FeedItem[];
};

type Props = {
  name: string;
};

export default async function AntennaList({ name }: Props) {
  let items: SiteGroup = {};
  try {
    // public フォルダ内のパスを解決
    const filePath = path.join(process.cwd(), "public", `antenna-${name}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    items = JSON.parse(fileContents);
  } catch (error) {
    console.error("データ読み込み失敗:", error);
    return <div>データ読み込み失敗</div>;
  }

  return (
    <div>
      {Object.entries(items).map(([site, articles]) => (
        <div key={site}>
          <h2 className="text-lg mt-2 mb-2">{site}</h2>
          <ul className="mb-4 pb-4">
            {articles.map((item, index) => (
              <li
                key={index}
                className="before:content-['・']  before:text-md before:mr-1 ml-2 mt-2 mb-2"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <span>({new Date(item.date).toLocaleString()})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
