const { getRepository } = require('typeorm')
const Entity = require('./Entity')

/**
 * @memberof module:db/models/Category
 * @property {xxx} xxx xxx
 */
class Category extends Entity {
  constructor (data) {
    super({ private: ['user'] })
    // default
    this.name = ''
    this.color = '#CC3333'
    this.weight = 0

    if (typeof data !== 'undefined') {
      this.set(data)
    }
  }

  /**
   * Attach an user to the category
   * @param {User} user The user who own the category
   */
  setUser (user) {
    this.user = user
  }

  /**
   * Add a binding in the category
   * @param {Binding} binding The binding which we want to add in the category
   */
  addBinding (binding) {
    if (this.bindings) {
      const isAlreadyRegistered = this.bindings.some((_binding) => {
        return (_binding.id === binding.id)
      })

      if (!isAlreadyRegistered) {
        this.bindings.push(binding)
      }
    }
  }

  /**
   * Remove a binding in the category
   * @param {Binding} binding The binding which we want to add in the category
   */
  removeBinding (binding) {
    if (this.bindings) {
      let bindingIndex = 0
      const isAlreadyRegistered = this.bindings.some((_binding, index) => {
        if (_binding.id === binding.id) {
          bindingIndex = index
          return true
        }
        return false
      })

      if (isAlreadyRegistered) {
        this.bindings.splice(bindingIndex, 1)
      }
    }
  }

  /**
   * Save the category in the database
   * @return {Object} The saved entity
   */
  async save () {
    return getRepository(Category).save(this)
  }

  /**
   * Delete the category in the database
   * @return {Object} The saved entity
   */
  async delete () {
    return getRepository(Category).delete(this)
  }
}

module.exports = Category
