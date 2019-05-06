const Schemas = require('../database/schemas/index')

// module.exports = {
//   type: 'mysql',
//   host: 'localhost',
//   port: '4001',
//   username: 'root',
//   password: 'root',
//   database: 'livedeck_database',
//   synchronize: true,
//   entities: Schemas
// }
module.exports = {
  type: 'mysql',
  host: 'livedeck_db',
  port: '3306',
  username: 'root',
  password: 'root',
  database: 'livedeck_database',
  synchronize: true,
  entities: Schemas
}
