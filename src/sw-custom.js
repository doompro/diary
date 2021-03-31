/**
 * Used with cra-append-sw to set the service worker's skipWaiting property.
 * This allow the user to see new changed on first reload.
 */
self.addEventListener("install", r => {
    self.skipWaiting();
});
