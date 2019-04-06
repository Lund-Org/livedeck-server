const { getRepository } = require('typeorm')
const Binding = require('../models/Binding')

class BindingRepository {
  /**
   * Load the bindings of a specific user
   * @param {integer} userId The user identifier
   * @return {Promise<Array>} The list of bindings
   */
  static async getBindingsByUserIdAsync (userId) {
    return getRepository(Binding)
      .createQueryBuilder('bindings')
      .where('bindings.userId = :userId', { userId })
      .getMany()
  }

  /**
   * Load the bindings of a specific user
   * @param {integer} userId The user identifier
   * @param {boolean} withBindingRelation If we want to load the bindings with the binding
   * @return {Promise<Array>} The list of bindings
   */
  static async getBindingByIdAndUserIdAsync (bindingId, userId, withBindingRelation = false) {
    const request = getRepository(Binding).createQueryBuilder('bindings')

    if (withBindingRelation) {
      request.leftJoinAndSelect('bindings.categories', 'categories')
    }

    return request
      .where('bindings.id = :bindingId', { bindingId })
      .andWhere('bindings.userId = :userId', { userId })
      .getOne()
  }
}

module.exports = BindingRepository
