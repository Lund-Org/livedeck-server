const WebsocketHooks = require('../modules/websocket/hooks')
const ArrayHelper = require('../helpers/ArrayHelper')

module.exports = ArrayHelper.chainConcat(WebsocketHooks)
