const AuthController = require('../controllers/AuthController')

module.exports = {
  routes: [
    {
      type: 'ROUTE',
      callback: (req, res) => AuthController.login(req, res),
      path: '/login',
      method: ['POST']
    },
    {
      type: 'ROUTE',
      callback: (req, res) => AuthController.register(req, res),
      path: '/register',
      method: ['POST']
    },
    {
      type: 'ROUTE',
      callback: (req, res) => AuthController.validToken(req, res),
      path: '/valid-token',
      method: ['POST']
    }
  ]
}
