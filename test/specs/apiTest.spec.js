/* eslint no-unused-expressions: 0 */
const server = require(path.join(__root, 'test/configuration/indexSimulator'))
const http = require('http')
const InitDatabase = require(path.join(__root, 'test/configuration/fixtures/InitDatabase'))
const AuthAPI = require('./_api/_authApi')
const BindingAPI = require('./_api/_bindingApi')
const CategoryAPI = require('./_api/_categoryApi')
const WebsocketAPI = require('./_api/_websocketApi')

const init = new InitDatabase()
const data = {}

async function request (path, method, callback, headers = {}, data = null) {
  return new Promise((resolve, reject) => {
    try {
      const req = http.request({
        host: 'localhost',
        port: 4123,
        path,
        method,
        headers: Object.assign({
          'Content-Type': 'application/json'
        }, headers)
      }, (resp) => {
        let data = ''
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk
        })
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(callback(data, resp.statusCode))
        })
      }).on('error', (err) => {
        expect.fail()
        reject(err)
      })

      if (data) {
        req.write(JSON.stringify(data))
      }
      req.end()
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

describe('API', () => {
  before(async function () {
    await server.start()
    return init.up()
  })
  after(async () => {
    await init.down()
    await server.stop()
  })

  context('Tests the Websocket API', async () => {
    await WebsocketAPI(data)
  })
  context('Tests the Auth API', async () => {
    await AuthAPI(request, data)
  })
  context('Test the Category API', async () => {
    data.categoryId = null
    await CategoryAPI(request, data)
  })
  context('Test the Binding API', async () => {
    data.bindingId = null
    await BindingAPI(request, data)
  })
  context('Test if the APIs have triggered the websockets', async () => {
    it('Checks the data store in the multiple hooks triggered', async () => {
      return new Promise((resolve, reject) => {
        // Tempo the process or the pending request on the websockets
        setTimeout(() => {
          expect(data.ws['create-category'].length).to.be.equal(1)
          expect(data.ws['update-category'].length).to.be.equal(6)
          expect(data.ws['delete-category'].length).to.be.equal(1)
          expect(data.ws['create-binding'].length).to.be.equal(1)
          expect(data.ws['update-binding'].length).to.be.equal(3)
          expect(data.ws['delete-binding'].length).to.be.equal(1)
          resolve(1)
        }, 1000)
      })
    })
  })
})
