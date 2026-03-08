import Parser from 'rss-parser';
import fs from 'fs';
import { rssSources } from './rssSources';

const parser = new Parser();
type FeedItem = {
  title?: string;
  link?: string;
  date?: string;
  site: string;
  category?: string;
};

async function build() {
  const results: FeedItem[] = [];
  const categories = [...new Set(rssSources.map((r) => r.category))];

  for (const source of rssSources) {
    try {
      const feed = await parser.parseURL(source.url);
      const items = feed.items.map((item) => ({
        title: item.title,
        link: item.link,
        date:
          item.pubDate ??
          item.isoDate ??
          item['dc:date'] ??
          item.published ??
          item.updated,
        site: source.name,
        category: source.category,
      }));
      results.push(...items);
    } catch (err) {
      console.log('RSS erroro:', source.url);
    }
  }

  // 日付ソート
  results.sort(
    (a, b) =>
      new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
  );

  //グループ化
  const grouped: Record<string, Record<string, FeedItem[]>> = {};
  for (const item of results) {
    const category = item.category || 'other';
    const site = item.site;

    if (!grouped[category]) grouped[category] = {};
    if (!grouped[category][site]) grouped[category][site] = [];
    grouped[category][site].push(item);
  }

  //サイトごとに最大20件
  for (const category of Object.keys(grouped)) {
    for (const site of Object.keys(grouped[category])) {
      grouped[category][site] = grouped[category][site].slice(0, 10);
    }
  }

  //カテゴリごとにJSON出力
  for (const category of Object.keys(grouped)) {
    const file = `public/antenna-${category}.json`;
    fs.writeFileSync(file, JSON.stringify(grouped[category], null, 2));
    console.log('RSS build:', file, Object.keys(grouped).length);
  }
}
build();
