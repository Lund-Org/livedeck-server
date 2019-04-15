const Cherry = require('@lund-org/cherry')
const CherryTypeormConnector = require('@lund-org/cherry-typeorm-connector')
const routes = require('./config/routes')
const hooks = require('./config/hooks')
const middlewares = require('./config/middlewares')
const databaseConfig = require('./database/config')

const options = {
  servers: [
    {
      port: 4000
    }
  ],
  hooks,
  middlewares,
  routes,
  plugins: [CherryTypeormConnector],
  database: databaseConfig
}

const cherry = new Cherry()
cherry.configure(options)
cherry.start(options)

module.exports = cherry
