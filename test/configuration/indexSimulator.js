const Cherry = require('@lund-org/cherry')
const CherryTypeormConnector = require('@lund-org/cherry-typeorm-connector')
const routes = require(path.join(__root, 'src/config/routes'))
const hooks = require(path.join(__root, 'src/config/hooks'))
const middlewares = require(path.join(__root, 'src/config/middlewares'))
const databaseConfig = require('./databaseConfig')

const options = {
  servers: [
    {
      port: 4123
    }
  ],
  hooks,
  middlewares,
  routes,
  plugins: [CherryTypeormConnector],
  database: databaseConfig
}

const cherry = new Cherry()

module.exports = {
  start: async () => {
    cherry.configure(options)
    try {
      await cherry.start(options)
    } catch (e) {
      console.log(e)
    }
  },
  stop: async () => {
    await cherry.stop()
  }
}
