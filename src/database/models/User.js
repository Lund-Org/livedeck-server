const { getRepository } = require('typeorm')
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')
const Entity = require('./Entity')

/**
 * @memberof module:db/models/User
 * @property {xxx} xxx xxx
 */
class User extends Entity {
  constructor (data) {
    super({ private: ['password'] })
    // default
    this.username = ''
    this.password = ''
    this.key = uuid()

    this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')

    if (typeof data !== 'undefined') {
      this.set(data)
    }
  }

  /**
   * Saves the current user object and crypt the password
   * @return {Promise<User|Error>}
   */
  async save () {
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
          reject(err)
          return
        }
        this.password = hash
        resolve(getRepository(User).save(this))
      })
    })
  }
}

module.exports = User
