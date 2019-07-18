import Sequelize from 'sequelize'

export default class Preference extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        price: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        criteria: {
          type: Sequelize.STRING,
          allowNull: true,
          get() {
            return this.getDataValue('criteria') && this.getDataValue('criteria').split(';')
          },
          set(criteria) {
            this.setDataValue('criteria', criteria.join(';'))
          },
        },
      },
      {
        sequelize,
        hooks: {},
        tableName: 'preferences',
      }
    )
  }

  static associate(models) {
    this.hasOne(models.User, {
      foreignKey: {
        name: 'id',
        allowNull: false,
      },
    })
  }
}
