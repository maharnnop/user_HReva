'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // static associate(models) {
    //   User.hasMany(models.Car, { foreignKey: "user_id" })
    // }
  }
  User.init({
    Name: DataTypes.STRING,
    Surname: DataTypes.STRING,
    EmployeeID: DataTypes.STRING,
    Password: DataTypes.STRING,
    // is_admin: DataTypes.BOOLEAN,
    // username: DataTypes.STRING,
    // user: DataTypes.STRING,
    // password: DataTypes.STRING,
    Type: DataTypes.STRING
    // user:DataTypes.STRING,
    // password:DataTypes.STRING,
    // role:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'UserTable'
  });
  return User;
};