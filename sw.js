const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',           // index.html
  '/index.html', // 明示的に追加
];

// インストール時（最初の登録時など）
self.addEventListener('install', event => {
  console.log('Service Worker: インストール中');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// リクエスト取得時（オンライン・オフライン両対応）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) // キャッシュを探す
      .then(response => {
        return response || fetch(event.request); // あればキャッシュ、なければネット
      })
  );
});

// 古いキャッシュ削除（更新時）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      );
    })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // キャッシュがあればそれを返す
      if (response) return response;
      // なければネットワークから取得してキャッシュにも保存
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});