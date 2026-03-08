import { useEffect, useState } from 'react';

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

export default function AntennaList({ name }: Props) {
  const [items, setItems] = useState<SiteGroup>({});
  useEffect(() => {
    fetch(`/antenna-${name}.json`)
      .then((res) => res.json())
      .then((data: SiteGroup) => {
        setItems(data);
      });
  }, [name]);

  return (
    <div>
      {Object.entries(items).map(([site, articles]) => (
        <div key={site}>
          <h3>{site}</h3>
          <ul>
            {articles.map((item, index) => (
              <li key={index}>
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
