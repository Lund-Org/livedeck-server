const AbstractWSProcessor = require('./AbstractWSProcessor')

class SoftwareProcessor extends AbstractWSProcessor {
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
    // nothing for now
  }

  /**
   * Say to the software to trigger the binding action
   * @param {User} user The user who triggered the binding
   * @param {Object} softwarePoolWS The pool of connection of the software
   * @param {Binding} binding The binding clicked on the smartphone
   */
  emitAction (user, softwarePoolWS, binding) {
    if (typeof softwarePoolWS[user.key] !== 'undefined') {
      softwarePoolWS[user.key].forEach((ws) => {
        ws.emit('binding-triggered', {
          bindingId: binding.id
        })
      })
    }
  }
}

module.exports = SoftwareProcessor
