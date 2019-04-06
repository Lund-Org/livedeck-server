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
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.create(req, res),
          path: '/',
          method: ['POST']
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
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.update(req, res),
          path: '/:id',
          method: ['PATCH'],
          rules: {
            id: /\d+/
          }
        },
        {
          type: 'ROUTE',
          callback: (req, res) => CrudCategoryController.delete(req, res),
          path: '/:id',
          method: ['DELETE'],
          rules: {
            id: /\d+/
          }
        },
        {
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
