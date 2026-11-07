/* Service worker: يخلي التطبيق يفتح بسرعة ويشتغل بدون نت يوم الفعالية.
   لما تعدّلين أي ملف، غيّري رقم النسخة تحت عشان يتحدث عند الزوار. */
const CACHE = 'winterday-v7';
const SHELL = [
  './', 'index.html', 'style.css', 'app.js', 'data.js', 'art.js', 'manifest.webmanifest',
  'media/hero-poster.jpg', 'media/qr.png', 'media/icons/icon-192.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// يعرض النسخة المحفوظة فورًا، ويحدّثها من النت بالخلفية (الصور تنحفظ أول ما تنفتح)
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || url.pathname.endsWith('.mp4')) return;
  e.respondWith(caches.open(CACHE).then(async (cache) => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
