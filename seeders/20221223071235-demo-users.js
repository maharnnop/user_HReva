"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     await queryInterface.bulkInsert("Users",[
        {
          firstname:"USER" ,
        lastname:"qwer",
        address: "test address",
        tel:"123456789",
        is_admin: false,
        username: "test1",
        password: "1234"
      },
      {
        firstname: "ADMIN",
        lastname: "xzcv",
        address: "TDA 101",
        tel: "081234567",
        is_admin: true,
        username: "admin1",
        password: "1234"
      }],{});
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete("Users", null, {});
  },
};
