const MiddlewareHelper = require('../../../helpers/MiddlewareHelper')

const requiredKeys = {
  'name': 'string',
  'icon': 'string',
  'weight': 'number',
  'type': 'string'
}

/**
 * Check the payload for the creation of a binding and manage the missing keys or the bad format
 * @param {Function} next The next middleware to call in the process or the endpoint
 * @param {Object} req The current request
 * @param {Object} res The object to send response
 */
module.exports = {
  name: 'binding-create-payload-validator',
  callback: (next, req, res) => {
    const missingKeys = MiddlewareHelper.checkMissingKeys(requiredKeys, req.params)
    const badFormatKeys = MiddlewareHelper.badFormatKeys(requiredKeys, req.params)

    if (typeof req.params.configuration !== 'undefined') {
      delete req.params.configuration
    }

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
