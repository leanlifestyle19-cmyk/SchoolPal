const CACHE = 'schoolpal-v1';
const ASSETS = ['./index.html', './manifest.json'];

// INSTALL — fetch individually, never cache.addAll()
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      for (const url of ASSETS) {
        const res = await fetch(url);
        await cache.put(url, res);
      }
    })
  );
  self.skipWaiting();
});

// ACTIVATE — delete old caches and claim clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// FETCH — navigate requests always return index.html
// Everything else: cache-first, network fallback, cache the result
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(caches.match('./index.html'));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});