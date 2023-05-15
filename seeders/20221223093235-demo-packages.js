"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Packages",
      [
        {
          id: 1,
          name: "Lady InSure",
          cost: 25000,
          descript:
            "For sure when driving with a special package for ladies only",
          picture:
            "https://drive.google.com/uc?id=1wf8H5tilQIEnAJZNoaaG-0Ov7GN5OlS8&authuser=0",
          type: ["super_car", "car"],
          level:1
        },
        {
          id: 5,
          name: "Up to Mile",
          cost: 10000,
          descript:
            "For sure when driving with a special package for you. Your miles is your price, You can control the cost by yourself.",
          picture:
            "https://drive.google.com/uc?id=1GK73bfgBlPUfqS8tXS09-E5KYvO6IEf0&authuser=0",
          type: ["car", "truck", "van"],
          level:1
        },
        {
          id: 7,
          name: "Disaster InSure",
          cost: 15000,
          descript:
            "For sure when driving although have disaster such as flood, storm, fire",
          picture:
            "https://drive.google.com/uc?id=1IVR594H0YPLJFnUn2UabthPHJlwEcZPT&authuser=0",
          type: ["car", "van"],
          level:3
        },
        {
          id: 6,
          name: "Pets InSure",
          cost: 5000,
          descript:
            "For sure when driving with your pets if you use Pet InSure. ",
          picture:
            "https://drive.google.com/uc?id=1Xi1jl8QH5HWznjZUZdV4LFZ09ixrWdJq&authuser=0",
          type: ["car", "super_car"],
          level:2
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Packages", null, {});
  },
};
