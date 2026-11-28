/* يخزن الموقع عشان يفتح بدون إنترنت */
var C="watad-games-v8";
var CORE=["./","./index.html","./games.html","./manifest.json","./icon-192.png","./icon-512.png","https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});}));}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);
 var API=/^api\.(alquran\.cloud|quran\.com)$/.test(u.hostname)||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
 if(API){e.respondWith(caches.open(C).then(function(c){return c.match(r).then(function(m){if(m)return m;return fetch(r).then(function(res){if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res;});});}));return;}
 if(u.origin!==location.origin&&u.hostname!=="cdnjs.cloudflare.com")return;
 var cached=function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||(r.mode==="navigate"?caches.match("./index.html"):undefined);});};
 var net=fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp);});}return res;});
 e.respondWith(new Promise(function(ok){var done=false;var t=setTimeout(function(){cached().then(function(m){if(m&&!done){done=true;ok(m);}});},3500);
  net.then(function(res){if(!done){done=true;clearTimeout(t);ok(res);}},function(){clearTimeout(t);cached().then(function(m){if(!done){done=true;ok(m||Response.error());}});});}));});
