const CACHE_NAME = "qr-code-generator-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/stylesheet.css",
  "/css/responsive/stylesheet.css",
  "/js/main.js",
  "/js/theme.js",
  "/js/qr-code-styling.js",
  "/js/service-worker.js",
  "assets/favicon/favicon.ico",
  "assets/favicon/favicon-16x16.png",
  "assets/favicon/favicon-32x32.png",
  "assets/favicon/apple-touch-icon.png",
  "assets/favicon/android-chrome-192x192.png",
  "assets/favicon/android-chrome-512x512.png",
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