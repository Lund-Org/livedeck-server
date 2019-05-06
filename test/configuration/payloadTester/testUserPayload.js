module.exports = (payload, username) => {
  expect(typeof payload.id).to.be.equal('number')
  expect(payload.username).to.be.equal(username)
  expect(typeof payload.key).to.be.equal('string')
  expect(typeof payload.created_at).to.be.equal('string')
  expect(typeof payload.updated_at).to.be.equal('string')
}
