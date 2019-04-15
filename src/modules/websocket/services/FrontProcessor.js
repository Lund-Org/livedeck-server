const UserRepository = require('../../../database/repositories/UserRepository')
const AbstractWSProcessor = require('./AbstractWSProcessor')

class FrontProcessor extends AbstractWSProcessor {
  /**
   * The manager for every websocket actions
   * @param {WebsocketManager} websocketManager The websocket manager
   */
  constructor (websocketManager) {
    super()
    this.websocketManager = websocketManager
  }

  /**
   * The manager for every websocket actions
   * @param {WebsocketManager} websocketManager The websocket manager
   */
  bindEvents (io) {
    io.on('trigger-binding', (data) => {
      this.onBindingTriggered.bind(this)(io, data)
    })
  }

  /**
   * Receive a binding action from the smartphone
   * @param {Object} client The connected socket which executes the request
   * @param {mixed} data The data sent
   */
  onBindingTriggered (client, data) {
    const frontPoolWS = this.websocketManager.frontSocketPool
    const indexFromPool = this.findConnectionKey(frontPoolWS, client)

    if (indexFromPool) {
      UserRepository.getOneByAsync('key', indexFromPool).then((user) => {
        this.websocketManager.softwareProcessor.emitAction(
          user,
          this.websocketManager.softwareSocketPool,
          data
        )
        client.emit('trigger-binding-ok')
      }).catch(() => {
        client.emit('trigger-binding-ko')
      })
    } else {
      client.emit('trigger-binding-ko')
    }
  }

  /**
   * Synchronize the smartphone app with the creations done with the software
   * @param {User} user The authenticated user
   * @param {Category} category The category updated
   */
  emitCreateCategory (user, category) {
    this._findAndEmitAction(user, 'create-category', { category })
  }

  /**
   * Synchronize the smartphone app with the updates done with the software
   * @param {User} user The authenticated user
   * @param {Category} category The category updated
   */
  emitUpdateCategory (user, category) {
    this._findAndEmitAction(user, 'update-category', { category })
  }

  /**
   * Synchronize the smartphone app with the deletions done with the software
   * @param {User} user The authenticated user
   * @param {Category} binding The binding updated
   */
  emitDeleteCategory (user, category) {
    this._findAndEmitAction(user, 'delete-category', { category })
  }

  /**
   * Synchronize the smartphone app with the creations done with the software
   * @param {User} user The authenticated user
   * @param {Binding} binding The binding updated
   */
  emitCreateBinding (user, binding) {
    this._findAndEmitAction(user, 'create-binding', { binding })
  }

  /**
   * Synchronize the smartphone app with the updates done with the software
   * @param {User} user The authenticated user
   * @param {Binding} binding The binding updated
   */
  emitUpdateBinding (user, binding) {
    this._findAndEmitAction(user, 'update-binding', { binding })
  }

  /**
   * Synchronize the smartphone app with the deletions done with the software
   * @param {User} user The authenticated user
   * @param {Binding} binding The binding updated
   */
  emitDeleteBinding (user, binding) {
    this._findAndEmitAction(user, 'delete-binding', { binding })
  }

  /**
   * Simple process to find the connections and send an event with some data
   * @param {User} user The connected user
   * @param {string} eventName The event to trigger
   * @param {Object} data The data to send to the app
   */
  _findAndEmitAction (user, eventName, data) {
    if (typeof this.websocketManager.frontSocketPool[user.key] !== 'undefined') {
      this.websocketManager.frontSocketPool[user.key].forEach((ws) => {
        ws.emit(eventName, data)
      })
    }
  }
}

module.exports = FrontProcessor
