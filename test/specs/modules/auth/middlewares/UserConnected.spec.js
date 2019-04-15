const UserConnected = require(path.join(__root, 'src/modules/auth/middlewares/UserConnected'))

describe('Middleware UserConnected', () => {
  it('Tests if there is an issue with the database', async () => {
    UserConnected.callback(() => {
      expect.fail()
    }, {
      headers: { authorization: 'randomKey' }
    }, {
      json: (payload, header) => {
        expect(header.statusCode).to.be.equal(500)
        expect(typeof payload.error).to.not.be.equal('undefined')
      }
    })
  })
})
