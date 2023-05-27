const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: `http://localhost:${process.env.PORT ?? 3000}`,
        changeOrigin: true,
      },
    },
  },
  pwa: {
    themeColor: process?.env?.VUE_APP_PWA_THEME_COLOR ?? '#4DBA87',
    // appleMobileWebAppCapable: 'yes',
    short_name: process?.env?.VUE_APP_PWA_NAME ?? null,
    name: process?.env?.VUE_APP_PWA_NAME ?? null,
    //   workboxOptions: {
    //     // exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, /\.js(?:on)?$/],
    //     exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/],
    //     // navigateFallback: '/network',
    //     navigationPreload: true,

  //     runtimeCaching: [
  //       {
  //         // cache API requests
  //         urlPattern: /\/?api.*/gmi,
  //         handler: 'NetworkFirst',
  //         options: {
  //           networkTimeoutSeconds: 10,
  //           cacheName: 'my-api-cache',
  //           expiration: {
  //             maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
  //           },
  //           cacheableResponse: {
  //             statuses: [0, 200],
  //           },
  //         },
  //       },
  //       {
  //         // cache static assets
  //         urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|gif|ico)$/,
  //         handler: 'CacheFirst',
  //         options: {
  //           cacheName: 'static-assets-cache',
  //           expiration: {
  //             maxEntries: 50,
  //             maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
  //           },
  //         },
  //       },
  //       {
  //         urlPattern: /.*/gmi,
  //         handler: 'NetworkFirst',
  //         options: {
  //           networkTimeoutSeconds: 10,
  //           cacheName: 'fallback-cache',
  //           expiration: {
  //             maxAgeSeconds: 60 * 60 * 24, // Cache for 24 hours.
  //           },
  //           cacheableResponse: {
  //             statuses: [0, 200],
  //           },
  //         },
  //       },
  //     ],
  //   },
  },
});
