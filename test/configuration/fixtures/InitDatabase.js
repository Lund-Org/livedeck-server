const { getConnection } = require('typeorm')
const User = require(path.join(__root, './src/database/models/User'))
const Binding = require(path.join(__root, './src/database/models/Binding'))

module.exports = class InitDatabase {
  async up () {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: 1,
        username: 'root',
        password: '$2b$10$AEOFWy9FeIiv1OkvasedKuMJExqfMFKMzM8.PFwWWOWrk0WbOR902',
        key: 'fake-key',
        created_at: '2019-04-01 20:00:00',
        updated_at: '2019-04-01 20:00:00'
      })
      .execute()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Binding)
      .values({
        id: 1,
        name: 'name',
        icon: 'icon',
        type: 'type',
        weight: 1,
        configuration: '{ "foo": "bar" }',
        created_at: '2019-04-01 20:00:00',
        updated_at: '2019-04-01 20:00:00',
        user: { id: 1 }
      })
      .execute()
  }
  async down () {
    // reverts things made in "up" method
    // We don't care
  }
}
