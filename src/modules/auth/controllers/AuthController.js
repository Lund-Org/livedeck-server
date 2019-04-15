const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../../database/models/User')
const UserRepository = require('../../../database/repositories/UserRepository')
const JWTHelper = require('../../../helpers/JWTHelper')

class AuthController {
  /**
   * Allows to login an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async login (req, res) {
    try {
      const obj = {}
      const user = await UserRepository.getOneByAsync('username', req.params.username, true)

      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(req.params.password, user.password, (err, bcryptRes) => {
            if (err || !bcryptRes) {
              res.json({
                error: typeof err !== 'undefined' ? err.message : 'Wrong password'
              }, { statusCode: 401 })
              resolve(err || bcryptRes)
            } else {
              obj.token = jwt.sign({ authorization: user.key }, process.env.APP_JWT_SIGN_KEY, { noTimestamp: true })
              res.json(obj)
              resolve(obj)
            }
          })
        })
      } else {
        res.json({ notFound: true }, { statusCode: 404 })
      }
    } catch (e) {
      res.json({ notFound: true }, { statusCode: 404 })
    }
  }

  /**
   * Allows to register an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async register (req, res) {
    const user = new User(req.params)

    try {
      const savedUser = await user.save()
      res.json(savedUser, { statusCode: 201 })
    } catch (e) {
      res.json({ error: e.message }, { statusCode: 400 })
    }
  }

  /**
   * Allows to register an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async validToken (req, res) {
    let statusCode = 200
    let payload = {}

    try {
      const decodedToken = await JWTHelper.verify(req.params.jwtToken)

      if (typeof decodedToken.authorization !== 'undefined') {
        const user = await UserRepository.getOneByAsync('key', decodedToken.authorization)

        if (user) {
          payload = { user }
        } else {
          payload = { error: 'not-found' }
          statusCode = 404
        }
      } else {
        payload = { error: 'not-found' }
        statusCode = 404
      }
    } catch (error) {
      payload = { error }
      statusCode = 500
    }

    res.json(payload, { statusCode })
  }
}

module.exports = new AuthController()
