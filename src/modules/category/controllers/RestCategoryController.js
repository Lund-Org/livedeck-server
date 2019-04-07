const BindingRepository = require('../../../database/repositories/BindingRepository')
const CategoryRepository = require('../../../database/repositories/CategoryRepository')
const AbstractCategoryController = require('./AbstractCategoryController')

class RestCategoryController extends AbstractCategoryController {
  /**
   * Allows to update a category of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async addBinding (req, res) {
    const category = await CategoryRepository.getCategoryByIdAndUserIdAsync(req.routeParameters.id, req.user.id, true)
    const binding = await BindingRepository.getBindingByIdAndUserIdAsync(req.routeParameters.bindingId, req.user.id)

    if (category && binding) {
      category.addBinding(binding)
      await category.save()
      res.json(category)
      return category
    } else {
      res.json(this._notFoundPayload(), { statusCode: 404 })
      return null
    }
  }

  /**
   * Allows to update a category of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async removeBinding (req, res) {
    const category = await CategoryRepository.getCategoryByIdAndUserIdAsync(req.routeParameters.id, req.user.id, true)
    const binding = await BindingRepository.getBindingByIdAndUserIdAsync(req.routeParameters.bindingId, req.user.id)

    if (category && binding) {
      category.removeBinding(binding)
      await category.save()
      res.json(category)
      return category
    } else {
      res.json(this._notFoundPayload(), { statusCode: 404 })
      return null
    }
  }
}

module.exports = new RestCategoryController()
