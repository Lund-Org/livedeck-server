module.exports = {
  /**
   * Check the missing keys of a payload
   * @param {Object} pattern The pattern await in the payload
   * @param {Object} data The payload to check
   * @return {Array<string>} A list of the missing keys
   */
  checkMissingKeys (pattern, data) {
    const missingKeys = []

    for (const key in pattern) {
      if (typeof data[key] === 'undefined') {
        missingKeys.push(key)
      }
    }

    return missingKeys
  },
  /**
   * Check the malformed data a payload
   * @param {Object} pattern The pattern await in the payload
   * @param {Object} data The payload to check
   * @return {Array<string>} A list of the keys with a bad format
   */
  badFormatKeys (pattern, data) {
    const badFormatKeys = []

    for (const key in pattern) {
      // eslint-disable-next-line valid-typeof
      if (typeof data[key] !== 'undefined' && typeof data[key] !== pattern[key]) {
        badFormatKeys.push(key)
      }
    }

    return badFormatKeys
  }
}
