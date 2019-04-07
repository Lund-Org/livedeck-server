const BindingController = require('../controllers/BindingController')

module.exports = {
  routes: [
    {
      type: 'ROUTE_CONTEXT',
      name: 'bindings-context-',
      path: '/bindings',
      middlewares: ['user-connected'],
      collection: [
        {
          type: 'ROUTE',
          callback: (req, res) => BindingController.index(req, res),
          path: '/',
          method: ['GET']
        },
        {
          name: 'create-binding',
          type: 'ROUTE',
          callback: (req, res) => BindingController.create(req, res),
          path: '/',
          method: ['POST'],
          middlewares: ['binding-create-payload-validator']
        },
        {
          type: 'ROUTE',
          callback: (req, res) => BindingController.show(req, res),
          path: '/:id',
          method: ['GET'],
          rules: {
            id: /\d+/
          }
        },
        {
          name: 'update-binding',
          type: 'ROUTE',
          callback: (req, res) => BindingController.update(req, res),
          path: '/:id',
          method: ['PATCH'],
          rules: {
            id: /\d+/
          },
          middlewares: ['binding-update-payload-validator']
        },
        {
          name: 'delete-binding',
          type: 'ROUTE',
          callback: (req, res) => BindingController.delete(req, res),
          path: '/:id',
          method: ['DELETE'],
          rules: {
            id: /\d+/
          }
        }
      ]
    }
  ]
}
