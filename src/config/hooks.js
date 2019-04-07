const WebsocketHooks = require('../modules/websocket/hooks/websocket')
const bindingsWSCallback = require('../modules/websocket/hooks/bindingsWSCallback')
const categoriesWSCallback = require('../modules/websocket/hooks/categoriesWSCallback')
const ArrayHelper = require('../helpers/ArrayHelper')

module.exports = ArrayHelper.chainConcat(WebsocketHooks, bindingsWSCallback, categoriesWSCallback)
