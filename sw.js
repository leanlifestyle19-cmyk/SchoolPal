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

// ACTIVATE — delete old caches, claim clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// FETCH
//
// Cross-origin (Gemini API, kvdb.io sync): always pass through, never cache
//
// Navigate (page loads):
//   NETWORK-FIRST — fetch fresh index.html from GitHub, update cache silently.
//   Falls back to cache when offline. This means GitHub pushes are reflected
//   on the next open with an internet connection, no user action needed.
//
// Same-origin assets (manifest.json etc): cache-first, network fallback
//
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Never cache cross-origin requests (APIs, sync service)
  if (url.origin !== self.location.origin) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Navigate → network-first, cache fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Fresh response from GitHub — update the cache silently
          if (res && res.status === 200) {
            caches.open(CACHE).then(c => c.put('./index.html', res.clone()));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))  // Offline fallback
    );
    return;
  }

  // Same-origin assets → cache-first, network fallback
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      });
    })
  );
});