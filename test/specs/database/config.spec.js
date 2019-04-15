const config = require(path.join(__root, 'src/database/config'))

describe('Database config', () => {
  it('Tests the validity of the config object', () => {
    expect(typeof config.type).to.be.equal('string')
    expect(typeof config.host).to.be.equal('string')
    expect(typeof config.port).to.be.equal('string')
    expect(typeof config.username).to.be.equal('string')
    expect(typeof config.password).to.be.equal('string')
    expect(typeof config.database).to.be.equal('string')
    expect(typeof config.synchronize).to.be.equal('boolean')
    expect(typeof config.entities).to.be.equal('object')
  })
})
