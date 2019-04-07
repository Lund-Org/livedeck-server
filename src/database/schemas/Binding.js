const { EntitySchema } = require('typeorm')
const Binding = require('../models/Binding')
const Category = require('../models/Category')
const User = require('../models/User')

module.exports = new EntitySchema({
  target: Binding,
  tableName: 'bindings',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true
    },
    name: {
      type: 'varchar',
      unique: true
    },
    icon: {
      type: 'varchar'
    },
    type: {
      type: 'varchar'
    },
    weight: {
      type: 'integer'
    },
    configuration: {
      type: 'json'
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
    user: {
      target: () => User,
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'bindings'
    },
    categories: {
      target: () => Category,
      type: 'many-to-many',
      inverseSide: 'bindings',
      joinTable: {
        name: 'bindings_categories',
        inverseJoinColumn: {
          name: 'category_id',
          referencedColumnName: 'id'
        },
        joinColumn: {
          name: 'binding_id',
          referencedColumnName: 'id'
        }
      }
    }
  }
})
