/* eslint-disable no-unused-expressions */
const testBindingPayload = require(path.join(__root, 'test/configuration/payloadTester/testBindingPayload'))
const testCategoryPayload = require(path.join(__root, 'test/configuration/payloadTester/testCategoryPayload'))
const WebsocketManager = require(path.join(__root, 'src/modules/websocket/services/WebsocketManager'))
const ioClient = require('socket.io-client')

async function authSocket (ws, payload) {
  return new Promise((resolve, reject) => {
    ws.on('authentication-ok', (data) => {
      resolve()
    }).on('authentication-ko', (data) => {
      reject(new Error('Authentication failed'))
    }).emit('authentify', payload)
  })
}

module.exports = (data) => {
  data.ws = {
    'create-category': [],
    'update-category': [],
    'delete-category': [],
    'create-binding': [],
    'update-binding': [],
    'delete-binding': []
  }

  it('Tests that nothing happens when no server are given', async () => {
    const tmp = console.warn
    let hasWarned = false

    console.warn = (message) => {
      hasWarned = true
    }

    const wsManager = new WebsocketManager()
    wsManager.init()

    console.warn = tmp
    expect(hasWarned).to.be.true
  })

  it('Tests the authentication', async () => {
    data.clientFront = ioClient('ws://localhost:4123/').on('connect_error', (err) => {
      expect.fail(err)
    })
    data.clientSoft = ioClient('ws://localhost:4123/').on('connect_error', (err) => {
      expect.fail(err)
    })

    data.clientSoft = ioClient('ws://localhost:4123/').on('connect_error', (err) => {
      expect.fail(err)
    })

    try {
      await authSocket(data.clientFront, { token: 'fail-authentication', device: 'front' })
      expect.fail()
    } catch (e) {
      expect(e instanceof Error).to.be.true
    }

    return Promise.all([
      authSocket(data.clientFront, { token: 'fake-key', device: 'front' }),
      authSocket(data.clientSoft, { token: 'fake-key', device: 'software' })
    ])
  })

  it('Tests the trigger of a binding from the front ws and received it on the software ws', async () => {
    return new Promise((resolve, reject) => {
      let hasSucceed = false

      data.clientSoft.on('binding-triggered', (wsData) => {
        expect(wsData.bindingId).to.be.equal(1)
        hasSucceed = true
        resolve(true)
      })

      data.clientFront.on('trigger-binding-ok', () => {
        expect(1).to.be.equal(1)
      }).on('trigger-binding-ko', () => {
        expect.fail()
      }).emit('trigger-binding', { id: 1 })

      setTimeout(() => {
        if (!hasSucceed) {
          reject(new Error('The software never received the event'))
        }
      }, 1000)
    })
  })

  it('Binds the API events to be check later', async () => {
    data.clientFront.on('create-category', (wsData) => {
      testCategoryPayload(wsData.category)
      data.ws['create-category'].push(wsData.category)
    })
    data.clientFront.on('update-category', (wsData) => {
      testCategoryPayload(wsData.category)
      data.ws['update-category'].push(wsData.category)
    })
    data.clientFront.on('delete-category', (wsData) => {
      testCategoryPayload(wsData.category)
      data.ws['delete-category'].push(wsData.category)
    })
    data.clientFront.on('create-binding', (wsData) => {
      testBindingPayload(wsData.binding)
      data.ws['create-binding'].push(wsData.binding)
    })
    data.clientFront.on('update-binding', (wsData) => {
      testBindingPayload(wsData.binding)
      data.ws['update-binding'].push(wsData.binding)
    })
    data.clientFront.on('delete-binding', (wsData) => {
      testBindingPayload(wsData.binding)
      data.ws['delete-binding'].push(wsData.binding)
    })
  })
}
