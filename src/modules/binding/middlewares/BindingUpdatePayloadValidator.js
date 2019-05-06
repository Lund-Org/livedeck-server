const RuleHelper = require('../../../helpers/RuleHelper')

const paramRules = {
  'name': { type: 'string', length: { min: 4, max: 250 } },
  'icon': { type: 'string', length: { min: 4, max: 250 } },
  'weight': { type: 'number', length: { min: 0 } },
  'configuration': { type: ['string', 'object'] }
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
    const errors = RuleHelper.rulesManager(paramRules, req.params, false)

    if (typeof req.params.type !== 'undefined') {
      delete req.params.type
    }

    if (typeof req.params.configuration === 'object') {
      req.params.configuration = JSON.stringify(req.params.configuration)
    }

    if (errors['missingKeys'].length === 0 && errors['badFormatKeys'].length === 0) {
      next.resolve(req, res)
    } else {
      res.json(errors, { statusCode: 400 })
    }
  }
}
