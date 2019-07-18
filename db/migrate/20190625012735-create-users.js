module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      password: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: queryInterface => queryInterface.dropTable('users')
};
