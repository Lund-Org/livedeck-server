/* eslint no-unused-expressions: 0 */

module.exports = (payload, name) => {
  expect(typeof payload.id).to.be.equal('number')
  if (typeof name === 'undefined') {
    expect(typeof payload.name).to.be.equal('string')
  } else {
    expect(payload.name).to.be.equal(name)
  }
  expect(typeof payload.icon).to.be.equal('string')
  expect(typeof payload.type).to.be.equal('string')
  expect(typeof payload.created_at).to.be.equal('string')
  expect(typeof payload.updated_at).to.be.equal('string')
  expect(payload.deleted_at).to.be.equal(null)
  if (typeof payload.categories !== 'undefined') {
    expect(Array.isArray(payload.categories)).to.be.true
  }
  if (typeof payload.configuration !== 'undefined') {
    expect(typeof payload.configuration).to.be.equal('string')
  }
}
