// Service worker minimo: tiene in cache solo il "guscio" (icone e pagina), i dati vengono sempre da Google.
var V = 'ccc-ore-v1', FILES = ['./', 'index.html', 'timbratore.html', 'app.js', 'config.js', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(V).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x !== V; }).map(function (x) { return caches.delete(x); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) { var c = r.clone(); caches.open(V).then(function (ch) { ch.put(e.request, c); }); return r; }).catch(function () { return caches.match(e.request); }));
});
