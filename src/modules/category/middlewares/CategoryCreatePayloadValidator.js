const MiddlewareHelper = require('../../../helpers/MiddlewareHelper')

const requiredKeys = {
  'name': 'string',
  'color': 'string',
  'weight': 'number'
}

/**
 * Check the payload for the creation of a category and manage the missing keys or the bad format
 * @param {Function} next The next middleware to call in the process or the endpoint
 * @param {Object} req The current request
 * @param {Object} res The object to send response
 */
module.exports = {
  name: 'category-create-payload-validator',
  callback: (next, req, res) => {
    const missingKeys = MiddlewareHelper.checkMissingKeys(requiredKeys, req.params)
    const badFormatKeys = MiddlewareHelper.badFormatKeys(requiredKeys, req.params)

    if (missingKeys.length === 0 && badFormatKeys.length === 0) {
      next.resolve(req, res)
    } else {
      res.json({
        missingKeys,
        badFormatKeys
      }, { statusCode: 400 })
    }
  }
}
