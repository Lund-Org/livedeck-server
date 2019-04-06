const UserRepository = require('../../../database/repositories/UserRepository')

/**
 * Check the integrity of the JWT
 * @param {Function} next The next middleware to call in the process or the endpoint
 * @param {Object} req The current request
 * @param {Object} res The object to send response
 */
module.exports = {
  name: 'user-connected',
  callback: (next, req, res) => {
    UserRepository.getOneByAsync('key', req.headers.authorization).then((user) => {
      if (user) {
        req.user = user
        next.resolve(req, res)
      } else {
        res.json({ error: 'User not found' }, { statusCode: 404 })
      }
    }).catch((err) => {
      res.json({ error: err }, { statusCode: 500 })
    })
  }
}
