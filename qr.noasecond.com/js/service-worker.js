const CACHE_NAME = "qr-code-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/stylesheet.css",
  "/js/main.js",
  "/js/qr-code-styling.js",
  "/assets/favicon/favicon-32x32.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
