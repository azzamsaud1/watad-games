/* يخزن الموقع عشان يفتح بدون إنترنت */
var C="watad-games-v2";
var CORE=["./","./index.html","./games.html","./manifest.json","./icon-192.png","./icon-512.png","https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});}));}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);
 if(u.origin!==location.origin&&u.hostname!=="cdnjs.cloudflare.com")return;
 e.respondWith(fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp);});}return res;}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match("./index.html");});}));});
