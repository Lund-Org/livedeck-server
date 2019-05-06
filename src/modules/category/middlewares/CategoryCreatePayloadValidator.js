const RuleHelper = require('../../../helpers/RuleHelper')

const paramRules = {
  'name': { type: 'string', length: { min: 4, max: 200 } },
  'color': { type: 'string', length: { min: 4, max: 200 } },
  'weight': { type: 'number', length: { min: 0 } }
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
    const errors = RuleHelper.rulesManager(paramRules, req.params, true)

    if (errors['missingKeys'].length === 0 && errors['badFormatKeys'].length === 0) {
      next.resolve(req, res)
    } else {
      res.json(errors, { statusCode: 400 })
    }
  }
}
