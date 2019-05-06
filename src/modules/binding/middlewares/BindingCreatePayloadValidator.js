const RuleHelper = require('../../../helpers/RuleHelper')
const bindingTypes = require('../../../constants/binding-types')

const paramRules = {
  'name': { type: 'string', length: { min: 4, max: 250 } },
  'icon': { type: 'string', length: { min: 4, max: 250 } },
  'weight': { type: 'number', length: { min: 0 } },
  'type': { type: 'string', enum: bindingTypes }
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
    const errors = RuleHelper.rulesManager(paramRules, req.params, true)

    if (typeof req.params.configuration !== 'undefined') {
      delete req.params.configuration
    }

    if (errors['missingKeys'].length === 0 && errors['badFormatKeys'].length === 0) {
      next.resolve(req, res)
    } else {
      res.json(errors, { statusCode: 400 })
    }
  }
}
