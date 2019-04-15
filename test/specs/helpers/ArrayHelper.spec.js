const ArrayHelper = require(path.join(__root, './src/helpers/ArrayHelper'))

describe('ArrayHelper', () => {
  it('Tests the method chainConcat', () => {
    const chain = ArrayHelper.chainConcat([1, 2, 3], [4, 5, 6], [7, 8, 9])

    expect(chain.length).to.be.equal(9)
  })
})
