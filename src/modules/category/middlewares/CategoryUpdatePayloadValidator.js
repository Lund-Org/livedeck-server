const RuleHelper = require('../../../helpers/RuleHelper')

const paramRules = {
  'name': { type: 'string', length: { min: 4, max: 250 } },
  'color': { type: 'string', length: { min: 4, max: 250 } },
  'weight': { type: 'number', length: { min: 0 } }
}

/**
 * Check the payload for the update of a category and manage the missing keys or the bad format
 * @param {Function} next The next middleware to call in the process or the endpoint
 * @param {Object} req The current request
 * @param {Object} res The object to send response
 */
module.exports = {
  name: 'category-update-payload-validator',
  callback: (next, req, res) => {
    const errors = RuleHelper.rulesManager(paramRules, req.params, false)

    if (errors['missingKeys'].length === 0 && errors['badFormatKeys'].length === 0) {
      next.resolve(req, res)
    } else {
      res.json(errors, { statusCode: 400 })
    }
  }
}
