const WebsocketManager = require('../services/WebsocketManager')

module.exports = [
  {
    name: 'init-websocket',
    priority: 1,
    type: 'beforeStartServer',
    method: function (data) {
      const cherryServer = data.server
      // Attacher le serveur http, du coup changer le hook ???
      data.cherry.websocket = new WebsocketManager()
      data.cherry.websocket.init(cherryServer.server).then((client) => {
        console.log('WS server connected')
      })
    }
  },
  {
    name: 'close-websocket',
    priority: 1,
    type: 'beforeStopServer',
    method: function (data) {
      data.cherry.websocket.close()
    }
  }
]
