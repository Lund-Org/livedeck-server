const Binding = require('../../../database/models/Binding')
const BindingRepository = require('../../../database/repositories/BindingRepository')

class BindingController {
  /**
   * Allows to list the categories of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async index (req, res) {
    const categories = await BindingRepository.getBindingsByUserIdAsync(req.user.id)

    res.json(categories)
  }

  /**
   * Allows get a single binding of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async show (req, res) {
    const binding = await BindingRepository.getBindingByIdAndUserIdAsync(req.routeParameters.id, req.user.id, true)

    if (binding) {
      res.json(binding)
    } else {
      res.json(this._notFoundPayload(), { statusCode: 404 })
    }
  }

  /**
   * Allows to create a new binding for an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async create (req, res) {
    const binding = new Binding(req.params)

    try {
      binding.setUser(req.user)
      const savedBinding = await binding.save()
      res.json(savedBinding, { statusCode: 201 })
    } catch (e) {
      res.json(e, { statusCode: 400 })
    }
  }

  /**
   * Allows to update a binding of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async update (req, res) {
    const binding = await BindingRepository.getBindingByIdAndUserIdAsync(req.routeParameters.id, req.user.id)

    if (binding) {
      binding.set(req.params)
      await binding.save()
      res.json(binding)
    } else {
      res.json(this._notFoundPayload(), { statusCode: 404 })
    }
  }

  /**
   * Allows to remove a binding of an user
   * @param {CherryIncomingMessage} req The incoming request
   * @param {CherryServerResponse} res The response of the request
   */
  async delete (req, res) {
    const binding = await BindingRepository.getBindingByIdAndUserIdAsync(req.routeParameters.id, req.user.id)

    if (binding) {
      await binding.delete()
    }

    res.json({ removed: binding })
  }

  /**
   * Generate a not found payload
   * @return {Object}
   */
  _notFoundPayload () {
    return { error: 'Binding not found' }
  }
}

module.exports = new BindingController()
