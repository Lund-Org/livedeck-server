/* eslint-disable valid-typeof */
module.exports = {
  /**
   * Check if field exists in the payload
   * @param {string} field The name of the field
   * @param {Object} payload The input payload
   * @return {boolean}
   */
  checkMissingKey (field, payload) {
    return (typeof payload[field] === 'undefined')
  },
  /**
   * Check the type of a field
   * @param {string} field The field name
   * @param {mixed} value The value to check
   * @param {string} type The expected type of the field
   * @param {Array} badFormatArray The array of the values with a bad format
   */
  checkType (field, value, type, badFormatArray) {
    let isBadFormat = false
    let typeExpectedStr = type

    if (Array.isArray(type)) {
      isBadFormat = !type.some((t) => typeof value === t)
      typeExpectedStr = type.join(' or ')
    } else {
      isBadFormat = typeof value !== type
    }

    if (isBadFormat) {
      badFormatArray.push({
        [field]: `The field '${field}' has a wrong type. ${typeExpectedStr} expected`
      })
    }
  },
  /**
   * Check the length of a field
   * @param {string} field The field name
   * @param {mixed} value The value to check
   * @param {Object} lengthRules The rules for the length
   * @param {Array} badFormatArray The array of the values with a bad format
   */
  checkLength (field, value, lengthRules, badFormatArray) {
    if (typeof lengthRules.min === 'number') {
      if (typeof value === 'number' && value < lengthRules.min) {
        badFormatArray.push({
          [field]: `The field '${field}' is too low. Minimum value : ${lengthRules.min}`
        })
      } else if (typeof value === 'string' && value.length < lengthRules.min) {
        badFormatArray.push({
          [field]: `The field '${field}' is too short. Minimum size : ${lengthRules.min} characters`
        })
      }
    }
    if (typeof lengthRules.max === 'number') {
      if (typeof value === 'number' && value > lengthRules.max) {
        badFormatArray.push({
          [field]: `The field '${field}' is too high. Maximum value : ${lengthRules.max}`
        })
      } else if (typeof value === 'string' && value.length > lengthRules.max) {
        badFormatArray.push({
          [field]: `The field '${field}' is too big. Maximum size : ${lengthRules.max} characters`
        })
      }
    }
  },
  /**
   * Check if the value is valid among several values
   * @param {string} field The field name
   * @param {mixed} value The value to check
   * @param {Array} enumValues The valid values
   * @param {Array} badFormatArray The array of the values with a bad format
   */
  checkInEnum (field, value, enumValues, badFormatArray) {
    const isValid = enumValues.some((enumValue) => {
      return value === enumValue
    })

    if (!isValid) {
      badFormatArray.push({
        [field]: `The field '${field}' is invalid. The valid values are : ${enumValues.join(', ')}`
      })
    }
  },
  /**
   * Check the rules to validate a payload
   * @param {Object} rules The rules appliad by field
   * @param {Object} payload The input payload
   * @param {boolean} checkMissingKeys Check the presence of the key or not
   */
  rulesManager (rules, payload, checkMissingKeys = false) {
    let errors = {
      missingKeys: [],
      badFormatKeys: []
    }

    for (const field in rules) {
      if (checkMissingKeys && this.checkMissingKey(field, payload)) {
        errors.missingKeys.push({
          [field]: `The field '${field}' is missing`
        })
      } else if (!this.checkMissingKey(field, payload)) {
        for (const ruleType in rules[field]) {
          switch (ruleType) {
            case 'type':
              this.checkType(field, payload[field], rules[field][ruleType], errors.badFormatKeys)
              break
            case 'length':
              this.checkLength(field, payload[field], rules[field][ruleType], errors.badFormatKeys)
              break
            case 'enum':
              this.checkInEnum(field, payload[field], rules[field][ruleType], errors.badFormatKeys)
              break
          }
        }
      }
    }

    return errors
  }
}
