const testUserPayload = require(path.join(__root, 'test/configuration/payloadTester/testUserPayload'))

module.exports = (request, data) => {
  /**
   ********************************
   * TEST SUCCESS ON THE AUTH API *
   ********************************
   */

  it('Tests successfully the register API', async () => {
    // Success registration
    await request('/register', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(201)

      // Test the payload returned by the call
      testUserPayload(apiResponseParsed, 'TestUser')
    }, {}, { username: 'TestUser', password: 'Azerty123' })
  })

  it('Tests successfully the login API', async () => {
    // Success login
    await request('/login', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(200)

      // Test the payload returned by the call
      expect(Object.keys(apiResponseParsed).length).to.be.equal(1)
      expect(typeof apiResponseParsed.token).to.be.equal('string')

      data.token = apiResponseParsed.token
    }, {}, { username: 'root', password: 'root' })
  })

  it('Tests successfully the valid token API', async () => {
    // Success login
    await request('/valid-token', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(200)

      // Test the payload returned by the call
      expect(Object.keys(apiResponseParsed).length).to.be.equal(1)
      expect(typeof apiResponseParsed.user).to.be.equal('object')
      testUserPayload(apiResponseParsed.user, 'root')
      data.key = apiResponseParsed.user.key
    }, {}, { jwtToken: data.token })
  })

  /**
   *******************************
  * TEST ERRORS ON THE AUTH API *
  *******************************
  */

  it('Tests error on the register API', async () => {
    // Tests with a missing payload
    await request('/register', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(400)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    })
  })

  it('Tests error on the login API', async () => {
    // Tests with a missing password
    await request('/login', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(401)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, {}, { username: 'root' })

    // Tests with a bad password
    await request('/login', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(401)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, {}, { username: 'root', password: 'badPassword' })

    // Tests with a bad username
    await request('/login', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.notFound).to.not.be.equal('undefined')
    }, {}, { username: 'userdoesntexist', password: 'badPassword' })
  })

  it('Tests error on the valid token API', async () => {
    // Tests with a missing payload
    await request('/valid-token', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(500)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    })

    // Tests with a jwt targeting an unknown user
    await request('/valid-token', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, {}, { jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemF0aW9uIjoiMGJlZDk4OGQtNDRmMi00YjMxLWE4ZWMtODE2NDRmMDk0ZWQ1In0.8SKNJgKBfJwE6tHUuRr-vl2JoZMbovet7diqMnQfXQc' })
  })
}
