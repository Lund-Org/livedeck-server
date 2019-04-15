const { getRepository } = require('typeorm')
const User = require('../models/User')

class UserRepository {
  /**
   * Load an user based on a specific condition
   * @param {string} fieldName The field of the condition
   * @param {mixed} value The value of the condition
   * @param {boolean} withCategoryRelation If we want to load the categories with the user
   * @return {Promise<Array>} The list user
   */
  static async getOneByAsync (fieldName, value, withCategoryRelation = false) {
    const query = getRepository(User).createQueryBuilder('users')

    if (withCategoryRelation) {
      query.leftJoinAndSelect('users.categories', 'category')
    }

    return query.where(`users.${fieldName} = :value`, { value }).getOne()
  }

  /**
   * Load an user by its id
   * @param {integer} userId The user identifier
   * @param {boolean} withCategoryRelation If we want to load the categories with the user
   * @return {Promise<Array>} The list user
   */
  static async getByIdAsync (userId, withCategoryRelation = false) {
    return UserRepository.getOneByAsync('userId', userId, withCategoryRelation)
  }
}

module.exports = UserRepository
