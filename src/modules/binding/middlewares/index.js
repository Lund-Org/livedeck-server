const BindingCreatePayloadValidator = require('./BindingCreatePayloadValidator')
const BindingUpdatePayloadValidator = require('./BindingUpdatePayloadValidator')

module.exports = [
  BindingCreatePayloadValidator,
  BindingUpdatePayloadValidator
]
