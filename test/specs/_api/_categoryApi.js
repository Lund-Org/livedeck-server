/* eslint no-unused-expressions: 0 */
const testCategoryPayload = require(path.join(__root, 'test/configuration/payloadTester/testCategoryPayload'))

module.exports = (request, data) => {
  /**
   ********************************
   * TEST SUCCESS ON THE AUTH API *
   ********************************
   */

  it('Tests the category creation API', async () => {
    // Success category creation
    await request('/categories', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(201)
      testCategoryPayload(apiResponseParsed, 'MyCategory')
      data.categoryId = apiResponseParsed.id
    }, { Authorization: data.key }, { name: 'MyCategory', color: '#cc3333', weight: 1 })
  })

  it('Tests the category update API', async () => {
    // Success category update
    await request('/categories/' + data.categoryId, 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testCategoryPayload(apiResponseParsed, 'MyCategoryTest')
    }, { Authorization: data.key }, { name: 'MyCategoryTest' })
  })

  it('Tests the category order update API', async () => {
    await request('/categories/' + data.categoryId, 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testCategoryPayload(apiResponseParsed, 'MyCategoryTest')
    }, { Authorization: data.key }, { weight: 32 })
    await request('/categories/' + data.categoryId, 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testCategoryPayload(apiResponseParsed, 'MyCategoryTest')
    }, { Authorization: data.key }, { weight: 0 })
  })

  it('Tests the category update without payload API', async () => {
    // Success category update
    await request('/categories/' + data.categoryId, 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testCategoryPayload(apiResponseParsed, 'MyCategoryTest')
    }, { Authorization: data.key })
  })

  it('Tests the category list API', async () => {
    // Success category listing
    await request('/categories', 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      expect(Array.isArray(apiResponseParsed)).to.be.true
      expect(apiResponseParsed.length).to.be.equal(1)
      testCategoryPayload(apiResponseParsed[0], 'MyCategoryTest')
    }, { Authorization: data.key })
  })

  it('Tests the category get API', async () => {
    // Success category get
    await request('/categories/' + data.categoryId, 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testCategoryPayload(apiResponseParsed, 'MyCategoryTest')
    }, { Authorization: data.key })
  })

  it('Tests the category add binding API', async () => {
    // Success category add binding
    await request('/categories/' + data.categoryId + '/bindings/1', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testCategoryPayload(apiResponseParsed, 'MyCategoryTest')
      expect(apiResponseParsed.bindings.length).to.be.equal(1)
    }, { Authorization: data.key })
  })

  it('Tests the category remove binding API', async () => {
    // Success category remove binding
    await request('/categories/' + data.categoryId + '/bindings/1', 'DELETE', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(200)
      testCategoryPayload(apiResponseParsed, 'MyCategoryTest')
      expect(apiResponseParsed.bindings.length).to.be.equal(0)
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
    await request('/categories/', 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(401)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    })
  })

  it('Tests errors on the get API', async () => {
    await request('/categories/42', 'GET', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key })
  })

  it('Tests errors on the create API', async () => {
    // Test with a missing payload
    await request('/categories/', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.missingKeys.length > 0).to.be.true
    }, { Authorization: data.key })

    // Test payload with missing keys
    await request('/categories/', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.missingKeys.length > 0).to.be.true
    }, { Authorization: data.key }, { name: 'PayloadWithMissingKeys' })

    // Test payload with malformed keys
    await request('/categories/', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.badFormatKeys.length > 0).to.be.true
    }, { Authorization: data.key }, {
      name: 12,
      color: 12,
      weight: '42'
    })
  })

  it('Tests errors on the update API', async () => {
    // Test with a bad entity
    await request('/categories/42', 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key }, { color: '#FFFFFF' })

    // Test payload with missing payload
    await request('/categories/' + data.categoryId, 'PATCH', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(400)
      expect(apiResponseParsed.badFormatKeys.length > 0).to.be.true
    }, { Authorization: data.key }, { color: 12 })
  })

  it('Tests errors on adding binding to a category API', async () => {
    // Test on a bad binding id
    await request('/categories/' + data.categoryId + '/bindings/42', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key })

    // Test on a bad category id
    await request('/categories/42/bindings/1', 'POST', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key })
  })

  it('Tests errors on deletion of a binding to a category API', async () => {
    // Test on a bad binding id
    await request('/categories/' + data.categoryId + '/bindings/42', 'DELETE', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key })

    // Test on a bad category id
    await request('/categories/42/bindings/1', 'DELETE', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key })
  })

  it('Tests errors on deletion of a category API', async () => {
    // Test on a bad binding id
    await request('/categories/42', 'DELETE', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      expect(statusCode).to.be.equal(404)
      expect(typeof apiResponseParsed.error).to.not.be.equal('undefined')
    }, { Authorization: data.key })
  })

  // The successful test for the deletion
  it('Tests the category delete API', async () => {
    // Success category deletion
    await request('/categories/' + data.categoryId, 'DELETE', (APIResponse, statusCode) => {
      const apiResponseParsed = JSON.parse(APIResponse)

      // Test the result of the call
      expect(statusCode).to.be.equal(200)

      // Test the payload returned by the call
      expect(Object.keys(apiResponseParsed).length).to.be.equal(1)
      expect(typeof apiResponseParsed.removed).to.be.equal('object')
      testCategoryPayload(apiResponseParsed.removed, 'MyCategoryTest')
    }, { Authorization: data.key })
  })
}
