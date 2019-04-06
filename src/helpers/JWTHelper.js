const jwt = require('jsonwebtoken')

module.exports = {
  /**
   * Verify and decode a token, but unlike the jsonwebtoken library, it uses async, promise...
   * @param {string} token The jwt token to verify and decode
   */
  async verify (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.APP_JWT_SIGN_KEY, function (err, jwtDecoded) {
        if (err) {
          reject(err)
        } else {
          resolve(jwtDecoded)
        }
      })
    })
  }
}
