import bcrypt from 'bcrypt'
import bcryptPromise from 'bcrypt-promise'
import { sign } from 'jsonwebtoken'
import Sequelize from 'sequelize'
import { compose, merge, omit } from 'ramda'
import config from '../config'

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        firstName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
        hooks: {
          beforeSave: User.beforeSave,
        },
      }
    )
  }

  static associate(models) {
    this.hasOne(models.Preference, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    })
  }

  static beforeSave(user) {
    if (user.changed('password')) {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => (user.password = hash))
    }
  }

  async comparePassword(password) {
    return await bcryptPromise.compare(password, this.password)
  }

  jwt() {
    return `Bearer ${sign(
      {
        user_id: this.id,
      },
      config.appKey,
      { expiresIn: config.jwt.expiration }
    )}`
  }

  async toAPI() {
    const userPayload = omit(['password'], this.toJSON())
    const preference = await this.getPreference()

    if (preference) {
      return {
        ...omit(['userId'], preference.toJSON()),
        ...userPayload,
      }
    }

    return {
      ...userPayload,
    }
  }
}
