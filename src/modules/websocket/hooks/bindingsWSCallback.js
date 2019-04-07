module.exports = [
  {
    name: 'create-binding-front',
    type: 'afterProcess',
    method: function (data) {
      if (data.request._route.name === 'bindings-context-create-binding' && data.processResult) {
        data.request.cherry.websocket.frontProcessor.emitCreateBinding(data.request.user, data.processResult)
      }
    }
  },
  {
    name: 'update-binding-front',
    type: 'afterProcess',
    method: function (data) {
      if (data.request._route.name === 'bindings-context-update-binding' && data.processResult) {
        data.request.cherry.websocket.frontProcessor.emitUpdateBinding(data.request.user, data.processResult)
      }
    }
  },
  {
    name: 'delete-binding-front',
    type: 'afterProcess',
    method: function (data) {
      if (data.request._route.name === 'bindings-context-delete-binding' && data.processResult) {
        data.request.cherry.websocket.frontProcessor.emitDeleteBinding(data.request.user, data.processResult)
      }
    }
  }
]
