const ArrayHelper = require('../helpers/ArrayHelper')
const authMiddlewares = require('../modules/auth/middlewares')

module.exports = ArrayHelper.chainConcat(authMiddlewares)
