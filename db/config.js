module.exports = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production'
  }
}
