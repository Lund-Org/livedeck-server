const categoriesWSCallback = require(path.join(__root, './src/modules/websocket/hooks/categoriesWSCallback'))

const fakeData = {
  processResult: 12,
  request: {
    user: { key: 'user-key' },
    _route: { name: '' },
    cherry: {
      websocket: {
        frontProcessor: {
          emitCreateCategory: (user, value) => {
            expect(user.key).to.be.equal('user-key')
            expect(value).to.be.equal(12)
          },
          emitUpdateCategory: (user, value) => {
            expect(user.key).to.be.equal('user-key')
            expect(value).to.be.equal(12)
          },
          emitDeleteCategory: (user, value) => {
            expect(user.key).to.be.equal('user-key')
            expect(value).to.be.equal(12)
          }
        }
      }
    }
  }
}

describe('Category WS Hooks', () => {
  it('Tests the first hook', () => {
    expect(categoriesWSCallback[0].name).to.be.equal('create-category-front')
    expect(categoriesWSCallback[0].type).to.be.equal('afterProcess')
    fakeData.request._route.name = 'categories-context-create-category'
    categoriesWSCallback[0].method(fakeData)
  })
  it('Tests the second hook', () => {
    expect(categoriesWSCallback[1].name).to.be.equal('update-category-front')
    expect(categoriesWSCallback[1].type).to.be.equal('afterProcess')

    fakeData.request._route.name = 'categories-context-update-category'
    categoriesWSCallback[1].method(fakeData)
    fakeData.request._route.name = 'categories-context-add-binding-to-category'
    categoriesWSCallback[1].method(fakeData)
    fakeData.request._route.name = 'categories-context-remove-binding-from-category'
    categoriesWSCallback[1].method(fakeData)
  })
  it('Tests the third hook', () => {
    expect(categoriesWSCallback[2].name).to.be.equal('delete-category-front')
    expect(categoriesWSCallback[2].type).to.be.equal('afterProcess')
    fakeData.request._route.name = 'categories-context-delete-category'
    categoriesWSCallback[2].method(fakeData)
  })
})
