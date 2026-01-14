const CACHE_NAME = 'dashR-v1';
   const assets = ['index.html', 'manifest.json', 'sw.js'];

   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
     );
   });

   self.addEventListener('activate', event => {
     event.waitUntil(
       caches.keys().then(keys => 
         Promise.all(keys.map(key => {
           if (key !== CACHE_NAME) return caches.delete(key);
         }))
       )
     );
   });

   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request).then(response => 
         response || fetch(event.request)
       )
     );
   });
