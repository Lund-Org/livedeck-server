const MiddlewareHelper = require('../../../helpers/MiddlewareHelper')

const requiredKeys = {
  'name': 'string',
  'icon': 'string',
  'weight': 'number',
  'type': 'string',
  'configuration': ['string', 'object']
}

/**
 * Check the payload for the creation of a binding and manage the missing keys or the bad format
 * @param {Function} next The next middleware to call in the process or the endpoint
 * @param {Object} req The current request
 * @param {Object} res The object to send response
 */
module.exports = {
  name: 'binding-update-payload-validator',
  callback: (next, req, res) => {
    const badFormatKeys = MiddlewareHelper.badFormatKeys(requiredKeys, req.params)

    if (badFormatKeys.length === 0) {
      if (typeof req.params.configuration === 'object') {
        req.params.configuration = JSON.stringify(req.params.configuration)
      }
      next.resolve(req, res)
    } else {
      res.json({
        badFormatKeys
      }, { statusCode: 400 })
    }
  }
}
