const Category = require('../../../database/models/Category')
const CategoryRepository = require('../../../database/repositories/CategoryRepository')
const AbstractCategoryController = require('./AbstractCategoryController')

class CrudCategoryController extends AbstractCategoryController {
  /**
   * Allows to list the categories of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async index (req, res) {
    const categories = await CategoryRepository.getCategoriesByUserIdAsync(req.user.id)

    res.json(categories)
  }

  /**
   * Allows get a single category of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async show (req, res) {
    const category = await CategoryRepository.getCategoryByIdAndUserIdAsync(req.routeParameters.id, req.user.id, true)

    if (category) {
      res.json(category)
    } else {
      res.json(this._notFoundPayload(), { statusCode: 404 })
    }
  }

  /**
   * Allows to create a new category for an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async create (req, res) {
    const category = new Category(req.params)

    try {
      category.setUser(req.user)
      const savedCategory = await category.save()
      res.json(savedCategory, { statusCode: 201 })
      return savedCategory
    } catch (e) {
      res.json(e, { statusCode: 400 })
      return null
    }
  }

  /**
   * Allows to update a category of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async update (req, res) {
    const category = await CategoryRepository.getCategoryByIdAndUserIdAsync(req.routeParameters.id, req.user.id)

    if (category) {
      category.set(req.params)
      await category.save()
      res.json(category)
      return category
    } else {
      res.json(this._notFoundPayload(), { statusCode: 404 })
      return null
    }
  }

  /**
   * Allows to remove a category of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async delete (req, res) {
    const category = await CategoryRepository.getCategoryByIdAndUserIdAsync(req.routeParameters.id, req.user.id)

    if (category) {
      await category.delete()
    }

    res.json({ removed: category })
    return category
  }
}

module.exports = new CrudCategoryController()
