const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const http = require('http');
const db = require('./models');
const config = require('./config');
const path = require('path');
const compressor = require('./controllers/compressor');
const resolver = require('./controllers/resolver');

const initializeServer = async () => {



  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use('/cutit', compressor);
  app.use('/resolve', resolver);
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

  server = http.createServer(app);

  try {
    await db.sequelize.sync();
  } catch (err) {
    console.log('Error Initializing Server', err);
  }

  server.listen(config.WEB_SERVER.PORT, () => {
    console.log(`listening at http://${config.WEB_SERVER.HOST}:${config.WEB_SERVER.PORT}`);
  });
};

initializeServer()
  .then(() => console.log('Successfully initialized web server'))
  .catch(err => console.log('Error in initializing web server', err));
