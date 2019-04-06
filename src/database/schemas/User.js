const { EntitySchema } = require('typeorm')
const Binding = require('../models/Binding')
const Category = require('../models/Category')
const User = require('../models/User')

module.exports = new EntitySchema({
  target: User,
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true
    },
    username: {
      type: 'varchar',
      unique: true
    },
    password: {
      type: 'varchar'
    },
    key: {
      type: 'varchar'
    },
    created_at: {
      type: 'datetime'
    },
    updated_at: {
      type: 'datetime'
    },
    deleted_at: {
      type: 'datetime',
      nullable: true,
      default: null
    }
  },
  relations: {
    categories: {
      target: () => Category,
      type: 'one-to-many',
      inverseSide: 'user'
    },
    bindings: {
      target: () => Binding,
      type: 'one-to-many',
      inverseSide: 'user'
    }
    // Example of 1-1 relation
    // xxx: {
    //   target: () => Xxx,
    //   type: 'one-to-one',
    //   inverseSide: 'page'
    // },
    // Example of 1-x relation
    // inserts: {
    //   target: () => Insert,
    //   type: 'one-to-many',
    //   inverseSide: 'page'
    // },
    // Example of x-1 relation
    // parent: {
    //   target: () => Page,
    //   type: 'many-to-one',
    //   joinColumn: true,
    //   inverseSide: 'childrens'
    // },
    // Example of x-x relation
    // linked_pages: {
    //   target: () => Page,
    //   type: 'many-to-many',
    //   joinTable: {
    //     name: 'link_pages',
    //     joinColumn: {
    //       name: 'reference_page_id',
    //       referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //       name: 'linked_page_id',
    //       referencedColumnName: 'id'
    //     }
    //   }
    // }
  }
})
