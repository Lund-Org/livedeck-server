const MiddlewareHelper = require(path.join(__root, './src/helpers/MiddlewareHelper'))

describe('MiddlewareHelper', () => {
  it('Tests the method checkMissingKeys', async () => {
    const payloadWithMissingKey = MiddlewareHelper.checkMissingKeys({
      'test1': 'string',
      'test2': 'string',
      'test3': 'number'
    }, {
      test1: 1,
      test2: 2
    })
    const payloadWithoutMissingKeys = MiddlewareHelper.checkMissingKeys({
      'test1': 'string',
      'test2': 'string',
      'test3': 'number'
    }, {
      test1: 1,
      test2: 2,
      test3: 3
    })

    expect(payloadWithMissingKey.length).to.be.equal(1)
    expect(payloadWithoutMissingKeys.length).to.be.equal(0)
  })

  it('Tests the method badFormatKeys', async () => {
    const malformedPayload = MiddlewareHelper.badFormatKeys({
      'test1': 'string',
      'test2': 'string',
      'test3': 'number'
    }, {
      test1: 1,
      test2: 2
    })
    const formattedPayload = MiddlewareHelper.badFormatKeys({
      'test1': 'string',
      'test2': 'string',
      'test3': 'number'
    }, {
      test1: '1',
      // Having a key missing is not an issue for this method
      test3: 3
    })

    expect(malformedPayload.length).to.be.equal(2)
    expect(formattedPayload.length).to.be.equal(0)
  })
})
