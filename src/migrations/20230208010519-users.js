'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,

      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      image: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
