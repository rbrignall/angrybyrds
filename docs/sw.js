// Increase the v number when the app is updated

const staticCacheName = "angrybyrds-v1.0.0";

const filesToCache = [
    "./",
	"./index.html",
    "./site.webmanifest",
	"./style.css",
    "./BaseClass.js",
    "./Byrd.js",
    "./consts.js",
    "./Crate.js",
    "./levels.js",
    "./modal.js",
    "./Pig.js",
    "./sketch.js",
    "./Sling.js",
    "./Solo.js",
    "./Trunk.js",
    "./assets/Sstar.png",
    "./assets/Astar.png",
    "./assets/Tstar.png",
    "./assets/Bstar.png",
    "./assets/Sstargrey.png",
    "./assets/ATstargrey.png",
    "./assets/Bstargrey.png",
    "./assets/bggloria.png",
    "./assets/Gloria.mp3",
    "./assets/apple-touch-icon.png",
    "./assets/favicon.ico",
    "./sprites/base.png",
    "./sprites/bg.png",
    "./sprites/bg2.jpg",
    "./sprites/byrd.png",
    "./sprites/enemyhat.png",
    "./sprites/forkL.png",
    "./sprites/forkR.png",
    "./sprites/hurtpig.png",
    "./sprites/sharp.png",
    "./sprites/sling3.png",
    "./sprites/smoke.png",
    "./sprites/wood2.png",
    "./sprites/woodcan.png",
    "./sprites/wooddec.png",
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.dom.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/addons/p5.sound.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.min.js"
];


self.addEventListener('install', event => {
  log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
    .then(function() {
          return self.skipWaiting();
    })
  );
});


self.addEventListener('fetch', event => {
  //console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          //console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        //console.log('Network request for ', event.request.url);
        return fetch(event.request)
        .then(response => {
            return caches.open(staticCacheName).then(cache => {
                cache.put(event.request.url, response.clone());
                return response;
            });
      });

      }).catch(error => {
      // TODO 6 - Respond with custom offline page
      })
  );
});


self.addEventListener('activate', event => {
  log('Activating new service worker...');

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


function log(text) {
	console.log("%cService Worker", "color: purple; font-weight: 600; background: white; padding: 0 5px; border-radius: 2px", text);
}