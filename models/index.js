const db = {};

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const _ = require('lodash');

const sequelize = new Sequelize(
  config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
    host: config.DATABASE.HOST,
    dialect: config.DATABASE.DIALECT,
    logging: false, // logs all the queries made to database    
  });

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });



module.exports = _.extend({
  sequelize,
  Sequelize,
}, db);