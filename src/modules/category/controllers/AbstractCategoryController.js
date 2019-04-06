class AbstractCategoryController {
  /**
   * Generate a not found payload
   * @return {Object}
   */
  _notFoundPayload () {
    return { error: 'Category not found' }
  }
}

module.exports = AbstractCategoryController
