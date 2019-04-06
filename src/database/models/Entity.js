const { getConnection } = require('typeorm')

/**
 * @memberof module:models/entities/Entity
 */
class Entity {
  /**
   * The constructor for every entities
   */
  constructor (options = {}) {
    this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    this.private = (typeof options.private !== 'undefined') ? options.private : []

    this.private.push('private')
  }

  /**
   * Assign data if the property exists
   * @param {Object} data The data to set
   * @return {Entity}
   */
  set (data) {
    if (typeof data !== 'undefined') {
      for (let index in data) {
        if (typeof this[index] !== 'undefined' && index !== 'id') {
          this[index] = data[index]
        }
      }
    }

    return this
  }

  /**
   * Delete the entity
   * @return {Promise}
   */
  async delete () {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(this.constructor.name)
      .where('id = :id', { id: this.id })
      .execute()
  }

  /**
   * Create a JSON of the model which excludes the private fields
   * @return {string}
   */
  toJSON () {
    let jsonObj = {}

    for (let key in this) {
      if (typeof this[key] !== 'function') {
        jsonObj[key] = this[key]
      }
    }
    for (let key of this.private) {
      delete jsonObj[key]
    }

    return jsonObj
  }
}

/**
 * @module models/entities/Entity
 * @desc The base of all models
 */
module.exports = Entity
