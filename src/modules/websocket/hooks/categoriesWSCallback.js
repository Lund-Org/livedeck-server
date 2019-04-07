module.exports = [
  {
    name: 'create-category-front',
    type: 'afterProcess',
    method: function (data) {
      if (data.request._route.name === 'categories-context-create-category' && data.processResult) {
        data.request.cherry.websocket.frontProcessor.emitCreateCategory(data.request.user, data.processResult)
      }
    }
  },
  {
    name: 'update-category-front',
    type: 'afterProcess',
    method: function (data) {
      const matchingRoutes = [
        'categories-context-update-category',
        'categories-context-add-binding-to-category',
        'categories-context-remove-binding-from-category'
      ]
      if (matchingRoutes.includes(data.request._route.name) && data.processResult) {
        data.request.cherry.websocket.frontProcessor.emitUpdateCategory(data.request.user, data.processResult)
      }
    }
  },
  {
    name: 'delete-category-front',
    type: 'afterProcess',
    method: function (data) {
      if (data.request._route.name === 'categories-context-delete-category' && data.processResult) {
        data.request.cherry.websocket.frontProcessor.emitDeleteCategory(data.request.user, data.processResult)
      }
    }
  }
]
