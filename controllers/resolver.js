const express = require('express');
const db = require('../models');

const router = express.Router();

const resolveUrl = (encodedUrl) => {
  const splitUrl = encodedUrl.split('');
  return splitUrl.reduce((res, item, i) => {
    let index;
    let charAscii = item.charCodeAt(0);
    if (charAscii >= 97 && charAscii <= 123) {
      index = charAscii - 97;
    } else if (charAscii >= 65 && charAscii <= 91) {
      index = charAscii - 65 + 26;
    } else {
      index = charAscii - 48 + 52;
    }
    return res + index * Math.pow(62, (splitUrl.length - i - 1));
  }, 0);
};

router.get('*', async (req, res) => {
  const url = req.url;
  const encodedPart = url.substr(url.lastIndexOf('/') + 1);
  console.log(encodedPart, req.url);
  const id = resolveUrl(encodedPart);
  try {
    let dbResp = await db.Url.findById(id);
    dbResp = dbResp.get({ plain: true });
    let toRedirectUrl = (dbResp.url.startsWith('http://') || dbResp.url.startsWith('https://')) ? dbResp.url : `http://${dbResp.url}`;
    res.redirect(toRedirectUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error While resolving the Url');
  }

});

module.exports = router;
