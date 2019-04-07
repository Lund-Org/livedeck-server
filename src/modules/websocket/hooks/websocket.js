const WebsocketManager = require('../services/WebsocketManager')

module.exports = [
  {
    name: 'init-websocket',
    priority: 1,
    type: 'beforeStartServer',
    method: function (data) {
      data.cherry.websocket = new WebsocketManager()
      data.cherry.websocket.init()
    }
  },
  {
    name: 'close-websocket',
    priority: 1,
    type: 'afterStopServer',
    method: function (data) {
      data.cherry.websocket.close()
    }
  }
]
