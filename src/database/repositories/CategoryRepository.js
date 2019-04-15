const { getRepository } = require('typeorm')
const Category = require('../models/Category')

class CategoryRepository {
  /**
   * Load the categories of a specific user
   * @param {integer} userId The user identifier
   * @param {boolean} withBindingRelation If we want to load the bindings with the category
   * @return {Promise<Array>} The list of categories
   */
  static async getCategoriesByUserIdAsync (userId /* , withBindingRelation = false */) {
    const request = getRepository(Category).createQueryBuilder('categories')

    // if (withBindingRelation) {
    //   request.leftJoinAndSelect('categories.bindings', 'bindings')
    // }

    return request.where('categories.userId = :userId', { userId }).getMany()
  }

  /**
   * Load the categories of a specific user
   * @param {integer} userId The user identifier
   * @param {boolean} withBindingRelation If we want to load the bindings with the category
   * @return {Promise<Array>} The list of categories
   */
  static async getCategoryByIdAndUserIdAsync (categoryId, userId, withBindingRelation = false) {
    const request = getRepository(Category).createQueryBuilder('categories')

    if (withBindingRelation) {
      request.leftJoinAndSelect('categories.bindings', 'binding')
    }

    return request
      .where('categories.id = :categoryId', { categoryId })
      .andWhere('categories.userId = :userId', { userId })
      .getOne()
  }
}

module.exports = CategoryRepository
