const ArrayHelper = require('../helpers/ArrayHelper')
const authMiddlewares = require('../modules/auth/middlewares')
const bindingMiddlewares = require('../modules/binding/middlewares')
const categoryMiddlewares = require('../modules/category/middlewares')

module.exports = ArrayHelper.chainConcat(authMiddlewares, bindingMiddlewares, categoryMiddlewares)
