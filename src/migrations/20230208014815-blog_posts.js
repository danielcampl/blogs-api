'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('blog_posts', {

    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: 'user_id',
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    published: {
      type: Sequelize.DATE,
    },

    updated: {
      type: Sequelize.DATE,
    },
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
