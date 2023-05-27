// https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png

module.exports = {
  generateSlugFromString(string) {
    if (typeof (string) !== 'string') {
      return '';
    }
    const result = string.replace(/[A-Z][a-z]*/g, (str) => `-${str.toLowerCase()}-`)
      // Convert words to lower case and add hyphens around it (for stuff like "&")
      .replace('--', '-') // remove double hyphens
      .replace(/\..*/gm, '') // remove .js
      .replace(/(^-)|(-$)/g, '');
    return result;
  },
  generateMetadata({
    title = 'Title',
    description = null,
    image = null,
    url = null,
    themeColor = process?.env?.VUE_APP_PWA_THEME_COLOR ?? null,
  }) {
    const template = (`
      <!-- Primary Meta Tags -->
      <title>${title}</title>
      ${themeColor != null ? `<meta name="theme-color" content="${themeColor}" />` : ''}
      <meta name="title" content="${title}">
      ${description != null ? `<meta name="description" content="${description}">` : ''}

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      ${url != null ? `<meta property="og:url" content="${url}">` : ''}
      <meta property="og:title" content="${title}">
      ${description != null ? `<meta property="og:description" content="${description}">` : ''}
      ${image != null ? `<meta property="og:image" content="${image}">` : ''}

      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      ${url != null ? `<meta property="twitter:url" content="${url}">` : ''}
      <meta property="twitter:title" content="${title}">
      ${description != null ? `<meta property="twitter:description" content="${description}">` : ''}
      ${image != null ? `<meta property="twitter:image" content="${image}">` : ''}
      `);
    return template;
  },

};
