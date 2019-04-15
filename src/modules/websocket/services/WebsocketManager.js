const socketIo = require('socket.io')
const FrontProcessor = require('./FrontProcessor')
const SoftwareProcessor = require('./SoftwareProcessor')
const UserRepository = require('../../../database/repositories/UserRepository')

class WebsocketManager {
  constructor () {
    this.io = null
    this.connectionPool = []
    this.frontSocketPool = {}
    this.softwareSocketPool = {}

    this.frontProcessor = new FrontProcessor(this)
    this.softwareProcessor = new SoftwareProcessor(this)
  }

  /**
   * Initialize the websocket manager
   * It's called on the hook before the start of the server
   */
  async init (httpServer = null) {
    if (httpServer) {
      return new Promise((resolve, reject) => {
        try {
          this.io = socketIo(httpServer)
          this.io.on('connection', this._manageConnection.bind(this))
          resolve(this.io)
        } catch (e) {
          reject(e)
        }
      })
    } else {
      console.warn('You didn\'t pass a server to the websocket manager')
    }
  }

  /**
   * Disconnect the websocket manager
   * It's called on the hook after the close of the server
   */
  close () {
    if (this.io) {
      this.io.close()
    }
  }

  /**
   * Manage when a new connection is coming
   * @param {Object} client The client socket
   */
  _manageConnection (client) {
    this.connectionPool.push(client)

    client.on('authentify', (data) => {
      UserRepository.getOneByAsync('key', data.token).then((user) => {
        if (user) {
          this._manageAuthentication(client, data)
          client.emit('authentication-ok')
        } else {
          client.emit('authentication-ko')
        }
      }).catch((e) => {
        console.log(e)
        client.emit('authentication-ko')
      })
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
      this.frontProcessor.bindEvents(client)
    } else if (data.device === 'software') {
      this._sortIOPool(client, data, this.softwareSocketPool, socketIndex)
      this.softwareProcessor.bindEvents(client)
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
      if (this.frontSocketPool[index].length === 0) {
        delete this.frontSocketPool[index]
      }
    })

    Object.keys(this.softwareSocketPool).forEach((index) => {
      this._removeConnection(this.softwareSocketPool[index], client)
      if (this.softwareSocketPool[index].length === 0) {
        delete this.softwareSocketPool[index]
      }
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
