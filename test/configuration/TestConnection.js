const { createConnection } = require('typeorm')
const databaseConfig = require('./databaseConfig')
const InitDatabase = require('./fixtures/InitDatabase')

class TestConnection {
  constructor () {
    this.connection = null
    this.init = new InitDatabase()
  }

  async connect () {
    if (!this.connection) {
      try {
        this.connection = await createConnection(databaseConfig)
        await this.init.up()
      } catch (error) {
        console.log(error)
        process.exit(1)
      }
    }
  }

  async disconnect () {
    if (this.connection) {
      try {
        await this.init.down()
        await this.connection.close()
      } catch (error) {
        console.log(error)
        process.exit(1)
      }
    }
  }
}

module.exports = TestConnection
