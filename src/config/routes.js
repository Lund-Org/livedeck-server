const path = require('path')
const ArrayHelper = require('../helpers/ArrayHelper')
const authRoutes = require('../modules/auth/routes/authRoutes')
const bindingRoutes = require('../modules/binding/routes/bindingRoutes')
const categoryRoutes = require('../modules/category/routes/categoryRoutes')

module.exports = {
  router: ArrayHelper.chainConcat(
    authRoutes.routes,
    bindingRoutes.routes,
    categoryRoutes.routes
  ),
  publicRouter: [
    {
      type: 'PUBLIC_ROUTE_PUBLIC_FOLDER',
      path: path.join(__dirname, '../../public')
    }
  ]
}
