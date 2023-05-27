const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const nunjucks = require('nunjucks');
const generalUtils = require('../utils/general');

const router = express.Router();
// const path = require('path');

nunjucks.configure('dist', {
  autoescape: false,
  express: global.app,
});

router.all('*', async (req, res) => {
  // const { VUE_APP_BASE } = process.env ?? '';
  const { DEFAULT_SHARE_IMAGE, META_TITLE, META_DESCRIPTION } = process.env ?? '';

  const meta = generalUtils.generateMetadata({
    title: META_TITLE,
    description: META_DESCRIPTION,
    image: DEFAULT_SHARE_IMAGE ?? null,
    url: null,
  });
  const result = await nunjucks.render('index.html', {
    metatag: meta,
  });
  // console.log(meta);
  res.send(result);
});

module.exports = router;
