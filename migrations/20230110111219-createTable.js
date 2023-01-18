'use strict';

/** @type {import('sequelize-cli').Migration} */
const diet = require("../controller/diet/dietController");
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.createTable(테이블명, 컬럼명:데이터(속성,옵션) ...)
    const user = diet.getUserId;
await queryInterface.createTable(user, {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userIndex: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
