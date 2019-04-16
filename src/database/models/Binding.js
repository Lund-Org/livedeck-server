const { getConnection, getRepository } = require('typeorm')
const Entity = require('./Entity')

/**
 * @memberof module:db/models/Binding
 * @property {xxx} xxx xxx
 */
class Binding extends Entity {
  constructor (data) {
    super()
    // default
    this.name = ''
    this.icon = 'default.png'
    this.weight = 0
    this.type = ''
    this.configuration = '{}'

    if (typeof data !== 'undefined') {
      this.set(data)
    }
  }

  /**
   * Attach an user to the binding
   * @param {User} user The user who own the binding
   */
  setUser (user) {
    this.user = user
  }

  /**
   * Save the category in the database
   * @return {Object} The saved entity
   */
  async save () {
    return getRepository(Binding).save(this)
  }

  /**
   * Delete the category in the database
   * @return {Object} The saved entity
   */
  async delete () {
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from(Binding)
      .where('id = :id', { id: this.id })
      .execute()
  }
}

module.exports = Binding
