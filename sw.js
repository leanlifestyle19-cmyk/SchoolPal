const CACHE = 'schoolpal-v2';
const ASSETS = ['./index.html', './manifest.json'];

// INSTALL — cache static assets individually
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      for (const url of ASSETS) {
        try {
          const res = await fetch(url);
          await cache.put(url, res);
        } catch(_) {}
      }
    })
  );
  self.skipWaiting();
});

// ACTIVATE — delete old caches, claim clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// FETCH
// - Cross-origin (API calls, sync service): always pass through to network, never cache
// - Navigate: return cached index.html (offline shell)
// - Same-origin assets: cache-first, network fallback
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isCrossOrigin = url.origin !== self.location.origin;

  // Never cache external API calls (Gemini, kvdb.io, etc.)
  if (isCrossOrigin) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Navigate → always serve cached shell
  if (e.request.mode === 'navigate') {
    e.respondWith(caches.match('./index.html'));
    return;
  }

  // Same-origin assets: cache-first, update cache in background
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});