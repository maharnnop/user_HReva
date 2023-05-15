'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cars",[
      {
        user_id: 1,
    plate_number: "kb 9586",
    brand: "toyota",
    model: "altis",
    year: 2019,
    insurance_id: 1,
    type: "truck"
    },
    {
      user_id: 1,
    plate_number: "kk 7253",
    brand: "masda",
    model: "masda 2",
    year: 2020,
    insurance_id: 2,
    type: "bus"
    }],{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  }
};
