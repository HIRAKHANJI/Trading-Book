const CACHE_NAME = 'trading-book-v2';
const ASSETS = [
  './',
  './index.html',
  './tradebook.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=JetBrains+Mono:wght@400;600&family=Outfit:wght@300;400;500;600;700&display=swap'
];

// Install — pre-cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches and notify clients of update
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
    .then(() => {
      // Notify all open clients that a new version is available
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }));
      });
    })
  );
});

// Fetch — stale-while-revalidate for HTML, cache-first for others
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // For HTML files: serve cached, then update cache in background
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => null);

        // Return cached immediately, update in background
        if (cached) {
          // Trigger background update
          fetchPromise.then(networkResponse => {
            if (networkResponse) {
              // Notify client that new content may be available
              self.clients.matchAll().then(clients => {
                clients.forEach(client => client.postMessage({ type: 'CONTENT_UPDATED' }));
              });
            }
          });
          return cached;
        }
        // No cache — wait for network
        return fetchPromise.then(resp => resp || new Response(
          '<!DOCTYPE html><html><body style="background:#0a0e17;color:#e8eaed;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center"><div><h1 style="color:#00e676">Offline</h1><p>The Trading Playbook is not available offline yet.<br>Connect to the internet and reload.</p></div></body></html>',
          { status: 503, headers: { 'Content-Type': 'text/html' } }
        ));
      })
    );
    return;
  }

  // For all other assets: cache-first, fallback to network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => null);
    })
  );
});
