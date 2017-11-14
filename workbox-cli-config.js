module.exports = {
  "globDirectory": "dist/browser/",
  "globPatterns": [
    "**/*.{html,js,css,jpg,jpeg,png}"
  ],
  "globIgnores": [
    "../workbox-cli-config.js"
  ],
  "swDest": "dist/browser/sw.js",
  "clientsClaim": true,
  "skipWaiting": true
};
