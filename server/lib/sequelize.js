import { Sequelize } from 'sequelize'
import debug from 'debug'
import { isProduction } from '../lib/util'

const sqlLogger = str => debug('db')(str)

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: !isProduction() && sqlLogger,
  operatorsAliases: false,
  define: {
    timestamps: true,
  },
  dialectOptions: {
    ssl: isProduction(),
  },
})
