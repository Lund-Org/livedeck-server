const socketIo = require('socket.io')

class WebsocketManager {
  constructor () {
    this.io = null
    this.connectionPool = []
    this.frontSocketPool = {}
    this.softwareSocketPool = {}
  }

  /**
   * Initialize the websocket manager
   * It's called on the hook before the start of the server
   */
  init () {
    this.io = socketIo(process.env.APP_WEBSOCKET_PORT, {
      path: '/',
      serveClient: false,
      // below are engine.IO options
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false
    }).on('connection', this._manageConnection)
  }

  /**
   * Disconnect the websocket manager
   * It's called on the hook after the close of the server
   */
  close () {
    this.io.disconnect()
  }

  /**
   * Manage when a new connection is coming
   * @param {Object} client The client socket
   */
  _manageConnection (client) {
    this.connectionPool.push(client)

    client.on('authentify', (data) => {
      this._manageAuthentication(client, data)
    })
    client.on('disconnect', () => {
      this._manageClientDisconnection(client)
    })
  }

  /**
   * Manage when a client is authenticated
   * @param {Object} client The client socket
   * @param {Object} data The data sent by the client
   */
  _manageAuthentication (client, data) {
    const socketIndex = this.connectionPool.findIndex((item) => {
      return (item.id === client.id)
    })

    if (data.device === 'front') {
      this._sortIOPool(client, data, this.frontSocketPool, socketIndex)
    } else if (data.device === 'software') {
      this._sortIOPool(client, data, this.softwareSocketPool, socketIndex)
    }
  }

  /**
   * Manage when a client is disconnected
   * @param {Object} client The client socket
   */
  _manageClientDisconnection (client) {
    this._removeConnection(this.connectionPool, client)

    Object.keys(this.frontSocketPool).forEach((index) => {
      this._removeConnection(this.frontSocketPool[index], client)
    })

    Object.keys(this.softwareSocketPool).forEach((index) => {
      this._removeConnection(this.softwareSocketPool[index], client)
    })
  }

  /**
   * Sort the pool of connection. It removes the socket from the general pool to push it in the right one.
   * If the connection to a same account exceed 5, the pool acts like a FIFO
   * @param {Object} client The client socket
   * @param {Array} pool The pool on connection
   * @param {integer} socketIndex The index of the connection from the pool
   */
  _sortIOPool (client, data, pool, socketIndex) {
    this.connectionPool.splice(socketIndex, 1)
    if (typeof pool[data.token] === 'undefined') {
      pool[data.token] = []
    }
    pool[data.token].push(client)
    if (pool[data.token].length > 5) {
      let firstItem = pool[data.token].shift()
      firstItem.disconnect(true)
    }
  }

  /**
   * Remove the connection from a pool
   * @param {Array} pool The pool on connection where the socket is stored
   * @param {Object} socket The socket of the user
   */
  _removeConnection (pool, socket) {
    const index = pool.findIndex((connection) => {
      return connection.id === socket.id
    })
    if (index !== -1) {
      pool.splice(index, 1)
    }
  }
}

module.exports = WebsocketManager
