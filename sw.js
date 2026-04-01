const CACHE_NAME = 'ad-belem-v2';
const resourcesToCache = [
  './index.html',
  './manifest.json',
  './logo.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(resourcesToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener('periodicsync', (e) => {
  if (e.tag === 'check-birthdays') e.waitUntil(checkBirthdays());
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'AD Belém', {
      body: data.body || 'Verifique os aniversariantes!',
      icon: './logo.jpg',
      badge: './logo.jpg'
    })
  );
});

async function checkBirthdays() {
  const now = new Date();
  if (now.getHours() === 7) {
    self.registration.showNotification('AD Belém - Aniversários', {
      body: 'Verifique os aniversariantes de hoje e amanhã!',
      icon: './logo.jpg'
    });
  }
}
