const { getConnection, getRepository } = require('typeorm')
const Binding = require('../models/Binding')

class BindingRepository {
  /**
   * Load the bindings of a specific user
   * @param {number} userId The user identifier
   * @return {Promise<Array>} The list of bindings
   */
  static async getBindingsByUserIdAsync (userId) {
    return getRepository(Binding)
      .createQueryBuilder('bindings')
      .where('bindings.userId = :userId', { userId })
      .orderBy('bindings.weight', 'ASC')
      .getMany()
  }

  /**
   * Load the binding of a specific user
   * @param {number} bindingId The binding identifier
   * @param {number} userId The user identifier
   * @param {boolean} withBindingRelation If we want to load the bindings with the binding
   * @return {Promise<Binding>} A binding
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

  /**
   * Update the order of the bindings
   * @param {number} bindingId The binding identifier
   * @param {number} userId The user identifier
   * @param {number} oldRank The previous weight
   * @param {number} newRank The new weight
   */
  static async updateOrder (bindingId, userId, oldRank, newRank) {
    if (oldRank < newRank) {
      return getConnection()
        .createQueryBuilder()
        .update(Binding)
        .set({
          weight: () => 'bindings.weight - 1'
        })
        .where('weight > :oldWeight', { oldWeight: oldRank })
        .andWhere('weight <= :newWeight', { newWeight: newRank })
        .andWhere('id <> :id', { id: bindingId })
        .andWhere('userId = :userId', { userId })
        .execute()
    } else if (oldRank > newRank) {
      return getConnection()
        .createQueryBuilder()
        .update(Binding)
        .set({
          weight: () => 'bindings.weight + 1'
        })
        .where('weight < :oldWeight', { oldWeight: oldRank })
        .andWhere('weight >= :newWeight', { newWeight: newRank })
        .andWhere('id <> :id', { id: bindingId })
        .andWhere('userId = :userId', { userId })
        .execute()
    }
  }
}

module.exports = BindingRepository
