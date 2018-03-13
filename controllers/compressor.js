const express = require('express');
const db = require('../models');
const config = require('../config');
const constants = require('../constants');

const router = express.Router();

/**
 * 
 * Encoding urls in the same we change base of Number here 
 * 
 * changing mysql id which in base 10 to Xbase62 as I am using [a-zA-z0-9]
 */

const { compressionSpace } = constants; 
const base = compressionSpace.length;

const compressUrlId = (id) => {
  let num = id;
  let digits = [];
  while (num > 0) {
    digits.push(num % base);
    num = parseInt(num / base);
  }
  return digits.reverse().reduce((res, item) => `${res}${compressionSpace[item]}`, '');
};

router.post('/', async (req, res) => {
  const url = req.body.url;
  
  try {
    let dbResp = await db.Url.create({
      url
    });
    dbResp = dbResp.get({ plain: true });
    res.send(`http://localhost:${config.WEB_SERVER.PORT}/resolve/${compressUrlId(dbResp.id)}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error while Encoding');
  }
});

module.exports = router;
