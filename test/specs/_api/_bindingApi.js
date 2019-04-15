/* eslint no-unused-expressions: 0 */
const testBindingPayload = require(path.join(__root, 'test/configuration/payloadTester/testBindingPayload'))

module.exports = (request, data) => {
  it('Tests the binding creation API', async () => {
    await request('/bindings', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(201)
      testBindingPayload(apiResponseParsed, 'MyBinding')
      data.bindingId = apiResponseParsed.id
    }, { Authorization: data.key }, {
      name: 'MyBinding',
      icon: 'test.png',
      weight: 1,
      type: 'testType'
    })
  })
  it('Tests the binding update API', async () => {
    await request('/bindings/' + data.bindingId, 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testBindingPayload(apiResponseParsed, 'MyBindingTest')
    }, { Authorization: data.key }, { name: 'MyBindingTest', configuration: { 'foo': 'bar' } })
  })
  it('Tests the binding list API', async () => {
    await request('/bindings', 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      expect(Array.isArray(apiResponseParsed)).to.be.true
      expect(apiResponseParsed.length).to.be.equal(2)
      testBindingPayload(apiResponseParsed[1], 'MyBindingTest')
    }, { Authorization: data.key })
  })
  it('Tests the binding get API', async () => {
    await request('/bindings/' + data.bindingId, 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testBindingPayload(apiResponseParsed, 'MyBindingTest')
    }, { Authorization: data.key })
  })

  // The delete test is at the end because we need a working id
  // to test some errors on some routes

  /**
   *******************************
   * TEST ERRORS ON THE AUTH API *
   *******************************
   */
  it('Tests errors on the listing API', async () => {
    await request('/bindings/', 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(401)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    })
  })

  it('Tests errors on the get API', async () => {
    await request('/bindings/42', 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key })
  })

  it('Tests errors on the create API', async () => {
    // Test with a missing payload
    await request('/bindings/', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.missingKeys.length > 0).to.be.true
    }, { Authorization: data.key })

    // Test payload with missing keys
    await request('/bindings/', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.missingKeys.length > 0).to.be.true
    }, { Authorization: data.key }, { name: 'PayloadWithMissingKeys' })

    // Test payload with malformed keys
    await request('/bindings/', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.badFormatKeys.length > 0).to.be.true
    }, { Authorization: data.key }, {
      name: 12,
      icon: 12,
      weight: '42',
      type: 12
    })
  })

  it('Tests errors on the update API', async () => {
    // Test with a bad entity
    await request('/bindings/42', 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key }, { icon: 'test.jpg' })

    // Test payload with bad payload
    await request('/bindings/' + data.bindingId, 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.badFormatKeys.length > 0).to.be.true
    }, { Authorization: data.key }, { icon: 12 })
  })

  // The successful test for the deletion
  it('Tests the binding delete API', async () => {
    await request('/bindings/' + data.bindingId, 'DELETE', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      expect(Object.keys(apiResponseParsed).length).to.be.equal(1)
      expect(typeof apiResponseParsed.removed).to.be.equal('object')
      testBindingPayload(apiResponseParsed.removed, 'MyBindingTest')
    }, { Authorization: data.key })
  })
}
