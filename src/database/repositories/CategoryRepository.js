const { getConnection, getRepository } = require('typeorm')
const Category = require('../models/Category')

class CategoryRepository {
  /**
   * Load the categories of a specific user
   * @param {number} userId The user identifier
   * @param {boolean} withBindingRelation If we want to load the bindings with the category
   * @return {Promise<Array>} The list of categories
   */
  static async getCategoriesByUserIdAsync (userId, withBindingRelation = false) {
    const request = getRepository(Category).createQueryBuilder('categories')

    if (withBindingRelation) {
      request.leftJoinAndSelect('categories.bindings', 'bindings')
    }

    return request.where('categories.userId = :userId', { userId })
      .orderBy('categories.weight', 'ASC')
      .getMany()
  }

  /**
   * Load the category of a specific user
   * @param {number} categoryId The category identifier
   * @param {number} userId The user identifier
   * @param {boolean} withBindingRelation If we want to load the bindings with the category
   * @return {Promise<Category>} A category
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

  /**
   * Update the order of the categorys
   * @param {number} categoryId The category identifier
   * @param {number} userId The user identifier
   * @param {number} oldRank The previous weight
   * @param {number} newRank The new weight
   */
  static async updateOrder (categoryId, userId, oldRank, newRank) {
    if (oldRank < newRank) {
      return getConnection()
        .createQueryBuilder()
        .update(Category)
        .set({
          weight: () => 'categories.weight - 1'
        })
        .where('weight > :oldWeight', { oldWeight: oldRank })
        .andWhere('weight <= :newWeight', { newWeight: newRank })
        .andWhere('id <> :id', { id: categoryId })
        .andWhere('userId = :userId', { userId })
        .execute()
    } else if (oldRank > newRank) {
      return getConnection()
        .createQueryBuilder()
        .update(Category)
        .set({
          weight: () => 'categories.weight + 1'
        })
        .where('weight < :oldWeight', { oldWeight: oldRank })
        .andWhere('weight >= :newWeight', { newWeight: newRank })
        .andWhere('id <> :id', { id: categoryId })
        .andWhere('userId = :userId', { userId })
        .execute()
    }
  }
}

module.exports = CategoryRepository
