const fs = require('fs')
const path = require('path')
import { sequelize } from '../lib/sequelize'

const models = Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .map(file => {
      const model = require(path.join(__dirname, file))
      return { [model.default.name]: model.default.init(sequelize) }
    })
)

for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models)
}

export const User = models.User
export const Preference = models.Preference
