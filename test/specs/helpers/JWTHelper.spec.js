const JWTHelper = require(path.join(__root, './src/helpers/JWTHelper'))
const jwt = require('jsonwebtoken')

const USER_KEY = 'my-user-key'

describe('JWTHelper', () => {
  it('Tests the method verify', async () => {
    const fakeToken = jwt.sign({ authorization: 'my-user-key' }, process.env.APP_JWT_SIGN_KEY)
    const decodedToken = await JWTHelper.verify(fakeToken)

    expect(typeof decodedToken).to.not.be.equal('undefined')
    expect(decodedToken.authorization).to.be.equal(USER_KEY)
  })
})
