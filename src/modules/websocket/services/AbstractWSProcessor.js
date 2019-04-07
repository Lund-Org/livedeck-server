class AbstractWSProcessor {
  /**
   * Search the connection matching with the current client
   * @param {Object} frontPoolWs The pool of connection connected with the right device
   * @param {Object} client The connected socket which executes the request
   */
  findConnectionKey (wsPool, client) {
    let foundConnectionKey = null

    Object.keys(wsPool).some((key) => {
      const foundSocket = wsPool[key].some((socket) => {
        return (socket.id === client.id)
      })

      if (foundSocket) {
        foundConnectionKey = key

        return true
      }
      return false
    })

    return foundConnectionKey
  }
}

module.exports = AbstractWSProcessor
