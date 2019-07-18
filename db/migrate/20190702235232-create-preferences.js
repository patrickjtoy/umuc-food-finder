'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      location: Sequelize.STRING,
      price: Sequelize.INTEGER,
      criteria: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: queryInterface => queryInterface.dropTable('preferences')
};
