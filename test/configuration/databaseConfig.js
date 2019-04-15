const Schemas = require('../../src/database/schemas/index')

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '',
  database: 'test_database',
  synchronize: true,
  entities: Schemas,
  dropSchema: true
}
