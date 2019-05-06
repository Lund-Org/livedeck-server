/* eslint-disable no-unused-expressions */
const RuleHelper = require(path.join(__root, './src/helpers/RuleHelper'))

describe('RuleHelper', () => {
  it('Tests the method checkMissingKeys', async () => {
    const payloadWithMissingKey = RuleHelper.checkMissingKey('test3', {
      test1: 1,
      test2: 2
    })
    const payloadWithoutMissingKeys = RuleHelper.checkMissingKey('test3', {
      test1: 1,
      test2: 2,
      test3: 3
    })

    expect(payloadWithMissingKey).to.be.true
    expect(payloadWithoutMissingKeys).to.be.false
  })

  it('Tests the method checkType', async () => {
    const errors = []

    RuleHelper.checkType('test', 'imastring', 'string', errors)
    expect(errors.length).to.be.equal(0)

    RuleHelper.checkType('test', 12, 'number', errors)
    expect(errors.length).to.be.equal(0)

    RuleHelper.checkType('test', 12, ['string', 'number'], errors)
    expect(errors.length).to.be.equal(0)

    RuleHelper.checkType('test', 12, 'string', errors)
    expect(errors.length).to.be.equal(1)
  })

  it('Tests the method checkLength', async () => {
    const errors = []

    RuleHelper.checkLength('test', 'normal string', {
      min: 1,
      max: 15
    }, errors)
    expect(errors.length).to.be.equal(0)

    RuleHelper.checkLength('test', 12, {
      min: 1,
      max: 15
    }, errors)
    expect(errors.length).to.be.equal(0)

    RuleHelper.checkLength('test', 'short', {
      min: 10
    }, errors)
    expect(errors.length).to.be.equal(1)

    RuleHelper.checkLength('test', 'very long string', {
      max: 5
    }, errors)
    expect(errors.length).to.be.equal(2)

    RuleHelper.checkLength('test', 0, {
      min: 1,
      max: 15
    }, errors)
    expect(errors.length).to.be.equal(3)

    RuleHelper.checkLength('test', 40, {
      min: 1,
      max: 15
    }, errors)
    expect(errors.length).to.be.equal(4)
  })

  it('Tests the method checkInEnum', async () => {
    const errors = []

    RuleHelper.checkInEnum('test', 2, [1, 2, 3], errors)
    expect(errors.length).to.be.equal(0)

    RuleHelper.checkInEnum('test', 2, [3, 4, 5], errors)
    expect(errors.length).to.be.equal(1)
  })

  it('Tests the method rulesManager', async () => {
    const goodPayload = RuleHelper.rulesManager({
      'test1': { type: 'string' },
      'test2': { length: { min: 0, max: 30 } },
      'test3': { enum: [1, 2, 3] }
    }, {
      test1: 'test number one',
      test2: 'test number two',
      test3: 2
    })
    expect(goodPayload.missingKeys.length).to.be.equal(0)
    expect(goodPayload.badFormatKeys.length).to.be.equal(0)

    const badPayload = RuleHelper.rulesManager({
      'test1': { type: 'string' },
      'test2': { length: { min: 0, max: 30 } },
      'test3': { enum: [1, 2, 3] }
    }, {
      test2: 'test number two with a string too long it\'s insane how long it is',
      test3: 4
    }, true)

    expect(badPayload.missingKeys.length).to.be.equal(1)
    expect(badPayload.badFormatKeys.length).to.be.equal(2)
  })
})
