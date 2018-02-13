// Flag for enabling cache in production
var activateCache = true;

var CACHE_NAME = 'pwa-bitcoin-price-tracker';

// Delete old caches
self.addEventListener('activate', event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
  );
});

// This triggers when user starts the app
self.addEventListener('install', event => {
  if (activateCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          fetch('asset-manifest.json')
            .then(response => {
              response.json();
            })
            .then(assets => {
              // We will cache initial page and the main.js
              // We could also cache assets like CSS and images
              const urlsToCache = [
                '/',
                '/styles/styles.css',
                '/script/webpack-bunle.js',
                assets['main.js']
              ];
              cache.addAll(urlsToCache);
            })
        })
    );
  }
});

// Here we intercept request and serve up the matching files
// self.addEventListener('fetch', event => {
//   if (activateCache) {
//     event.respondWith(
//       caches.match(event.request).then(response => {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });
