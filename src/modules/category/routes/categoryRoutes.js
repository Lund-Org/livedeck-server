const CrudCategoryController = require('../controllers/CrudCategoryController')
const RestCategoryController = require('../controllers/RestCategoryController')

module.exports = {
  routes: [
    {
      type: 'ROUTE_CONTEXT',
      name: 'categories-context-',
      path: '/categories',
      middlewares: ['user-connected'],
      collection: [
        {
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.index(req, res),
          path: '/',
          method: ['GET']
        },
        {
          name: 'create-category',
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.create(req, res),
          path: '/',
          method: ['POST'],
          middlewares: ['category-create-payload-validator']
        },
        {
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.show(req, res),
          path: '/:id',
          method: ['GET'],
          rules: {
            id: /\d+/
          }
        },
        {
          name: 'update-category',
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.update(req, res),
          path: '/:id',
          method: ['PATCH'],
          rules: {
            id: /\d+/
          },
          middlewares: ['category-update-payload-validator']
        },
        {
          name: 'delete-category',
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.delete(req, res),
          path: '/:id',
          method: ['DELETE'],
          rules: {
            id: /\d+/
          }
        },
        {
          name: 'add-binding-to-category',
          type: 'ROUTE',
          callback: (req, res) => RestCategoryController.addBinding(req, res),
          path: '/:id/bindings/:bindingId',
          method: ['POST'],
          rules: {
            id: /\d+/,
            bindingId: /\d+/
          }
        },
        {
          name: 'remove-binding-from-category',
          type: 'ROUTE',
          callback: (req, res) => RestCategoryController.removeBinding(req, res),
          path: '/:id/bindings/:bindingId',
          method: ['DELETE'],
          rules: {
            id: /\d+/,
            bindingId: /\d+/
          }
        }
      ]
    }
  ]
}
