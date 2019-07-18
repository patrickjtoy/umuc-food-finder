'use strict';

module.exports = {
  up: function (query) {
    const sql = query.sequelize
    return sql.query('CREATE EXTENSION IF NOT EXISTS pgcrypto', {
      raw:  true,
      type: sql.QueryTypes.RAW
    })
  },

  down: function (query) {
    const sql = query.sequelize
    return sql.query('DROP EXTENSION IF EXISTS pgcrypto', {
      raw:  true,
      type: sql.QueryTypes.RAW
    })
  }
};
