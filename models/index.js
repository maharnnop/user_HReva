'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV || 'dev';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log(config.database);
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'aws.connect.psdb.cloud',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      }
    },
    define: {
      timestamps: false //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
    }
  });

}
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// const User = sequelize.define('UserTable', {
//   username: Sequelize.STRING,
//   email: Sequelize.STRING
// }, {
//   tableName: 'users' // This is where you specify the table name
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// sequelize.authenticate();
module.exports = db;
