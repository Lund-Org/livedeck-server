const bindingsWSCallback = require(path.join(__root, './src/modules/websocket/hooks/bindingsWSCallback'))

const fakeData = {
  processResult: 12,
  request: {
    user: { key: 'user-key' },
    _route: { name: '' },
    cherry: {
      websocket: {
        frontProcessor: {
          emitCreateBinding: (user, value) => {
            expect(user.key).to.be.equal('user-key')
            expect(value).to.be.equal(12)
          },
          emitUpdateBinding: (user, value) => {
            expect(user.key).to.be.equal('user-key')
            expect(value).to.be.equal(12)
          },
          emitDeleteBinding: (user, value) => {
            expect(user.key).to.be.equal('user-key')
            expect(value).to.be.equal(12)
          }
        }
      }
    }
  }
}

describe('Binding WS Hooks', () => {
  it('Tests the first hook', () => {
    expect(bindingsWSCallback[0].name).to.be.equal('create-binding-front')
    expect(bindingsWSCallback[0].type).to.be.equal('afterProcess')
    fakeData.request._route.name = 'bindings-context-create-binding'
    bindingsWSCallback[0].method(fakeData)
  })
  it('Tests the second hook', () => {
    expect(bindingsWSCallback[1].name).to.be.equal('update-binding-front')
    expect(bindingsWSCallback[1].type).to.be.equal('afterProcess')
    fakeData.request._route.name = 'bindings-context-update-binding'
    bindingsWSCallback[1].method(fakeData)
  })
  it('Tests the third hook', () => {
    expect(bindingsWSCallback[2].name).to.be.equal('delete-binding-front')
    expect(bindingsWSCallback[2].type).to.be.equal('afterProcess')
    fakeData.request._route.name = 'bindings-context-delete-binding'
    bindingsWSCallback[2].method(fakeData)
  })
})
