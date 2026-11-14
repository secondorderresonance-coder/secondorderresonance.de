/*
 * SOR Service Worker: macht die Lernplattform als App installierbar und offline nutzbar.
 * ------------------------------------------------------------
 * - Beim Installieren werden die Hauptseiten und alle Skripte, Styles, Schriften und Bilder,
 *   die diese Seiten einbinden, in den Cache gelegt (APP_PAGES).
 * - Seitenaufrufe: zuerst Netz, bei Offline der Cache, sonst offline.html.
 * - Dateien (js, css, Schriften, Bilder): Cache zuerst, im Hintergrund aktualisieren.
 * - Neue Version: CACHE erhöhen, alte Caches werden beim Aktivieren gelöscht.
 * Es werden nur Dateien dieser Website gecacht, keine fremden Anfragen.
 */
var CACHE = "sor-v3.3.0";
var APP_PAGES = [
    "./", "index.html", "offline.html", "schulen.html", "datenschutz.html",
    "app/ueben.html", "app/kurs.html", "app/pruefung.html", "app/klasse.html",
    "app/konto.html", "app/lehrer.html", "app/labor3d.html"
];
var ASSET_RE = /(?:src|href)=["']([^"'#]+\.(?:js|css|woff2?|png|svg|webp|jpg|json|webmanifest)(?:\?[^"']*)?)["']/g;

function absolute(url, base) { try { return new URL(url, base).href; } catch (e) { return null; } }

self.addEventListener("install", function (event) {
    event.waitUntil(caches.open(CACHE).then(function (cache) {
        var scope = self.registration.scope;
        return Promise.all(APP_PAGES.map(function (page) {
            var url = absolute(page, scope);
            return fetch(url, { cache: "no-cache" }).then(function (res) {
                if (!res.ok) return null;
                var copy = res.clone();
                return res.text().then(function (html) {
                    var assets = [], m;
                    ASSET_RE.lastIndex = 0;
                    while ((m = ASSET_RE.exec(html))) {
                        var a = absolute(m[1], url);
                        if (a && a.indexOf(self.location.origin) === 0 && assets.indexOf(a) === -1) assets.push(a);
                    }
                    return cache.put(url, copy).then(function () {
                        return Promise.all(assets.map(function (a) { return cache.add(a).catch(function () { return null; }); }));
                    });
                });
            }).catch(function () { return null; });
        }));
    }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k.indexOf("sor-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (event) {
    var req = event.request;
    if (req.method !== "GET") return;
    var url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    // Seiten: Netz zuerst, damit Änderungen sofort ankommen
    if (req.mode === "navigate") {
        event.respondWith(fetch(req).then(function (res) {
            if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(url.origin + url.pathname, copy); }); }
            return res;
        }).catch(function () {
            return caches.match(url.origin + url.pathname)
                .then(function (hit) { return hit || caches.match(req, { ignoreSearch: true }); })
                .then(function (hit) { return hit || caches.match(absolute("offline.html", self.registration.scope)); });
        }));
        return;
    }

    // Dateien: Cache zuerst, im Hintergrund aktualisieren
    event.respondWith(caches.open(CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
            var net = fetch(req).then(function (res) { if (res.ok && res.type === "basic") cache.put(req, res.clone()); return res; }).catch(function () { return hit; });
            return hit || net;
        });
    }));
});

self.addEventListener("message", function (event) {
    if (event.data === "skipWaiting") self.skipWaiting();
});
