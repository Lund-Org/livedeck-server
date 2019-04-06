const { getRepository } = require('typeorm')
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
   * Add the binding in a category
   * @param {Category} category The category where the binding is added
   */
  addCategory (category) {
    if (this.categories) {
      const isAlreadyRegistered = this.categories.some((_category) => {
        return (_category.id === category.id)
      })

      if (!isAlreadyRegistered) {
        this.categories.push(category)
      }
    } else {
      this.categories = [category]
    }
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
    return getRepository(Binding).delete(this)
  }
}

module.exports = Binding
