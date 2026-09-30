const CACHE_NAME = 'pancha-offline-v5';
const ASSETS = ['error/index.html', 'avatar2.webp'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                ASSETS.map(url => cache.add(new Request(url, { cache: 'reload' })))
            );
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req).catch(() => caches.match('error/index.html'))
        );
        return;
    }

    event.respondWith(
        caches.match(req).then(cached => cached || fetch(req))
    );
});